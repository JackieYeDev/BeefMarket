class UsersController < ApplicationController
  before_action :authorize
  skip_before_action :authorize, only: [:create]
  def show
    user = current_user
    render json: user, include: ['cart']
  end
  def create
    user = User.create(user_params)
    if user.valid?
      session[:user_id] = user.id
      session[:admin] = user.admin
      cart = Cart.create(user_id: session[:user_id])
      session[:cart_id] = cart.id
      render json: user, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.permit(:username, :admin, :password, :password_confirmation)
  end

  def current_user
    user = User.find(session[:user_id])
    user
  end
  def authorize
    return render json: { error: "Unauthorized." }, status: :unauthorized unless session.include? :user_id
  end
end
