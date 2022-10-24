class InventorySerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :stock, :image_url
end
