// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) { 

 $(function() {

  
  $.farfalla_get_option('increase', function(data){

    var increase = 0

    if(data.value>0){
      for(var i=1; i<=data.value; i++){
         $('*').css({
          'font-size': function(index, value) {
            return parseFloat(value) * 1.1;
          },
          'line-height' : '130%'
        });
      }
    } else if(data.value<0){
        for(var i=1; i>=data.value; i--){
          $('*').css({
            'font-size': function(index, value) {
              return parseFloat(value) * 0.9;
            },
           'line-height' : '130%'
          });
        }
      };

    if(data.value){    
      var increase = parseFloat(data.value);
    }

    // Increase Font Size
    $('#farfalla_buttons').farfalla_add_button('+','+','fontsize_increase','a','green','#fff',function(){
      $('*').css({
          'font-size': function(index, value) {
          return parseFloat(value) * 1.1;
        },
          'line-height' : '130%'
      }); 
      increase+=1;
      $.farfalla_set_option('increase',increase);
      return increase;
    });

  // Decrease Font Size
    $('#farfalla_buttons').farfalla_add_button('-','-','fontsize_decrease','z','red', '#fff', function(){
      $('*').css({
        'font-size': function(index, value) {
          return parseFloat(value) * 0.9;
        },
        'line-height' : '130%'
      }); 
      increase+=-1;
      $.farfalla_set_option('increase',increase);
      return increase;
    });
    
  // Reset Font Size
    $('#farfalla_buttons').farfalla_add_button('reset font','reset','fontsize_reset','r','yellow','#000',function(){

//    this works fine, but should be rewritten in a more elegant way...
      var jqxhr =  $.getJSON(farfalla_path+"backend/plugins/set_option/increase/0/?callback=?");
      jqxhr.complete(function() {window.location.reload()});

    });

  
  });

 });
})(jQuery);
