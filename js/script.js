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
	 
	
	
	//Submit Form Search Handler
	//form.addEventListener("submit", search);
	
	
	
});