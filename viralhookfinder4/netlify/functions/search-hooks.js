const fs = require('fs');
const path = require('path');

// Fallback sample data (always available)
const SAMPLE_HOOKS_DB = {
    "fitness": [
        {
            "platform": "instagram",
            "views": 450000,
            "engagement_rate": 7.97,
            "hook_transcript": "What if I told you this one exercise burns more fat than running?",
            "patterns": ["question", "curiosity_gap"],
            "emotional_trigger": "curiosity"
        }
    ],
    "marketing": [
        {
            "platform": "tiktok",
            "views": 650000,
            "engagement_rate": 14.05,
            "hook_transcript": "I went from 0 to 100k followers in 3 months using this one strategy",
            "patterns": ["transformation", "number_based"],
            "emotional_trigger": "inspiration"
        }
    ]
};

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
        let dataSource = 'sample';
        
        // Try to load real data first
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
                    dataSource = 'real';
                    console.log(`Using real data: ${hooks.length} hooks for ${niche}`);
                }
            }
        } catch (error) {
            console.log('Real data not available, using sample data:', error.message);
        }
        
        // Fallback to sample data if no real data found
        if (hooks.length === 0) {
            hooks = SAMPLE_HOOKS_DB[niche] || SAMPLE_HOOKS_DB['fitness'] || [];
            console.log(`Using sample data: ${hooks.length} hooks for ${niche}`);
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
