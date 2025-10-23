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
            "caption": "Stop wasting money on supplements",
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
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/fit6",
            "views": 625000,
            "likes": 58000,
            "comments": 1450,
            "engagement_rate": 9.52,
            "date": "2024-10-16",
            "caption": "I lost 40 pounds by breaking this one weight loss myth",
            "owner": "transformation_coach",
            "hook_transcript": "I lost 40 pounds by breaking this one weight loss myth everyone believes",
            "patterns": ["personal_story", "transformation", "controversy"],
            "emotional_trigger": "inspiration",
            "urgency_score": 5,
            "curiosity_score": 10
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/fit7",
            "views": 890000,
            "likes": 112000,
            "comments": 2800,
            "engagement_rate": 12.92,
            "date": "2024-10-14",
            "caption": "Your workout routine is backwards and here's why",
            "owner": "science_fitness",
            "hook_transcript": "Your workout routine is backwards and here's why it's not working",
            "patterns": ["problem_agitation", "curiosity_gap"],
            "emotional_trigger": "frustration",
            "urgency_score": 7,
            "curiosity_score": 8
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/fit8",
            "views": 1200000,
            "likes": 145000,
            "comments": 4200,
            "engagement_rate": 12.43,
            "date": "2024-10-13",
            "caption": "This 5-minute morning routine changed everything",
            "owner": "morning_rituals",
            "hook_transcript": "This 5-minute morning routine changed my body in 30 days",
            "patterns": ["number_based", "transformation", "time_bound"],
            "emotional_trigger": "hope",
            "urgency_score": 6,
            "curiosity_score": 8
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
            "caption": "I went from 0 to 100k followers in 3 months",
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
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/mark4",
            "views": 725000,
            "likes": 82000,
            "comments": 1900,
            "engagement_rate": 11.59,
            "date": "2024-10-20",
            "caption": "I tested 47 marketing strategies. Only 3 worked",
            "owner": "data_marketer",
            "hook_transcript": "I tested 47 marketing strategies. Only 3 actually worked. Here they are",
            "patterns": ["number_based", "authority", "curiosity_gap"],
            "emotional_trigger": "curiosity",
            "urgency_score": 4,
            "curiosity_score": 10
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/mark5",
            "views": 910000,
            "likes": 125000,
            "comments": 3100,
            "engagement_rate": 14.07,
            "date": "2024-10-19",
            "caption": "Stop posting on social media. Do this instead",
            "owner": "content_queen",
            "hook_transcript": "Stop posting on social media. Do this instead and watch your engagement explode",
            "patterns": ["urgency", "controversy", "curiosity_gap"],
            "emotional_trigger": "frustration",
            "urgency_score": 9,
            "curiosity_score": 8
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/mark6",
            "views": 540000,
            "likes": 61000,
            "comments": 1650,
            "engagement_rate": 11.39,
            "date": "2024-10-18",
            "caption": "The content formula that got me 10M views",
            "owner": "viral_secrets",
            "hook_transcript": "The exact content formula that got me 10 million views in 90 days",
            "patterns": ["authority", "number_based", "curiosity_gap"],
            "emotional_trigger": "inspiration",
            "urgency_score": 3,
            "curiosity_score": 9
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/mark7",
            "views": 1100000,
            "likes": 142000,
            "comments": 4800,
            "engagement_rate": 13.35,
            "date": "2024-10-17",
            "caption": "Why your Instagram strategy is outdated",
            "owner": "algorithm_expert",
            "hook_transcript": "Why your Instagram strategy is completely outdated (and what to do instead)",
            "patterns": ["problem_agitation", "urgency", "curiosity_gap"],
            "emotional_trigger": "fear",
            "urgency_score": 7,
            "curiosity_score": 8
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
            "caption": "Stop throwing away your pasta water",
            "owner": "chef_secrets",
            "hook_transcript": "Stop throwing away your pasta water! Here's why professional chefs always save it",
            "patterns": ["urgency", "curiosity_gap", "authority"],
            "emotional_trigger": "curiosity",
            "urgency_score": 7,
            "curiosity_score": 9
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/cook3",
            "views": 2100000,
            "likes": 245000,
            "comments": 5600,
            "engagement_rate": 11.93,
            "date": "2024-10-21",
            "caption": "I've been cooking chicken wrong my entire life",
            "owner": "cooking_basics",
            "hook_transcript": "I've been cooking chicken wrong my entire life. This changes everything",
            "patterns": ["personal_story", "transformation", "shocking_revelation"],
            "emotional_trigger": "surprise",
            "urgency_score": 4,
            "curiosity_score": 10
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/cook4",
            "views": 750000,
            "likes": 92000,
            "comments": 2400,
            "engagement_rate": 12.59,
            "date": "2024-10-20",
            "caption": "The restaurant secret that makes food taste better",
            "owner": "restaurant_insider",
            "hook_transcript": "The one restaurant secret that makes everything taste 10x better at home",
            "patterns": ["authority", "curiosity_gap", "number_based"],
            "emotional_trigger": "curiosity",
            "urgency_score": 2,
            "curiosity_score": 9
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/cook5",
            "views": 1450000,
            "likes": 198000,
            "comments": 5200,
            "engagement_rate": 14.00,
            "date": "2024-10-19",
            "caption": "3 ingredients that will transform your cooking",
            "owner": "flavor_queen",
            "hook_transcript": "These 3 ingredients will completely transform your cooking (you already have them)",
            "patterns": ["number_based", "transformation", "curiosity_gap"],
            "emotional_trigger": "excitement",
            "urgency_score": 3,
            "curiosity_score": 8
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
        },
        {
            "platform": "linkedin",
            "url": "https://linkedin.com/post/b2b3",
            "views": 195000,
            "likes": 14500,
            "comments": 520,
            "engagement_rate": 7.72,
            "date": "2024-10-22",
            "caption": "Your B2B pitch is backwards. Here's why",
            "owner": "pitch_perfect",
            "hook_transcript": "Your B2B sales pitch is completely backwards. Here's why prospects aren't buying",
            "patterns": ["problem_agitation", "curiosity_gap"],
            "emotional_trigger": "frustration",
            "urgency_score": 8,
            "curiosity_score": 8
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/watch/b2b4",
            "views": 420000,
            "likes": 38000,
            "comments": 1200,
            "engagement_rate": 9.33,
            "date": "2024-10-18",
            "caption": "I closed $2M in deals using this one email template",
            "owner": "b2b_closer",
            "hook_transcript": "I closed $2M in B2B deals using this one email template. Here it is",
            "patterns": ["authority", "shocking_stat", "curiosity_gap"],
            "emotional_trigger": "inspiration",
            "urgency_score": 4,
            "curiosity_score": 10
        },
        {
            "platform": "linkedin",
            "url": "https://linkedin.com/post/b2b5",
            "views": 310000,
            "likes": 25000,
            "comments": 780,
            "engagement_rate": 8.32,
            "date": "2024-10-17",
            "caption": "Stop cold calling. Do this instead",
            "owner": "modern_sales",
            "hook_transcript": "Stop cold calling. This strategy gets 10x more meetings with zero rejection",
            "patterns": ["urgency", "number_based", "curiosity_gap"],
            "emotional_trigger": "relief",
            "urgency_score": 9,
            "curiosity_score": 9
        }
    ],
    "tech": [
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/tech1",
            "views": 1800000,
            "likes": 215000,
            "comments": 5800,
            "engagement_rate": 12.27,
            "date": "2024-10-23",
            "caption": "This AI tool replaced my entire workflow",
            "owner": "productivity_tech",
            "hook_transcript": "This AI tool completely replaced my entire workflow (and saved me 20 hours a week)",
            "patterns": ["transformation", "number_based", "curiosity_gap"],
            "emotional_trigger": "excitement",
            "urgency_score": 5,
            "curiosity_score": 10
        },
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/tech2",
            "views": 950000,
            "likes": 128000,
            "comments": 3400,
            "engagement_rate": 13.83,
            "date": "2024-10-22",
            "caption": "Your iPhone has a hidden feature nobody uses",
            "owner": "tech_tips",
            "hook_transcript": "Your iPhone has a hidden feature that 99% of people don't know about",
            "patterns": ["curiosity_gap", "controversy", "number_based"],
            "emotional_trigger": "curiosity",
            "urgency_score": 3,
            "curiosity_score": 10
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/tech3",
            "views": 680000,
            "likes": 72000,
            "comments": 1900,
            "engagement_rate": 10.87,
            "date": "2024-10-21",
            "caption": "I automated my entire business with these 3 tools",
            "owner": "automation_expert",
            "hook_transcript": "I automated my entire business with these 3 tools (and you can too)",
            "patterns": ["personal_story", "number_based", "transformation"],
            "emotional_trigger": "inspiration",
            "urgency_score": 4,
            "curiosity_score": 8
        }
    ],
    "finance": [
        {
            "platform": "tiktok",
            "url": "https://tiktok.com/@user/video/fin1",
            "views": 1200000,
            "likes": 165000,
            "comments": 4500,
            "engagement_rate": 14.13,
            "date": "2024-10-23",
            "caption": "I saved $40k using this budgeting method",
            "owner": "money_saver",
            "hook_transcript": "I saved $40k in one year using this simple budgeting method nobody talks about",
            "patterns": ["personal_story", "shocking_stat", "curiosity_gap"],
            "emotional_trigger": "inspiration",
            "urgency_score": 5,
            "curiosity_score": 9
        },
        {
            "platform": "youtube",
            "url": "https://youtube.com/shorts/fin2",
            "views": 890000,
            "likes": 98000,
            "comments": 2800,
            "engagement_rate": 11.26,
            "date": "2024-10-22",
            "caption": "The investment mistake that cost me $100k",
            "owner": "investment_lessons",
            "hook_transcript": "The one investment mistake that cost me $100k (don't make the same error)",
            "patterns": ["personal_story", "shocking_stat", "fear"],
            "emotional_trigger": "fear",
            "urgency_score": 8,
            "curiosity_score": 8
        },
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/fin3",
            "views": 725000,
            "likes": 82000,
            "comments": 2100,
            "engagement_rate": 11.59,
            "date": "2024-10-21",
            "caption": "This passive income stream makes me $5k monthly",
            "owner": "passive_income",
            "hook_transcript": "This passive income stream makes me $5k every month on autopilot",
            "patterns": ["authority", "shocking_stat", "curiosity_gap"],
            "emotional_trigger": "desire",
            "urgency_score": 6,
            "curiosity_score": 10
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
        
        const userIp = event.headers['x-forwarded-for'] || event.headers['client-ip'];
        const timestamp = new Date().toISOString();
        
        console.log('Search request:', {
            niche,
            platform,
            minViews,
            userIp,
            timestamp,
            userAgent: event.headers['user-agent']
        });

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
