drag text stock correlator single page app aka SCSPA

one function = stock correlation value

input gets ticker
add button adds valid ticker to list
calculate button generates the matrix = pairwise values for all combinations in list of stocks
and shows the chart with all of them
time frame slider

backbone + handlebars + (?)

connect to some stock API:
yahoo?other?

pageController.checkTickerString(text)
pageController.addTickerString(text)
pageController.showTickerDiv(stock)
stockService.getCorrelation(stock1, stock2)
pageController.getCorrelationMatrix(stockList)
pageController.showCorrelationMatrix(matrix)

class stock:
	ticker
	
class pageController:
	tickerList
	
class stockService:
	api_key
	api_secret_key
	api_url
	..etc..

