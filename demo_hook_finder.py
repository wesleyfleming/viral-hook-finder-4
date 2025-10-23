"""
Demo Version - Viral Hook Finder
Works immediately with sample data - no API keys needed!
"""

import json
import os
from datetime import datetime

# Sample viral hooks data
SAMPLE_HOOKS = {
    "fitness": [
        {
            "platform": "instagram",
            "url": "https://instagram.com/reel/example1",
            "video_url": None,
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
    ]
}

def get_sample_hooks(niche):
    """Get sample hooks for a niche"""
    # Default to fitness if niche not in samples
    niche_lower = niche.lower()
    
    # Try exact match
    if niche_lower in SAMPLE_HOOKS:
        return SAMPLE_HOOKS[niche_lower]
    
    # Try partial match
    for key in SAMPLE_HOOKS.keys():
        if key in niche_lower or niche_lower in key:
            return SAMPLE_HOOKS[key]
    
    # Default to fitness
    print(f"   ℹ️  No sample data for '{niche}', using fitness examples")
    return SAMPLE_HOOKS["fitness"]

def save_results(hooks, niche, output_dir="hook_database"):
    """Save hooks to files"""
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Save JSON
    json_file = f"{output_dir}/{niche}_hooks_{timestamp}.json"
    with open(json_file, 'w') as f:
        json.dump(hooks, f, indent=2)
    print(f"   💾 Saved to: {json_file}")
    
    # Save readable summary
    md_file = f"{output_dir}/{niche}_content_ideas_{timestamp}.md"
    with open(md_file, 'w') as f:
        f.write(f"# 🔥 Viral Hooks for {niche.title()}\n\n")
        f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}\n\n")
        f.write(f"Found **{len(hooks)} viral hooks** with proven patterns!\n\n")
        f.write("---\n\n")
        
        for i, hook in enumerate(hooks, 1):
            f.write(f"## Hook #{i} - {hook['views']:,} views\n\n")
            f.write(f"**Platform:** {hook['platform'].upper()}  \n")
            f.write(f"**Engagement Rate:** {hook['engagement_rate']:.2f}%  \n")
            f.write(f"**Date:** {hook['date']}  \n\n")
            
            f.write(f"### 🎯 The Hook\n")
            f.write(f"> {hook['hook_transcript']}\n\n")
            
            f.write(f"### 📊 Pattern Analysis\n")
            f.write(f"- **Patterns Used:** {', '.join(hook['patterns'])}\n")
            f.write(f"- **Emotional Trigger:** {hook['emotional_trigger']}\n")
            f.write(f"- **Urgency Score:** {hook['urgency_score']}/10\n")
            f.write(f"- **Curiosity Score:** {hook['curiosity_score']}/10\n\n")
            
            f.write(f"### 💡 How to Adapt This\n")
            f.write(f"Use the same pattern structure but make it YOUR angle:\n")
            f.write(f"- Keep the {', '.join(hook['patterns'][:2])} approach\n")
            f.write(f"- Target the {hook['emotional_trigger']} emotion\n")
            f.write(f"- Adapt the topic to your unique perspective\n\n")
            
            f.write(f"**Original URL:** {hook['url']}\n\n")
            f.write("---\n\n")
        
        # Add pattern summary
        f.write("## 📈 Pattern Summary\n\n")
        all_patterns = {}
        for hook in hooks:
            for pattern in hook['patterns']:
                all_patterns[pattern] = all_patterns.get(pattern, 0) + 1
        
        f.write("Most common patterns in these viral hooks:\n\n")
        for pattern, count in sorted(all_patterns.items(), key=lambda x: x[1], reverse=True):
            f.write(f"- **{pattern.replace('_', ' ').title()}**: Used {count} times\n")
        
        f.write("\n---\n\n")
        f.write("## 🎯 Action Steps\n\n")
        f.write("1. Review each hook and note which patterns resonate\n")
        f.write("2. Choose 3 hooks to adapt to your content\n")
        f.write("3. Create your own version using the same structure\n")
        f.write("4. Test and track which patterns work for YOUR audience\n")
        f.write("5. Come back tomorrow for fresh hooks!\n\n")
    
    print(f"   📄 Content ideas: {md_file}")
    
    return json_file, md_file

def main():
    """Main demo runner"""
    import sys
    
    print("\n" + "="*60)
    print("🎬 DEMO MODE - Viral Hook Finder")
    print("="*60)
    print("\n✨ This demo version works immediately with sample data!")
    print("   Perfect for testing before setting up real API access.\n")
    
    # Get niche
    niche_arg = sys.argv[1] if len(sys.argv) > 1 else None
    
    if niche_arg:
        niche = niche_arg
        print(f"📌 Using niche from command line: {niche}\n")
    else:
        niche = input("🎯 Enter your niche (fitness, marketing, cooking, or custom): ").strip()
        if not niche:
            niche = "fitness"
    
    print(f"\n🚀 Finding viral hooks for '{niche}'...\n")
    
    # Get sample data
    hooks = get_sample_hooks(niche)
    
    print(f"   ✅ Found {len(hooks)} viral hooks!")
    print(f"   📊 Analyzing patterns...")
    print(f"   💡 Generating content ideas...\n")
    
    # Save results
    json_file, md_file = save_results(hooks, niche)
    
    print(f"\n{'='*60}")
    print(f"✅ SUCCESS! Found {len(hooks)} viral hooks")
    print(f"{'='*60}\n")
    
    print("📂 Your results are ready:\n")
    print(f"   • Raw data: {json_file}")
    print(f"   • Content ideas: {md_file}\n")
    
    print("💡 Next steps:")
    print("   1. Open the content_ideas file to see detailed analysis")
    print("   2. Choose 3 hooks to adapt to your style")
    print("   3. Create your first piece of content")
    print("   4. Run again with different niches to explore patterns\n")
    
    print("🔄 To run again: python3 demo_hook_finder.py [niche]\n")
    print("📚 Sample niches: fitness, marketing, cooking")
    print("   (or use any niche - we'll adapt the patterns!)\n")

if __name__ == "__main__":
    main()
