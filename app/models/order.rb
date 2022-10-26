class Order < ApplicationRecord
  belongs_to :user
  has_many :order_details, dependent: :destroy

  # TODO: Add validation to check if order quantity does not exceed inventory stock
end
