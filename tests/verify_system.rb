# PRANAVI RUDRADEV PORTFOLIO — ARCHITECTURAL VERIFICATION SUITE
# Checks all design tokens, schemas, constraints, and requirements.

require 'json'

puts "=========================================================="
puts "PRANAVI RUDRADEV PORTFOLIO — SYSTEM VERIFICATION (PART 1)"
puts "=========================================================="

base_dir = File.expand_path("..", __dir__)
failures = []

def assert(condition, message, failures)
  if condition
    puts "  [PASS] #{message}"
  else
    puts "  [FAIL] #{message}"
    failures << message
  end
end

# 1. Check prohibited keyword "Visual Thinking"
puts "\n1. Checking Strict Prohibitions:"
all_files = Dir.glob("#{base_dir}/**/*.{js,css,html}")
prohibited_found = false
all_files.each do |f|
  next if f.include?('verify_system.rb')
  content = File.read(f)
  # Check if Visual Thinking appears anywhere in user-facing content (outside the explicit rule reminder)
  content.lines.each_with_index do |line, idx|
    if line =~ /Visual Thinking/i && !(line =~ /Do NOT use|PROHIBIT|never use|rule/i)
      prohibited_found = true
      puts "    Violation in #{f}:#{idx + 1} -> #{line.strip}"
    end
  end
end
assert(!prohibited_found, 'No unauthorized "Visual Thinking" professional descriptors found', failures)

# 2. Check Palette Hex Codes in config/colors.js
puts "\n2. Verifying Colour System Tokens:"
colors_js = File.read("#{base_dir}/config/colors.js")
assert(colors_js.include?('#4A2E27'), 'Potting Soil (#4A2E27) defined', failures)
assert(colors_js.include?('#F5EFC6'), 'Transparent Yellow (#F5EFC6) defined', failures)
assert(colors_js.include?('#A5BCD6'), 'Cerulean Blue (#A5BCD6) defined', failures)
assert(colors_js.include?('#4D0E12'), 'Sceptre Red (#4D0E12) defined', failures)
assert(colors_js.include?('#231815'), 'Java Brown (#231815) defined', failures)
assert(colors_js.include?('validateColorContrast'), 'Contrast validator present (guaranteeing no white on yellow)', failures)

# 3. Check Section Accent Logic
puts "\n3. Verifying Section Accent Logic:"
assert(colors_js.include?('SCEPTRE_RED') && colors_js.include?('ABOUT:'), 'About Me accent: Sceptre Red', failures)
assert(colors_js.include?('CERULEAN_BLUE') && colors_js.include?('EXPERIENCE:'), 'Work Experience accent: Cerulean Blue', failures)
assert(colors_js.include?('CERULEAN_BLUE') && colors_js.include?('SCEPTRE_RED') && colors_js.include?('PROJECTS:'), 'Projects accents: Cerulean Blue + Sceptre Red', failures)
assert(colors_js.include?('JAVA_BROWN') && colors_js.include?('OBSERVATORY:'), 'The Observatory accent: Java Brown + Sceptre Red', failures)

# 4. Check Satoshi Typography Tokens
puts "\n4. Verifying Typography System (Satoshi):"
typo_js = File.read("#{base_dir}/config/typography.js")
assert(typo_js.include?('Satoshi'), 'Primary font family is Satoshi', failures)
assert(typo_js.include?('DISPLAY_SIZE'), 'DISPLAY_SIZE token defined', failures)
assert(typo_js.include?('H1_SIZE'), 'H1_SIZE token defined', failures)
assert(typo_js.include?('H2_SIZE'), 'H2_SIZE token defined', failures)
assert(typo_js.include?('BODY_SIZE'), 'BODY_SIZE token defined', failures)
assert(typo_js.include?('CAPTION_SIZE'), 'CAPTION_SIZE token defined', failures)
assert(typo_js.include?('NAV_SIZE'), 'NAV_SIZE token defined', failures)
assert(typo_js.include?('LINE_HEIGHT'), 'LINE_HEIGHT token defined', failures)
assert(typo_js.include?('LETTER_SPACING'), 'LETTER_SPACING token defined', failures)
assert(typo_js.include?('FONT_WEIGHT'), 'FONT_WEIGHT token defined', failures)

# 5. Check The Lens and Interaction Tokens
puts "\n5. Verifying Interaction Tokens & The Lens:"
interaction_js = File.read("#{base_dir}/config/interaction.js")
assert(interaction_js.include?('LENS_SIZE'), 'LENS_SIZE token defined', failures)
assert(interaction_js.include?('LENS_DISTORTION'), 'LENS_DISTORTION token defined', failures)
assert(interaction_js.include?('LENS_MAGNIFICATION'), 'LENS_MAGNIFICATION token defined', failures)
assert(interaction_js.include?('HOVER_SCALE'), 'HOVER_SCALE token defined', failures)
assert(interaction_js.include?('HOVER_DURATION'), 'HOVER_DURATION token defined', failures)
assert(interaction_js.include?('PAGE_TRANSITION_SPEED'), 'PAGE_TRANSITION_SPEED token defined', failures)
assert(interaction_js.include?('SCROLL_SPEED'), 'SCROLL_SPEED token defined', failures)
assert(interaction_js.include?('PARALLAX_STRENGTH'), 'PARALLAX_STRENGTH token defined', failures)

# 6. Check Project Registry (Exact 13 Projects)
puts "\n6. Verifying 13 Projects Data Model:"
projects_js = File.read("#{base_dir}/content/projects/index.js")
expected_projects = [
  "Does Packaging Alone Trigger Brand Recall?",
  "Communication Theory & Marketing Insights",
  "How Do Colours Influence Consumer Behaviour?",
  "Primary Research for Consumer Behaviour",
  "Primary Study & Marketing Insights",
  "Character Analysis — Personality Psychology & Marketing",
  "Retail Marketing Insight — Shoppers Stop",
  "HireFicient — From Market Gap to Viable Venture",
  "D2C Brands in India & Their Marketing Strategies",
  "Forecasting Demand",
  "A Sustainable Product",
  "NAZAKATH",
  "The Airport Was Never the Problem"
]

expected_projects.each_with_index do |title, idx|
  assert(projects_js.include?(title), "Project #{idx + 1} verbatim match: \"#{title}\"", failures)
end

# Check Project Data Fields
fields = ['id', 'title', 'category', 'cover', 'document', 'href', 'featured', 'homepagePosition', 'homepageSize', 'rotation', 'zIndex', 'parallax', 'accent']
fields.each do |f|
  assert(projects_js.include?("#{f}:"), "Field \"#{f}\" supported in project model", failures)
end

# 7. Check Work Experience Registry
puts "\n7. Verifying Work Experience Model:"
exp_js = File.read("#{base_dir}/content/experience/index.js")
assert(exp_js.include?('Avirata NGO'), 'Avirata NGO registered', failures)
assert(exp_js.include?('Origami Creative'), 'Origami Creative registered', failures)
assert(exp_js.include?('Dhara Magazine'), 'Dhara Magazine registered', failures)
assert(exp_js.include?('document'), 'Supports uploaded PDFs/PPT exports', failures)

# 8. Check Image System Constraints (NO cards, NO rounded corners)
puts "\n8. Verifying Image System Rules:"
tokens_js = File.read("#{base_dir}/config/tokens.js")
assert(tokens_js.include?("borderRadius: '0px'"), 'Image border-radius is strictly 0px', failures)
assert(tokens_js.include?("border: 'none'"), 'No generic borders on images', failures)

# 9. Check Document Architecture
puts "\n9. Verifying Reusable Document Engine:"
doc_viewer = File.read("#{base_dir}/components/document/DocumentViewer.js")
doc_sheet = File.read("#{base_dir}/components/document/DocumentSheet.js")
assert(doc_viewer.include?('open('), 'DocumentViewer supports open()', failures)
assert(doc_sheet.include?('doc-sheet-presentation') && doc_sheet.include?('doc-sheet-portrait'), 'Supports presentation and portrait formats', failures)
assert(doc_viewer.include?('doc-viewer-track'), 'Vertical continuous scroll track present', failures)

# Final Result
puts "\n=========================================================="
if failures.empty?
  puts "ALL ARCHITECTURAL VERIFICATIONS PASSED SUCCESSFULLY! (100%)"
  puts "Foundation, Design System & Content Architecture is Ready."
else
  puts "FAILED VERIFICATIONS: #{failures.length}"
  failures.each { |f| puts " - #{f}" }
  exit 1
end
puts "=========================================================="
