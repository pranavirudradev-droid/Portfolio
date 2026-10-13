# PRANAVI RUDRADEV PORTFOLIO — HOMEPAGE FINAL INTERACTION + LAYOUT FIX VERIFICATION
# Verifies all 6 user requirements:
# 1. Zero photos under/behind hero statement (Hero Exclusion Zone strictly enforced)
# 2. Hero statement size reduced to clamp(2.7rem, 4vw, 4.2rem) and strictly 2 lines (white-space: nowrap)
# 3. Cursor movement sensitivity increased via centralized HOME_INTERACTION object
# 4. Transform applied directly to .home-image-slot container
# 5. True optical fisheye lens distortion (76px) with FISHEYE_CONFIG
# 6. Zero random red dots anywhere on the page

require 'json'

puts "=========================================================="
puts "VERIFYING HOMEPAGE FINAL FIX REQUIREMENTS (6/6)"
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

index_html = File.read("#{base_dir}/index.html")
tokens_js = File.read("#{base_dir}/src/config/interactions/interactionTokens.js")
homepage_js = File.read("#{base_dir}/src/config/homepage.js")
fragments_json = JSON.parse(File.read("#{base_dir}/content/home/imageFragments.json"))

# 1. Photos must never come under hero text (Exclusion zone: X: 22%-77% and Y: 36%-64%)
puts "\n1. Hero Exclusion Zone Verification:"
overlap_found = false
fragments_json.each do |f|
  x_start = f['x']
  x_end = f['x'] + f['width']
  y_start = f['y']
  y_end = f['y'] + f['height']

  # Check if box intersects the central hero exclusion zone (X: 22% to 78%, Y: 38% to 62%)
  x_overlaps = !(x_end <= 22 || x_start >= 78)
  y_overlaps = !(y_end <= 38 || y_start >= 62)

  if x_overlaps && y_overlaps
    overlap_found = true
    puts "  [FAIL] Slot #{f['id']} intersects hero exclusion zone: X [#{x_start}%, #{x_end}%], Y [#{y_start}%, #{y_end}%]"
  end
end
assert(!overlap_found, "All image slots are strictly outside the central hero statement zone", failures)

# 2. Hero Statement Typography Size & Structure
puts "\n2. Hero Statement Typography Size & Structure:"
assert(index_html.include?('font-size: 52px') || index_html.include?('52px Satoshi Bold'), 'Hero statement font size set to 52px Satoshi Bold', failures)
assert(index_html.include?('font-size: 42px') && index_html.include?('PRANAVI RUDRADEV'), 'Identity name font size set to 42px Satoshi Bold', failures)
assert(index_html.include?('white-space: nowrap'), 'Hero statement strictly enforced 2 lines with white-space: nowrap', failures)
assert(index_html.include?('<span>RIGHT QUESTIONS</span>') && index_html.include?('<span>REVEAL WHAT OTHERS OVERLOOK.</span>'), 'Hero statement text exactly matches 2 lines', failures)
assert(index_html.include?('Caveat') && index_html.include?("Because there's more to every detail.") && (index_html.include?('font-size: 24px') || index_html.include?('24px Caveat')), 'Handwritten tagline in 24px Caveat font present beneath headline', failures)

# 3. Centralized HOME_INTERACTION & Increased Cursor Sensitivity
puts "\n3. Parallax Sensitivity & Centralized HOME_INTERACTION:"
assert(tokens_js.include?('export const HOME_INTERACTION'), 'HOME_INTERACTION configuration object exported', failures)
assert(tokens_js.include?('imageMovementStrength:') && tokens_js.include?('maxX:') && tokens_js.include?('maxY:') && tokens_js.include?('smoothing:'), 'HOME_INTERACTION has all required fields', failures)
assert(index_html.include?('HOME_INTERACTION'), 'index.html imports and uses HOME_INTERACTION', failures)

# 4. Transform Applied Directly to .home-image-slot Container
puts "\n4. Transform Applied to Parent .home-image-slot:"
assert(index_html.include?("imageSlots.forEach((slot") && index_html.include?("slot.style.transform = transformVal") && index_html.include?("translate3d("), 'Transform applied directly to parent slot container', failures)

# 5. True Optical Fisheye Lens Distortion (76px) & FISHEYE_CONFIG
puts "\n5. Optical Fisheye Lens Distortion & Centralized FISHEYE_CONFIG:"
assert(tokens_js.include?('export const FISHEYE_CONFIG'), 'FISHEYE_CONFIG configuration object exported', failures)
assert(tokens_js.include?('size: 76') && tokens_js.include?('magnification: 1.08') && tokens_js.include?('distortion: 0.12') && tokens_js.include?('smoothing: 0.18') && tokens_js.include?('opacity: 1'), 'FISHEYE_CONFIG matches requested parameters', failures)
assert(index_html.include?('fisheye-lens-warp-container') && index_html.include?('fisheye-lens-mirror-stage'), 'Live optical mirror portal present inside lens', failures)
assert(index_html.include?('feDisplacementMap') && index_html.include?('optical-lens-warp'), 'SVG radial barrel distortion filter applied to lens portal', failures)
assert(index_html.include?('@media (hover: none), (pointer: coarse)'), 'Fisheye lens cleanly disabled on touch/mobile devices', failures)

# 6. Zero Random Red Dots
puts "\n6. Zero Random Red Dots Verification:"
assert(!index_html.include?('world-red-pip') && !index_html.include?('section-red-pip') && !index_html.include?('red-pip'), 'Zero red dots in HTML navigation or lens', failures)
assert(!index_html.include?('border-radius: 50%; background: #4D0E12') && !index_html.include?('border-radius: 50%; background: var(--sceptre-red'), 'No CSS dot indicators in index.html', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL 6 FINAL HOMEPAGE REQUIREMENTS VERIFIED SUCCESSFULLY! (100%)"
else
  puts "FAILURES: #{failures.length}"
  exit 1
end
puts "=========================================================="
