class Inventory < ApplicationRecord
  has_many :order_details
  has_many :orders, through: :order_details
  has_many :cart_items
  # Only works with Rails 7
  # validates :stock, numericality: {greater_than_or_equal_to: :updated_stock}, on: :update
end
