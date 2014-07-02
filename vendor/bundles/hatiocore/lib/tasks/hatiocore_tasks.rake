namespace :hatio do
  
  desc "Detect mismatching tags javascript files"
  task :detect_mismatch_tags do
    require 'utils/detect_mismatch_tags'

    unless ENV.include?("tags")
      raise "usage: rake hatio:detect_mismatch_tags tags='{,[,('" 
    end

    tags = ENV['tags']

    puts "tags : #{tags}"
    
    find_mismatches tags
  end
  
  desc "Reset database, tables and data!"
  task :reset => [:environment, 'db:drop', 'db:create', 'db:migrate', 'db:seed']
  
  desc "Create database, tables and load initial data!"
  task :setup => [:environment, :setup_dbconfig, 'db:create', 'db:migrate', 'db:seed']

  desc "Seed"
  task :seed => [:environment, 'db:seed']
    
  desc "Migrate db and data"
  task :migrate => [:environment, 'db:migrate', 'db:seed']
  
  desc "Upload locale files to Database"
  task :upload_locale => :environment do
    require 'utils/upload_locale'

    Domain.current_domain = Domain.find_by(name: ENV['domain'] || 'System')
    User.current_user = User.find_by(name: ENV['user'] || 'admin')
    
    upload_locale
  end
  
  desc "Create domain data to Database"
  task :create_domain => :environment do

    if ENV['domain'].nil?
      raise "usage: rake hatio:create_domain domain={domain name}"
    end
    
    Rake::Task["db:seed"].invoke
  end
  
end
