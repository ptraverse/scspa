var IndexController = (function() {

	//Add to List
	var addLi = function() {
		var lis = $('ul#stocks-list > li').length;
		var next = lis + 1;
		var text = $('input#reference-text-input').val().toUpperCase();
		var nextli = '<li id="li-'+next+'">'+text+'</li>';
		$('ul#stocks-list').append(nextli);
		$('input#reference-text-input').val('');
		 $('input#reference-text-input').focus();
		bindStockListLi(); //Re run bind function so new element has functionaliity
	};

	var addLiByString = function(inputString) {
		$('input#reference-text-input').val(inputString);
		addLi();
	};

	var removeLiByString = function(symbol) {
		var lis = $('li');
		$.each(lis, function() {
			var liText = $(this).text();
			if (liText==symbol) {
				$(this).remove();
			}
		});
	};

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
			var symbols = getSymbols();
			$.each(symbols, function () {
				var symbol = $(this).text();
				var yqlUrl = getYqlUrl("quote",symbol);
				$.ajax({
					url: yqlUrl,
					type: "GET",
					success: function(json){
						var symbol = json.query.results.quote.Symbol;
						var name = json.query.results.quote.Name;
						var change = json.query.results.quote.Change;
						var lastTradePriceOnly = json.query.results.quote.LastTradePriceOnly;

						if (!name) {
							var noResultsTable = drawYqlNoResultsTable(symbol);
							$("#response").append(noResultsTable);
							removeLiByString(Symbol);
						} else {
							var resultsTable = drawYqlResultsTable(symbol, name, change, lastTradePriceOnly);
							$("#response").append(resultsTable);
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
	};

	var bindTestTwitterButton = function() {
		$('button#test-twitter').click( function (event) {
			var symbols = getSymbols();

			$.each(symbols, function() {
				var symbol = $(this).text();
				var result = TwitterService.searchTweets(symbol);
				console.log(result);
				if (result) {
					drawTwitterResultsTable(symbol, result);
				} else {
					drawTwitterNoResultsTable('notARealErr');
				}
			});
		});
	};

	var drawTwitterNoResultsTable = function(err) {
		console.log(' twitterNoResults Err ');
		console.log(err);
	};

	var drawTwitterResultsTable = function(symbol, results) {
		console.log(' twitter Results!! wahoo');
		console.log(symbol);
		console.log(results);
	};

	var drawYqlNoResultsTable = function(symbol) {
		var table = '<table><tr><td align="left">No Results for '+Symbol+'</td></tr></table>';
		return table;
	};

	var drawYqlResultsTable = function(symbol, name, change, lastTradePriceOnly) {
		var table = '<table><tr><td align="left">Latest Stock Price:</td><td>$'+lastTradePriceOnly+'</td></tr>';
		table = table + '<tr><td colspan="2" align="center"><i>'+name+'</i></td></tr></table>';
		return table;
	};

	var getYqlUrl = function(table,key) {
		var url = "https://query.yahooapis.com/v1/public/yql?q=SELECT%20*%20FROM%20yahoo.finance.quote%20WHERE%20symbol%3D'"+key+"'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=";
		return url;
	};


	var getSymbols = function() {
		symbols = $('ul#stocks-list > li');
		if (symbols.length === 0) {
			addLiByString('IBM');
			symbols = $('ul#stocks-list > li');
		}
		return symbols;
	};

	var init = function() {
		//Bind All That Shit
		bindReferenceTextInput();
		bindStockListLi();
		bindTestConnectionButton();
		bindTestTwitterButton();
		$('input#reference-text-input').focus();
	};

	return {
		init: init
	};

}) ();