class OrdersController < ApplicationController
  def show
    user = User.find_by(id: session[:user_id])
    if user
      orders = user.orders
      render json: orders
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
  def create
    user = User.find_by(id: session[:user_id])
    # If User is in Session, begin create! Order
    if user
      order = Order.create!(user_id: user.id, order_total: params[:order_total])
      cart = user.cart.cart_items
      cart.each do |c|
        inv = Inventory.find(c.inventory_id)
        order.order_details.create!(inventory_id: inv.id, product_name: inv.name, price: inv.price, quantity: c.quantity)
      end
      user.cart.destroy
      render json: order, status: :created
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
