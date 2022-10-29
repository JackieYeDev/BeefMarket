class User < ApplicationRecord
  has_secure_password
  has_one :cart
  has_many :cart_items, through: :cart
  has_many :orders, dependent: :destroy
  validates :username, presence: true, uniqueness: true, format: { with: /\A\S+@.+\.\S+\z/}
  validates :password, length: {minimum: 6}
end
