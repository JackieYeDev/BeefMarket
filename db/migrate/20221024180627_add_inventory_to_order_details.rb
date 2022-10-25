class AddInventoryToOrderDetails < ActiveRecord::Migration[6.1]
  def change
    add_column :order_details, :inventory_id, :integer
  end
end
