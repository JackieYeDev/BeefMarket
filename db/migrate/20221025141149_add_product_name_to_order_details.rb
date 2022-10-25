class AddProductNameToOrderDetails < ActiveRecord::Migration[6.1]
  def change
    add_column :order_details, :product_name, :string
  end
end
