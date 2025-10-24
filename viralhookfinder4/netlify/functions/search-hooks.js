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

        let hooks = [];
        let dataSource = 'real';
        
        // Try to load real data
        try {
            const dataPath = path.join(__dirname, '../../data/latest_all.json');
            if (fs.existsSync(dataPath)) {
                const realData = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
                
                // Get hooks for this niche
                const nicheKey = Object.keys(realData).find(key => 
                    key.toLowerCase().includes(niche) || niche.includes(key.toLowerCase())
                ) || niche;
                
                if (realData[nicheKey] && realData[nicheKey].length > 0) {
                    hooks = realData[nicheKey];
                    console.log(`Using real data: ${hooks.length} hooks for ${niche}`);
                }
            }
        } catch (error) {
            console.log('Error loading data:', error.message);
        }

        // Filter by platform
        if (platform !== 'all') {
            hooks = hooks.filter(h => 
                h.platform && h.platform.toLowerCase() === platform
            );
        }

        // Filter by views
        hooks = hooks.filter(h => (h.views || 0) >= minViews);

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
            // Ignore
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                niche: niche,
                platform: platform,
                count: hooks.length,
                hooks: hooks,
                dataSource: dataSource,
                lastUpdate: lastUpdate,
                timestamp: new Date().toISOString()
            })
        };

    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                success: false,
                error: error.message
            })
        };
    }
};
