module Fleet
  class Engine < ::Rails::Engine
    # isolate_namespace Fleet
    paths["db/migrate"] << "db/migrate"
    paths["db/seeds.rb"] << "db/seeds.rb"    
  end
end
