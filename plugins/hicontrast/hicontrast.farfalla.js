// Farfalla plugin: High contrast

$(function() {  

  $.farfalla_add_css = function (style){

      $("head").append('<link id="'+style+'" rel="stylesheet" type="text/css" href="'+farfalla_path+'plugins/hicontrast/css/'+style+'.css" />');
      $("head").append('<link id="farfalla-hic-toolbar" rel="stylesheet" type="text/css" href="'+farfalla_path+'plugins/hicontrast/css/farfalla-hic-toolbar.css" />');

  }


  $.farfalla_remove_css = function (style){

      $('#'+style+'').remove();
      $('#farfalla-hic-toolbar').remove();

  }

// when the page loads, check if the alternative CSS is already active

  $.farfalla_get_option('hicontrast',function(data){

    if(data.value){

      $.farfalla_add_css(data.value);

    }
    
  });

  $.farfalla_add_ccs_button = function (style, name, accesskey, bgcolor, txtcolor){

  $('#farfalla_buttons').farfalla_add_button(style, name, 'toggle_'+style, accesskey, bgcolor, txtcolor, function(){

      $.farfalla_get_option('hicontrast',function(data){

        if(data.value==style){

          $.farfalla_set_option('hicontrast');
          $.farfalla_remove_css(style);
   
        }else{
      
          $.farfalla_remove_css(data.value);
          $.farfalla_set_option('hicontrast',style);
          $.farfalla_add_css(style);
        
        }

      })
    
    })
  
  };

// create the buttons
	
  $.farfalla_add_ccs_button('black-green', '1','1', 'black', '#3f3');
  $.farfalla_add_ccs_button('black-white', '2', '2', 'black', 'white');
  $.farfalla_add_ccs_button('blue-white', '3', '3', '#004', 'white');
  $.farfalla_add_ccs_button('lightyellow-black', '4', '4', 'lightyellow', 'black');
  $.farfalla_add_ccs_button('yellow-black', '5', '5', 'yellow', 'black');
  $.farfalla_add_ccs_button('black-lightblue', '6', '6', 'black', '#5ffffd');
  $.farfalla_add_ccs_button('black-yellow', '7', '7', 'black', 'yellow');
  $.farfalla_add_ccs_button('cyan-black', '8', '8', '#9ff', 'black');
  $.farfalla_add_ccs_button('lightblue-black', '9', '9', 'cyan', 'black');
  $.farfalla_add_ccs_button('white-black', '0', '0', 'white', 'black');

});
