# PRANAVI RUDRADEV PORTFOLIO — CONTENT VERIFICATION SUITE
# Validates all content models, permanent routes, and prohibitions.

require 'json'

puts "=========================================================="
puts "VERIFYING HOMEPAGE CONTENT & ARCHITECTURE (PART 2)"
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

# 1. Prohibited keyword check
puts "\n1. Strict Prohibitions:"
all_files = Dir.glob("#{base_dir}/**/*.{js,json,html}")
prohibited = false
all_files.each do |f|
  next if f.include?('verify_')
  File.read(f).lines.each_with_index do |l, i|
    if l =~ /Visual Thinking/i && !(l =~ /Do NOT use|PROHIBIT|never use|rule|Strictly NO/i)
      prohibited = true
      puts "    Violation in #{f}:#{i+1} -> #{l.strip}"
    end
  end
end
assert(!prohibited, 'No unauthorized "Visual Thinking" found anywhere', failures)

# 2. Check 13 Projects in content/home/projects.json
puts "\n2. Verifying 13 Homepage Projects Data:"
json_path = "#{base_dir}/content/home/projects.json"
projects = JSON.parse(File.read(json_path))
assert(projects.length == 13, "Exactly 13 projects in content/home/projects.json (found: #{projects.length})", failures)

# 3. Check Permanent Routes exist on filesystem
puts "\n3. Verifying Permanent Project Routes:"
projects.each do |p|
  route_file = "#{base_dir}/#{p['href']}/index.html".gsub('//', '/')
  assert(File.exist?(route_file), "Permanent route exists: #{p['href']}index.html", failures)
end

# 4. Check Central Statement
puts "\n4. Verifying Central Hero Statement:"
statement_js = File.read("#{base_dir}/content/home/statement.js")
assert(statement_js.include?('[HERO STATEMENT]'), 'Central Statement contains [HERO STATEMENT] editable placeholder', failures)

# 5. Check Fisheye Cursor constraints in interaction tokens
puts "\n5. Verifying Fisheye Cursor Settings:"
tokens_js = File.read("#{base_dir}/src/config/interactions/interactionTokens.js")
assert(tokens_js.include?('LENS_SIZE'), 'LENS_SIZE defined', failures)
assert(tokens_js.include?('LENS_DISTORTION'), 'LENS_DISTORTION defined', failures)
assert(tokens_js.include?('LENS_MAGNIFICATION'), 'LENS_MAGNIFICATION defined', failures)
assert(tokens_js.include?('0.45') || tokens_js.include?('0.5'), 'Subtle/moderate distortion factor set', failures)

puts "\n=========================================================="
if failures.empty?
  puts "ALL CONTENT & ROUTING VERIFICATIONS PASSED (100%)"
else
  puts "FAILURES: #{failures.length}"
  exit 1
end
puts "=========================================================="
