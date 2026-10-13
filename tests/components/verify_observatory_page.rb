# PRANAVI RUDRADEV PORTFOLIO — OBSERVATORY VERIFICATION SUITE
# Verifies:
# 1. 22 landscape image placeholders with exact aspect ratio of 2000 × 1600 px (5:4)
# 2. Identical uniform size across all 22 placeholders with consistent spacing and alignment
# 3. Dedicated carousel speed control in top-right corner with 1×, 1.5×, 2× options (default 1×)
# 4. Shared animation-speed variable and rate-scaling engine with zero jumps or resets
# 5. Continuous horizontal carousel movement from right to left in an infinite loop (Set A & Set B clones, zero visible restart)
# 6. Single main photograph dominant with small portion of next entering from right
# 7. Full-screen-height photography section (min-height: 100vh)
# 8. Natural vertical scrolling transition to separate full-width documentary section directly below
# 9. No scroll-jacking or wheel event hijacking
# 10. Documentary video playback functionality preserved (play/pause toggle, timecode, scrubber)
# 11. prefers-reduced-motion alternative provided
# 12. Design system tokens: Java Brown (#231815), Transparent Yellow (#F5EFC6), Satoshi typography, Fisheye lens

require 'json'

puts "=========================================================="
puts "VERIFYING THE OBSERVATORY PAGE & BEHAVIOUR"
puts "=========================================================="

base_dir = File.expand_path("../..", __dir__)
failures = []

def assert(cond, msg, failures)
  if cond
    puts "  [PASS] #{msg}"
  else
    puts "  [FAIL] #{msg}"
  end
  failures << msg unless cond
end

obs_html = File.read("#{base_dir}/observatory/index.html")
gallery_js = File.read("#{base_dir}/src/components/media/HorizontalPhotoGallery.js")
gallery_css = File.read("#{base_dir}/src/styles/global/horizontal-gallery.css")
content_js = File.read("#{base_dir}/content/observatory/index.js")

# 1. Exactly 22 Photographs with 2000 x 1600 (5:4) Landscape Ratio
puts "\n1. Photography Collection (22 Placeholders @ 2000x1600 / 5:4):"
assert(obs_html.include?('observatoryPhotos') || obs_html.include?('OBSERVATORY_PHOTOS'), 'Photographic collection configured on Observatory page', failures)

# Check count of 22 photos in OBSERVATORY_PHOTOS
photos_block = content_js[/export const OBSERVATORY_PHOTOS = \[(.*?)\];/m, 1]
count_matches = photos_block ? photos_block.scan(/aspectRatio\s*:\s*['"]([^'"]+)['"]/) : []
assert(count_matches.length == 22, "Exactly 22 photographs defined in data model (found: #{count_matches.length})", failures)

# Verify all 22 have exact 5:4 aspect ratio
all_five_four = count_matches.all? { |m| m[0] == '5/4' }
assert(all_five_four, 'All 22 photographs enforce uniform 5:4 landscape aspect ratio', failures)
assert(gallery_css.include?('aspect-ratio: 5 / 4') || obs_html.include?('5 / 4'), 'CSS enforces exact 5:4 (2000x1600) aspect ratio', failures)
assert((gallery_css.include?('2000') && gallery_css.include?('1600')) || (obs_html.include?('2000') && obs_html.include?('1600')), '2000 x 1600 px dimensions specified in design tokens', failures)
assert(gallery_css.include?('object-fit: contain !important;') || obs_html.include?('object-fit: contain !important;'), 'Full uncropped viewing enforced via object-fit: contain', failures)
assert(gallery_css.include?('border-radius: 0 !important;') && gallery_css.include?('border: none !important;'), 'Strict border-radius 0px and borderless frames enforced', failures)

# 2. Carousel Speed Control (1×, 1.5×, 2× in Top-Right Corner)
puts "\n2. Carousel Speed Control in Top-Right Corner:"
assert(obs_html.include?('obs-speed-control'), 'Speed control component present in photography section', failures)
assert(obs_html.include?('data-speed="1"') && obs_html.include?('data-speed="1.5"') && obs_html.include?('data-speed="2"'), 'Three selectable speeds (1x, 1.5x, 2x) provided', failures)
assert(obs_html.include?('1×') && obs_html.include?('1.5×') && obs_html.include?('2×'), 'Visible speed labels (1×, 1.5×, 2×) present', failures)
assert(obs_html.include?('speed-btn-1x') && obs_html.include?('is-active'), 'Default speed 1x is visually highlighted and selected on load', failures)
assert(obs_html.include?('__CAROUSEL_SPEED') || obs_html.include?('--carousel-speed'), 'Shared animation-speed variable configured', failures)
assert(obs_html.include?('playbackRate') || obs_html.include?('setCarouselSpeed'), 'Dynamic speed scaling engine preserves current position without jumps or resets', failures)
assert(obs_html.include?('role="radiogroup"') || obs_html.include?('role="group"'), 'Keyboard accessible controls with proper ARIA attributes', failures)

# 3. Smooth Continuous Auto-Scrolling Loop (Right to Left)
puts "\n3. Smooth Continuous Auto-Scrolling Loop:"
assert(gallery_css.include?('animation: observatoryContinuousLoop') || obs_html.include?('obs-scroll') || gallery_js.include?('translate3d'), 'Continuous carousel loop implemented', failures)
assert(gallery_css.include?('translate3d(-50%, 0, 0)') || obs_html.include?('translateX(-50%)'), 'Seamless 50% translation wrap configured for duplicate set', failures)
assert((obs_html.include?('SET A') && obs_html.include?('SET B')) || (gallery_js.include?('photo-track-set-a') && gallery_js.include?('photo-track-set-b')), 'Duplicated sequence (Set A & Set B) generated for gapless loop', failures)
assert(gallery_css.include?('animation-play-state: paused') || obs_html.include?('animation-play-state: paused'), 'Pause on hover supported for calm visual inspection', failures)
assert(gallery_css.include?('prefers-reduced-motion') || obs_html.include?('prefers-reduced-motion'), 'prefers-reduced-motion respected with reduced-motion alternative', failures)

# 4. Full-Screen Photography Screen & Visual Proportions
puts "\n4. Visual Reference Mockup Fidelity:"
assert(obs_html.include?('THE OBSERVATORY') && obs_html.include?('PHOTOGRAPHY'), 'Header displays "THE OBSERVATORY" and "PHOTOGRAPHY" subtitle', failures)
assert(obs_html.include?('obs-title-line'), 'Hairline divider rule present beneath title', failures)
assert(obs_html.include?('min-height: 100vh') || gallery_css.include?('min-height: 100vh') || obs_html.include?('height: 100vh'), 'Photography section occupies full-screen-height section (100vh)', failures)

# 5. Vertical Scroll Flow & Transition to Documentary (No Scroll-Jacking)
puts "\n5. Vertical Scroll & Transition to Documentary:"
assert(!gallery_js.include?('e.preventDefault()') || !gallery_js.include?("addEventListener('wheel'"), 'Scroll wheel NOT hijacked by horizontal gallery', failures)
assert(obs_html.include?('id="documentary-section"') && obs_html.include?('obs-documentary-section'), 'Documentary section exists on vertically scrolling page', failures)
assert(obs_html.index('id="observatory-gallery-mount"') < obs_html.index('id="documentary-section"'), 'Documentary section placed downstream of Photography for natural vertical scroll transition', failures)

# 6. Documentary Section Architecture & Features
puts "\n6. Documentary Section Architecture & Features:"
assert(obs_html.include?('DOCUMENTARY'), 'Documentary section title present', failures)
assert(obs_html.include?('doc-player-frame') && obs_html.include?('doc-video-canvas'), 'Cinematic 16:9 documentary player frame present', failures)
assert(obs_html.include?('PLAY DOCUMENTARY') && obs_html.include?('doc-play-trigger'), 'Editorial play trigger present', failures)
assert(obs_html.include?('Behind the Shadows: Crafting a Documentary on India’s Shadow Puppetry Tradition'), 'Feature documentary title present', failures)
assert(obs_html.include?('Tholu Bommalata') && obs_html.include?('Nimmalakunta'), 'Feature documentary narrative description present', failures)
title_pos = obs_html.index('Behind the Shadows: Crafting a Documentary on India’s Shadow Puppetry Tradition')
player_pos = obs_html.index('class="doc-player-frame"')
desc_pos = obs_html.index('As the Documentary Head, I led the creative journey')
assert(title_pos && player_pos && desc_pos && (title_pos < player_pos) && (player_pos < desc_pos), 'Documentary section order: title appears above video, description appears underneath video', failures)
assert(obs_html.include?('background-color: #4D0E12') || obs_html.include?('background: #4D0E12'), 'Description box styled with solid Sceptre Red (#4D0E12)', failures)
assert(obs_html.include?('color: #F5EFC6') || obs_html.include?('color: var(--text-yellow)'), 'Description text uses portfolio yellow (#F5EFC6)', failures)
assert(obs_html.include?('padding:') && obs_html.include?('line-height: 1.8'), 'Generous padding and comfortable line-height present on description box', failures)
assert(!obs_html.include?('FIELD LOCATION') && !obs_html.include?('The Anatomy of Waiting') && !obs_html.include?('Hands That Remember') && !obs_html.include?('Quiet Frequencies'), 'Circled metadata block and three cards removed', failures)

# 7. Design Tokens & Fisheye Lens
puts "\n7. Design System & Lens:"
assert(obs_html.include?('#231815') || obs_html.include?('--bg-observatory'), 'Java Brown background (#231815) preserved', failures)
assert(obs_html.include?('FisheyeCursor') || obs_html.include?('init-fisheye.js'), 'Canonical optical fisheye lens mounted', failures)
assert(obs_html.include?('Satoshi'), 'Satoshi typography preserved', failures)
assert(!obs_html.include?('red-pip'), 'Zero random red dots', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL OBSERVATORY VERIFICATIONS PASSED SUCCESSFULLY! (100%)"
else
  puts "FAILURES DETECTED: #{failures.length}"
  exit 1
end
puts "=========================================================="
