# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Inventory.create!(name: 'Flat Iron', price: 12.00, stock: 25, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/FlatIron.jpg')
Inventory.create!(name: 'Top Blade Steak', price: 25.00, stock: 29, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/TopBladeSteak.jpg')
Inventory.create!(name: 'Ribeye', price: 30.00, stock: 30, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/Ribeye.jpg')
Inventory.create!(name: 'Bone-in Ribeye', price: 35.00, stock: 10, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/Bone-inRibeye.jpg')
Inventory.create!(name: 'Cowboy Steak', price: 40.00, stock: 4, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/CowboySteak.jpg')
Inventory.create!(name: 'Ribeye Roast', price: 60.00, stock: 3, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/BonelessRibeyeRoast.jpg')
Inventory.create!(name: 'Boneless Strip', price: 25.00, stock: 29, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/BonelessStripSteak.jpg')
Inventory.create!(name: 'Filet Mignon', price: 30.00, stock: 13, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/FiletMignon.jpg')
Inventory.create!(name: 'Flank', price: 15.00, stock: 10, image_url: 'https://www.certifiedangusbeef.com/cuts/images/detail/Flank.jpg')