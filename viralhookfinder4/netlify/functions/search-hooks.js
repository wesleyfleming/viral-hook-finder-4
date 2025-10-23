// Netlify serverless function to search for viral hooks
// Path: netlify/functions/search-hooks.js

const SAMPLE_HOOKS_DB = {
    "fitness": [
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/example1",
            "views": 450000,
            "likes": 35000,
            "comments": 890,
            "engagement_rate": 7.97,
            "date": "2024-10-15",
            "caption": "What if I told you this one exercise burns more fat than running?",
            "owner": "fitness_expert",
            "hook_transcript": "What if I told you this one exercise burns more fat than running?",
            "patterns": ["question", "curiosity_gap", "shocking_stat"],
            "emotional_trigger": "curiosity",
            "urgency_score": 2,
            "curiosity_score": 8
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/123",
            "views": 780000,
            "likes": 95000,
            "comments": 2100,
            "engagement_rate": 12.44,
            "date": "2024-10-18",
            "caption": "Stop wasting money on supplements. Here's what actually works...",
            "owner": "fitcoach_official",
            "hook_transcript": "Stop wasting money on supplements. Here's what actually works",
            "patterns": ["urgency", "problem_agitation", "curiosity_gap"],
            "emotional_trigger": "frustration",
            "urgency_score": 9,
            "curiosity_score": 7
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/example3",
            "views": 320000,
            "likes": 28000,
            "comments": 650,
            "engagement_rate": 8.91,
            "date": "2024-10-20",
            "caption": "I used to struggle with meal prep until I discovered this hack",
            "owner": "healthy_meals",
            "hook_transcript": "I used to struggle with meal prep until I discovered this hack",
            "patterns": ["personal_story", "transformation", "curiosity_gap"],
            "emotional_trigger": "hope",
            "urgency_score": 3,
            "curiosity_score": 8
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/abc123",
            "views": 920000,
            "likes": 125000,
            "comments": 3400,
            "engagement_rate": 13.96,
            "date": "2024-10-19",
            "caption": "3 mistakes killing your progress in the gym",
            "owner": "gym_secrets",
            "hook_transcript": "3 mistakes killing your progress in the gym (you're probably doing number 2)",
            "patterns": ["number_based", "negative", "curiosity_gap"],
            "emotional_trigger": "fear",
            "urgency_score": 6,
            "curiosity_score": 9
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/456",
            "views": 560000,
            "likes": 72000,
            "comments": 1800,
            "engagement_rate": 13.18,
            "date": "2024-10-17",
            "caption": "Nobody tells you this about building muscle after 40",
            "owner": "over40fitness",
            "hook_transcript": "Nobody tells you this about building muscle after 40",
            "patterns": ["controversy", "curiosity_gap", "age_specific"],
            "emotional_trigger": "curiosity",
            "urgency_score": 4,
            "curiosity_score": 9
        }
    ],
    "marketing": [
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/marketing1",
            "views": 385000,
            "likes": 31000,
            "comments": 920,
            "engagement_rate": 8.29,
            "date": "2024-10-16",
            "caption": "The email marketing mistake costing you thousands",
            "owner": "marketing_pro",
            "hook_transcript": "The email marketing mistake that's costing you thousands every month",
            "patterns": ["problem_agitation", "shocking_stat", "curiosity_gap"],
            "emotional_trigger": "fear",
            "urgency_score": 8,
            "curiosity_score": 9
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/789",
            "views": 650000,
            "likes": 89000,
            "comments": 2300,
            "engagement_rate": 14.05,
            "date": "2024-10-21",
            "caption": "I went from 0 to 100k followers in 3 months using this strategy",
            "owner": "growth_hacker",
            "hook_transcript": "I went from 0 to 100k followers in 3 months using this one strategy",
            "patterns": ["personal_story", "number_based", "transformation", "curiosity_gap"],
            "emotional_trigger": "inspiration",
            "urgency_score": 5,
            "curiosity_score": 10
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/marketing2",
            "views": 420000,
            "likes": 38000,
            "comments": 1100,
            "engagement_rate": 9.29,
            "date": "2024-10-22",
            "caption": "Your competitor is doing this and you're not",
            "owner": "business_insider",
            "hook_transcript": "Your competitor is doing this one thing and you're not (and it's costing you)",
            "patterns": ["fear", "comparison", "curiosity_gap"],
            "emotional_trigger": "fomo",
            "urgency_score": 8,
            "curiosity_score": 9
        }
    ],
    "cooking": [
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/cooking1",
            "views": 890000,
            "likes": 125000,
            "comments": 3200,
            "engagement_rate": 14.38,
            "date": "2024-10-22",
            "caption": "This 5-ingredient dinner changed my weeknights forever",
            "owner": "quick_meals",
            "hook_transcript": "This 5-ingredient dinner changed my weeknights forever",
            "patterns": ["number_based", "transformation", "personal_story"],
            "emotional_trigger": "relief",
            "urgency_score": 3,
            "curiosity_score": 7
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/cook123",
            "views": 1200000,
            "likes": 185000,
            "comments": 4100,
            "engagement_rate": 15.76,
            "date": "2024-10-23",
            "caption": "Stop throwing away your pasta water! Here's why chefs save it",
            "owner": "chef_secrets",
            "hook_transcript": "Stop throwing away your pasta water! Here's why professional chefs always save it",
            "patterns": ["urgency", "curiosity_gap", "authority"],
            "emotional_trigger": "curiosity",
            "urgency_score": 7,
            "curiosity_score": 9
        }
    ],
    "b2b": [
        {
            "platform": "linkedin",
            "url": "https://linkedin.com/post/example1",
            "views": 125000,
            "likes": 8500,
            "comments": 340,
            "engagement_rate": 7.07,
            "date": "2024-10-20",
            "caption": "We lost $50k before we learned this B2B sales secret",
            "owner": "sales_expert",
            "hook_transcript": "We lost $50k before we learned this B2B sales secret",
            "patterns": ["personal_story", "shocking_stat", "curiosity_gap"],
            "emotional_trigger": "fear",
            "urgency_score": 7,
            "curiosity_score": 9
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/watch/b2b123",
            "views": 280000,
            "likes": 22000,
            "comments": 890,
            "engagement_rate": 8.18,
            "date": "2024-10-21",
            "caption": "The B2B video format that converts 3x better",
            "owner": "video_marketing",
            "hook_transcript": "What if I told you this B2B video format converts 3x better than your current one?",
            "patterns": ["question", "shocking_stat", "curiosity_gap"],
            "emotional_trigger": "curiosity",
            "urgency_score": 5,
            "curiosity_score": 9
        }
    ]
};

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    try {
        // Get parameters
        const params = event.queryStringParameters || {};
        const niche = (params.niche || 'fitness').toLowerCase();
        const platform = (params.platform || 'all').toLowerCase();
        const minViews = parseInt(params.minViews) || 0;
        
        // Get user info for analytics
        const userIp = event.headers['x-forwarded-for'] || event.headers['client-ip'];
        const timestamp = new Date().toISOString();
        
        // Log search for analytics (in production, save to database)
        console.log('Search request:', {
            niche,
            platform,
            minViews,
            userIp,
            timestamp,
            userAgent: event.headers['user-agent']
        });

        // Find matching hooks
        let hooks = [];
        
        // Try exact match
        if (SAMPLE_HOOKS_DB[niche]) {
            hooks = SAMPLE_HOOKS_DB[niche];
        } else {
            // Try partial match
            for (const [key, value] of Object.entries(SAMPLE_HOOKS_DB)) {
                if (key.includes(niche) || niche.includes(key)) {
                    hooks = value;
                    break;
                }
            }
        }
        
        // Default to fitness if no match
        if (hooks.length === 0) {
            hooks = SAMPLE_HOOKS_DB['fitness'];
        }

        // Filter by platform
        if (platform !== 'all') {
            hooks = hooks.filter(h => h.platform.toLowerCase() === platform);
        }

        // Filter by views
        hooks = hooks.filter(h => h.views >= minViews);

        // Sort by views (highest first)
        hooks.sort((a, b) => b.views - a.views);

        // Return results
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                niche: niche,
                platform: platform,
                count: hooks.length,
                hooks: hooks,
                timestamp: timestamp
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
