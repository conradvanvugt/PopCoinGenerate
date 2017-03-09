$( document ).ready(function() {
var url = $(location).attr('href');
var splitstr = url.split("?generate=");
var splitstr2 = splitstr[1].split("?beschrijving=");
var Val = splitstr2[0];
var Beschr = splitstr2[1];
if (Beschr != ""){
	$('#info').show();
}
Beschr = Beschr.split(':enter:').join('<br/>');
Beschr = Beschr.split(':space:').join(' ');

$(".content").empty();
    $(".contentprijs").append('<p><b>Te betalen bedrag: &euro; ' + Val +'</b></p>');
	$("#info").append('<p>'+ Beschr +'</p>');
	$(".content").append('<div id="paypal-button"></div>');
	
   paypal.Button.render({
    
        env: 'sandbox', // Specify 'sandbox' for the test environment
		locale: 'nl_NL',
        style: {
            size: 'medium',
            color: 'blue',
			
            shape: 'rect'
        },

   client: {
            sandbox:    'AZ6Nb5f1wnBSVsKX-oRglzcFwo_W8ECjYyt0sf8hD72NlegHMjQ8XwiUgafyhiEmtqdO2jOaAmCbu1fa'
        },

        payment: function() {
        
            var env    = this.props.env;
            var client = this.props.client;
        
            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                        amount: { total:  Val, currency: 'EUR' }
                    }
                ]
            });
        },

        commit: true, // Optional: show a 'Pay Now' button in the checkout flow

        onAuthorize: function(data, actions) {
        
            // Optional: display a confirmation page here
        
            return actions.payment.execute().then(function() {
                // Show a success page to the buyer
									$.ajax({
  type: "POST",
  url: 'http://51.15.42.16/insertbedrag.php',
  crossDomain: true,
  data:{ bedrag : Val, beschrijving : splitstr2[1]  }, 
  dataType: 'text',
  success: function(data) {
	  	window.location.replace("subscribe.html");
  }
});
			
				
            });
        }

    }, '#paypal-button');
    
	});