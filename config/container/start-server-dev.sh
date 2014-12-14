#!/bin/bash

# Start Database
/etc/init.d/postgresql start

cd /vzion-fleet
source /etc/profile.d/rvm.sh

# Reset database : generate database, table, seed data
bundle exec rake hatio:reset RAILS_ENV=development

# Due to upgrade to rails 4.1.2
export SECRET_KEY_BASE=b4d7c3bc6ed805c1f4e9d167659f9b194ff46e7751f90b58b6868b1c3069df78097ede08680a4b4a17be6672dbd468645ab815442c5ce32969401616696241d3

# Start Unicorn Server as a deamon
# bundle exec unicorn -D -p 3000 -E production
bundle exec rails s
