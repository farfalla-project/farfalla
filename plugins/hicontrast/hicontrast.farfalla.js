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

  $.farfalla_add_ccs_button = function (style,accesskey){

  $('#farfalla_buttons').farfalla_add_button(style,'toggle_'+style,accesskey,function(){

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
	
  $.farfalla_add_ccs_button('black-green','1');
  $.farfalla_add_ccs_button('black-white','2');
  $.farfalla_add_ccs_button('blue-white','3');
  $.farfalla_add_ccs_button('lightyellow-black','4');
  $.farfalla_add_ccs_button('yellow-black','5');
  $.farfalla_add_ccs_button('black-lightblue','6');
  $.farfalla_add_ccs_button('black-yellow','7');
  $.farfalla_add_ccs_button('cyan-black','8');
//  $.farfalla_add_ccs_button('lightblue-black','9');
//  $.farfalla_add_ccs_button('white-black','0');

});
