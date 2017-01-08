Rails.application.routes.draw do
  root to: 'presentation#index'

  resources :slides
end
