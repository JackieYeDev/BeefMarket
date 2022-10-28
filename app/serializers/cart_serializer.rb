class CartSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :total_price
  has_many :cart_items
end
