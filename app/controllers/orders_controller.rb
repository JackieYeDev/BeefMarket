class OrdersController < ApplicationController
  before_action :authorize
  def show
    user = current_user
    orders = user.orders
    render json: orders
  end
  def create
    user = current_user
    order = Order.create!(user_id: user.id, order_total: params[:order_total])
    cart = user.cart.cart_items
    cart.each do |c|
      inv = Inventory.find(c.inventory_id)
      order.order_details.create!(inventory_id: inv.id, product_name: inv.name, price: inv.price, quantity: c.quantity)
    end
    user.cart.destroy
    render json: order, status: :created
  end

  private
  def authorize
    return render json: { error:"Unauthorized. Please login first." }, status: :unauthorized unless session.include? :user_id
  end
  def current_user
    user = User.find(session[:user_id])
  end
end
