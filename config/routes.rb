PosSystem::Application.routes.draw do

  resources :items

  # resources :bill do
  # 	post 'placeorder', on: :member
  # end

  root to: "bill#index"
  match "bill/create", to: "bill#create", via: [:post]
  match "bill/place_order", to: "bill#place_order", via: [:post]
  match "bill/view_bill", to: "bill#view_bill", via: [:get]
end
