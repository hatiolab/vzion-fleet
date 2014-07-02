class <%= class_name %> < ActiveRecord::Base
    <%= Hatio::Generators::ModelUtil.generateModelBody(options, @attributes) %>
end
