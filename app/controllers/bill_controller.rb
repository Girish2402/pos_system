class BillController < ApplicationController
	skip_before_filter :verify_authenticity_token
	def index
		
	end

	def create
		create_bill
		respond_to do |format|
      format.json
    end
	end

	def create_bill
		@bill = Bill.create(state: "pending")
		(0..params['product_count'].to_i).each do |count|
			purchase_item = PurchasedItem.create(quantity: params["item#{count}"]['quantity'].to_i, item_id: params["item#{count}"]['product_id'])
			@bill.purchased_items << purchase_item
			purchase_item.save!
		end
		@bill.save!
	end

	def place_order
		bill = Bill.find(params['id'])
		bill.state = "paid"
		if bill.save
			render :json => {:success => true}
		else
			render :json => {:success => false}
		end
	end

	def view_bill
		@bills = Bill.paid
	end

end