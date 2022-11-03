class CartsController < ApplicationController
  before_action :authorize
  def show
    # Find user from session
    user = current_user
    # Check is user has an existing cart
    if user.cart
      session[:cart_id] = user.cart.id
      render json: user.cart, include: ['cart_items', 'cart_items.inventory']
    else
      # Create new cart
      cart = Cart.create(user_id: session[:user_id])
      session[:cart_id] = cart.id
      render json: cart, status: :created
    end
  end

  def destroy
    user = current_user
    cart_items = user.cart.cart_items
    cart_items.map do |item|
      inventory_item = Inventory.find(item.inventory_id)
      new_stock = inventory_item.stock + item.quantity
      inventory_item.update(:stock => new_stock)
    end
    user.cart.destroy
    head :no_content
  end

  private
  def authorize
    return render json: {error:"Unauthorized. Please login first"}, status: :unauthorized unless session.include? :user_id
  end

  def current_user
    user = User.find(session[:user_id])
  end
end
