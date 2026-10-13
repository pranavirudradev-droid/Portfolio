# PRANAVI RUDRADEV PORTFOLIO — GLOBAL LENS CONSISTENCY VERIFICATION
# Verifies that all 18 pages across the website strictly and consistently render
# the canonical optical fisheye lens matching the landing page reference.

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

puts "=========================================================="
puts "VERIFYING GLOBAL FISHEYE LENS UNIFORMITY ACROSS ALL PAGES"
puts "=========================================================="

all_pages = [
  'index.html',
  'about/index.html',
  'experience/index.html',
  'projects/index.html',
  'observatory/index.html'
] + Dir.glob("#{base_dir}/projects/*/index.html").map { |f| f.sub("#{base_dir}/", '') }

puts "\n1. Verifying Static SVG Optical Barrel Filter on All #{all_pages.length} Pages:"
all_have_svg = all_pages.all? do |page|
  c = File.read("#{base_dir}/#{page}")
  c.include?('optical-lens-warp') && c.include?('feDisplacementMap') && c.include?('scale="22"')
end
assert(all_have_svg, "All #{all_pages.length} pages include static SVG #optical-lens-warp with scale 22", failures)

puts "\n2. Verifying Static Fisheye Loupe Markup & Layers on All #{all_pages.length} Pages:"
all_have_loupe = all_pages.all? do |page|
  c = File.read("#{base_dir}/#{page}")
  c.include?('fisheye-lens-loupe') &&
    c.include?('fisheye-lens-warp-container') &&
    c.include?('fisheye-lens-mirror-stage') &&
    c.include?('fisheye-lens-glass-overlay') &&
    c.include?('fisheye-lens-rim')
end
assert(all_have_loupe, "All #{all_pages.length} pages include canonical 3-layer loupe DOM structure", failures)

puts "\n3. Verifying Tokens & Configuration Consistency:"
tokens_css = File.read("#{base_dir}/styles/tokens.css")
lens_css = File.read("#{base_dir}/src/styles/global/fisheye-lens.css")
tokens_js = File.read("#{base_dir}/src/config/interactions/interactionTokens.js")
index_html = File.read("#{base_dir}/index.html")

assert(tokens_css.include?('--lens-size: 76px;'), 'tokens.css defines --lens-size: 76px', failures)
assert(tokens_css.include?('--lens-magnification: 1.08;'), 'tokens.css defines --lens-magnification: 1.08', failures)
assert(tokens_css.include?('--lens-distortion: 0.12;'), 'tokens.css defines --lens-distortion: 0.12', failures)
assert(tokens_js.include?('magnification: 1.08'), 'interactionTokens.js FISHEYE_CONFIG magnification is 1.08', failures)
assert(tokens_js.include?('distortion: 0.12'), 'interactionTokens.js FISHEYE_CONFIG distortion is 0.12', failures)
assert(index_html.include?('--lens-size: 76px;'), 'index.html defines --lens-size: 76px', failures)
assert(index_html.include?('--lens-magnification: 1.08;'), 'index.html defines --lens-magnification: 1.08', failures)
assert(index_html.include?('--lens-distortion: 0.12;'), 'index.html defines --lens-distortion: 0.12', failures)

puts "\n4. Verifying Landing Page Four Worlds Tabs Mirror Coverage:"
assert(index_html.include?('sectionsLensMirror'), 'index.html clones sections-stage as sectionsLensMirror', failures)
assert(index_html.include?('min-height: 100vh;'), 'fisheye-lens-mirror-stage uses min-height: 100vh for multi-chapter expansion', failures)
assert(index_html.include?('matches(\':hover\')'), 'index.html synchronizes tab hover state in real-time RAF loop', failures)
assert(index_html.include?('pointer-events: none !important;'), 'Mirror stage and children enforce pointer-events: none !important', failures)

puts "\n5. Verifying Shared FisheyeCursor Component Capabilities:"
cursor_js = File.read("#{base_dir}/src/components/lens-cursor/FisheyeCursor.js")
assert(cursor_js.include?('bodyStyle.display === \'flex\''), 'FisheyeCursor propagates flex layout to mirrorRoot', failures)
assert(cursor_js.include?('mirrorRoot.style.minHeight = \'100vh\''), 'FisheyeCursor sets mirrorRoot minHeight to 100vh', failures)
assert(cursor_js.include?('syncScene()'), 'FisheyeCursor provides syncScene() hook for dynamic views', failures)

puts "\n6. Verifying Touch and Mobile Clean Elimination:"
assert(index_html.include?('@media (hover: none), (pointer: coarse)'), 'index.html disables lens on touch/mobile', failures)
assert(lens_css.include?('@media (pointer: coarse), (hover: none)'), 'fisheye-lens.css disables lens on touch/mobile', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL GLOBAL FISHEYE LENS CONSISTENCY VERIFICATIONS PASSED (100%)"
else
  puts "FAILURES: #{failures.length}"
  failures.each { |f| puts "  - #{f}" }
  exit 1
end
puts "=========================================================="
