//= require jquery
//= require jquery_ujs
//= require modernizer
//= require cbpHorizontalSlideOutMenu
//= require_self
window.onload = function() {
	var menu = new cbpHorizontalSlideOutMenu( document.getElementById( 'cbp-hsmenu-wrapper' ) );
}

function loadFlash(fname,w,h,gubun) {
	var oStr = "";
	oStr = "<Embed src='"+fname+"'+ quality=high width="+w+" height="+h
			oStr += "	pluginspage=http://www.macromedia.com/go/getflashplayer type=application/x-shockwave-flash wmode=transparent id=topmenu align=absmiddle></Embed>"
	
	document.write(oStr);
}