# -*- encoding: utf-8 -*-
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'fleet/version'

Gem::Specification.new do |gem|
  gem.name          = "fleet"
  gem.version       = Fleet::VERSION
  gem.authors       = ["hatiolab"]
  gem.email         = ["admin@hatiolab.com"]
  gem.description   = %q{Bundle Fleet}
  gem.summary       = %q{Bundle for fleet}
  gem.homepage      = "http://www.hatiolab.com"

  gem.files         = `git ls-files`.split($/)
  gem.executables   = gem.files.grep(%r{^bin/}).map{ |f| File.basename(f) }
  gem.test_files    = gem.files.grep(%r{^(test|spec|features)/})
  gem.require_paths = ["lib"]
end