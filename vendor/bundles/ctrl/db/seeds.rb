Dir[File.join(File.dirname(__FILE__), 'seeds', '*.rb')].sort.each do |seed|
  puts "Seeding Ctrl ... #{seed}"
  load seed
end
