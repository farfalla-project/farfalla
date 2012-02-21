// <reference path="jquery-1.6.1.min.js" />

$(document).ready(function ()
{
    LoadDasherParent();
    BindDasherToAll();
});

function LoadDasherParent()
{
    var appletDiv = $('<div id="AppletDiv"></div>');
    appletDiv.css({
        "position": "absolute",
        "display": "none",
        "top": "0",
        "left": "0",
        "width": "200px",
        "height": "200px"
    });
    appletDiv.appendTo("body");
}
function BindDasherToAll()
{
    var allTextElements = $('input[type=text], textarea');
    $.each(allTextElements, function (index, value)
    {

        var id = "";
        id = $(value).attr("id");
        if (id == null || id == "")
        {
            id = "InputElement" + index;
            $(value).attr({ "id": id });
            BindDasher(id);
        }
        else
        {
            BindDasher(id);
        }

    });
}
function LoadDasher(id)
{
    //retriving position from the id of the element
    var offset = $("#" + id).offset();
    var height = $("#" + id).height();
    var top = offset.top + height;
    var left = offset.left;

    $("#AppletDiv").css(
    { "display": "block",
        "position": "absolute",
        "top": top,
        "left": left,
        "width": "200px",
        "height": "200px"
    });

    var  applet  = $("<applet/>");
     applet.attr({ "height": "90%",
        "width": "90%",
        "archive": farfalla_path+"plugins/dasher/Dasher.jar",
        "code": "dasher/applet/JDasherApplet.class",
      "id": "JDasherApplet"
    });
    applet.appendTo($("#AppletDiv"));
    //ToggleDasher(false);
}

function UnloadDasher()
{
    $("#AppletDiv").html("");
    $("#AppletDiv").css({ "display": "none" });
}

function ToggleDasher(bool, id)
{
    //$("#AppletDiv").toggle(bool);
    if (bool)
    {
        LoadDasher(id);
    }
    else
    {
        UnloadDasher();
    }
}

var idArray = new Array();
var currentId = "";

function BindDasher(id)
{
    $("#" + id).click(function ()
    {
        if (currentId == "")
        {
            ToggleDasher(true, id);
            currentId = id;
        }
        else
        {
            if (currentId == id)
            {
                CopyDasherData(id);
                ToggleDasher(false);
                currentId = "";
            }
            else
            {
                currentId = id;
                ToggleDasher(false);
                ToggleDasher(true, id);
                //CopyDasherData(id);
            }

        }

    });

    //adding the id to array of binded ids
    idArray.push(id);
}

function CopyDasherData(id)
{
    var text = $("#JDasherApplet")[0].getCurrentEditBoxText();
    $("#" + id).val(text);
}
function RedrawDasher()
{
    $("#JDasherApplet")[0].Redraw();
}
function InitJDasher()
{
    $("#JDasherApplet")[0].init();
}
