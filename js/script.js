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
	
	//Search Function to process query and get results from YouTube Api
	function search(){
		//Clear Previous Results
		$('#results').html('');
		$('#button').html('');
		
		//Get Form Input Value, q will be local variable
		q = $('#query').val();
		
		//Run Get Request on YouTube API
		$.get(
			"https://www.googleapis.com/youtube/v3/search",{
				part: 'snippet, id',
				q: q,
				type:'video',
				key: 'AIzaSyDr3hDprD7yAZzR3dzTKTr9EHyuPUYEKxM'},
				function(data){
					var nextPageToken = data.nextPageToken;
					var prevPageToken = data.prevPageToken;
					
					console.log(data);
					
				}
			}
		);
		
	}
	
	//Submit Form Search Handler
	form.addEventListener("submit", search);
	
	
	
});