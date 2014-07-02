#encoding: utf-8 

CommonCode.setup :HEALTH_STATUS, {:description => 'Vehicle Health Status'} do
  code 'Overdue' => 'Overdue'
  code 'Health' => 'Health'
  code 'Impending' => 'Impending'
  code 'None' => 'None'
end

CommonCode.setup :RUN_STATUS, {:description => 'Vehicle Running Status'} do
  code 'Idle' => 'Overdue'
  code 'Incident' => 'Health'
  code 'Maint' => 'Impending'
  code 'None' => 'None'
  code 'Running' => 'Running'
end

CommonCode.setup :V_CLASS, {:description => 'Vehicle Classification'} do
  code 'Bus' => 'bus'
  code 'Hatchback' => 'hatchback'
  code 'Minibus' => 'minibus'
  code 'Sedan' => 'sedan'
  code 'SUV' => 'suv'
  code 'Truck' => 'truck'
  code 'VAN' => 'van'
  code 'Wagon' => 'wagon'
end

CommonCode.setup :V_FUEL, {:description => 'Vehicle Fuel Type'} do
  code 'Diegel' => 'Diegel'
  code 'Electric' => 'Electric'
  code 'GAS' => 'GAS'
  code 'Hibrid' => 'Hibrid'
  code 'LPG' => 'LPG'
end

CommonCode.setup :V_OWNERSHIP, {:description => 'Vehicle Ownership'} do
  code 'Company' => 'Company'
  code 'Personal' => 'Personal'
  code 'Rent' => 'Rent Car'
end

CommonCode.setup :V_VENDOR, {:description => 'Vehicle Vendor'} do
  code 'Audi' => 'Audi'
  code 'BMW' => 'BMW'
  code 'Benz' => 'Benz'
  code 'Ferrari' => 'Ferrari'
  code 'Ford' => 'Ford'
  code 'GM' => 'GM'
  code 'Hyundai' => 'Hyundai'
  code 'Kia' => 'Kia'
  code 'Renault' => 'Renault'
  code 'Toyota' => 'Toyota'
  code 'Volkswagen' => 'Volkswagen'
end

CommonCode.setup :REPLACE_UNIT, {:description => 'Consumable Replacement Unit'} do
  code 'Duration' => 'Duration'
  code 'Mileage' => 'Mileage'
  code 'Both' => 'Mileage & Duration'
end