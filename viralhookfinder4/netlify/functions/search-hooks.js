const fs = require('fs');
const path = require('path');

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const params = event.queryStringParameters || {};
        const niche = (params.niche || 'fitness').toLowerCase();
        const platform = (params.platform || 'all').toLowerCase();
        const minViews = parseInt(params.minViews) || 0;
        
        console.log('Search request:', { niche, platform, minViews });
        console.log('__dirname:', __dirname);

        let hooks = [];
        let dataSource = 'real';
        let debugInfo = {};
        
        // Try to load real data
        try {
            const dataPath = path.join(__dirname, '../../data/latest_all.json');
            console.log('Trying to read from:', dataPath);
            debugInfo.dataPath = dataPath;
            debugInfo.fileExists = fs.existsSync(dataPath);
            
            if (fs.existsSync(dataPath)) {
                const fileContent = fs.readFileSync(dataPath, 'utf8');
                console.log('File content length:', fileContent.length);
                
                const realData = JSON.parse(fileContent);
                console.log('Available niches:', Object.keys(realData));
                debugInfo.availableNiches = Object.keys(realData);
                
                // Get hooks for this niche
                const nicheKey = Object.keys(realData).find(key => 
                    key.toLowerCase().includes(niche) || niche.includes(key.toLowerCase())
                );
                
                console.log('Search niche:', niche);
                console.log('Found niche key:', nicheKey);
                debugInfo.searchedNiche = niche;
                debugInfo.foundNicheKey = nicheKey;
                
                if (nicheKey && realData[nicheKey] && realData[nicheKey].length > 0) {
                    hooks = realData[nicheKey];
                    console.log(`Using real data: ${hooks.length} hooks for ${niche}`);
                    debugInfo.hooksFound = hooks.length;
                } else {
                    console.log('No hooks found for niche:', niche);
                    debugInfo.error = `Niche "${niche}" not found in data`;
                }
            } else {
                console.log('Data file does not exist at:', dataPath);
                debugInfo.error = 'Data file not found';
            }
        } catch (error) {
            console.log('Error loading data:', error.message);
            console.log('Error stack:', error.stack);
            debugInfo.error = error.message;
            debugInfo.errorStack = error.stack;
        }

        // Filter by platform
        if (platform !== 'all' && hooks.length > 0) {
            const beforeFilter = hooks.length;
            hooks = hooks.filter(h => 
                h.platform && h.platform.toLowerCase() === platform
            );
            console.log(`Platform filter: ${beforeFilter} -> ${hooks.length} hooks`);
        }

        // Filter by views
        if (minViews > 0 && hooks.length > 0) {
            const beforeFilter = hooks.length;
            hooks = hooks.filter(h => (h.views || 0) >= minViews);
            console.log(`Views filter: ${beforeFilter} -> ${hooks.length} hooks`);
        }

        // Sort by views (highest first)
        hooks.sort((a, b) => (b.views || 0) - (a.views || 0));

        // Get last update time
        let lastUpdate = null;
        try {
            const updatePath = path.join(__dirname, '../../data/last_update.txt');
            if (fs.existsSync(updatePath)) {
                lastUpdate = fs.readFileSync(updatePath, 'utf8').trim();
            }
        } catch (e) {
            console.log('Could not read last_update.txt:', e.message);
        }

        const response = {
            success: true,
            niche: niche,
            platform: platform,
            count: hooks.length,
            hooks: hooks,
            dataSource: dataSource,
            lastUpdate: lastUpdate,
            timestamp: new Date().toISOString()
        };

        // Add debug info if no hooks found
        if (hooks.length === 0) {
            response.debug = debugInfo;
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(response)
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message,
                stack: error.stack
            })
        };
    }
};
