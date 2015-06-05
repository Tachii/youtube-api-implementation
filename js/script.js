$(function() {
	var form = document.getElementById("search-form");
	var searchField = $('#query');
	var icon = $('#search-btn');
	
	//Focus Event Handler
	$(searchField).on('focusin',function(){
		$(this).animate({
			width:'100%'
		},400);
		$(icon).animate({
			right: '10px'
		}, 400);
	});
	
	//Blur Event Handler
	$(searchField).on('blur',function(){
		if(searchField.val() == ''){
			$(searchField).animate({
				width:'45%'
			},400);
			$(icon).animate({
				right:'360px'
			},400);
		}
	});
	
	//Preventing Form submition, to stop page reloading
	$('#search-form').submit(function(e){
		e.preventDefault();
	});
	
	
	
	//Funtion to Get Output from API response
	function getOutput(item){
		//Assigning Variables
		var videoId 		= item.id;
		var title 			= item.snippet.title;
		var description 	= item.snippet.description;
		var thumb 			= item.snippet.thumbnails.high.url;
		var channelTitle 	= item.snippet.channelTitle;
		var videoDate		= item.snippet.publishedAt;
		
		//Build Output String
		var output = 
		'<li>' + 
			'<div class="list-left">' + 
				'<img src="'+thumb+'"/>' + 
			'</div>' + 
			'<div class="list-right">' + 
				'<h3>'+title+'</h3>' + 
				'<small> By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+' </small>' + 
				'<p>'+description+'</p>' + 
			'</div>' + 
		'</li>' + 
		'<div class="clearfix"></div>';
		return output;
	}
	
	//Next Page button funciton
	function nextPage(){
		//Token & Query for new request, which declares what to load
		var token = $('#next-button').data('token');
		var query = $('#next-button').data('query');
		
		//Clear Previous Results
		$('#results').html(' ');
		$('#buttons').html('');
		
		//Get Form Input Value and Define it to a value
		var query = $('#query').val();
		
		//Run Get Request on YouTube API
		$.get(
			"https://www.googleapis.com/youtube/v3/search",{
					part: 'snippet, id',
					q: query,
					pageToken: token,
					type:'video',
					key: 'AIzaSyDr3hDprD7yAZzR3dzTKTr9EHyuPUYEKxM'
				},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);
					
					//Loop to process received data
					$.each(data.items, function(i, item){
						//Get Output
						var output = getOutput(item);
						
						//Display Results
						$('#results').append(output);
					});
					
					//Getting Buttons Data
					var buttons = getButtons(prevPageToken, nextPageToken, query);
					
					//Displaying Buttons
					$('#buttons').prepend(buttons);
					
				}
		);
	}
	
	//Next Page button funciton
	function prevPage(){
		//Token & Query for new request, which declares what to load
		var token = $('#prev-button').data('token');
		var query = $('#prev-button').data('query');
		
		//Clear Previous Results
		$('#results').html('');
		$('#buttons').html('');
		
		//Get Form Input Value and Define it to a value
		var query = $('#query').val();
		
		//Run Get Request on YouTube API
		$.get(
			"https://www.googleapis.com/youtube/v3/search",{
					part: 'snippet, id',
					q: query,
					pageToken: token,
					type:'video',
					key: 'AIzaSyDr3hDprD7yAZzR3dzTKTr9EHyuPUYEKxM'
				},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);
					
					//Loop to process received data
					$.each(data.items, function(i, item){
						//Get Output
						var output = getOutput(item);
						
						//Display Results
						$('#results').append(output);
					});
					
					//Getting Buttons Data
					var buttons = getButtons(prevPageToken, nextPageToken, query);
					
					//Displaying Buttons
					$('#buttons').prepend(buttons);
					
				}
		);
	}
	
	//Getting & Creating Buttons
	function getButtons(prevPageToken, nextPageToken, query){
		if(!prevPageToken){
			var btnOutput = 
			'<div class="button-container">' + 
				'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">Next Page</button>' + 				
			'</div>';
		} else {
			var btnOutput = 
		 	'<div class="button-container">' + 
		 		'<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+query+'" onclick="prevPage();">Prev Page</button>' + 
				'<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+query+'" onclick="nextPage();">Next Page</button>' + 				
			'</div>'; 
		}
		
		return btnOutput;
	}
	
	//Search Function to process query to YouTube API
	function search(){
		//Clear Previous Results
		$('#results').html('');
		$('#button').html('');
		
		//Get Form Input Value and Define it to a value
		var query = $('#query').val();
		
		//Run Get Request on YouTube API
		$.get(
			"https://www.googleapis.com/youtube/v3/search",{
					part: 'snippet, id',
					q: query,
					type:'video',
					key: 'AIzaSyDr3hDprD7yAZzR3dzTKTr9EHyuPUYEKxM'
				},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					console.log(data);
					
					//Loop to process received data
					$.each(data.items, function(i, item){
						//Get Output
						var output = getOutput(item);
						
						//Display Results
						$('#results').append(output);
					});
					
					//Getting Buttons Data
					var buttons = getButtons(prevPageToken, nextPageToken, query);
					
					//Displaying Buttons
					$('#buttons').append(buttons);
					
				}
		);
	}
	
	//Submit Form Search Handler
	form.addEventListener("submit", search);
});
