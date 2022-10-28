class RemoveCartItemsIdFromCarts < ActiveRecord::Migration[6.1]
  def change
    remove_column :carts, :cart_items_id
  end
end
