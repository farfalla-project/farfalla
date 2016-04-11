// Farfalla plugin: imagination. Uses Flickr APIs to associate words with images.

jQuery.noConflict();
  (function($) {

    $(function() {
/*
      Array.prototype.getUnique = function(){
        var u = {}, a = [];
        for(var i = 0, l = this.length; i < l; ++i){
          if(this[i] in u)
            continue;
            a.push(this[i]);
            u[this[i]] = 1;
        }
        return a;
      }
*/

      $("h1, h2, h3, h4, h5, h6, p, li").each(function() {
        var regexp = /[a-z]{4,}/gi

        var nnew = $(this).html().replace(regexp, function(word) {
          return '<span class="api-img">' + word + '</span>'
        })

          $(this).html(nnew)
        })

        $("span.api-img").click(function() {
          var word = $(this).html()
          var elem = $(this);
          $.getJSON('http://flickr.com/services/rest/?method=flickr.photos.search&api_key=714f1578b4459b64dac902bebef32136&text='+word+'&per_page=1&format=json&jsoncallback=?', function(data){
          var pic = data.photos.photo[0];

          var img_url = 'http://farm'+pic.farm+'.staticflickr.com/'+pic.server+'/'+pic.id+'_'+pic.secret+'_m.jpg';
          elem.qtip({
            content :  '<img src="' + img_url + '" alt="' + word + '" style="width:300px" />',
            position : {
              my: 'bottom center',
              at: 'top center',
              target: elem
            },
            style: 'ui-tooltip-dark'
            })
          })

          })
          .hover(function() {
            $(this)
              .addClass('highlight-word')
              .addClass('ui-corner-all')
            }, function() {
              $(this)
                .removeClass('highlight-word')
                .removeClass('ui-corner-all')
            }
          )

      })

  })(jQuery);
