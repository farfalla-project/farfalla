// Farfalla plugin: Font Size

jQuery.noConflict();
(function($) {

  $(function() {

    $.farfalla_create_plugin_options('fontsize');
    
    $.fn.set_as_irregular_fontsize = function(){
      $(this)
        .addClass('fontsize-irregular')
        .attr('original-font-size', $(this).css('font-size'));    
    };

    $.fn.set_as_irregular_lineheight = function(){
      $(this)
        .addClass('linehieght-irregular')
        .attr('original-line-height', $(this).css('line-height'));    
    };

// mark with a specific class those elements that have explicit font-size set


    $('*').each(function(){
      var styles = $(this).attr('style'),
        value;
      styles && styles.split(';').forEach(function(e) {
        var style = e.split(':');
        if ($.trim(style[0]) === 'font-size') {
          value = style[1];
        }
      });
      if(value){
        $(this).set_as_irregular_fontsize();
      }
    })

    $('*').each(function(){
      var styles = $(this).attr('style'),
        value;
      styles && styles.split(';').forEach(function(e) {
        var style = e.split(':');
        if ($.trim(style[0]) === 'line-height') {
          value = style[1];
        }
      });
      if(value){
        $(this).set_as_irregular_lineheight();
      }
    })

    $('textarea, input, label, span')
      .each(function(){
        $(this).set_as_irregular_fontsize();
      });

    $.farfalla_change_size = function (val) {

      bodySize = parseInt($('body').css('font-size'));
    
      $('body').css({
        'font-size':bodySize+val*2+'px',
        'line-height':(bodySize+val*2)*1.4+'px'
      });

      $('.fontsize-irregular').not('.donttouchme').each( function(){
        thisSize = parseInt($(this).css('font-size'));
        $(this).css({
          'font-size':thisSize+val*2+'px',
          'line-height':(thisSize+val*2)*1.4+'px'
        })
        
      });
      
    }

    $.farfalla_reset_size = function () {
      $('body').css({
        'font-size':'',
        'line-height':''
      });
      $('.fontsize-irregular').each(function(){
        $(this).css('font-size', $(this).attr('original-font-size'));
      })

    }

    $.farfalla_get_option('increase', function(data){

        var increase = 0

        var value = data.value;

        if(value){
          var increase = parseFloat(data.value);
        }

        // Increase Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_increase', '+', function(){

          increase+=1;
          var value= increase;

          $.farfalla_change_size(1);

          $.farfalla_set_option('increase',increase);
          return increase;
        });

        // Decrease Font Size
        $.farfalla_add_ui('fontsize', 'button', 'fontsize_decrease', '-', function(){

          increase+=-1;
          var value= increase;

          $.farfalla_change_size(-1);

          $.farfalla_set_option('increase',increase);
          return increase;
        });

        // Reset Font Size

        $.farfalla_add_ui('fontsize', 'button', 'fontsize_reset', 'reset', function(){

          $.farfalla_reset_size();

          increase=0;
          $.farfalla_set_option('increase',increase);
          return increase;

        });


      });


    $.fontsize_on = function () {

      $('#fontsizeActivator').farfalla_switch_on('fontsize');

      $.farfalla_get_option('increase', function(data){

        // restore font size on plugin activation

        if(data.value){
          for (var i=0;i<data.value;i++){ 
            $.farfalla_change_size(1);
          }
        }

        $('.plugin_options').not('#fontsize_options').slideUp('fast');
        $('#fontsize_options').slideDown('fast');

      });

    }

    $.fontsize_off = function () {

      $('#fontsize_options').hide();
      $.farfalla_reset_size();
      $('#fontsizeActivator').farfalla_switch_off('fontsize');

    }

    $('#fontsize_options_deactivate').click( function() {

      $.fontsize_off();

    });

/*
    $('#fontsize_options_confirm').click( function() {

      $('#fontsize_options').hide();
      $('#farfalla_toolbar_shade').hide();

    });
*/


    $.fontsize_on();

    $('#fontsizeActivator').click( function(){

      $.fontsize_on();

    });



  });
})(jQuery);
