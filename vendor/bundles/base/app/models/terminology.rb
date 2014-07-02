class Terminology < ActiveRecord::Base
  
  include Multitenant
  
  strip_cols [:name]
	stampable
  
  validates_presence_of :name, :strict => true
  validates_presence_of :locale, :strict => true
  validates_presence_of :category, :strict => true
  validates :name, length: { maximum: 60 }, :strict => true
  validates :display, length: { maximum: 255 }, :strict => true
  validates :description, length: { maximum: 255 }, :strict => true
  validates_uniqueness_of :name, :strict => true, :scope => [:domain_id, :locale, :category]

  before_save :expire_resource_json_cache
  before_destroy :expire_resource_json_cache
  
  def self.to_resource locale
    @@resource_json ||= {}
    @@resource_json["#{Domain.current_domain.id}:#{locale}"] ||= begin
      terms = select([:category, :name, :display, :display_short]).where(locale: locale).order(:category, :name)
      terms.group_by(&:category).reduce({}) do |resource, (category, terms)|
        resource[category] = terms.reduce({}) do |cat, term|
          cat[term.name] = term.display unless term.display.blank?
          cat[term.name + '.short'] = term.display_short unless term.display_short.blank?
          cat
        end
        resource
      end.to_json
    end
  end
  
  def self.t category, name, short
    t = where(locale: I18n.locale, category: category, name: name).first
    t ? (short ? t.display_short : t.display) : ("#{category}.#{name}" + (short ? ".short" : ''))
  end
private
  
  def expire_resource_json_cache
    @@resource_json["#{self.domain_id}:#{self.locale}"] = nil if defined? @@resource_json
  end
end
