Rails.application.routes.draw do
  
  resources :inventories
  resources :users
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  get "/me", to: "users#show"
  get "/order", to: "orders#show"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  post "/order", to: "orders#create"
  delete "/logout", to: "sessions#destroy"
end
