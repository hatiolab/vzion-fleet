# Select ubuntu as the base image
FROM ubuntu
MAINTAINER heartyoh@hatiolab.com

# Install postgresql
RUN apt-key adv --keyserver keyserver.ubuntu.com --recv-keys B97B0AFCAA1A47F044F244A07FCC7D46ACCC4CF8
RUN echo "deb http://apt.postgresql.org/pub/repos/apt/ precise-pgdg main" > /etc/apt/sources.list.d/pgdg.list
RUN apt-get update

RUN apt-get -y -q install python-software-properties software-properties-common
RUN apt-get -y -q install postgresql-9.3 postgresql-client-9.3 postgresql-contrib-9.3

USER postgres

RUN /etc/init.d/postgresql start &&\
    psql --command "CREATE USER root WITH SUPERUSER PASSWORD 'root';" &&\
    createdb -O root root

VOLUME  ["/etc/postgresql", "/var/log/postgresql", "/var/lib/postgresql", "/vzion-fleet"]

USER root

# Install nginx, nodejs and curl
RUN apt-get update -q
RUN apt-get install -qy nginx
RUN apt-get install -qy curl
RUN apt-get install -qy nodejs
RUN echo "daemon off;" >> /etc/nginx/nginx.conf

# Install rvm, ruby, bundler
RUN gpg --keyserver hkp://keys.gnupg.net --recv-keys D39DC0E3
RUN curl -sSL https://get.rvm.io | bash -s stable
RUN /bin/bash -l -c "rvm requirements"
RUN /bin/bash -l -c "rvm install 2.1.0"
RUN /bin/bash -l -c "gem install bundler --no-ri --no-rdoc"

# Add configuration files in repository to filesystem
ADD config/container/nginx-sites.conf /etc/nginx/sites-enabled/default
ADD config/container/start-server.sh /usr/bin/start-server
ADD config/container/start-server-dev.sh /usr/bin/start-server-dev
RUN chmod +x /usr/bin/start-server
RUN chmod +x /usr/bin/start-server-dev

# Install postgresql library, git
RUN apt-get install -qy libpq-dev
RUN apt-get install -qy git

# Add rails project to project directory
ADD ./ /vzion-fleet

# set WORKDIR
WORKDIR /vzion-fleet

# bundle install
RUN /bin/bash -l -c "bundle install"

# Build Asset Pipeline for production [only for PROD]
# RUN /bin/bash -l -c "rake assets:precompile RAILS_ENV=production"

# Publish port [PROD : 80, DEV : 3000]
# EXPOSE 80
EXPOSE 3000

# Startup commands [PROD : start-server, DEV : start-server-dev]
# ENTRYPOINT /usr/bin/start-server
ENTRYPOINT /usr/bin/start-server-dev
