$('#decline').click(function(){
	window.location.replace("success.html");
})
$('#send').click(function(){
	var mail = $('#email').val();
									$.ajax({
  type: "POST",
  url: 'http://51.15.42.16/insertmail.php',
  crossDomain: true,
  data:{ email : mail }, 
  dataType: 'text',
  success: function(data) {
	  	window.location.replace("success.html");
  }
});
			
})