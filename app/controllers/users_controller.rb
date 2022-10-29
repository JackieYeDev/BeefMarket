class UsersController < ApplicationController
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, include: ['cart']
    else
      render json: { error: "Not Authorized" }, status: :unauthorized
    end
  end
  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      cart = Cart.create(user_id: session[:user_id])
      session[:cart_id] = cart.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end
  private
  def user_params
    params.permit(:username, :password, :password_confirmation)
  end
end
