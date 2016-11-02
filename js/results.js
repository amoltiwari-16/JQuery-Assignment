$(function()
{
	var $results = $('#results');
	$('#srchbtn').on('click',function()
	{	
		$('#results').empty();
		$('#results').css("background","#eee").css("height","auto");
		$('#pagin').empty();
		var movieName=$('#movie').val();
		var foundMatch= false; 
		var pgCount=0;
		$.ajax(
		{
			type:'GET',
			url: 'http://www.omdbapi.com/?s='+movieName,
			success :function(movies)
			{	$results.append('<h2 class="text-center">MOVIES</h2><br>')
				$.each(movies["Search"], function(i,movie){ 
						foundMatch=true;
						pgCount++;
						$results.append('<div class="line-content text-center"><img src="'+movie.Poster+'" alt="Pic" width="180" height="180"><br><strong>Title : '+movie.Title+'</strong><br>Year : '+movie.Year+'<br>ImdbID : '+movie.imdbID+'<br>Type : '+movie.Type+'<br></div>');
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
				showPage(1);
				$('#pagin li a').click(function() {
				    $('#pagin li a').removeClass("current");
				    $(this).addClass('current');
				    showPage(parseInt($(this).text())) 
				});
		
				if(foundMatch==false)
				{	
					$('#results').css("background","#eee").css("height","250px");
					$results.append('<h3 class="text-center">No match found, kindly search with some other keyword</h3>');
				}
			},
			error : function(){
				$results.append('Sorry, unable to fetch data');
			}
		});
	})
	
});