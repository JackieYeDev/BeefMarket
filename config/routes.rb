Rails.application.routes.draw do

  resources :carts
  resources :cart_items
  resources :inventories
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  get "/me", to: "users#show"
  get "/order", to: "orders#show"
  get "/cart", to: "carts#show"
  get "/cart_item", to: "cart_items#show"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  post "/order", to: "orders#create"
  delete "/cart", to: "carts#destroy"
  delete "/logout", to: "sessions#destroy"
  delete "/cart_items", to: "cart_items#destroy"
end
