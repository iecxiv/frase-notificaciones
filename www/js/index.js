var demo = blacktie.init();
demo.hammenu();

//$('.quote').empty().append("Pulsa el botón para obtener una frase");
/*var randomQuote;
$.getJSON('data.json',function(quotes){
	randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
	$('.quote').empty().append(randomQuote.quote);
	//$('.quote-author').empty().append(randomQuote.author);
});*/

$(specBut).click(function() {
	var randomQuote;
	$.getJSON('data.json',function(quotes){
		randomQuote = quotes.quotes[Math.floor(Math.random() * quotes.quotes.length)];
		$('.quote').empty().append(randomQuote.quote);
		//$('.quote-author').empty().append(randomQuote.author);
	});
});

$('#ham-trigger').click(function(){return false;});

$(document).ready(function () {
    $(":checkbox").click(function () {
        //var thisVar = $(this);
        //var id = thisVar.attr('id');
        //var isChecked = thisVar.is(':checked');
        //alert("id" + id + "   " + "Checked " + isChecked);
        //code to store it on local storage
		var checkbox = document.getElementById("customCheck1");
    	localStorage.setItem("customCheck1", checkbox.checked);
    });
});

//for loading
var checked = JSON.parse(localStorage.getItem("customCheck1"));
    document.getElementById("customCheck1").checked = checked;