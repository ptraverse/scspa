 <!DOCTYPE html>
<html>
 <head>
  <meta charset="UTF-8">
  <title>title</title>
  <link rel="stylesheet" href="public/css/stylesheet.css" type="text/css">
  <link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />    
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" />
 </head>
 <body>
 
 	<div id="content">

 		<h3> Input to List </h3>
  		<h4> Click to Remove </h4>	
		
		<div id="reference-text-div">
			<input type="text" id="reference-text-input"/>		
		</div>
		
		<ul id="stocks-list">		
		</ul>

		
		<hr>

		
		<h3> Test YQL</h3>

		<div id="stock-connection-test-div">
			    <button id="test-connection" name="test-connection" class="btn btn-primary">Yahoo YQL</button>
			    <div id="response"></div>
		</div>


		<hr>


		<h3> Twitter REST</h3>
		<div>
			<button id="test-twitter" name="test-twitter" class="btn btn-primary">Twitter</button>
		</div>

		<hr>


		<!-- <h3> Combined Graph - use external tool </h3>
		<div>
			<i>TODO</i>
		</div>

		<hr>

		<h3> Correlation Function Result Grid </h3>
		<div>
			<i>TODO</i>
		</div> !-->

	</div>

  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
  <script src="//ajax.googleapis.com/ajax/libs/jqueryui/1.8.21/jquery-ui.min.js" type="text/javascript"></script>
  <script src="//cdnjs.cloudflare.com/ajax/libs/modernizr/2.5.3/modernizr.min.js" type="text/javascript"></script>
  <script src="public/js/index.js" type="text/javascript"></script>
 </body>
</html>
