module Hatio
  module Generators
    class ModelUtil
  
      #
      # 모델 정보를 생성하여 리턴 
      #
      def self.generateModelBody(options, attributes)
        output, creatorFlag, updaterFlag, createdAtFlag, updatedAtFlag, nameFlag, domainFlag = "\n\t", false, false, false, false, false, false
        attributes.each do |attr|
          case attr.name
          when 'id'
          when 'name'
            nameFlag = true
            # attr_accessibles << ":#{attr.name}"
          when 'domain_id'
            domainFlag = true
          when 'creator_id'
            creatorFlag = true
          when 'updater_id'
            updaterFlag = true
          when 'created_at'
            createdAtFlag = true
          when 'updated_at'
            updatedAtFlag = true
          when 'deleted_at'
          when 'version'
          else
            # attr_accessibles << ":#{attr.name}"
          end
        end
    
        output << "include Multitenant\n\n\t" if(domainFlag)
        # output << "acts_as_versioned\n\t" if(options && options.history == 'y')
        output << "stampable\n\t" if(createdAtFlag || creatorFlag)
        # output << "meaningful_id [:domain_id, :name]\n\t" if(options.id_type == 'meaningful' && domainFlag && nameFlag)
        # output << "universal_unique_id\n\t" if(options.id_type == 'uuid')
        # output << "default_scope { where(domain_id: Domain.current_domain.id) }\n\t"

        # console에서 명령 내린 경우가 아니면 ...
        if(attributes[0].class.name != "Rails::Generators::GeneratedAttribute")
          belong_to_arr = attributes.select { |attr| attr.name != 'creator_id' && attr.name != 'updater_id' && attr.ref_type == 'Entity' && attr.ref_name }
          belong_to_arr.each do |belongs_to|
            entityName = belongs_to.ref_name
            begin
              next if(entityName == 'Domain')
              entityClass = entityName.constantize
              output << "belongs_to :#{entityName.underscore}\n\t"
            rescue Exception => e
              debug_print e
            end
          end
        else
          # output << "belongs_to :domain\n\t" if(domainFlag)
        end
    
        # if attr_accessibles
        #   attr_accessibles_str = attr_accessibles.join(',')
        #   output << "attr_accessible #{attr_accessibles_str}\n" 
        # end
        
        output
      end
  
      #
      # version model 정보 생성하여 리턴 
      #
      def self.generateVersionModelBody(singular_name, options, attributes)
        output, creatorFlag, updaterFlag, createdAtFlag, updatedAtFlag, nameFlag, domainFlag = "\n\t", false, false, false, false, false, false
        attributes.each do |attr|
          case attr.name
          when 'id'
          when 'name'
            nameFlag = true
            # attr_accessibles << ":#{attr.name}"
          when 'domain_id'
            domainFlag = true
          when 'creator_id'
            creatorFlag = true
          when 'updater_id'
            updaterFlag = true
          when 'created_at'
            createdAtFlag = true
          when 'updated_at'
            updatedAtFlag = true
          when 'deleted_at'
          when 'version'
          else
            # attr_accessibles << ":#{attr.name}"
          end
        end
    
        output << "include Multitenant\n\n\t" if(domainFlag)
        output << "stampable\n\t" if(createdAtFlag || creatorFlag)
        output << "meaningful_id [:#{singular_name}_id, :version]\n\t"
        output << "belongs_to :#{singular_name}\n\t"

        # console에서 명령 내린 경우가 아니면 ...
        if(attributes[0].class.name != "Rails::Generators::GeneratedAttribute")
          belong_to_arr = attributes.select { |attr| attr.name != 'creator_id' && attr.name != 'updater_id' && attr.ref_type == 'Entity' && attr.ref_name }
          belong_to_arr.each do |belongs_to|
            entityName = belongs_to.ref_name
            begin
              entityClass = entityName.constantize
              output << "belongs_to :#{entityName.underscore}\n\t"
            rescue Exception => e
            end
          end
        else
          # output << "belongs_to :domain\n\t" if(domainFlag)
        end
    
        # if attr_accessibles
        #   attr_accessibles_str = attr_accessibles.join(',')
        #   output << "attr_accessible #{attr_accessibles_str}\n" 
        # end
        
        output
      end

    end
    
  end
end
