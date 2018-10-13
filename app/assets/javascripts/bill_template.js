var POS = POS || {};
POS.product_count = 0
POS = (function($, window, document, Pos) {
	Pos.billTemplate = {
		init: function(){
			$("#item0").select2();
			Pos.billTemplate.getBillInfo();
			Pos.billTemplate.HandlebarsHelper();
			Pos.billTemplate.addProduct();
			Pos.billTemplate.deleteProduct();
			Pos.billTemplate.placeOrder();
		},
		placeOrder: function(){
			$("#place-order").click(function(){
				$.ajax({
		     type: "POST",
		     url: '/bill/place_order',
		     data: {id: $("#product_id").val()},
		     success: function(data)
		     {
		     		if (data.success) {
			     		alert("place order successfully")
			     		location.reload();
		     		}else{
			     		alert("somthing went wrong")
		     		}
		     }
		   });
			});
		},
		getBillInfo: function(){
			$('#create-bill').click(function(){
				$.ajax({
		     type: "POST",
		     url: '/bill/create',
		     data: $("#genarate-bill").serialize(),
		     success: function(data)
		     {
		     		$("#product_id").val(data.id)
		     		$("#bill-template").html("")
		     		var source   = document.getElementById("entry-template").innerHTML;
		     		var template = Handlebars.compile(source);
						var html    = template(data);
						$("#bill-template").append(html);
						Pos.billTemplate.placeOrder();
		     }
		   });
			})
		},
		deleteProduct: function(){
			$("#delete").click(function(){
				$(this).closest('tr').remove()
				POS.product_count--
				$("#product_count").val(POS.product_count);
				Pos.billTemplate.getBillInfo();
			})
		},
		addProduct: function(){
			$("#plus").click(function(){
				var source   = document.getElementById("product-template").innerHTML;
     		var template = Handlebars.compile(source);
     		POS.product_count++
     		var product_count = {
     			product_count: POS.product_count,
     		}
     		var html    = template(product_count);
				$(".new-product").append(html);
				$("#product_count").val(POS.product_count);
				$("#item"+POS.product_count+"").select2();
			})
		},
		HandlebarsHelper: function(){
			Handlebars.registerHelper("debug", function(optionalValue) {
			  console.log("Current Context");
			  console.log("====================");
			  console.log(this);
			  if (optionalValue) {
			    console.log("Value");
			    console.log("====================");
			    console.log(optionalValue);
			  }
			});
			// {{#compareTwoValues var1 var2 operator="=="}}
			Handlebars.registerHelper('compareTwoValues', function(lvalue, rvalue, options) {

		    if (arguments.length < 3){
		      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
		    }

		    operator = options.hash.operator || "==";

		    var operators = {
	        '==':       function(l,r) { return l == r; },
	        '===':      function(l,r) { return l === r; },
	        '!=':       function(l,r) { return l != r; },
	        '<':        function(l,r) { return l < r; },
	        '>':        function(l,r) { return l > r; },
	        '<=':       function(l,r) { return l <= r; },
	        '>=':       function(l,r) { return l >= r; },
	        'typeof':   function(l,r) { return typeof l == r; }
		    }

		    if (!operators[operator]){
		      throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);
		    }

		    var result = operators[operator](lvalue,rvalue);

		    if( result ) {
		      return options.fn(this);
		    } else {
		      return options.inverse(this);
		    }

			});
		}
	}
	return Pos
})(jQuery, this, this.document, POS);

$( document ).ready(function() {
	POS.billTemplate.init();
	$(".toggle").click(function(){
		$(this).next().toggle()
	})
});