// Farfalla plugin: Add Alt Attribute

$(function() {


  $.each($('img'), function() {
  		
  		$(this).wrap('<div class="farfalla_addalt" />'); 			
  			
  		if($(this).attr('alt')==""){
  			
  			$(this).parent('div').width($(this).width()).append('<p style="display:none">This image has no alternative text! Click here to add...</p>');
 
  		} else {

  			$(this).parent('div').width($(this).width()).append('<p style="display:none">'+$(this).attr('alt')+'</p>');  		
  		
  		}
  
  	}
   
  );
  
  $.each($('div[class=farfalla_addalt]'), function() {
  
		  	$(this).hover(
				function(){
					$(this).children('p').show();
				},
				function(){
					$(this).children('p').hide();
				}
			);

		}
  );

});