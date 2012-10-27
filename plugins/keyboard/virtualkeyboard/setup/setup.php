<?php
header("Content-Type: text/html; charset=utf-8");

require "vk.inc.php";

define ('LAYOUT_ROOT', dirname(__FILE__)."/in/");
define ('LAYOUT_MASK', '*.klc');
define ('LAYOUT_OUT', dirname(__FILE__)."/out/layouts.js");
define ('LAYOUT_INSTALL', dirname(__FILE__)."/../layouts/layouts.js");

$exceptions = array(
    0x00AD => '\u00AD'
   ,0x0600 => '\u0600'
   ,0x0601 => '\u0601'
   ,0x0602 => '\u0602'
   ,0x0603 => '\u0603'
   ,0x06DD => '\u06DD'
   ,0x070F => '\u070F'
   ,0x17B4 => '\u17B4'
   ,0x17B5 => '\u17B5'
   ,0x200B => '\u200B'
   ,0x200C => '\u200C'
   ,0x200D => '\u200D'
   ,0x200E => '\u200E'
   ,0x200F => '\u200F'
   ,0x202A => '\u202A'
   ,0x202B => '\u202B'
   ,0x202C => '\u202C'
   ,0x202D => '\u202D'
   ,0x202E => '\u202E'
   ,0x2060 => '\u2060'
   ,0x2061 => '\u2061'
   ,0x2062 => '\u2062'
   ,0x2063 => '\u2063'
   ,0x206A => '\u206A'
   ,0x206B => '\u206B'
   ,0x206C => '\u206C'
   ,0x206D => '\u206D'
   ,0x206E => '\u206E'
   ,0x206F => '\u206F');

$LAYOUT_EXCEPTIONS = array();
foreach($exceptions as $k => $v) {
    $LAYOUT_EXCEPTIONS[code2utf($k)] = $v;
}


function replaceFormatChars($str) {
    global $LAYOUT_EXCEPTIONS;
    return str_replace(array_keys($LAYOUT_EXCEPTIONS), array_values($LAYOUT_EXCEPTIONS),$str);
}

function lytkeys2string ($s,$p) {
    $sh = "";
    foreach ($s as $k => $v) {
        $sh .= $k.":'".replaceFormatChars(mb_escape($v))."',";
    }
    if ($sh) {
        return $p.": {".substr($sh,0,-1)."}";
    } else {
        return "";
    }
}

function mb_escape($str) {
    return preg_replace("/([\\\\'])/u","\\\\$1",$str);
}

/*
*  prepare layouts file;
*/
$VK_ADDON_INCLUDED = array();
@unlink(LAYOUT_OUT);
$fd = fopen(LAYOUT_OUT,"ab");
fwrite($fd,'﻿');
fclose($fd);
$fd = null;

/**
 *  Converts plaintext keyboard layout to the valid javascript code and saves it
 *
 *  @param VirtualKeyboardLayout $f layout object
 *  @return boolean conversion state
 *  @scope public
 */
function convertKbd(&$f) {
    global $VK_ADDON_INCLUDED;

    $res = & $f->getConvertedLayout();

    if ($res['keynum']!=47) return false;
    $res['domain'] = strtoupper($res['domain']);
    switch ($_REQUEST['group']) {
        case "lng" :
            $code = $res['domain']==$res['code']?$res['code']
                                                :$res['domain'].'-'.$res['code'];
            break;
        case "domain" :
            $code = $res['domain'];
            break;
    }

    $params = array();
    $params[] = "code:'".$code."'";
    $params[] = "name:'".$res['name']."'";
    $params[] = "keys:'".replaceFormatChars(mb_escape($res['normal']))."'";
    $params[] = lytkeys2string($res['shift'],'shift');
    $params[] = lytkeys2string($res['alt'],'alt');
    if ($res['callback']) $params[] = "cbk:".$res['callback'];
    if ($res['dk']) $params[] = "dk:'".mb_escape($res['dk'])."'";


    $s = "VirtualKeyboard.addLayout({".join(",",array_filter($params))."});\n";

    if ($res['addon'] && !isset($VK_ADDON_INCLUDED[$res['code']])) {
        $s = $res['addon'] . $s;
        $VK_ADDON_INCLUDED[ $res ['code']] = true;
    }

    
    /*
    *  save layout
    */
    $fd = fopen(LAYOUT_OUT,"ab");
    fwrite($fd,$s);
    fclose($fd);
    return true;
}


function getLayoutList () {
    return glob(LAYOUT_ROOT.LAYOUT_MASK);
}
?>
<html>
 <head>
  <title>Virtual Keyboard layouts setup page</title>
  <style type="text/css">
   table {
       padding: 0;
       border-collapse: collapse;
   }
   th {
       text-align: left;
   }
   tr.odd td {
       background: #f4f4f4;
   }
  </style>
 </head>
 <body>
  <p>Keyboard layouts setup</p>
  <form action="" method="POST" >
   <div>
    <div style="height: 400px; overflow: auto; border: 1px inset black;">
     <table id="targetkbd" border="0">
      <thead>
       <tr>
        <th><input type="checkbox" onclick="var els=this.parentNode.parentNode.parentNode.parentNode.tBodies[0].getElementsByTagName('input'); for(var i=0, eL=els.length; i<eL; i++) els[i].checked=this.checked;"></th>
        <th>Layout Code</th>
        <th>Layout Name</th>
        <th>Copyright</th>
        <th>Saved</th>
       </tr>
      </thead>
      <tbody>
       <?php
         $kbdl = getLayoutList();
         $saved = false;
         for ($i=0;$i<sizeof($kbdl);$i++) {
            $kl = & new VirtualKeyboardLayout($kbdl[$i]);
            $cname = str_replace(".","_",urlencode($kl->name));
            $cls = $i%2?"even":"odd";
            $checked = isset($_POST[$cname])?'checked="true"':"";
            $saved = isset($_POST[$cname])
                        ?(convertKbd($kl)?"<span style=\"color:green\">Yes</span>"
                                         :"<span style=\"color:red\">No</span>"
                         )
                        :"<span></span>";
            echo "<tr class=\"$cls\">
                   <td><input type=\"checkbox\" name=\"{$cname}\" $checked /></td>
                   <td>{$kl->code}</td>
                   <td>{$kl->name}</td>
                   <td>{$kl->copyright}</td>
                   <td>$saved</td>
                  </tr> 
                 ";
         }
         if (isset($_POST['doinstall'])) {
             $inst_res = 1;
             if (file_exists(LAYOUT_INSTALL))
                 $inst_res = 2;
             else
                 $inst_res = @copy(LAYOUT_OUT, LAYOUT_INSTALL);
         }
       ?>
      </tbody>
     </table>
    </div>
    <label for="install">Install layouts<input type="checkbox" name="doinstall" /></label>
    <?php if (isset($inst_res)) { ?>
        <?php if (1==$inst_res) {?>
            <span style="color: green">success</span>
        <?php } else { ?>
            <span style="color: red">error: <?=$inst_res==0?"New layout file is not accessible. Have you selected any layouts to install?"
                                                             :"Target file (<b>/layouts/layouts.js</b>) is already exists, remove it before installing new one."?></span>
        <?php } ?>
    <?php } ?>
    <br />
    <strong>Group languages by</strong><br />
    <label for="group1"><input type="radio" name="group" id="group1" value="lng" checked="true" />Language code (en-<strong>US</strong>)</label>&nbsp;
    <label for="group2"><input type="radio" name="group" id="group2" value="domain" />Language domain (<strong>en</strong>-US)</label>
    <br />
    <br />
    <input type="submit" value="Process selected" />
   </div>
  </form>
  
 </body>
</html>
  
