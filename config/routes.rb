Rails.application.routes.draw do
  get '/tweets' => 'tweets#index'
  get '/tweets/:username' => 'tweets#index_by_user'
  post '/tweets' => 'tweets#create'
  delete '/tweets' => 'tweets#destroy'

  get '/authenticated' => 'sessions#authenticated'
  post '/sessions' => 'sessions#create'
  delete '/sessions' => 'sessions#destroy'

  post '/users' => 'users#create'

  get '/login' => 'app#index'
  get '/:username' => 'app#index'
  get '/dashboard' => 'app#index'

  root to: 'app#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  
end
