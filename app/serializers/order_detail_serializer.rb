class OrderDetailSerializer < ActiveModel::Serializer
  attributes :inventory_id, :product_name, :quantity, :price
end
