$( document ).ready(function() {
var client = new HttpClient();
var counter = 5;
$('.content').html("Betaling succesvol! </br> Sluit af in: " + counter);
var interval = setInterval(function() {
    counter--;
    // Display 'counter' wherever you want to display it.
    $('.content').html("Betaling succesvol! </br> Sluit af in: " + counter);
	if (counter == 0) {
		client.get('http://192.168.137.101:8000/api/success', function(response) {
    // do something with response
	console.log(response + ' werkt');
	});
        clearInterval(interval);
    }
}, 1000);
});
var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "POST", aUrl, true );            
        anHttpRequest.send( null );
    }
}