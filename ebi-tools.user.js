// ==UserScript==
// @name         ebi-tool
// @namespace    https://github.com/ebiebi-pg/bro3-tool
// @version      0.2
// @description  同盟遠征支援ツール
// @author       Ebi
// @match        https://*.3gokushi.jp/*
// @match        http://*.3gokushi.jp/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=3gokushi.jp
// @grant        none
// ==/UserScript==

var d = document;

var $a = function(xp,dc) {
           var r = d.evaluate(xp, dc||d, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
           var a=[];
           for(var i=0; i<r.snapshotLength; i++){
             a.push(r.snapshotItem(i));
           }
           return a;
         };

var $x = function(xp,dc) {
           return d.evaluate(xp, dc||d, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
         };

var SCRIPTS = [
               '//bro3-tool.com/bro3-tool/ebi-tool.js'
               ];

var LOADSCRIPTS = 0;

var BROWNO = 0;
var APIKEY = 0;

(function() {
    try {
        if(!location.href.match(/info/)){
            var srcElm = $x("//script[@src='" + SCRIPTS[SCRIPTS.length - 1] + "']");
            if(srcElm != null && srcElm != undefined){
                main(BROWNO, APIKEY);
            }else{
                scriptLoad();
            }
        }
    }catch(e){
        alert(e + "\n\n" + e.stack + "\n\n" + location.pathname);
    }
})();

// ソース読み込み
function scriptLoad(){
    if(SCRIPTS[LOADSCRIPTS] != undefined){
        if(LOADSCRIPTS == 0){
            let s = document.createElement("script");
            s.type = "text/javascript";
            document.head.append(s);
        }
        try {
            let script = document.createElement('script');
            script.src = SCRIPTS[LOADSCRIPTS] + "?" + String(Math.floor(Math.random() * 10000000000) + 1);
            document.body.appendChild(script);
            if(LOADSCRIPTS++ < SCRIPTS.length){
                script.onload = function(){ scriptLoad(); };
            }
        }catch(e){
            alert("Script Load Error:" + e + "\n\n" + e.stack + "\n\n" );
        }
    }else{
        main();
    }
}