Rails.application.routes.draw do
  root to: 'presentation#index'

  resources :slides

  get 'active_slides' => 'presentation#active_slides', :defaults => { :format => 'json' }
end
