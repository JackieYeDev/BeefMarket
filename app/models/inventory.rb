class Inventory < ApplicationRecord
  has_many :order_details
  has_many :orders, through: :order_details

  validates :stock, comparison: {greater_than_or_equal_to: :updated_stock}, on: :update
end
