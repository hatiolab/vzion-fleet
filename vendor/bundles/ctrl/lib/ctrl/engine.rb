module Ctrl
  class Engine < ::Rails::Engine
    # isolate_namespace Ctrl
    paths["db/migrate"] << "db/migrate"
    paths["db/seeds.rb"] << "db/seeds.rb"    
  end
end
