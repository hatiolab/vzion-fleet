Dir[File.join(File.dirname(__FILE__), 'seeds', '*.rb')].sort.each do |seed|
  puts "Seeding Fleet ... #{seed}"
  load seed
end
