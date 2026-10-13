# PRANAVI RUDRADEV PORTFOLIO — WORK EXPERIENCE VERIFICATION SUITE
# Validates the Work Experience page layout, coded PDF cover placeholders,
# vertical dividers, typography, content fidelity, and document integration.

require 'json'

puts "=========================================================="
puts "VERIFYING WORK EXPERIENCE SECTION (REFERENCE FIDELITY)"
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

exp_html = File.read("#{base_dir}/experience/index.html")
exp_js = File.read("#{base_dir}/content/experience/index.js")
item_js = File.read("#{base_dir}/components/experience/ExperienceItem.js")

# 1. Page & Navigation Structure
puts "\n1. Page & Navigation Structure:"
assert(exp_html.include?('RETURN TO FOUR WORLDS'), 'Navigation link back to Four Worlds present', failures)
assert(exp_html.include?('[02] WORK EXPERIENCE'), 'Header badge reads "[02] WORK EXPERIENCE"', failures)

# 2. Numbered Entries & Coded Pale-Yellow PDF Cover Placeholders (HTML/CSS components)
puts "\n2. Numbered Entries & Coded Pale-Yellow PDF Cover Placeholders:"
(1..5).each do |n|
  idx = sprintf('%02d', n)
  assert(exp_html.include?("Entry #{idx}") || exp_html.include?("<span>#{idx}</span>"), "Numbered entry #{idx} circle present", failures)
end

assert(exp_html.include?('class="exp-cover-card"'), 'Coded pale-yellow PDF cover placeholder cards present', failures)
assert(exp_html.include?('ORIGAMI<br/>CREATIVE') || exp_html.include?('ORIGAMI') && exp_html.include?('CREATIVE'), 'Cover 01: ORIGAMI CREATIVE present', failures)
assert(exp_html.include?('ARISA<br/>FOUNDATION') || exp_html.include?('ARISA') && exp_html.include?('FOUNDATION'), 'Cover 02: ARISA FOUNDATION present', failures)
assert(exp_html.include?('AVIRATHA<br/>TRUST') || exp_html.include?('AVIRATHA') && exp_html.include?('TRUST'), 'Cover 03: AVIRATHA TRUST present', failures)
assert(exp_html.include?('DHAARA<br/>MAGAZINE') || exp_html.include?('DHAARA') && exp_html.include?('MAGAZINE'), 'Cover 04: DHAARA MAGAZINE present', failures)
assert(exp_html.include?('I LOVE<br/>MONDAYS') || exp_html.include?('I LOVE') && exp_html.include?('MONDAYS'), 'Cover 05: I LOVE MONDAYS present', failures)

# 3. Up-right arrow icon buttons on each card
puts "\n3. Consistent Arrow Icon Buttons:"
arrow_matches = exp_html.scan(/class="exp-cover-arrow-btn"/).length
assert(arrow_matches == 5, "Exactly 5 cover arrow button icons present (found: #{arrow_matches})", failures)

# 4. Role Categories in Cerulean Blue
puts "\n4. Role Categories & Typography:"
assert(exp_html.include?('ADVERTISING AGENCY'), 'Category: ADVERTISING AGENCY present', failures)
assert(exp_html.include?('EVENT PRODUCTION'), 'Category: EVENT PRODUCTION present', failures)
assert(exp_html.include?('NGO / FIELD INQUIRY'), 'Category: NGO / FIELD INQUIRY present', failures)
assert(exp_html.include?('PUBLICATION / EDITORIAL'), 'Category: PUBLICATION / EDITORIAL present', failures)
assert(exp_html.include?('MEDIA / INTERVIEWS'), 'Category: MEDIA / INTERVIEWS present', failures)

# 5. Role Titles
puts "\n5. Role Titles:"
assert(exp_html.include?('Brand Strategy Intern / Brand Custodian'), 'Role: Brand Strategy Intern / Brand Custodian present', failures)
assert(exp_html.include?('Project Intern'), 'Role: Project Intern present', failures)
assert(exp_html.include?('Social Media &amp; Creative Intern') || exp_html.include?('Social Media & Creative Intern'), 'Role: Social Media & Creative Intern present', failures)
assert(exp_html.include?('Creative Intern'), 'Role: Creative Intern present', failures)
assert(exp_html.include?('Executive Intern &amp; Interviewer') || exp_html.include?('Executive Intern & Interviewer'), 'Role: Executive Intern & Interviewer present', failures)

# 6. Dates and Locations
puts "\n6. Dates & Locations:"
assert(exp_html.include?('May 2026 — Jul 2026') && exp_html.include?('Bengaluru'), 'Entry 01 dates & location present', failures)
assert(exp_html.include?('Nov 2024 — Jan 2025') && exp_html.include?('Pune'), 'Entry 02 dates & location present', failures)
assert(exp_html.include?('Jun 2024 — Sep 2024'), 'Entry 03 dates present', failures)
assert(exp_html.include?('2021 — 2022') && exp_html.include?('Delhi'), 'Entry 04 dates & location present', failures)
assert(exp_html.include?('Apr 2022 — Jul 2022'), 'Entry 05 dates present', failures)

# 7. Complete Bullet Points
puts "\n7. Complete Bullet Points:"
assert(exp_html.include?('Ran competitive analysis across 4 client sectors'), 'Entry 01 bullet 1 present', failures)
assert(exp_html.include?('Conducted a 14-competitor benchmark analysis'), 'Entry 01 bullet 2 present', failures)
assert(exp_html.include?('Mapped fan segments for a football club'), 'Entry 01 bullet 3 present', failures)
assert(exp_html.include?('Built a pitch deck and campaign concepts'), 'Entry 01 bullet 4 present', failures)
assert(exp_html.include?('Managed an 8-sense experience end-to-end'), 'Entry 02 bullet 1 present', failures)
assert(exp_html.include?('Shaped brand communications and outreach content'), 'Entry 02 bullet 2 present', failures)
assert(exp_html.include?('Grew Instagram followers by 110%'), 'Entry 03 bullet 1 present', failures)
assert(exp_html.include?('Photographed and designed the cover for the May (2022) edition'), 'Entry 04 bullet 1 present', failures)
assert(exp_html.include?('Hosted a program on careers in the music industry'), 'Entry 05 bullet 1 present', failures)

# 8. Skill Tags
puts "\n8. Skill Tags:"
assert(exp_html.include?('BRAND POSITIONING') && exp_html.include?('GO-TO-MARKET STRATEGY'), 'Entry 01 tags present', failures)
assert(exp_html.include?('BRAND COMMUNICATIONS') && exp_html.include?('COMMUNITY ENGAGEMENT'), 'Entry 02 tags present', failures)
assert(exp_html.include?('SOCIAL MEDIA STRATEGY') && exp_html.include?('PERFORMANCE ANALYTICS'), 'Entry 03 tags present', failures)
assert(exp_html.include?('PHOTOGRAPHY') && exp_html.include?('AUDIENCE GROWTH'), 'Entry 04 tags present', failures)
assert(exp_html.include?('INTERVIEWS') && exp_html.include?('MUSIC INDUSTRY'), 'Entry 05 tags present', failures)

# 9. Styling Tokens & Vertical Divider
puts "\n9. Styling & Layout Divider:"
assert(exp_html.include?('--bg-exp: #231815;') || exp_html.include?('#231815'), 'Java Brown (#231815) background preserved', failures)
assert(exp_html.include?('--text-yellow: #F5EFC6;') || exp_html.include?('#F5EFC6'), 'Transparent Yellow (#F5EFC6) text & covers preserved', failures)
assert(exp_html.include?('--accent-blue: #A5BCD6;') || exp_html.include?('#A5BCD6'), 'Cerulean Blue (#A5BCD6) subheadings preserved', failures)
assert(exp_html.include?('border-left: 1px solid') || exp_html.include?('exp-right-col'), 'Vertical divider separating left cards from right content present', failures)
assert(exp_html.include?('.exp-bullet-text') && exp_html.include?('font-weight: 500;'), 'Experience descriptions and bullet points use Satoshi Medium (500) font weight', failures)
assert(exp_html.include?('.exp-bullet-text') && exp_html.include?('color: var(--text-yellow);'), 'Experience descriptions use high-contrast cream/yellow from portfolio palette', failures)
assert(exp_html.include?('.exp-role-title') && exp_html.include?('font-weight: 700;'), 'Role titles maintain prominent stronger weight (700)', failures)

# 10. Document Viewer & Fisheye Lens
puts "\n10. Document Viewer & Fisheye Lens:"
assert(exp_html.include?('DocumentViewer.js'), 'DocumentViewer module imported', failures)
assert(exp_html.include?('FisheyeCursor.js'), 'FisheyeCursor module imported', failures)
assert(exp_html.include?('openDocById'), 'openDocById handler present', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL WORK EXPERIENCE VERIFICATIONS PASSED SUCCESSFULLY! (100%)"
else
  puts "FAILURES DETECTED: #{failures.length}"
  exit 1
end
puts "=========================================================="
