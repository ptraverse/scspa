$(document).ready( function () {
	
	//Add to List
	var addLi = function() {
		var lis = $('ul#stocks-list > li').length;
		var next = lis + 1;		
		var text = $('input#reference-text-input').val();
		var nextli = '<li id="li-'+next+'">'+text+'</li>';		
		$('ul#stocks-list').append(nextli);
		$('input#reference-text-input').val('');
		$('input#reference-text-input').focus();
		bindStockListLi(); //Re run bind function so new element has functionaliity
	};

	//Helper to add functionally
	var addLiByString = function (inputString) {
		$('input#reference-text-input').val(inputString);
		addLi();
	}

	//Binds Stuff for Text Input
	var bindReferenceTextInput = function() {
		//Capture Keyboard from Text Input
		$('input#reference-text-input').keydown( function(event) {
			if (event.which == 13) { //EnterKey
				addLi();
			} else {
				// console.log(event);
			}
		});
	};

	//Binds Everything for stock list elem's
	var bindStockListLi = function() {		
		
		//Remove items from list on click
		$('ul#stocks-list > li').click(function () {
			$(this).remove();
		});

		//Hover Color effect
		$('ul#stocks-list > li').hover(function () {
			$(this).hover( function() {
				$(this).css('background-color', 'LightCoral');
			}, function() {
				$(this).css('background-color', '');
			});
		});

	};

	//Bind Click for the Test Yahoo API Connection Button
	var bindTestConnectionButton = function() {

		$('button#test-connection').click( function (event) {
			$("#response").html('');		
			var symbols = $('ul#stocks-list > li');
			if (symbols.length === 0) {
				addLiByString('IBM');
				symbols = $('ul#stocks-list > li');
			}
			$.each(symbols, function () {
				var symbol = $(this).text();
				console.log(symbol);
				var yqlUrl = getYqlUrl("quote",symbol);		
				console.log(yqlUrl);	
				$.ajax({
					url: yqlUrl,			
					type: "GET",			
					success: function(json){						
						var LastTradePriceOnly = json.query.results.quote.LastTradePriceOnly;
						var Change = json.query.results.quote.Change;
						var Name = json.query.results.quote.Name;
						$("#response").append("<table>");
						$("#response").append('<tr><td align="left">Latest Stock Price:</td><td>$'+LastTradePriceOnly+"</td></tr>");					
						$("#response").append('<tr><td colspan="2" align="center"><i>'+Name+'</i></td></tr>');				
						$("#response").append("</table>");
					},
					error: function(err){
						alert("error!");
					}
				}).done(function(){
					
				});
			});			
			event.preventDefault();

		});

	};

	var getYqlUrl = function(table,key)	{
		if (table=="quote") {
			var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%3D'"+key+"'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
		}
		
		return url;
	}

	var init = function() {		
		//Bind All That Shit
		bindReferenceTextInput();
		bindStockListLi();		
		bindTestConnectionButton();
		$('input#reference-text-input').focus();				
	};

	// --- Start --- //
	init();

});