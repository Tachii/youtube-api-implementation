/**
 * @author Gleb Zaveruha
 */
"use strict";
$(function(){
	
	
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
	
	//Search Function to process query to YouTube API
	function search(){
		//Clear Previous Results
		$('#results').html('');
		$('#button').html('');
		
		//Get Form Input Value and Define it to a value
		var q = $('#query').val();
		
		//Run Get Request on YouTube API
		$.get(
			"https://www.googleapis.com/youtube/v3/search",{
					part: 'snippet, id',
					q: q,
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
					
				}
		);
		
	}
	
	//Submit Form Search Handler
	form.addEventListener("submit", search);
	
	
});