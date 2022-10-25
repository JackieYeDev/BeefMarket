class AddPriceToOrderDetails < ActiveRecord::Migration[6.1]
  def change
    add_column :order_details, :price, :decimal
  end
end
