<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>YouSearch</title>
        
        <link rel="stylesheet" href="css/style.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	    <script src="js/script.js"></script>
        
    </head>
    <body>
        <div id="container">
        	<header>
        		<h1><span>You</span>Search</h1>
        		<p>Search Youtube Videos</p>
        	</header>
        	<section>
        		<form id="search-form" name="search-form">
        			<div class="field-container">
        				<input type="search" id="query" class="search-field" placeholder="Search..." />
        				<input type="submit" name="search-btn" id="search-btn" value="" />
        			</div>
        			
        			<ul id="results"> </ul>
        			<div id="buttons"> </div>
        		</form>
        	</section>
        	<footer>
        		<p>Copyright &copy; 2015, GZ</p>
        	</footer>
        </div>
    </body>
</html>
