<?php
function code2utf($num){
 if ($num < 128) {
  return chr($num);
 }
 if ($num < 2048) {
  return chr(($num >> 6) + 192) . chr(($num & 63) + 128);
 }
 if ($num < 65536) {
  return chr(($num >> 12) + 224) . chr((($num >> 6) & 63) + 128) . chr(($num & 63) + 128);
 }
 if ($num < 2097152) {
  return chr(($num >> 18) + 240) . chr((($num >> 12) & 63) + 128) . chr((($num >> 6) & 63) + 128) . chr(($num & 63) + 128);
 }
 return '';
}



class VirtualKeyboardLayout {

    /**
     *  Array with normal keys
     *
     *  @type array
     *  @access private
     */

    var $normal = array();
    var $shift = array();
    var $altgr = array();
    var $name = "";
    var $code = "";
    var $domain = "";

    var $copyright = "";

    var $columns = array();
    var $strings = array();
    var $ligatures = array();

    var $root = "";
    var $addon = "/addons/";
    var $callback = "callbacks/";

    var $fname = "";

    var $map = array(
            'normal'    => 0
           ,'shift'     => 1
           ,'ctrl'      => 2
           ,'shft_ctrl' => 3
           ,'alt'       => 6
           ,'shft_alt'  => 7
        );

    function VirtualKeyboardLayout($fname) {
        $this->exceptions = &$tmp;
        $this->root = dirname($fname);
        $this->fname = $fname;
        $this->processLayout(file_get_contents($fname));
    }
    function processLayout($str) {
        mb_internal_encoding("UTF-8");
        $str = mb_convert_encoding($str,"UTF-8", "UCS-2");
        preg_match("/^localename\\t\"(\\w+)-(\\w+)/mi",$str,$m);
        $this->code = $m[2];
        $this->domain = strtoupper($m[1]);
        preg_match("/^.*?kbd[^\"]+\"([^\"]+)/mi",$str,$m);
        $this->name = array_shift(preg_split("/\\s-\\s/",$m[1]));
        preg_match("/^copyright[^\"]+\"([^\"]+)/mi",$str,$m);
        $this->copyright = $m[1];
        if (preg_match("/ilya lebedev/i",$this->copyright)) $this->copyright = "";
        /**
         *   String format
         *
         *   HexCode \t KeyId \t CapsEnabled \t NormalKey \t ShiftKey \t
         *
         *   @type {String}
         */
        $this->strings = preg_split("#[\\r\\n]+#",preg_replace(array("#^.+?//SC[^\\r\\n]+[/\\s-]+#smi","#\\s+(^deadkey|^ligature|^keyname).+#smi"),"",$str));
        $this->strings = array_map(create_function('$a','return preg_split("#\\t+#",$a);'),$this->strings);
        /*
        *  remove SGCap strings
        */
        for ($z=sizeof($this->strings);$z>=0;$z--) {
            if (-1 == @(int)$this->strings[$z][0]) {
                array_splice($this->strings,$z,1);
            }
        }
        /*
        *  Move OEM keys on the right places
        */
        array_splice($this->strings,12,0,array_splice($this->strings,36,1));
        array_unshift($this->strings,array_pop(array_splice($this->strings,36,1)));
      
        preg_match("/shiftstate\\s+((?:(?!layout).|[\\r\\n])+)/i",$str,$m);
        $this->columns = preg_split("/\\s.+[\\r\\n]+/",$m[1]);
      
        preg_match("#^.+?//VK_[^\\r\\n]+[/\\s-]+(.+?)(^deadkey|^keyname)#smi",$str,$m);
        $this->ligatures = $m?array_filter(preg_split("#[\\r\\n]+#",$m[1])):false;
      
        /*
        *  Column values
        *  0 - normal key state
        *  1 - Shift
        *  2 - Ctrl 
        *  3 - Shift+Ctrl
        *  6 - AltGr (Shift+Ctrl)
        *  7 - Shift+AltGr (Shift+Ctrl+Alt)
        *                                                  
        *  convert them to keys
        */
        for ($i=sizeof($this->columns)-1; $i>=0; $i--) {
            $q = $this->columns[$i];
            $this->columns[$i] = false;
            if (is_numeric($q))
                $this->columns[$q] = $i+3; // actual column number is 3
        }
        if ($this->ligatures) {
            $this->ligatures = array_map(create_function('$a','return preg_split("#\\t+#",$a);'),$this->ligatures);
            for ($i=sizeof($this->ligatures)-1,$tmp=array(); $i>=0; $i--) {
               if (!isset($tmp[$this->ligatures[$i][0]])) {
                   $tmp[$this->ligatures[$i][0]] = array();
               }
               $tmp[$this->ligatures[$i][0]][$this->ligatures[$i][1]] = "\x01".join("",array_map(create_function('$a','return code2utf(hexdec($a));'),array_slice($this->ligatures[$i],2,-1)))."\x02";
            }
            $this->ligatures = $tmp;
        }
    }
    
    function & getConvertedLayout () {
        mb_internal_encoding("UTF-8");
        $fs = array_slice($this->strings,0,47);

        $VK = array('name' => $this->name
                   ,'code' => $this->code
                   ,'domain' => $this->domain
                   ,'copy' => $this->copyright
                   ,'normal' => array()
                   ,'shift' => array(array())
                   ,'alt' => array(array())
                   ,'dk' => array()
                   ,'addon' => ""
                   ,'callback' => ""
              );
        for ($z=0; $z<sizeof($fs); $z++) {
            $fr = $fs[$z];

            $ncc = $this->columns[$this->map['normal']];
            $scc = $this->columns[$this->map['shift']];
            $acc = @$this->columns[$this->map['alt']];
            $gcc = @$this->columns[$this->map['shft_alt']];

            $nc = isset($fr[$ncc])&&strlen($fr[$ncc])>2?code2utf(hexdec($fr[$ncc])):$fr[$ncc];
            $sc = isset($fr[$scc])&&strlen($fr[$scc])>2?code2utf(hexdec($fr[$scc])):$fr[$scc];
            $ac = isset($fr[$acc])&&strlen($fr[$acc])>2?code2utf(hexdec($fr[$acc])):@$fr[$acc];
            $gc = isset($fr[$gcc])&&strlen($fr[$gcc])>2?code2utf(hexdec($fr[$gcc])):@$fr[$gcc];

            if ('%%' == $nc) {
                $VK['normal'][] = $this->ligatures[$fr[1]][$this->map['normal']];
            } else {
                $VK['normal'][] = $nc;
            }
            /*
            *  VirtualKeyboard asks to keep only unique symbols on one key
            *
            *  %% indicates a presence on ligature
            *  
            *  sometimes, MSKLC is getting buggy and move shift key to alt+shift
            */
            if ($sc == -1 || (mb_strtoupper($sc) == mb_strtoupper($nc) && '%%' != $sc)) {
                $VK['shift'][sizeof($VK['normal'])] = array();
            } else {
                if ('%%' == $sc) {
                    $VK['shift'][array_pop(array_keys($VK['shift']))][] = $this->ligatures[$fr[1]][$this->map['shift']];
                } elseif ('-1' == $sc) {
                    $VK['shift'][array_pop(array_keys($VK['shift']))][] = $gc;
                } elseif ($sc)  {
                    $VK['shift'][array_pop(array_keys($VK['shift']))][] = $sc;
                }
            }
            /*
            *  VirtualKeyboard asks to keep only unique symbols on one key
            *
            *  %% indicates a presence on ligature
            */
            if ($ac == -1 || (mb_strtoupper($ac) == mb_strtoupper($nc) && '%%' != $ac)) {
                $VK['alt'][sizeof($VK['normal'])] = array();
            } else {
                if ('%%' == $ac) {
                    /*
                    *  weird format, here normal modifier order is used
                    */
                    $VK['alt'][array_pop(array_keys($VK['alt']))][] = $this->ligatures[$fr[1]][$this->map['alt']-2];
                } elseif ($ac) {
                    $VK['alt'][array_pop(array_keys($VK['alt']))][] = $ac;
                }
            }
            if (isset($fr[$ncc])&&strpos($fr[$ncc],'@')>0 && !array_search($nc,$VK['dk'])) $VK['dk'][] = $nc;
            if (isset($fr[$scc])&&strpos($fr[$scc],'@')>0 && !array_search($nc,$VK['dk'])) $VK['dk'][] = $sc;
            if (isset($fr[$acc])&&strpos($fr[$acc],'@')>0 && !array_search($nc,$VK['dk'])) $VK['dk'][] = $ac;
        }
        $VK['keynum'] = sizeof($VK['normal']);
        $VK['normal'] = $this->joinChars($VK['normal']);

        $VK['alt'] = array_filter($VK['alt']);
        $VK['alt'] = array_map(array($this,'joinChars'),$VK['alt']);

        $VK['shift'] = array_filter($VK['shift']);
        $VK['shift'] = array_map(array($this,'joinChars'),$VK['shift']);

        $VK['dk'] = join("",$VK['dk']);


        $add = realpath($this->root.$this->addon.$VK['code'].'.js');
        if (file_exists($add)) {
            $VK['addon'] = file_get_contents($add);
        }
        $add = realpath($this->root.$this->addon.$this->callback.preg_replace("/.+[\\/\\\\]+(.+)\\.klc$/i","\\1.js",$this->fname));
        if (file_exists($add)) {
            $VK['callback'] = trim(file_get_contents($add),"\r\n; ");
        }

        return $VK;
      }

      function joinChars ($a) {
          return join("",array_map(create_function('$a','return false!==$a&&"-1"!=$a?$a:"\x03";'),$a));
      }
}
