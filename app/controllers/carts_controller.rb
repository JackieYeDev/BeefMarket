class CartsController < ApplicationController
  def show
    # Find user from session
    user = User.find(session[:user_id])
    # If user is found
    if user
      # Check is user has an existing cart
      if user.cart
        render json: user.cart, include: ['cart_items', 'cart_items.inventory']
      else
        # Create new cart
        cart = Cart.create(user_id: session[:user_id])
        render json: cart, status: :created
      end
    else
      render json: {errors: user.errors.full_messages}, status: :unauthorized
    end
  end

  def destroy
    user = User.find(session[:user_id])
    if user
      user.cart.destroy
      head :no_content
    else
      render json: { errors: user.errors.full_messages }, status: :unauthorized
    end

  end
end
