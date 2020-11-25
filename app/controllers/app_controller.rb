class AppController < ApplicationController
  def index
    @auth_data = check_authenticated
    render 'app'
  end

  private

  def check_authenticated
    token = cookies.signed[:twitter_session_token]
    session = Session.find_by(token: token)

    if session
      auth_data = {authenticated: true, user: session.user}.to_json
    else
      auth_data = {authenticated: false}.to_json
    end

    auth_data
  end
end
