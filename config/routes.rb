VzionSys::Application.routes.draw do

  devise_for :users, controllers: { sessions: "sessions" }

  devise_scope :user do
    get "login", to: "sessions#new"
    get "logout", to: "sessions#destroy"
  end

  root to: 'site#main'
  
  get "#{GlobalConfig.ops_name}" => "welcome##{GlobalConfig.ops_name}"
  
  get "#{GlobalConfig.std_name}" => "welcome##{GlobalConfig.std_name}"
    
  get 'spc_chart' => 'welcome#spc_chart'
  
  get 'cfinstall' => 'welcome#cfinstall'
  
  get 'site_main' => 'site#main'
  get 'site_industries' => 'site#industries'
  get 'site_indu_automotive' => 'site#indu_automotive'
  get 'site_indu_electronics' => 'site#indu_electronics'
  get 'site_indu_mechanics' => 'site#indu_mechanics'
  get 'site_indu_metalforming' => 'site#indu_metalforming'
  get 'site_indu_logistics' => 'site#indu_logistics'
  get 'site_products' => 'site#products'
  get 'site_prod_mes' => 'site#prod_mes'
  get 'site_prod_qms' => 'site#prod_qms'
  get 'site_prod_scm' => 'site#prod_scm'
  get 'site_prod_crm' => 'site#prod_crm'
  get 'site_prod_edm' => 'site#prod_edm'
  get 'site_prod_wms' => 'site#prod_wms'
  get 'site_company' => 'site#company'
  get 'site_support' => 'site#support'
  
  post 'site_contact' => 'site#contact'

  # # The priority is based upon order of creation: first created -> highest priority.
  # # See how all your routes lay out with "rake routes".
  # 
  # # You can have the root of your site routed with "root"
  # root to: 'welcome#index'
  # 
  # resources :users, :only => [:show, :index, :edit, :update]
  
  Hatio::Bundle.ordered_bundle_list.each do |bundle|
    mount bundle.module::Engine => "/"
  end

end
