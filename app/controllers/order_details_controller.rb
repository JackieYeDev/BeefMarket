class OrderDetailsController < ApplicationController
  before_action :authorize
  def index
    order_details = OrderDetail.where(order_id: params[:order_id])
    render json: order_details
  end

  private
  def authorize
    return render json: {error: "Unauthorized. Please login first"}, status: :unauthorized unless session.include? :user_id
  end
  def render_response_record_not_found
    render json: { error: "Order details not found" }, status: :not_found
  end
end
