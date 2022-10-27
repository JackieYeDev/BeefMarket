class CartItem < ApplicationRecord
  has_one :cart
  has_many :inventories
end
