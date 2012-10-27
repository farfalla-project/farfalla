VirtualKeyboard = new function () {
  var self = this, to = null;
  self.show = self.hide = self.toggle = self.attachInput = function () {
     window.status = 'VirtualKeyboard is not loaded yet.';
     if (!to) setTimeout(function(){window.status = ''},1000);
  }
  self.isOpen = function () {
      return false;
  }
};
(function () {
    var pq = function (q) {if ('string'!=typeof q || q.length<2) return {};q = q.split(/&amp;|&/g);for (var z=0,qL=q.length,rs={},kv,rkv;z<qL;z++){kv=q[z].split("=");kv[0]=kv[0].replace(/[{}\[\]]*$/,"");rkv = rs[kv[0]];kv[1]=unescape(kv[1]?kv[1].replace("+"," "):"");if (rkv)if ('array'==typeof(rkv))rs[kv[0]][rs[kv[0]].length]=kv[1];else rs[kv[0]]=[rs[kv[0]],kv[1]];else rs[kv[0]]=kv[1];}return rs}

    /*
    *  track, how we've opened
    */
    var targetWindow = window.dialogArguments||window.opener||window.top
       ,addHead = null
       ,targetScript = 'vk_loader.js';
    try {
        if (targetWindow != window) {
            var addHead = targetWindow.document.getElementsByTagName('head')[0];
            var targetScript = window.location.href.match(/.*\/(.+)\..+$/)[1]+'.js';
        }
    } catch (e) {
        targetWindow = window;
    }

    q = (function (sname,td){var h=(td||document).getElementsByTagName('html')[0].innerHTML,sr=new RegExp('<scr'+'ipt[^>]+?src[^"\']+.*?'+sname+'([^#"\']*)','i'),m = h.match(sr);if (m) return pq(m[1].replace(/^[^?]*\?([^#]+)/,"$1"));return {};})(targetScript,targetWindow.document)
    var p = (function (sname){var sc=document.getElementsByTagName('script'),sr=new RegExp('^(.*/|)('+sname+')([#?]|$)');for (var i=0,scL=sc.length; i<scL; i++) {var m = String(sc[i].src).match(sr);if (m) {if (m[1].match(/^((https?|file)\:\/{2,}|\w:[\\])/)) return m[1];if (m[1].indexOf("/")==0) return m[1];b = document.getElementsByTagName('base');if (b[0] && b[0].href) return b[0].href+m[1];return (document.location.href.match(/(.*[\/\\])/)[0]+m[1]).replace(/^\/+/,"");}}return null;})
             ('vk_loader.js');

    var qs = pq(targetWindow.location.search.slice(1));
    var dpd = [ 'extensions/helpers.js'
               ,'extensions/dom.js'
               ,'extensions/ext/object.js'
               ,'extensions/ext/string.js'
               ,'extensions/ext/regexp.js'
               ,'extensions/ext/array.js'
               ,'extensions/eventmanager.js'
               ,'extensions/documentselection.js'
/*
* not used by default
* 
*               ,'layouts/unconverted.js'
*/
    ];
    q.skin = qs.vk_skin || q.vk_skin || 'winxp';
    q.layout = qs.vk_layout || q.vk_layout || null;

    var head = document.getElementsByTagName('head')[0]
       ,s;
    /*
    *  load styles at the proper places
    */
    s = document.createElement('link');
    s.rel = 'stylesheet';
    s.type= 'text/css';
    s.href= p+'css/'+q.skin+'/keyboard.css';
    head.appendChild(s);
    if (addHead) {
        var lnk = targetWindow.document.createElement('link');
        lnk.rel = 'stylesheet';
        lnk.type= 'text/css';
        lnk.href= p+'css/'+q.skin+'/keyboard.css';
        addHead.appendChild(lnk);
        lnk = null;
    }

    for (var i=0,dL=dpd.length;i<dL;i++)
        dpd[i] = p+dpd[i];
    dpd[i++] = p+'virtualkeyboard.js?layout='+q.layout;
    dpd[i] = p+'layouts/layouts.js';
    if (window.ScriptQueue) {
        ScriptQueue.queue(dpd);
    } else {
        if (!(window.ScriptQueueIncludes instanceof Array)) window.ScriptQueueIncludes = []
        window.ScriptQueueIncludes = window.ScriptQueueIncludes.concat(dpd);
        
        /*
        *  attach script loader
        */
        if (document.body) {
            s = document.createElement('script');
            s.type="text/javascript";
            s.src = p+'extensions/scriptqueue.js';
            head.appendChild(s);
        } else {
            document.write("<scr"+"ipt type=\"text/javascript\" src=\""+p+'extensions/scriptqueue.js'+"\"></scr"+"ipt>");
        }
    }
})();
