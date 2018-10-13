class Item
  include Mongoid::Document
  field :name, type: String
  field :price, type: Float

  has_and_belongs_to_many :tags
  has_one :purchased_item

  validates_presence_of :name, :price
  validates_uniqueness_of :name

end
