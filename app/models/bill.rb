class Bill
  include Mongoid::Document
  include Mongoid::Timestamps
  field :total_amount, type: Float
  field :sub_amount, type: Float
  field :state, type: String, default: "unpaid"

  has_many :purchased_items

  before_save :calculate_total

  scope :paid, ->{ where(:state => "paid") }

  def billing_info
  	info = []
  	self.purchased_items.each do |item|
  		h ={
  			itme_name: item.item.name,
  			quantity: item.quantity,
  			item_total: item.quantity * item.item.price,
  			unit_price: item.item.price
  		}
  		info.push(h)
  	end
  	info
  end

  def calculate_total
  	price_before_discount = 0
  	self.purchased_items.each do |item|
  		item_price = item.item.price * item.quantity
  		price_before_discount = (price_before_discount + item_price)
  	end
  	self.sub_amount = price_before_discount
  	self.total_amount = (sub_amount*15)/100 + sub_amount
  end
end