class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_total, :created_at
  has_many :order_details
end
