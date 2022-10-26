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
      # Get order details from array of items
      order_array = params[:order_array]
      order = Order.create!(user_id: user.id, order_total: params[:order_total])
      order_array.each do |details|
        order.order_details.create!(inventory_id: details["id"], product_name: details["name"], price: details["price"], quantity: details["quantity"])
        inventory = Inventory.find(details["id"])
        updated_stock = inventory.stock - details["quantity"]
        inventory.update(:stock => updated_stock)
      end
      render json: order, status: :created
    else
      render json: { error: "Unprocessable Entity" }, status: :unprocessable_entity
    end
  end

  private
  def order_params
    params.permit(:order_array)
  end
end
