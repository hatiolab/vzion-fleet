require File.expand_path('../boot', __FILE__)

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(:default, Rails.env)

require 'carrierwave/orm/activerecord'

# require 'log4r'
# require 'log4r/yamlconfigurator'
# require 'log4r/outputter/rollingfileoutputter'
# require 'log4r/outputter/consoleoutputters'
# include Log4r

module VzionSys
  class Application < Rails::Application

    # log4r_config= YAML.load_file(File.join(File.dirname(__FILE__),"log4r.yml"))
    # YamlConfigurator.decode_yaml( log4r_config['log4r_config'] )
    # config.logger = Log4r::Logger[Rails.env]

    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    
    config.exceptions_app = self.routes
  end
end
