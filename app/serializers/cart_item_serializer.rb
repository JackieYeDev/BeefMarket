class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :cart_id, :quantity
  belongs_to :inventory
end
