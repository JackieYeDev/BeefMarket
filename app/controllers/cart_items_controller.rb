class CartItemsController < ApplicationController
  before_action :authorize
  def create
    inventory = Inventory.find(params[:inventory_id])
    # Check to see if it is in stock
    if inventory.stock < 1
      # Return error if it is no longer in stock
      render json: { error: "The quantity added is greater than what we have in stock" }, status: :unprocessable_entity
    else
      inventory.update(:stock => inventory.stock - 1)
      # Check if the cart_items has the following item already
      cart_item = CartItem.find_by(cart_id: params[:cart_id], inventory_id: params[:inventory_id])
      if cart_item.nil?
        cart_item = CartItem.create(cart_id: params[:cart_id], inventory_id: params[:inventory_id], quantity: 1)
        render json: cart_item, status: :created
      else
        new_quantity = cart_item.quantity + 1
        cart_item.update(:quantity => new_quantity)
        render json: cart_item, status: :created
      end
    end
  end
  def destroy
    cart_item = CartItem.find_by(id: params[:cart_item_id])
    inventory_item = Inventory.find(cart_item.inventory_id)
    new_stock = inventory_item.stock + cart_item.quantity
    inventory_item.update(:stock => new_stock)
    cart_item.destroy
    head :no_content
  end

  private
  def authorize
    return render json: {error:"Unauthorized. Please login first"}, status: :unauthorized unless session.include? :user_id
  end
end
