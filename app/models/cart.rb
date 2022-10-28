class Cart < ApplicationRecord
  has_many :cart_items, dependent: :destroy
  has_many :inventories, through: :cart_items
  belongs_to :user

  def total_price
    cart_items.to_a.sum do |item|
      price = Inventory.find(item.inventory_id).price
      price * item.quantity
    end
  end
end
