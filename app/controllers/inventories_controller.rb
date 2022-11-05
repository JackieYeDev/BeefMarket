class InventoriesController < ApplicationController
  before_action :authorize
  before_action :authorize_admin, only: [:create]
  skip_before_action :authorize, only: [:filter]

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found
  def index
    inventories = Inventory.all
    render json: inventories
  end

  def filter
    inventories = Inventory.where("stock >= ?", params[:number])
    render json: inventories
  end

  def create
    inventory = Inventory.create!(inventory_params)
    render json: inventory, status: :created
  end

  def destroy
    inventory = Inventory.find(params[:id])
    inventory.destroy
    head :no_content
  end

  private
  def inventory_params
    params.permit(:name, :price, :stock, :image_url)
  end

  def render_unprocessable_entity_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  def render_not_found
    render json: {error: "Record not found"}, status: :not_found
  end
  def authorize
    return render json: {error:"Unauthorized. Please login first"}, status: :unauthorized unless session.include? :user_id
  end

  def authorize_admin
    return render json: {error: "Unauthorized. Only admins can use this page"}, status: :unauthorized unless session[:admin] == true
  end
end
