class <%= class_name %>Version < ActiveRecord::Base
<%= Hatio::Generators::ModelUtil.generateVersionModelBody(singular_name, options, @attributes) %>
end
