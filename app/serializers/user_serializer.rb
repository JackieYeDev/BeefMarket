class UserSerializer < ActiveModel::Serializer
  attributes :id, :admin,:username, :password_digest
  has_one :cart
end
