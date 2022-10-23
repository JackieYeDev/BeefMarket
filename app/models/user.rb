class User < ApplicationRecord
  has_secure_password
  validates :username, presence: true, uniqueness: true, format: { with: /\A\S+@.+\.\S+\z/}
  validates :password, length: {minimum: 6}
end
