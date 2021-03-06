$(document).ready(function () {


// variables

var terms = [
    "Pizza",
    "Dogs",
    "Trees", 
    "Waterfalls", 
    "Laughing",
    "Coffee", 
    "Whip Cream", 
    "Purple", 
    "Magic", 
    "Sailor Moon", 
    "Whiskey", 
    "Cake", 
    "Pokemon",
    "Science",
  ];

  var currentGif; var pausedGif; var animatedGif; var stillGif;

//create buttons
function createButtons(){
    //reset button
        $('#autumnBtns').empty();

        //create buttons from var
        for(var i = 0; i < terms.length; i++){
		var autumnBtn = $('<button>').text(terms[i]).addClass('autumnBtn').attr({'data-name': terms[i]});
		$('#autumnBtns').append(autumnBtn);
	}

	//displays gifs
	$('.autumnBtn').on('click', function(){
		$('.gifdisplay').empty();

		var term = $(this).data('name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        term + "&api_key=dc6zaTOxFJmzC&limit=10";		
        
        $.ajax({url: queryURL, method: 'GET'})
        .then(function(giphy){
            console.log("made it past ajax")
			currentGif = giphy.data;
			$.each(currentGif, function(index,value){
				animatedGif= value.images.original.url;
				pausedGif = value.images.original_still.url;
                var thisRating = value.rating;
                
                //gives blank ratings 
                
				if(thisRating == ''){
					thisRating = 'unrated';
				}
				var rating = $('<h5>').html('Rated: '+thisRating).addClass('ratingStyle');
				stillGif= $('<img>').attr('data-animated', animatedGif).attr('data-paused', pausedGif).attr('src', pausedGif).addClass('playOnHover');
				var fullGifDisplay = $('<button>').append(rating, stillGif);
				$('.gifdisplay').append(fullGifDisplay);
			});
		});
	});
}


 //animates and pauses gif on hover
$(document).on('mouseover','.playOnHover', function(){
    $(this).attr('src', $(this).data('animated'));
});
$(document).on('mouseleave','.playOnHover', function(){
    $(this).attr('src', $(this).data('paused'));
});


$('#addLike').on('click', function(){
	var newLike = $('#newLike').val().trim();
	terms.push(newLike);
	createButtons();
	return false;
});

createButtons();
});
