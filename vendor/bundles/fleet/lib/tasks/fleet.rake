namespace :fleet do
  
  desc "Load Fleet initial data"
  
  task :load_data => :environment do
    puts "Start to load Fleet inital data ...."
    
    load "#{Rails.root}/vendor/bundles/fleet/db/seeds/seeds.rb"
    
    puts "Completed to load Fleet inital data!"
  end
  
  desc "Load Fleet data from files - rake fleet:load_file[src_file_name]"
  
  task :load_file, [:src_file_name] => :environment do |t, args|
    src_file_name = args.src_file_name
    puts "Start to load #{src_file_name} file ...."
    
    load "#{Rails.root}/vendor/bundles/fleet/db/seeds/#{src_file_name}"
    
    puts "Completed to load file!"
  end
  
end
