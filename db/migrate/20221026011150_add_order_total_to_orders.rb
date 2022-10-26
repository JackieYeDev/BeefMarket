class AddOrderTotalToOrders < ActiveRecord::Migration[6.1]
  def change
    add_column :orders, :order_total, :decimal
  end
end
