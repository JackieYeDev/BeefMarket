class Inventory < ApplicationRecord
  has_many :order_details
  has_many :orders, through: :order_details
end
