class OrderSerializer < ActiveModel::Serializer
  attributes :id
  has_many :order_details
end
