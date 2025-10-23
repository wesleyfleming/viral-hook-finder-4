// Netlify function to log user searches for analytics
// Path: netlify/functions/log-search.js

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Content-Type': 'application/json'
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const data = JSON.parse(event.body);
        
        // Collect analytics data
        const analytics = {
            timestamp: new Date().toISOString(),
            niche: data.niche,
            platform: data.platform,
            minViews: data.minViews,
            resultsCount: data.resultsCount,
            userIp: event.headers['x-forwarded-for'],
            userAgent: event.headers['user-agent'],
            sessionId: data.sessionId
        };

        // Log to console (in production, save to database like Supabase, Firebase, or Airtable)
        console.log('User Search:', JSON.stringify(analytics));

        // TODO: Save to your database
        // await saveToDatabase(analytics);

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ 
                success: true,
                message: 'Analytics logged'
            })
        };

    } catch (error) {
        console.error('Logging error:', error);
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
