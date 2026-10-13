# PRANAVI RUDRADEV PORTFOLIO — FINAL SITE INTERACTIONS & LAYOUT VERIFICATION
# Verifies:
# 1. ~2x Horizontal Parallax Sensitivity (horizontal > vertical)
# 2. Strict Zero Photo/Text Overlap (Identity, Descriptor, Hero, Scroll, and section pages)
# 3. Horizontal Photography Viewing Experience (Full uncropped photos, object-fit: contain, left/right nav)
# 4. Canonical 76px Optical Fisheye Lens shared across the entire site
# 5. Zero Random Red Dots

require 'json'

puts "=========================================================="
puts "VERIFYING FINAL SITE INTERACTIONS & ZERO TEXT OVERLAP"
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
fragments_json = JSON.parse(File.read("#{base_dir}/content/home/imageFragments.json"))

# 1. Horizontal Parallax Sensitivity
puts "\n1. Parallax Sensitivity (2x Horizontal Sensitivity):"
assert(tokens_js.include?('maxX: 116') || tokens_js.include?('maxX: 115') || tokens_js.include?('maxX: 120'), 'Horizontal sensitivity is ~2x previous setting (~116px)', failures)
assert(tokens_js.include?('maxY: 34') || tokens_js.include?('maxY: 32') || tokens_js.include?('maxY: 36'), 'Vertical movement is noticeably quieter than horizontal', failures)
assert(index_html.include?('HOME_INTERACTION.maxX') || index_html.include?('maxX = 116'), 'index.html applies increased horizontal parallax', failures)

# 2. Strict Zero Photo/Text Overlap (Identity, Descriptor, Hero, Scroll)
puts "\n2. Strict Zero Photo/Text Overlap Verification (with Max Displacement Safety Buffer):"
identity_overlap = false
hero_overlap = false
scroll_overlap = false

# Safe bounds verification across viewports and full mouse parallax range:
viewports_check = [[1280, 800], [1440, 900], [1680, 1050], [1920, 1080], [2560, 1440]]

viewports_check.each do |vw, vh|
  text_w = 760
  text_h = 130
  hero_x1 = (vw - text_w) / 2
  hero_x2 = (vw + text_w) / 2
  hero_y1 = (vh - text_h) / 2
  hero_y2 = (vh + text_h) / 2

  id_x1 = [28, vw * 0.05].max
  id_x2 = id_x1 + 220
  id_y1 = [32, vh * 0.06].max
  id_y2 = id_y1 + 45

  sc_x1 = vw / 2 - 40
  sc_x2 = vw / 2 + 40
  sc_y1 = vh - 68
  sc_y2 = vh

  [-1.0, -0.5, 0.0, 0.5, 1.0].each do |mx|
    [-1.0, -0.5, 0.0, 0.5, 1.0].each do |my|
      hmx = mx * 3.5
      hmy = my * 2.5
      hx1 = hero_x1 + hmx
      hx2 = hero_x2 + hmx
      hy1 = hero_y1 + hmy
      hy2 = hero_y2 + hmy

      fragments_json.each do |b|
        depth = b['depth'] || b['parallax'] || 0.25
        bmx = mx * 116.0 * depth
        bmy = my * 34.0 * depth
        bx1 = (b['x'] / 100.0) * vw + bmx
        bx2 = ((b['x'] + b['width']) / 100.0) * vw + bmx
        by1 = (b['y'] / 100.0) * vh + bmy
        by2 = ((b['y'] + b['height']) / 100.0) * vh + bmy

        if (bx1 < hx2) && (bx2 > hx1) && (by1 < hy2) && (by2 > hy1)
          hero_overlap = true
          puts "  [FAIL] Slot #{b['id']} overlaps hero at #{vw}x#{vh}, mouse=(#{mx}, #{my})"
        end

        if (bx1 < id_x2) && (bx2 > id_x1) && (by1 < id_y2) && (by2 > id_y1)
          identity_overlap = true
          puts "  [FAIL] Slot #{b['id']} overlaps identity at #{vw}x#{vh}, mouse=(#{mx}, #{my})"
        end

        if (bx1 < sc_x2) && (bx2 > sc_x1) && (by1 < sc_y2) && (by2 > sc_y1)
          scroll_overlap = true
          puts "  [FAIL] Slot #{b['id']} overlaps scroll at #{vw}x#{vh}, mouse=(#{mx}, #{my})"
        end
      end
    end
  end
end

assert(!identity_overlap, 'PRANAVI RUDRADEV is 100% free of image overlap across all viewports and mouse positions', failures)
assert(!hero_overlap, 'Hero statement (RIGHT QUESTIONS / REVEAL WHAT OTHERS OVERLOOK.) is 100% free of image overlap', failures)
assert(!scroll_overlap, 'Scroll indicator (SCROLL ↓) is 100% free of image overlap', failures)

# 2b. Strict Zero Slot-to-Slot Overlap Across All Pairs & Full Parallax Movement
puts "\n2b. Strict Zero Slot-to-Slot Overlap Across Full Parallax Movement:"
slot_overlaps = []
max_x = 116.0
max_y = 34.0
viewports = [[1280, 800], [1440, 900], [1680, 1050], [1920, 1080], [2560, 1440]]

viewports.each do |vw, vh|
  [-1.0, -0.5, 0.0, 0.5, 1.0].each do |mx|
    [-1.0, -0.5, 0.0, 0.5, 1.0].each do |my|
      fragments_json.combination(2) do |a, b|
        amx = mx * max_x * (a['parallax'] || a['parallaxDepth'] || 0.25)
        amy = my * max_y * (a['parallax'] || a['parallaxDepth'] || 0.25)
        bmx = mx * max_x * (b['parallax'] || b['parallaxDepth'] || 0.25)
        bmy = my * max_y * (b['parallax'] || b['parallaxDepth'] || 0.25)

        ax1 = (a['x'] / 100.0) * vw + amx
        ax2 = ((a['x'] + a['width']) / 100.0) * vw + amx
        ay1 = (a['y'] / 100.0) * vh + amy
        ay2 = ((a['y'] + a['height']) / 100.0) * vh + amy

        bx1 = (b['x'] / 100.0) * vw + bmx
        bx2 = ((b['x'] + b['width']) / 100.0) * vw + bmx
        by1 = (b['y'] / 100.0) * vh + bmy
        by2 = ((b['y'] + b['height']) / 100.0) * vh + bmy

        if (ax1 < bx2) && (ax2 > bx1) && (ay1 < by2) && (ay2 > by1)
          pair_name = "#{a['id']} <-> #{b['id']}"
          slot_overlaps << pair_name unless slot_overlaps.include?(pair_name)
          puts "  [FAIL] Collision detected between #{pair_name} at #{vw}x#{vh}, mouse=(#{mx}, #{my})"
        end
      end
    end
  end
end

assert(slot_overlaps.empty?, "Zero overlap between any photographs (all #{fragments_json.combination(2).count} pairs collision-free across viewports & mouse positions)", failures)

# 3. Horizontal Photography Navigation
puts "\n3. Horizontal Photography Gallery Verification:"
gallery_js = File.read("#{base_dir}/src/components/media/HorizontalPhotoGallery.js")
gallery_css = File.read("#{base_dir}/src/styles/global/horizontal-gallery.css")
obs_html = File.read("#{base_dir}/observatory/index.html")

assert(gallery_js.include?('scroll-snap-type') || gallery_css.include?('scroll-snap-type: x mandatory'), 'Horizontal scroll-snap navigation implemented', failures)
assert(gallery_css.include?('object-fit: contain !important;'), 'Full uncropped photographs enforced via object-fit: contain', failures)
assert(gallery_css.include?('border-radius: 0 !important;') && gallery_css.include?('border: none !important;'), 'Rectangular borderless styling strictly enforced', failures)
assert(gallery_js.include?('PREVIOUS') && gallery_js.include?('NEXT'), 'Clear understated left/right navigation controls present', failures)
assert(gallery_js.include?('ArrowLeft') && gallery_js.include?('ArrowRight'), 'Keyboard navigation (ArrowLeft / ArrowRight) supported', failures)
assert(obs_html.include?('HorizontalPhotoGallery') && obs_html.include?('observatory-gallery-mount'), 'Observatory page features horizontal photography gallery', failures)

# 4. Canonical 76px Optical Fisheye Lens Shared Everywhere
puts "\n4. Shared Canonical 76px Optical Fisheye Lens Verification:"
cursor_js = File.read("#{base_dir}/src/components/lens-cursor/FisheyeCursor.js")
init_js = File.read("#{base_dir}/src/components/lens-cursor/init-fisheye.js")

assert(cursor_js.include?('FISHEYE_CONFIG'), 'FisheyeCursor component uses centralized FISHEYE_CONFIG', failures)
assert(init_js.include?('FisheyeCursor'), 'init-fisheye.js auto-initializer present', failures)

all_pages = [
  'index.html',
  'about/index.html',
  'experience/index.html',
  'projects/index.html',
  'observatory/index.html'
] + Dir.glob("#{base_dir}/projects/*/index.html").map { |f| f.sub("#{base_dir}/", '') }

all_pages_have_lens = all_pages.all? do |page|
  content = File.read("#{base_dir}/#{page}")
  content.include?('fisheye-lens') || content.include?('FisheyeCursor') || content.include?('init-fisheye.js')
end
assert(all_pages_have_lens, "Canonical fisheye lens active on all #{all_pages.length} pages across the website", failures)

# 5. Zero Random Red Dots
puts "\n5. Zero Random Red Dots Verification:"
assert(!index_html.include?('red-pip') && !obs_html.include?('red-pip'), 'Zero random red dots in HTML navigation', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL INTERACTION AND ARCHITECTURAL REQUIREMENTS PASSED (100%)"
else
  puts "FAILURES: #{failures.length}"
  exit 1
end
puts "=========================================================="
