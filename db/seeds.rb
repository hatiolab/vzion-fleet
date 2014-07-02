Hatio::Bundle.ordered_bundle_list.each do |bundle|
  bundle_name = bundle.name
  
  spec = Gem::Specification.find_by_name(bundle_name)
  gem_root = spec.gem_dir
  gem_seeds = gem_root + "/db/seeds.rb"  

  load gem_seeds
end

Dir[File.join(File.dirname(__FILE__), 'seeds', '*.rb')].sort.each do |seed|
  puts "Seeding Application ... #{seed}"
  load seed
end
