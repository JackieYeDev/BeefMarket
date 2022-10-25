class AddQuantityToOrderDetails < ActiveRecord::Migration[6.1]
  def change
    add_column :order_details, :quantity, :integer
  end
end
