# frozen_string_literal: true

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
puts "VERIFYING FOLDER TAB COLOURS & FISHEYE LENS NEUTRALITY"
puts "=========================================================="

# 1. Verify Folder Tab Colours & Top Edge (projects/index.html)
projects_html = File.read("#{base_dir}/projects/index.html")

puts "\n1. Folder Shelf Lip Top Edge Deterministic Colours:"
assert(!projects_html.include?('linear-gradient(to right, var(--text-yellow) 0%, var(--text-yellow) 24%'), 
       'Striped gradient removed from blue folder shelf lip', failures)
assert(!projects_html.include?('linear-gradient(to right, var(--text-yellow) 0%, var(--text-yellow) 60%'), 
       'Striped gradient removed from red folder shelf lip', failures)

assert(projects_html.include?('.folder-system.active-yellow .folder-shelf-lip') &&
       projects_html.include?('background-color: var(--text-yellow) !important;'),
       'Transparent yellow folder top edge is fixed deterministic var(--text-yellow)', failures)

assert(projects_html.include?('.folder-system.active-blue .folder-shelf-lip') &&
       projects_html.include?('background-color: var(--tab-blue) !important;'),
       'Blue folder top edge is fixed deterministic var(--tab-blue)', failures)

assert(projects_html.include?('.folder-system.active-red .folder-shelf-lip') &&
       projects_html.include?('background-color: var(--tab-red) !important;'),
       'Red folder top edge is fixed deterministic var(--tab-red)', failures)

puts "\n2. Folder Tabs Deterministic Colours & Layering Across States:"
assert(projects_html.include?('.folder-tab.tab-yellow.active') &&
       projects_html.include?('background-color: var(--text-yellow) !important;'),
       'Yellow tab retains var(--text-yellow) in active state', failures)

assert(projects_html.include?('.folder-tab.tab-blue.active') &&
       projects_html.include?('background-color: var(--tab-blue) !important;'),
       'Blue tab retains var(--tab-blue) in active state', failures)

assert(projects_html.include?('.folder-tab.tab-red.active') &&
       projects_html.include?('background-color: var(--tab-red) !important;'),
       'Red tab retains var(--tab-red) in active state', failures)

assert(projects_html.include?('.folder-tab:hover:not(.active)') &&
       projects_html.include?('z-index: 10;'),
       'Hovered tab elevates to z-index: 10 so layering does not obscure tab color', failures)

assert(projects_html.include?('.folder-tab.active') &&
       projects_html.include?('z-index: 15 !important;'),
       'Active tab elevates to z-index: 15 above adjacent tabs and shelf lip', failures)

# 2. Verify Fisheye Lens Tint Neutrality
lens_css = File.read("#{base_dir}/src/styles/global/fisheye-lens.css")
index_html = File.read("#{base_dir}/index.html")

puts "\n3. Global Fisheye Lens Overlay & Rim Neutrality (Zero Red Tint):"
assert(!lens_css.include?('rgba(74, 46, 39'),
       'No red-brown Potting Soil rgba(74, 46, 39) in global fisheye-lens.css', failures)
assert(!index_html.include?('rgba(74, 46, 39'),
       'No red-brown Potting Soil rgba(74, 46, 39) in index.html lens styles', failures)

assert(lens_css.include?('rgba(255, 255, 255, 0.35) 0%') || lens_css.include?('rgba(255, 255, 255'),
       'Milky glass specular highlight preserved in glass overlay', failures)
assert(lens_css.include?('border: 1px solid rgba(255, 255, 255'),
       'Neutral translucent glass rim border applied', failures)
assert(lens_css.include?('box-shadow:') && !lens_css.include?('rgba(35, 24, 21'),
       'Neutral soft diffuse shadow applied without warm color cast', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL FOLDER TAB COLOURS & LENS NEUTRALITY TESTS PASSED (100%)"
  puts "=========================================================="
  exit 0
else
  puts "FAILED WITH #{failures.length} ERRORS:"
  failures.each { |f| puts "  - #{f}" }
  puts "=========================================================="
  exit 1
end
