#!/usr/bin/env python3
"""
Combine all hook database JSON files into one master file
for easy upload to your API
"""

import json
import os
from glob import glob
from datetime import datetime

def combine_hooks():
    """Combine all JSON hook files into one master database"""
    
    print("\n" + "="*60)
    print("🔗 COMBINING VIRAL HOOKS")
    print("="*60 + "\n")
    
    # Find all hook JSON files
    json_files = glob('hook_database/*_hooks_*.json')
    
    if not json_files:
        print("❌ No hook files found in hook_database/")
        print("   Run: python3 demo_hook_finder.py [niche] first\n")
        return
    
    print(f"📁 Found {len(json_files)} hook files\n")
    
    # Dictionary to store all hooks by niche
    all_hooks = {}
    total_hooks = 0
    
    # Process each file
    for file_path in json_files:
        try:
            # Extract niche from filename
            # Example: hook_database/fitness_hooks_20231023_120000.json
            filename = os.path.basename(file_path)
            niche = filename.split('_hooks_')[0].lower().replace(' ', '_')
            
            # Read the JSON file
            with open(file_path, 'r') as f:
                hooks = json.load(f)
            
            # Add to combined database
            if niche not in all_hooks:
                all_hooks[niche] = []
            
            all_hooks[niche].extend(hooks)
            
            print(f"   ✅ {niche}: added {len(hooks)} hooks")
            total_hooks += len(hooks)
            
        except Exception as e:
            print(f"   ❌ Error processing {file_path}: {e}")
    
    print(f"\n📊 Combined Statistics:")
    print(f"   Total hooks: {total_hooks}")
    print(f"   Total niches: {len(all_hooks)}")
    print("\n   Breakdown:")
    
    for niche in sorted(all_hooks.keys()):
        print(f"      • {niche}: {len(all_hooks[niche])} hooks")
    
    # Save combined hooks
    output_file = 'combined_hooks.json'
    with open(output_file, 'w') as f:
        json.dump(all_hooks, f, indent=2)
    
    print(f"\n💾 Saved to: {output_file}")
    print(f"   File size: {os.path.getsize(output_file) / 1024:.1f} KB")
    
    # Also create a formatted version for easy reading
    readme_file = 'COMBINED_HOOKS_README.md'
    with open(readme_file, 'w') as f:
        f.write(f"# Combined Viral Hooks Database\n\n")
        f.write(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        f.write(f"## Summary\n\n")
        f.write(f"- **Total Hooks:** {total_hooks}\n")
        f.write(f"- **Total Niches:** {len(all_hooks)}\n\n")
        f.write(f"## Niches\n\n")
        
        for niche in sorted(all_hooks.keys()):
            f.write(f"### {niche.title()} ({len(all_hooks[niche])} hooks)\n\n")
            
            # Show top 3 hooks from each niche
            for i, hook in enumerate(all_hooks[niche][:3], 1):
                f.write(f"{i}. **{hook['views']:,} views** - {hook.get('hook_transcript', hook.get('hook', 'No transcript'))}\n")
            
            if len(all_hooks[niche]) > 3:
                f.write(f"   ...and {len(all_hooks[niche]) - 3} more\n")
            
            f.write("\n")
    
    print(f"📄 Created summary: {readme_file}")
    
    print("\n" + "="*60)
    print("✅ SUCCESS!")
    print("="*60)
    print("\n🎯 Next Steps:\n")
    print("1. Open 'combined_hooks.json'")
    print("2. Copy all the content")
    print("3. Go to GitHub → netlify/functions/search-hooks.js")
    print("4. Replace the SAMPLE_HOOKS_DB section with your data")
    print("5. Commit and wait for Netlify to deploy")
    print("6. Test your site with real hooks!\n")

if __name__ == "__main__":
    try:
        combine_hooks()
    except Exception as e:
        print(f"\n❌ Error: {e}\n")
        import traceback
        traceback.print_exc()
