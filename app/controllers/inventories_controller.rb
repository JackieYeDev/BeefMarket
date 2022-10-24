class InventoriesController < ApplicationController
  def index
    user = User.find_by(id: session[:user_id])
    if user
      inventories = Inventory.all
      render json: inventories
    else
      render json: { error: "Unauthorized" }, status: :unauthorized
    end
  end
end
