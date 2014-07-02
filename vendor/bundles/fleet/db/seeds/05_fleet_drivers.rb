#encoding: utf-8 

Driver.create! :name => 'D-001', :description => '김춘석', :division => '1사업부', :title => '이사', :social_id => '700101-xxxxxx', :phone_no => '031-xxx-xxxx', :mobile_no => '010-xxx-1214'
Driver.create! :name => 'D-002', :description => '홍길동', :division => '2사업부', :title => '차장', :social_id => '720719-xxxxxx', :phone_no => '070-xxx-xxxx', :mobile_no => '010-xxx-9873'
Driver.create! :name => 'D-003', :description => '최철호', :division => '3사업부', :title => '과장', :social_id => '761201-xxxxxx', :phone_no => '02-xxx-xxxx', :mobile_no => '010-xxx-1098'
Driver.create! :name => 'D-004', :description => '이현성', :division => '4사업부', :title => '대리', :social_id => '820225-xxxxxx', :phone_no => '02-xxx-xxxx', :mobile_no => '010-xxx-6518'

DriverGroup.create! :name => "Group A", :description => "그룹 A"
DriverGroup.create! :name => "Group B", :description => "그룹 B"

GroupsDrivers.create! :driver_group_id => 1, :driver_id => 1
GroupsDrivers.create! :driver_group_id => 2, :driver_id => 2
GroupsDrivers.create! :driver_group_id => 1, :driver_id => 3
GroupsDrivers.create! :driver_group_id => 2, :driver_id => 4