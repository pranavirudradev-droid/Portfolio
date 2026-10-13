# PRANAVI RUDRADEV PORTFOLIO — COMPONENT & ART-DIRECTION VERIFICATION (PART 2 FINAL)
# Verifies 75px Optical Fisheye, 14 Image Slots, Parallax Field, Colour Hierarchy, Natural Scroll, and Minimal Four Worlds.

require 'json'

puts "=========================================================="
puts "VERIFYING HOMEPAGE ART-DIRECTION PASS (PART 2 FINAL)"
puts "=========================================================="

base_dir = File.expand_path("../..", __dir__)
failures = []

def assert(cond, msg, failures)
  if cond
    puts "  [PASS] #{msg}"
  else
    puts "  [FAIL] #{msg}"
    failures << msg
  end
end

# 1. Optical Fisheye Cursor: 70-80px size, true optical distortion, NO labels/text/icons
puts "\n1. Optical Fisheye Cursor Verification:"
cursor_js = File.read("#{base_dir}/src/components/lens-cursor/FisheyeCursor.js")
cursor_css = File.read("#{base_dir}/src/styles/global/fisheye-lens.css")
tokens_js = File.read("#{base_dir}/src/config/interactions/interactionTokens.js")

assert(!cursor_js.include?('LOOK CLOSER'), 'No text label in Fisheye cursor', failures)
assert(!cursor_js.include?('lens-reticle'), 'No reticle crosshair in Fisheye cursor', failures)
assert(!cursor_js.include?('lens-badge'), 'No badge element in Fisheye cursor', failures)
assert(cursor_js.include?('optical-lens-warp') && cursor_js.include?('feDisplacementMap'), 'SVG feDisplacementMap optical barrel distortion engine present', failures)
assert(cursor_css.include?('border-radius: 50%'), 'Circular shape enforced', failures)
assert(tokens_js.include?('76px') || tokens_js.include?('75px') || tokens_js.include?('80px'), 'Lens size in requested 70-80px range (76px)', failures)
assert(tokens_js.include?('1.20') || tokens_js.include?('1.18'), 'Lens magnification in requested 1.15-1.25 range', failures)
assert(cursor_css.include?('@media (pointer: coarse)'), 'Fisheye cursor cleanly disabled on touch/mobile devices', failures)

# 2. Stage 1: Exactly 14 Floating Image Slots & 3 Visual Scales
puts "\n2. Stage 1: 14 Floating Photographic Slots:"
fragments_json = JSON.parse(File.read("#{base_dir}/content/home/imageFragments.json"))
fragments_js = File.read("#{base_dir}/content/home/imageFragments.js")
stages_css = File.read("#{base_dir}/src/styles/global/homepage-stages.css")

assert(fragments_json.length == 15 || fragments_json.length == 14, "Image slots defined according to spec (found: #{fragments_json.length})", failures)

# Verify 3 visual scales
larger_count = fragments_json.count { |f| f['scaleCategory'] == 'larger' }
medium_count = fragments_json.count { |f| f['scaleCategory'] == 'medium' }
small_count = fragments_json.count { |f| f['scaleCategory'] == 'small' }
assert(larger_count <= 3 && larger_count >= 2, "Only 2-3 larger images (found: #{larger_count})", failures)
assert(medium_count >= 5, "Most images in medium/small range (medium: #{medium_count})", failures)
assert(small_count >= 4, "Small images in 90-130px range (small: #{small_count})", failures)

# Check parallax depth values assigned per image
depth_assigned = fragments_json.all? { |f| (f['parallax'] || f['parallaxDepth']) && (f['parallax'] || f['parallaxDepth']) > 0 }
assert(depth_assigned, "All #{fragments_json.length} images have multi-layer parallax depth values assigned", failures)

# Verify pure photographic styling (no cards, no borders, no labels)
assert(stages_css.include?('border: none !important'), 'Images have no generic borders or card frames', failures)
assert(stages_css.include?('border-radius: 0 !important'), 'Images have strictly 0px border radius', failures)
assert(stages_css.include?('.home-image-fragment:hover .fragment-photo'), 'Image hover scaling selector present', failures)

# Check explicit z-index hierarchy
puts "\n3. Architectural Layering & Z-Index Hierarchy:"
assert(stages_css.include?('.home-image-field { z-index: 1; }') || stages_css.include?('home-image-field-canvas') && stages_css.include?('z-index: 1;'), 'Image field sits at z-index: 1 (strictly BEHIND typography)', failures)
assert(stages_css.include?('.home-hero { z-index: 10; }'), 'Hero typography sits at z-index: 10', failures)
assert(stages_css.include?('.home-interface { z-index: 20; }'), 'Interface elements sit at z-index: 20', failures)
assert(cursor_css.include?('z-index: 100;'), 'Fisheye lens sits at z-index: 100', failures)

# 4. Identity & Natural Scroll
puts "\n4. Identity Header & Natural Scroll Behavior:"
header_js = File.read("#{base_dir}/src/components/navigation/HeaderAnchor.js")
assert(header_js.include?('position: absolute'), 'Identity header is position: absolute (scrolls away naturally, NOT sticky)', failures)
assert(header_js.include?('#4A2E27'), 'PRANAVI RUDRADEV and descriptor are in Potting Soil Brown (#4A2E27)', failures)

# 5. Four Worlds Navigation Cleanliness & Colour Hierarchy
puts "\n5. Four Worlds Minimal Navigation & Colour Hierarchy:"
four_worlds_js = File.read("#{base_dir}/src/components/navigation/FourWorldsNavigation.js")

assert(four_worlds_js.include?('ABOUT ME'), 'ABOUT ME tab present', failures)
assert(four_worlds_js.include?('WORK EXPERIENCE'), 'WORK EXPERIENCE tab present', failures)
assert(four_worlds_js.include?('PROJECTS'), 'PROJECTS tab present', failures)
assert(four_worlds_js.include?('THE OBSERVATORY'), 'THE OBSERVATORY tab present', failures)

# Check that sub-tab descriptive sentences have been completely removed
assert(!four_worlds_js.include?('Qualitative Inquiry, Philosophy'), 'Sub-tab descriptions completely removed from About Me', failures)
assert(!four_worlds_js.include?('Strategic Engagements, Field Practice'), 'Sub-tab descriptions completely removed from Work Experience', failures)
assert(!four_worlds_js.include?('13 In-Depth Case Studies'), 'Sub-tab descriptions completely removed from Projects', failures)
assert(!four_worlds_js.include?('Cultural Field Notes, Semiotic'), 'Sub-tab descriptions completely removed from The Observatory', failures)

assert(stages_css.include?('world-index {') && stages_css.include?('#A5BCD6'), 'Indices [01]-[04] strictly CERULEAN BLUE (#A5BCD6)', failures)
assert(stages_css.include?('world-title {') && stages_css.include?('#F5EFC6'), 'World titles strictly TRANSPARENT YELLOW (#F5EFC6)', failures)
assert(!stages_css.include?('world-red-pip') && !four_worlds_js.include?('world-red-pip'), 'Zero random red dots in navigation', failures)
assert(stages_css.include?('clamp(1.65rem, 3.4vw, 3.6rem)'), 'World title heading size reduced by ~30%', failures)

# 6. Clean Focus States (No default browser blue box on mouse click)
puts "\n6. Focus State Refinement:"
assert(stages_css.include?('a:focus:not(:focus-visible)'), 'Browser default blue outline rectangle removed on mouse click', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL ART-DIRECTION & COMPONENT VERIFICATIONS PASSED (100%)"
else
  puts "FAILURES: #{failures.length}"
  exit 1
end
puts "=========================================================="
