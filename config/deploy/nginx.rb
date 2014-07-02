Capistrano::Configuration.instance.load do
  namespace :nginx do
    desc "Restart nginx"
    task :restart, :roles => :app , :except => { :no_release => true } do
      sudo "/etc/init.d/nginx restart"
    end
    
    desc "Stop nginx"
    task :stop, :roles => :app , :except => { :no_release => true } do
      sudo "/etc/init.d/nginx stop"
    end
    
    desc "Start nginx"
    task :start, :roles => :app , :except => { :no_release => true } do
      sudo "/etc/init.d/nginx start"
    end

    desc "Show nginx status"
    task :status, :roles => :app , :except => { :no_release => true } do
      sudo "/etc/init.d/nginx status"
    end
  end
end  