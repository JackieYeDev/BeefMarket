class InventoriesController < ApplicationController
  before_action :authorize
  def index
    inventories = Inventory.all
    render json: inventories
  end

  private
  def authorize
    return render json: {error:"Unauthorized. Please login first"}, status: :unauthorized unless session.include? :user_id
  end
end
