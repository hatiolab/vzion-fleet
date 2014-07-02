require 'bundler/capistrano'

set :application, "vzionsys"

set :scm, :git
set :repository,  "git@github.com:hatiolab/vzionsys.git"
set :branch, 'master'

role :web, 'vzionsys.com'
role :app, 'vzionsys.com'
role :db,  'vzionsys.com', :primary => true

set :scm_user, "git"

set :user, "root"
set :deploy_to, "/home/#{user}/apps/#{application}"
set :deploy_via, :remote_cache
set :use_sudo, false

default_run_options[:pty] = true
ssh_options[:forward_agent] = true

after "deploy", "deploy:cleanup"

namespace :deploy do
  %w[start stop restart].each do |command|
    desc "#{command} unicorn server"
    task command, roles: :app, except: {no_release: true} do
      run "/etc/init.d/unicorn_#{application} #{command}"
    end
  end
  
  task :unicorn_restart, roles: :app do
    desc "unicorn server - cold reboot"
    run "/etc/init.d/unicorn_#{application} stop"
    run "/etc/init.d/unicorn_#{application} start"
  end
  after "deploy", "deploy:unicorn_restart"
 
  task :setup_config, roles: :app do
    sudo "ln -nfs #{current_path}/config/deploy/nginx.conf /etc/nginx/conf.d/#{application}.conf"
    sudo "ln -nfs #{current_path}/config/deploy/unicorn_init.sh /etc/init.d/unicorn_#{application}"
    run "mkdir -p #{shared_path}/uploads"
    run "mkdir -p #{shared_path}/config"
    put File.read("config/database.example.yml"), "#{shared_path}/config/database.yml"
    puts "Now edit the config files in #{shared_path}."
  end
  after "deploy:setup", "deploy:setup_config"
 
  task :symlink_config, roles: :app do
    run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
    run "ln -nfs #{shared_path}/uploads #{release_path}/public/uploads"
  end
  after "deploy:finalize_update", "deploy:symlink_config"
 
  desc "Make sure local git is in sync with remote."
  task :check_revision, roles: :web do
    unless `git rev-parse HEAD` == `git rev-parse origin/master`
      puts "WARNING: HEAD is not the same as origin/master"
      puts "Run `git push` to sync changes."
      exit
    end
  end
  before "deploy", "deploy:check_revision"

  desc "recreate all tables and migrate, and then seed."
  task :reset, roles: :app do
    rake = fetch(:rake, 'rake')
    rails_env = fetch(:rails_env, 'production')

    run "cd '#{current_path}' && #{rake} hatio:reset RAILS_ENV=#{rails_env}"
    # 'db:drop', 'db:create', 'db:migrate', 'db:seed'
  end
  before "reset", "deploy:update_code"
end

task :ls do
  run "ls"
end




# require "bundler/capistrano"
# require 'capistrano-unicorn'
# require File.join(File.dirname(__FILE__), 'deploy/nginx')
# require File.join(File.dirname(__FILE__), 'deploy/log')
# 
# set :default_environment, { 
#   'POSTGRES_PASSWORD' => 'test',
#   'POSTGRES_USERNAME' => 'testuser',
#   'CONFIGURE_ARGS' => "with-pg-config=/usr/pgsql-9.2/bin/pg_config"
# }
# 
# set :application, "VZionSys"
# set :repository,  "git@github.com:hatiolab/vzionsys.git"
# 
# set :scm, :git # You can set :scm explicitly or Capistrano will make an intelligent guess based on known version control directory names
# # Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`
# 
# set :deploy_to, "/var/www/vzionsys"
# 
# role :web, "121.199.1.200" # "system.vzionsys.com"                          # Your HTTP server, Apache/etc
# role :app, "121.199.1.200" # "system.vzionsys.com"                          # This may be the same as your `Web` server
# role :db,  "121.199.1.200" #  "system.vzionsys.com", :primary => true # This is where Rails migrations will run
# 
# set :user, "root"
# set :scm_user, "git"
# set :use_sudo, false
# 
# after 'deploy:restart', 'unicorn:reload' # app IS NOT preloaded
# after 'deploy:restart', 'unicorn:restart'  # app preloaded

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
#   task :start do ; end
#   task :stop do ; end
#   task :restart, :roles => :app, :except => { :no_release => true } do
#     run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
#   end
# end


# require File.join(File.dirname(__FILE__), 'deploy/nginx')
# require File.join(File.dirname(__FILE__), 'deploy/log')
# require "bundler/capistrano"
# 
# default_run_options[:pty] = true
# 
# set :ssh_options, { :forward_agent => true }
# 
# set :default_environment, { 
#   'POSTGRES_PASSWORD' => 'test',
#   'POSTGRES_USERNAME' => 'testuser',
#   'CONFIGURE_ARGS' => "with-pg-config=/usr/pgsql-9.2/bin/pg_config"
# }
# 
# set :application, "VZionSys"
# set :repository,  "git@github.com:hatiolab/vzionsys.git"
# 
# set :scm, :git
# set :user, "root"
# # set :scm_user, "git"
# set :use_sudo, false
# 
# set :user, "deploy"
# set :deploy_to, "/var/www/vzionsys"
# 
# set :rails_env, "production"
# set :branch, "master"
# 
# server "system.vzionsys.com", :web, :app, :db, :primary => true
# 
# namespace :deploy do
#   desc "Deploy the MFer"
#   task :default do
#     update
#     restart
#     cleanup
#   end
# 
#   desc "Setup a GitHub-style deployment."
#   task :setup, :except => { :no_release => true } do
#     run "git clone #{repository} #{current_path}"
#     update
#     run "mkdir -p #{current_path}/tmp/sockets && mkdir -p #{current_path}/tmp/pids"
#     db.setup
#     migrate
#     db.seed
#     start
#     cleanup
#     nginx.start
#   end
#   
#   desc "Update the deployed code."
#   task :update_code, :except => { :no_release => true } do
#     #run "cd #{current_path}; git fetch origin; git reset --hard #{branch}"
#     run "cd #{current_path}; git reset --hard; git pull origin master"
#   end
#   
#   desc "Deploy and run migrations"
#   task :migrations, :except => { :no_release => true } do
#     update
#     migrate
#     restart
#     cleanup
#   end
#   
#   desc "Run pending migrations on already deployed code"
#   task :migrate, :only => {:primary => true}, :except => { :no_release => true } do
#     run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake db:migrate"
#   end   
#   
#   task :symlink, :roles => :app, :except => { :no_release => true } do
#     #nothing yet - only exists to wipe out symlink task from super
#   end
#   
#   namespace :db do 
#       
#     desc "Seed the database on already deployed code"
#     task :seed, :only => {:primary => true}, :except => { :no_release => true } do
#       run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake db:seed"
#     end     
#   
#     desc "Setup application schema"
#     task :setup do
#       run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake db:create"  
#     end
#     
#     desc "Wipe tables then rerun all migrations and seed database"
#     task :remigrate, :only => {:primary => true}, :except => { :no_release => true } do
#       run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake db:remigrate"
#     end    
#   end
#   
#   namespace :rollback do
#     desc "Rollback"
#     task :default, :except => { :no_release => true } do
#       code
#     end
#     
#     desc "Rollback a single commit."
#     task :code, :except => { :no_release => true } do
#       set :branch, "HEAD^"
#       default
#     end
#   end
#   
#   task :cleanup, :roles => :app, :except => { :no_release => true } do
#     # nothing yet
#   end    
# 
#   # override default tasks to make capistrano happy
#   desc "Start unicorn"
#   task :start, :roles => :app do
#     run "cd #{current_path} && bundle exec unicorn -c #{current_path}/config/unicorn.rb -E #{rails_env} -D"
#   end
# 
#   desc "Kick unicorn"
#   task :restart, :roles => :app do
#     run "kill -USR2 `cat #{current_path}/tmp/pids/unicorn.pid`"
#   end
# 
#   desc "Kill a unicorn"
#   task :stop, :roles => :app do
#     run "kill -QUIT `cat #{current_path}/tmp/pids/unicorn.pid`"
#   end
# end
# 
# namespace :restore do
#   task :db, :roles => :db do
#     # from http://www.thegeekstuff.com/2009/01/how-to-backup-and-restore-postgres-database-using-pg_dump-and-psql/
#     # 
#     # psql -U {user-name} -d {desintation_db}-f {dumpfilename.sql}
#   end
# end
# 
# namespace :backup do
#   desc "Backup the database"
#   task :db, :roles => :db do
#     run "mkdir -p #{current_path}/backups"
#     run "cd #{current_path}; pg_dump -U #{user} #{application}_production -f backups/#{Time.now.utc.strftime('%Y%m%d%H%M%S')}.sql"
#   end
# 
#   desc "Backup the database and download the script"
#   task :download, :roles => :app do
#     db
#     timestamp = Time.now.utc.strftime('%Y%m%d%H%M%S') 
#     run "mkdir -p backups"
#     run "cd #{current_path}; tar -cvzpf #{timestamp}_backup.tar.gz backups"
#     get "#{current_path}/#{timestamp}_backup.tar.gz", "#{timestamp}_backup.tar.gz"
#   end
# end
# 
# namespace :assets do
#   task :precompile, :roles => :web do
#     run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake assets:precompile"
#   end
#   
#   task :clean, :roles => :web do
#     run "cd #{current_path}; RAILS_ENV=#{rails_env} bundle exec rake assets:clean"
#   end
# end
# 
# namespace :bundler do
#   task :bundle_new_release, :roles => :app do
#     run "cd #{current_path} && bundle install --deployment --quiet --without development test cucumber"
#   end
# end
#   
# after 'deploy:update_code', 'bundler:bundle_new_release'
# after 'deploy:update_code', 'assets:precompile'