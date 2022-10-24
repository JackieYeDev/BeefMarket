class CreateInventories < ActiveRecord::Migration[6.1]
  def change
    create_table :inventories do |t|
      t.string :name
      t.decimal :price
      t.integer :stock
      t.string :image_url

      t.timestamps
    end
  end
end
