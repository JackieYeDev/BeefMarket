class SessionsController < ApplicationController
  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      if user.cart
        session[:cart_id] = user.cart.id
      else
        cart = Cart.create!(user_id: session[:user_id])
        session[:cart_id] = cart.id
      end
      render json: user, status: :created
    else
      render json: { error: "Invalid username or password"}, status: :unauthorized
    end
  end

  def destroy
    if session[:user_id] != nil
      session.delete [:user_id, :cart_id]
      head :no_content
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
