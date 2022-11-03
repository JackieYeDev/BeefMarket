class OrderSerializer < ActiveModel::Serializer
  attributes :id, :order_total, :created_at
end
