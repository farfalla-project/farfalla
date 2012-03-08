// Farfalla plugin: Clarifier. Transforms the typography of a document in a Dyslexia-friendly fashion.

jQuery.noConflict();
  (function($) {

    $(function() {

      $('html').each( function(){
        console.log($(this).css('background-color'));
      })
        // Set <html> background color to cream,

        if($('html').css('background-color')=='transparent'||$('html').css('background-color')=='rgba(0, 0, 0, 0)'){
          $('html').css('background-color','rgb(250, 252, 209)')
        }

        $('*').each(function(){

          if($(this).css('background-color')=='rgb(255, 255, 255)'){
            $(this).css('background-color','rgb(250, 252, 209)')
          }

        });

        $('input, textarea').css({
          'border':'2px solid navy',
          'background-color':'rgb(255, 255, 225)'
        });

        // Set fonts to Tahoma, Arial, sans

        $('*').css({
            'font-family':'Tahoma, Arial, sans-serif',
            'font-size': '14pt'
          });

        $('h1').css({
            'font-size':'18pt',
            'font-weight':'bold'
          });

        $('h2').css({
            'font-size':'16pt',
            'font-weight':'bold'
          });

        $('h3, h4, h5, h6, h7, h8, h9, h10').css({
            'font-weight':'bold'
          });


        // Set fonts to Tahoma, Arial, sans

        $('*').each(function(){

          if($(this).css('text-align')=='justify'){
            $(this).css('text-align','left')
          }

        });

        // Set line height to 200% in <p> elements only

        $('p, li').each(function(){

          $(this).css('line-height','200%')

        });


        // Substitute full stops with full stops AND line breaks

/*        $('p, h1, h2, h3, h4, h5, h6, textarea').each(function(){

          var content = $(this).html().replace(/\./g,'.<br />');
          $(this).html(content);

        });
*/

    });

})(jQuery);
