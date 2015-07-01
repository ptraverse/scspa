$(document).ready( function () {

	//Add to List
	function addLi() {
		var lis = $('ul#stocks-list > li').length;
		var next = lis + 1;
		var text = $('input#reference-text-input').val().toUpperCase();
		var nextli = '<li id="li-'+next+'">'+text+'</li>';
		$('ul#stocks-list').append(nextli);
		$('input#reference-text-input').val('');
		$('input#reference-text-input').focus();
		bindStockListLi(); //Re run bind function so new element has functionaliity
	}

	function addLiByString(inputString) {
		$('input#reference-text-input').val(inputString);
		addLi();
	}

	function _removeLiByString(symbol) {
		var lis = $('li');
		$.each(lis, function() {
			var liText = $(this).text();
			if (liText==symbol) {
				$(this).remove();
			}
		});
	}

	//Binds Stuff for Text Input
	function bindReferenceTextInput() {
		//Capture Keyboard from Text Input
		$('input#reference-text-input').keydown( function(event) {
			if (event.which == 13) { //EnterKey
				addLi();
			} else {
				// console.log(event);
			}
		});
	}

	//Binds Everything for stock list elem's
	function bindStockListLi() {

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
	}

	//Bind Click for the Test Yahoo API Connection Button
	function bindTestConnectionButton() {
		$('button#test-connection').click( function (event) {
			$("#response").html('');
			var symbols = _getSymbols();
			$.each(symbols, function () {
				var symbol = $(this).text();
				var yqlUrl = _getYqlUrl("quote",symbol);
				$.ajax({
					url: yqlUrl,
					type: "GET",
					success: function(json){
						var LastTradePriceOnly = json.query.results.quote.LastTradePriceOnly;
						var Change = json.query.results.quote.Change;
						var Name = json.query.results.quote.Name;
						var Symbol = json.query.results.quote.Symbol;
						if (!Name) {
							$("#response").append("<table>");
							$("#response").append('<tr><td align="left">No Results for '+Symbol+'</td></tr>');
							$("#response").append("</table>");
							_removeLiByString(Symbol);
						} else {
							$("#response").append("<table>");
							$("#response").append('<tr><td align="left">Latest Stock Price:</td><td>$'+LastTradePriceOnly+"</td></tr>");
							$("#response").append('<tr><td colspan="2" align="center"><i>'+Name+'</i></td></tr>');
							$("#response").append("</table>");
						}
					},
					error: function(err){
						alert("error!");
					}
				}).done(function(){

				});
			});
			event.preventDefault();
		});
	}

	function bindTestTwitterButton() {
		$('button#test-twitter').click( function (event) {
			var symbols = _getSymbols();

			$.each(symbols, function() {
				var s = $(this).text();
				$.ajax({
					url: 'twitter_test.ajax.php',
					type: "GET",
					data: {
						'symbol': s
					},
					success: function(json){
						console.log('success!');
						console.log(json);
					},
					error: function(err){
						alert("error!");
					}
				}).done(function(){
					console.log('done');
				});
			});
		});
	}

	function _getYqlUrl(table,key) {
		var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%3D'"+key+"'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
		return url;
	}


	function _getSymbols() {
		symbols = $('ul#stocks-list > li');
		if (symbols.length === 0) {
			addLiByString('IBM');
			symbols = $('ul#stocks-list > li');
		}
		return symbols;
	}

	function init() {
		//Bind All That Shit
		bindReferenceTextInput();
		bindStockListLi();
		bindTestConnectionButton();
		bindTestTwitterButton();
		$('input#reference-text-input').focus();
	};

	/* --- Start --- */
	init();

});