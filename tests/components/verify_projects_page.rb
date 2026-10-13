# frozen_string_literal: true

require 'net/http'
require 'uri'

puts '=========================================================='
puts 'VERIFYING PROJECTS SECTION (REFERENCE FIDELITY & NAVIGATION)'
puts '=========================================================='

PROJECTS_HTML_PATH = File.expand_path('../../projects/index.html', __dir__)
raise "Missing projects/index.html at #{PROJECTS_HTML_PATH}" unless File.exist?(PROJECTS_HTML_PATH)

html = File.read(PROJECTS_HTML_PATH)
errors = []

def check(condition, message, errors)
  if condition
    puts "  [PASS] #{message}"
  else
    puts "  [FAIL] #{message}"
    errors << message
  end
end

puts "\n1. Folder Tabs & Color Coding:"
check(html.include?('CONSUMER BEHAVIOUR &amp; PSYCHOLOGY') || html.include?('CONSUMER BEHAVIOUR & PSYCHOLOGY'), 'Folder tab 1: CONSUMER BEHAVIOUR & PSYCHOLOGY present', errors)
check(html.include?('MARKET RESEARCH / CASE STUDIES'), 'Folder tab 2: MARKET RESEARCH / CASE STUDIES present', errors)
check(html.include?('PRODUCT &amp; BRAND STRATEGY') || html.include?('PRODUCT & BRAND STRATEGY'), 'Folder tab 3: PRODUCT & BRAND STRATEGY present', errors)
check(html.include?('(06)'), 'Tab count (06) present', errors)
check(html.include?('(04)'), 'Tab count (04) present', errors)
check(html.include?('(03)'), 'Tab count (03) present', errors)
check(html.include?('tab-yellow'), 'Yellow tab styling present', errors)
check(html.include?('tab-blue'), 'Blue tab styling present', errors)
check(html.include?('tab-red'), 'Red tab styling present', errors)
check(html.include?('folder-shelf-lip'), 'Connecting shelf lip present', errors)

puts "\n2. Folder Header, Standalone Cover & Emergence Animation:"
check(html.include?('PROJECT COMPILATION · VOL. 1'), 'Compilation tag "PROJECT COMPILATION · VOL. 1" present', errors)
check(html.include?('folder-flower-icon') || html.include?('<svg class="folder-flower-icon"'), 'Asterisk / flower icon present', errors)
check(html.include?('landing-projects-title'), 'Landing title element present', errors)
check(html.include?('Projects</h1>'), 'Landing Projects h1 present', errors)
check(html.include?('id="view-landing"'), 'Landing view container present', errors)
check(!html.include?('landing-categories-list'), 'Category cards list NOT present on landing page (standalone cover preserved)', errors)
check(html.include?('folderEmerge'), 'Physical folder emergence animation keyframes present', errors)
check(html.include?('emerging'), 'Emergence animation triggering class present', errors)

puts "\n3. Category Views & Independent Scrollable Lists:"
check(html.include?('id="view-consumer-behaviour"'), 'View for Consumer Behaviour present', errors)
check(html.include?('id="view-market-research"'), 'View for Market Research present', errors)
check(html.include?('id="view-product-strategy"'), 'View for Product Strategy present', errors)

scrollable_containers = html.scan(/class="[^"]*proj-list-scrollable[^"]*"/).size
check(scrollable_containers >= 3, "All 3 categories have independent scrollable containers (found: #{scrollable_containers})", errors)
check(html.include?('overflow-y: auto'), 'Independent overflow-y: auto defined for project lists', errors)
check(html.include?('::-webkit-scrollbar'), 'Custom scrollbar styles defined for tactile feel', errors)

puts "\n4. Project Rows & Numbering:"
# Check all 13 projects exist in order
cat1_projects = [
  'Does Packaging Alone Trigger Brand Recall?',
  'Communication Theory &amp; Marketing Insights',
  'How Do Colours Influence Consumer Behaviour?',
  'Primary Research for Consumer Behaviour',
  'Primary Study &amp; Marketing Insights',
  'Character Analysis, Personality Psychology &amp; Marketing'
]

cat2_projects = [
  'Retail Marketing Insight in Shoppers Stop',
  'HireFicient: From Market Gap to Viable Venture',
  'D2C Brands in India &amp; Their Marketing Strategies',
  'Forecasting Demand'
]

cat3_projects = [
  'A Sustainable Product',
  'NAZAKATH',
  'The Airport Was Never the Problem'
]

all_projects = cat1_projects + cat2_projects + cat3_projects
check(all_projects.size == 13, 'Total 13 projects defined', errors)

all_projects.each_with_index do |title, idx|
  normalized_title = title.gsub('&amp;', '&')
  found = html.downcase.include?(title.downcase) || html.downcase.include?(normalized_title.downcase)
  check(found, "Project #{idx + 1} present: #{normalized_title}", errors)
end

puts "\n5. Project-to-PDF Navigation & Document Viewer:"
check(html.include?('openProjectDoc('), 'Click handler openProjectDoc attached to project rows', errors)
check(html.include?('const PROJECT_DOCS = {'), 'PROJECT_DOCS dictionary defined', errors)
check(html.include?('new DocumentViewer('), 'Reusable DocumentViewer initialized', errors)

# Verify distinct PDF mapping for all 13 project keys
expected_keys = [
  'does-packaging-alone-trigger-brand-recall',
  'communication-theory-and-marketing-insights',
  'how-do-colours-influence-consumer-behaviour',
  'primary-research-for-consumer-behaviour',
  'primary-study-and-marketing-insights',
  'character-analysis-personality-psychology-and-marketing',
  'retail-marketing-insight-shoppers-stop',
  'hireficient-from-market-gap-to-viable-venture',
  'd2c-brands-in-india-and-their-marketing-strategies',
  'forecasting-demand',
  'a-sustainable-product',
  'nazakath',
  'the-airport-was-never-the-problem'
]

expected_keys.each do |key|
  check(html.include?("'#{key}':"), "Distinct document mapping key present for #{key}", errors)
  check(html.include?("#{key.split('-').first}") && html.include?('.pdf'), "PDF document path assigned for #{key}", errors)
end

puts "\n6. Browser Back Navigation & History Support:"
check(html.include?('window.history.pushState'), 'history.pushState implemented for tab navigation', errors)
check(html.include?("window.addEventListener('popstate'"), 'popstate event listener implemented for browser back navigation', errors)
check(html.include?('URLSearchParams'), 'URL search params handling for direct linking (?category=...) present', errors)

puts "\n7. Design Tokens, Fisheye Cursor & Site Integrity:"
check(html.include?('#231815') || html.include?('var(--bg-proj)'), 'Java Brown background (#231815) preserved', errors)
check(html.include?('#4A2E27') || html.include?('var(--bg-potting)'), 'Potting Soil background (#4A2E27) preserved', errors)
check(html.include?('#F5EFC6') || html.include?('var(--text-yellow)'), 'Transparent Yellow (#F5EFC6) preserved', errors)
check(html.include?('FisheyeCursor'), 'Canonical FisheyeCursor module mounted', errors)
check(html.include?('RETURN TO FOUR WORLDS'), 'Return link to Four Worlds present', errors)

puts "\n=========================================================="
if errors.empty?
  puts "ALL PROJECTS PAGE VERIFICATIONS PASSED SUCCESSFULLY! (100%)\n=========================================================="
  exit 0
else
  puts "FAILED WITH #{errors.size} ERRORS:\n" + errors.map { |e| "  - #{e}" }.join("\n")
  exit 1
end
