#!/bin/bash

# Start Database
/etc/init.d/postgresql start

cd /vzionsys
source /etc/profile.d/rvm.sh

# Reset database : generate database, table, seed data
bundle exec rake hatio:reset RAILS_ENV=production

# Start Unicorn Server as a deamon
bundle exec unicorn -D -p 8080 -E production

# Start NginX Server (should not start as a deamon)
nginx
