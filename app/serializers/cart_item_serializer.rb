class CartItemSerializer < ActiveModel::Serializer
  attributes :id, :cart_id, :inventory_id, :quantity
end
