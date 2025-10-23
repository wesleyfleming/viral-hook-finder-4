// Sample viral hooks data for demo
const sampleHooks = [
    {
        platform: "instagram",
        hook: "What if I told you this one exercise burns more fat than running?",
        views: 450000,
        engagement: 12.5,
        patterns: ["question", "curiosity_gap", "shocking_stat"]
    },
    {
        platform: "tiktok",
        hook: "Stop wasting money on supplements. Here's what actually works...",
        views: 780000,
        engagement: 15.2,
        patterns: ["urgency", "problem_agitation", "curiosity_gap"]
    },
    {
        platform: "instagram",
        hook: "I used to struggle with meal prep until I discovered this hack",
        views: 320000,
        engagement: 9.8,
        patterns: ["personal_story", "transformation", "curiosity_gap"]
    },
    {
        platform: "youtube",
        hook: "3 mistakes killing your progress in the gym (you're probably doing #2)",
        views: 920000,
        engagement: 18.4,
        patterns: ["number_based", "negative", "curiosity_gap"]
    },
    {
        platform: "tiktok",
        hook: "Nobody tells you this about building muscle after 40",
        views: 560000,
        engagement: 13.7,
        patterns: ["controversy", "curiosity_gap", "personal_story"]
    },
    {
        platform: "instagram",
        hook: "POV: You finally understand why you're not seeing results",
        views: 410000,
        engagement: 11.3,
        patterns: ["problem_agitation", "transformation"]
    }
];

// Load JSON file uploaded by user
function loadJSONFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const hooks = JSON.parse(e.target.result);
            displayResults(hooks);
            showNotification('✅ Loaded ' + hooks.length + ' hooks from file!');
        } catch (error) {
            showNotification('❌ Error reading file. Please upload a valid JSON file.');
            console.error(error);
        }
    };
    reader.readAsText(file);
}

// Search for viral hooks using the API
async function searchHooks() {
    const niche = document.getElementById('niche').value;
    const platform = document.getElementById('platform').value;
    const minViews = document.getElementById('minViews').value;
    const resultsLimit = document.getElementById('resultsLimit').value;

    // Show loading state
    const button = event.target;
    const originalText = button.innerHTML;
    button.innerHTML = '<span class="loading"></span> Searching API...';
    button.disabled = true;

    try {
        // Call the serverless function
        const response = await fetch(`/.netlify/functions/search-hooks?niche=${encodeURIComponent(niche)}&platform=${platform}&minViews=${minViews}`);
        
        if (!response.ok) {
            throw new Error('Search failed');
        }

        const data = await response.json();
        
        if (data.success) {
            // Log analytics
            logSearch(niche, platform, minViews, data.count);
            
            // Display results
            displayResults(data.hooks);
            
            showNotification(`✅ Found ${data.count} viral hooks!`);
        } else {
            throw new Error(data.error || 'Search failed');
        }

    } catch (error) {
        console.error('Search error:', error);
        showNotification('❌ Search failed. Please try again.');
    } finally {
        button.innerHTML = originalText;
        button.disabled = false;
        
        // Scroll to results
        const resultsSection = document.getElementById('resultsSection');
        if (resultsSection.style.display === 'block') {
            resultsSection.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
}

// Log search for analytics
async function logSearch(niche, platform, minViews, resultsCount) {
    try {
        // Generate or get session ID
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
            sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('sessionId', sessionId);
        }

        await fetch('/.netlify/functions/log-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                niche,
                platform,
                minViews,
                resultsCount,
                sessionId
            })
        });
    } catch (error) {
        console.error('Analytics logging failed:', error);
    }
}

// Display results
function displayResults(hooks) {
    const resultsSection = document.getElementById('resultsSection');
    const resultsGrid = document.getElementById('resultsGrid');
    
    resultsSection.style.display = 'block';
    resultsGrid.innerHTML = '';

    hooks.forEach(hook => {
        const card = createResultCard(hook);
        resultsGrid.appendChild(card);
    });
}

// Create result card
function createResultCard(hook) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    const platformIcon = {
        instagram: '📸',
        tiktok: '🎵',
        youtube: '▶️'
    };

    // Handle both demo format and real format
    const transcript = hook.hook_transcript || hook.hook || hook.caption || 'No transcript available';
    const views = hook.views || 0;
    const engagement = hook.engagement_rate || hook.engagement || 0;
    const platform = (hook.platform || 'unknown').toLowerCase();
    const patterns = hook.patterns || [];

    card.innerHTML = `
        <div class="result-platform">${platformIcon[platform] || '📱'} ${platform}</div>
        <div class="result-hook">"${transcript}"</div>
        <div class="result-stats">
            <span>👁️ ${formatNumber(views)} views</span>
            <span>📊 ${engagement.toFixed(1)}% eng.</span>
        </div>
        ${patterns.map(p => `<span class="result-pattern">${formatPattern(p)}</span>`).join(' ')}
    `;
    
    return card;
}

// Format numbers
function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

// Format pattern names
function formatPattern(pattern) {
    return pattern.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}

// Download files function
function downloadFiles() {
    // Create a link to GitHub or direct download
    const message = `
🎉 To download the full automation scripts:

1. Visit the GitHub repository (coming soon)
2. Or contact for the complete package

The scripts include:
✓ Python automation code
✓ API integration setup
✓ Configuration files
✓ Deployment guides

Would you like to proceed with the manual setup using the documentation?
    `;
    
    alert(message.trim());
    
    // Alternative: trigger download of a zip file
    // You would need to have the files hosted somewhere
    // window.location.href = 'path/to/automation-scripts.zip';
}

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.card, .feature-card, .step');
    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Handle form submission on Enter key
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchHooks();
        }
    });
});

// Auto-save form values to localStorage
function saveFormValues() {
    const values = {
        niche: document.getElementById('niche').value,
        platform: document.getElementById('platform').value,
        minViews: document.getElementById('minViews').value,
        resultsLimit: document.getElementById('resultsLimit').value
    };
    localStorage.setItem('hookFinderSettings', JSON.stringify(values));
}

// Load saved form values
function loadFormValues() {
    const saved = localStorage.getItem('hookFinderSettings');
    if (saved) {
        const values = JSON.parse(saved);
        document.getElementById('niche').value = values.niche || 'fitness';
        document.getElementById('platform').value = values.platform || 'instagram';
        document.getElementById('minViews').value = values.minViews || '100000';
        document.getElementById('resultsLimit').value = values.resultsLimit || '20';
    }
}

// Add event listeners for auto-save
document.addEventListener('DOMContentLoaded', () => {
    loadFormValues();
    
    document.querySelectorAll('input, select').forEach(element => {
        element.addEventListener('change', saveFormValues);
    });
});

// Add copy functionality for hooks
function copyHook(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Hook copied to clipboard!');
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: rgba(255, 255, 255, 0.95);
        color: #4A5A7A;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add CSS for notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
