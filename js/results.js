$(function()
{	
	var results = $('.movies');
	//search button onclick code
	$('#srchbtn').on('click',function()
	{	
		$('.movies').empty();
		$('#results').css("background","#eee").css("height","auto");
		$('body').css("background","#eee");
		$('#pagin').empty();
		$('.res-header').empty();
		var movieName=$('#movie').val();
		var foundMatch= false; 
		var pgCount=0;
		$.ajax(
		{
			type:'GET',
			url: 'http://www.omdbapi.com/?s='+movieName,
			success :function(movies)
			{	$('.res-header').append('<h3>Results.........</h3><br>')
					if(movies.Response=="False")
				{	
					$('#results').css("background","#eee").css("height","250px");
					$('.res-header').css("background","#eee");
					$('.res-header').empty();
					results.append('<h3 class="text-center">No match found, kindly search with some other keyword</h3>');
				}else
				{
					$.each(movies["Search"], function(i,movie){ 
						foundMatch=true;
						pgCount++;
						results.append('<div class="line-content list-group-item text-center"><img src="'+movie.Poster+'" alt="Pic" width="180" height="180"><br><strong>Title : '+movie.Title+'</strong><br>Year : '+movie.Year+'<br>ImdbID : '+movie.imdbID+'<br>Type : '+movie.Type+'<br></div>');
				});

				//pagination
				 pageSize = 3;
				 var pageCount =  pgCount/pageSize;
			     for(var i = 0 ; i<pageCount;i++)
			     {
			       $('#pagin').addClass('text-center');
			       $('#pagin').append('<li><a href="#">'+(i+1)+'</a></li> ');
			     }
			     $('#pagin li').first().find('a').addClass('current');
				 showPage = function(page) {
					$('.line-content').hide();
					$('.line-content').each(function(n) {
					  	if (n >= pageSize * (page - 1) && n < pageSize * page)
					        {
					           $(this).show();
					   
					        }
			    	});        
				}
				//Initial page display
				showPage(1);
				$('#pagin li a').click(function() {
				    $('#pagin li a').removeClass("current");
				    $(this).addClass('current');
				    showPage(parseInt($(this).text())) 
				});

				}
				
				// Check if no record is present
				// if(!foundMatch)
				// {	
				// 	$('#results').css("background","#eee").css("height","250px");
				// 	results.append('<h3 class="text-center">No match found, kindly search with some other keyword</h3>');
				// }
			},
			//error message display if error occurs
			error : function(){
				results.append('Sorry, unable to fetch data');
			}
		});
	})
	
});