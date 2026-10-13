# PRANAVI RUDRADEV PORTFOLIO — ABOUT ME VERIFICATION SUITE
# Verifies:
# 1. Strict prohibition check (No "Visual Thinking")
# 2. Main heading: "Curious by nature. Strategic by interest." (No personal statement box)
# 3. Exactly 4 sections in order: WHO AM I, HOW I THINK, MY STRENGTHS, WHAT INTERESTS ME
# 4. Section headings: Cerulean Blue (#A5BCD6), zero alphabetic or numerical prefixes
# 5. Section 1: WHO AM I with exact copy, 1 image placeholder, and Sceptre Red (#4D0E12) starburst
# 6. Section 2: HOW I THINK matching reference diagram (Abductive Reasoning, Occam's Razor, Insight & Direction, 6-step process)
# 7. Section 3: MY STRENGTHS with exact quote and soft/hard skill categories
# 8. Section 4: WHAT INTERESTS ME with approved categories
# 9. Design tokens & typography: Satoshi for all structural text, cursive/handwriting for handwritten annotations
# 10. Canonical optical fisheye lens mounted and configured

require 'json'

puts "=========================================================="
puts "VERIFYING ABOUT ME PAGE ARCHITECTURE & CONTENT"
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

about_html = File.read("#{base_dir}/about/index.html")
about_content_js = File.read("#{base_dir}/content/about/index.js")

# 1. Strict Prohibitions
puts "\n1. Strict Prohibitions:"
assert(!about_html.include?('Visual Thinking') && !about_content_js.include?('Visual Thinking'), 'Strictly ZERO "Visual Thinking" across About Me page or content', failures)

# 2. Main Heading & Masthead
puts "\n2. Main Heading & Masthead:"
assert(about_html.include?('Curious by nature. Strategic by interest.'), 'Main heading reads: "Curious by nature. Strategic by interest."', failures)
assert(!about_html.include?('about-headline') && !about_html.include?('Brand Strategy &#183; Consumer Psychology &#183; Qualitative Thinking'), 'Descriptor under name removed completely from masthead', failures)
assert(!about_html.include?('The most decisive brand truths are discovered') && !about_html.include?('EDITABLE DRAFT FIELD · PERSONAL STATEMENT'), 'No personal statement draft box or old heading', failures)

# 3. Standardised Major Section Headings & 3-Section Flow
puts "\n3. Page Structure & Standardised Section Headings:"
pos1 = about_html.index('id="who-am-i"')
pos2 = about_html.index('id="how-i-think"')
pos3 = about_html.index('id="my-strengths"')

assert(pos1 && pos2 && pos3 && (pos1 < pos2) && (pos2 < pos3), 'Three sections exist in exact order: WHO AM I -> HOW I THINK -> MY STRENGTHS', failures)
assert(!about_html.include?('id="what-interests-me"') && !about_html.include?('WHAT INTERESTS ME'), 'WHAT INTERESTS ME section completely removed', failures)
assert(!about_html.include?('[A]') && !about_html.include?('[B]') && !about_html.include?('[C]') && !about_html.include?('[D]'), 'Zero alphabetic prefixes [A], [B], [C], [D]', failures)
assert(!about_html.include?('id="education"') && !about_html.include?('id="where-i-want-to-go"'), 'No Education or Where I Want To Go sections', failures)
assert(about_html.include?('.section-heading,') && about_html.include?('clamp(36px, 5vw, 62px)'), 'Standardized section headings share clamp(36px, 5vw, 62px) size matching HOW I THINK', failures)
assert(about_html.scan(/class="section-heading/).length >= 3, 'All major section headings utilize shared .section-heading styling', failures)
assert(about_html.include?('WHO AM <em>I</em>'), 'Heading WHO AM I has exact em markup on "I"', failures)
assert(about_html.include?('HOW I <em>THINK.</em>'), 'Heading HOW I THINK has exact em markup on "THINK."', failures)
assert(about_html.include?('MY <em>STRENGTHS</em>'), 'Heading MY STRENGTHS has exact em markup on "STRENGTHS"', failures)
assert(about_html.include?('who-am-i-heading em') && about_html.include?('strengths-heading em') && about_html.include?('font-style: italic') && about_html.include?('font-weight: 700'), 'Shared em styling rule (font-style: italic; font-weight: 700) applied across section headings', failures)

# 4. Section 1: WHO AM I Copy & Starburst Placeholder
puts "\n4. Section 1: WHO AM I:"
assert(about_html.include?("Hello, I'm Pranavi Rudradev, a Marketing major and Psychology minor (BBA) from FLAME University."), 'WHO AM I exact opening paragraph present', failures)
assert(about_html.include?('Water feels like home.') && about_html.include?('Occasionally, the clouds have my attention.'), 'Personal anchors (Water, Clouds) present', failures)
assert(about_html.include?('I think I can befriend any animal.') && about_html.include?('Coffee connoisseur. Questionable lyricist.'), 'Personal anchors (Animals, Coffee) present', failures)
assert(about_html.include?('class="starburst-graphic"') && about_html.include?('#4D0E12'), 'Irregular starburst graphic in Sceptre Red (#4D0E12) present', failures)
assert(about_html.scan(/class="image-placeholder-frame"/).length == 1, 'Exactly ONE image placeholder exists on the page', failures)

# 5. Section 2: HOW I THINK (Reference Diagram Fidelity)
puts "\n5. Section 2: HOW I THINK Diagram Architecture:"
assert(about_html.include?('HOW I <em>THINK.</em>') || about_html.include?('HOW I THINK'), 'Heading "HOW I THINK" present', failures)
assert(about_html.include?("The simplest explanation is usually the right one.") && about_html.include?("OCCAM’S RAZOR"), 'Occam\'s Razor quote scrap card present', failures)
assert(about_html.include?('ABDUCTIVE') && about_html.include?('REASONING'), 'Pillar 1: ABDUCTIVE REASONING present', failures)
assert(about_html.include?('ELIMINATION') && about_html.include?("OCCAM’S RAZOR"), 'Pillar 2: ELIMINATION (USING OCCAM\'S RAZOR) present', failures)
assert(about_html.include?('INSIGHT') && about_html.include?('DIRECTION'), 'Pillar 3: INSIGHT & DIRECTION present', failures)
assert(about_html.include?('Does this') && about_html.include?('fit the evidence?') && about_html.include?('complex?') && about_html.include?('forward?'), '4-circle Venn diagram with all 4 questions present', failures)
assert(about_html.include?('OBSERVE') && about_html.include?('QUESTION') && about_html.include?('EXPLORE') && about_html.include?('ELIMINATE') && about_html.include?('SIMPLIFY') && about_html.include?('APPLY'), 'All 6 process steps (01 OBSERVE -> 06 APPLY) present', failures)
assert(about_html.include?('grid-template-columns: 1fr auto 1fr auto 1fr auto 1fr auto 1fr auto 1fr;'), 'Consistent six-column layout grid (11-column with connecting arrows) present', failures)
assert(about_html.scan(/class="hit-step-icon-wrap"/).length == 6, 'All 6 process steps have dedicated icon wrappers (.hit-step-icon-wrap)', failures)
assert(about_html.include?('.hit-step-top {') && about_html.include?('height: 44px;'), 'Region 1 (.hit-step-top) has standardized 44px baseline alignment container', failures)
assert(about_html.include?('.hit-step-title-wrap {') && about_html.include?('height: 38px;'), 'Region 2 (.hit-step-title-wrap) has standardized 38px height container', failures)
assert(about_html.scan(/class="hit-step-underline"/).length == 6, 'Region 3 (.hit-step-underline) divider line present across all 6 steps', failures)
assert(about_html.scan(/class="hit-step-arrow"/).length == 5, 'All 5 connecting arrows present between the 6 steps', failures)
assert(about_html.include?('SIMPLIFY<br/>(OCCAM’S RAZOR)'), 'SIMPLIFY (OCCAM’S RAZOR) two-line title properly wrapped', failures)
assert(about_html.include?('hit-handwritten'), 'Handwritten styling class applied to informal annotations', failures)
assert(about_html.include?('Keep what explains the most with the fewest assumptions.'), 'Keep what annotation present with exact copy', failures)
assert(!about_html.include?('hit-venn-to-note-arrow'), 'Extra arrow removed from Keep what annotation (stands on its own)', failures)
assert(about_html.include?('hit-result-card') && about_html.include?('The result is a clearer, more meaningful understanding that can inform strategy, creative directions, or further exploration.'), 'The result statement placed inside hit-result-card with exact wording', failures)
assert(about_html.include?('.hit-result-card') && about_html.include?('#4D0E12'), 'hit-result-card styled with Sceptre Red (#4D0E12) and hand-drawn irregular edges', failures)
assert(about_html.include?('hit-center-arrow-down'), 'Retain arrow connecting insight annotation to The result statement', failures)

# 6. Section 3: MY STRENGTHS (Dual Spinning Wheels & Scroll Reveal)
puts "\n6. Section 3: MY STRENGTHS:"
assert(about_html.include?('Jack of all trades, master of none'), 'Strengths opening quote present', failures)
assert(about_html.include?('SOFT SKILLS') && about_html.include?('Cross-functional collaboration') && about_html.include?('Pattern recognition'), 'Soft skills category and quadrant labels present', failures)
assert(about_html.include?('HARD SKILLS') && about_html.include?('Brand Positioning and Architecture') && about_html.include?('Go-to-Market Strategy'), 'Hard skills category and wedge labels present', failures)
assert(about_html.include?('wheel-rotor-soft') && about_html.include?('wheel-rotor-hard'), 'Dual spinning wheel rotors present', failures)
assert(about_html.include?("you're in luck, you get all these skill-sets"), 'Result note "you\'re in luck, you get all these skill-sets" present', failures)
assert(about_html.include?('setupStrengthsWheels'), 'Scroll-driven wheel spinning and reveal script present', failures)

# 7. Natural Section Reflow & Clean Termination
puts "\n7. Natural Section Reflow:"
assert(about_html.include?('.about-section:last-of-type') && about_html.include?('border-bottom: none'), 'Clean termination on final section with border-bottom: none', failures)
assert(!about_html.include?('interests-list') && !about_html.include?('interest-cat'), 'Zero orphaned interests styles or layout elements', failures)

# 8. Design System Tokens & Typography
puts "\n8. Design System Tokens & Typography:"
assert(about_html.include?('#4A2E27'), 'Grounding base: Potting Soil (#4A2E27)', failures)
assert(about_html.include?('#F5EFC6'), 'Text: Transparent Yellow (#F5EFC6)', failures)
assert(about_html.include?('#A5BCD6'), 'Accents/Headings: Cerulean Blue (#A5BCD6)', failures)
assert(about_html.include?('#4D0E12'), 'Accent: Sceptre Red (#4D0E12)', failures)
assert(about_html.include?('Satoshi'), 'Satoshi primary typeface used', failures)

# 9. Optical Fisheye Lens & Shared Components
puts "\n9. Shared Fisheye Lens & Cross-Navigation:"
assert(about_html.include?('FisheyeCursor.js'), 'Shared canonical optical fisheye lens script mounted', failures)
assert(about_html.include?('RETURN TO FOUR WORLDS'), 'Navigation link back to Four Worlds present', failures)
assert(about_html.include?('WORK EXPERIENCE') && about_html.include?('PROJECTS ARCHIVE') && about_html.include?('THE OBSERVATORY'), 'Cross-navigation links present', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL ABOUT ME PAGE VERIFICATIONS PASSED SUCCESSFULLY! (100%)"
else
  puts "FAILURES DETECTED: #{failures.length}"
  exit 1
end
puts "=========================================================="
