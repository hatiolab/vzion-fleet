Fleet::Engine.routes.draw do
  # RESOURCES BEGIN BLOCK DON'T REMOVE
	resources :tasks do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
      get :task_calendar
		end
	end

	resources :incidents do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
      get :incident_logs
		end
	end

	resources :vehicle_consumables do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicle_checkins do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :driver_speed_sums do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :driver_run_sums do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicle_speed_sums do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicle_run_sums do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :driver_statuses do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicle_traces do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicle_statuses do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicle_groups do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
    member do
      get :vehicles
      post :update_groups_vehicles
    end
	end

	resources :driver_groups do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
    member do
      get :drivers
      post :update_groups_drivers
    end
	end

	resources :terminals do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :vehicles do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
      get :simulation_service
		end
    member do
      get :repairs
      post :update_vehicle_repairs
    end
	end

	resources :drivers do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :locations do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

	resources :consumables do
		collection do
			post :update_multiple
			get :show_by_name
			get :export
		end
	end

end
