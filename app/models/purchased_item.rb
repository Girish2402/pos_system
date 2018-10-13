class PurchasedItem
  include Mongoid::Document

  field :quantity, type: Integer

  belongs_to :item
  belongs_to :bill
end