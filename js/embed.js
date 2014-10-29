
/*
var dmd_HTML5SupportDetection1=function () {
	return true;
};
*/
function dmd_HTML5SupportDetection1() {
	var s_t_div=document.createElement("div");
	s_t_div.id="s_t";
	if (document.getElementsByTagName("body")[0])
		document.getElementsByTagName("body")[0].appendChild(s_t_div);
	else
		return true;
	var parentDiv=document.createElement("div");
	document.getElementById("s_t").appendChild(parentDiv);
	parentDiv.style.position="absolute";
	parentDiv.style.display="block";
	parentDiv.style.width="200px";
	parentDiv.style.height="200px";
	parentDiv.style.left="0px";
	parentDiv.style.top="0px";
	parentDiv.style.backgroundColor="black";
	parentDiv.style.WebkitTransformStyle="preserve-3d";
	parentDiv.style.MozTransformStyle="preserve-3d";

	var getOffset=function(elem) {
		var lft=window.getComputedStyle(elem, null).getPropertyValue("left");
		var tp=window.getComputedStyle(elem, null).getPropertyValue("top");
		var point={x:0, y:0};
		if (window.webkitConvertPointFromNodeToPage)
			point = window.webkitConvertPointFromNodeToPage(elem, new WebKitPoint(0, 0));
		else if (elem.getBoundingClientRect) {
			var ofst=elem.getBoundingClientRect();
			point = {x:ofst.left, y:ofst.top};
		}
		else if (childDiv.offsetParent) {
			var elm=childDiv;
			var left=0;
			var top=0;
			do
			{
				left+=elm.clientLeft;
				top+=elm.clientTop;
			}
			while(elm=elm.offsetParent);
			point={x:left, y:top};
		}
		return {left:point.x, top:point.y};
	}

	var childDiv=document.createElement("div");
	parentDiv.appendChild(childDiv);
	childDiv.style.position="absolute";
	childDiv.style.display="block";
	childDiv.style.width="100px";
	childDiv.style.height="100px";
	childDiv.style.left="0px";
	childDiv.style.top="0px";

	childDiv.style.WebkitTransform="rotateY(19deg)";
	childDiv.style.MozTransform="rotateY(19deg)";
	childDiv.style.backgroundColor="red";
	childDiv.style.WebkitTransformStyle="preserve-3d";
	childDiv.style.MozTransformStyle="preserve-3d";

	var old_pos=getOffset(childDiv);

	parentDiv.style.WebkitPerspective="100px";
	parentDiv.style.MozPerspective="100px";

	var new_pos=getOffset(childDiv);

	var elem=document.getElementById("s_t");
	elem.parentNode.removeChild(elem);

	if ((Math.abs(old_pos.left-new_pos.left) > 1E-3) || (Math.abs(old_pos.top-new_pos.top) > 1E-3)) {

		return true;
	}
	else {

		return false;
	}
};
var dmd_HTML5SupportDetection = dmd_HTML5SupportDetection1;
function getLBWidth() { return parseInt(document.body.clientWidth); };
function getLBHeight() { 
	var winH = 460;
	if (document.body && document.body.offsetWidth) {
	 winH = document.body.offsetHeight;
	}
	if (document.compatMode=="CSS1Compat" && document.documentElement && document.documentElement.offsetWidth ) { winH = document.documentElement.offsetHeight; }
	if (window.innerHeight) { winH = window.innerHeight; }
	return winH;
};
function isSizePercentaged(for_element_id) { var divViewer = document.getElementById(for_element_id); var sWidth = divViewer.style.width.toString(), sHeight = divViewer.style.height.toString(); if ((sWidth.indexOf("%") > -1) || (sHeight.indexOf("%") > -1)) return true; return false; };
function setOpacity(obj, oVal) { if ((typeof(obj.filters) !== "undefined") && (typeof(obj.filters.alpha) !== "undefined")) obj.style.filter="alpha(opacity:" + oVal*100 + ")"; else obj.style.opacity=oVal; };
function getOpacity(obj) { if ((typeof(obj.filters) !== "undefined") && (typeof(obj.filters.alpha) !== "undefined")) return parseInt(obj.filters.alpha.opacity) / 100; else return parseFloat(obj.style.opacity); };
if(!window.addEventListener) window.addEventListener = function (type, listener, useCapture) { attachEvent("on" + type, function() { listener(event) }); };
function animate(attributes, duration, callback) {
	clearInterval(this.interval);
	this.t=16;
	this.fps_60=duration/this.t;
	this.animateOpacity=0;
	if(typeof(attributes["opacity"]) !== "undefined")
		this.animateOpacity=parseFloat(attributes["opacity"]);
	else {
		this.animateOpacity = isNaN(parseFloat(getOpacity(this))) ? 1 : parseFloat(getOpacity(this));
	}
	this.animateLeft=0;
	if(typeof(attributes["left"]) !== "undefined")
		this.animateLeft=parseInt(attributes["left"]);
	else
		this.animateLeft = isNaN(parseFloat(this.style.left)) ? 0 : parseFloat(this.style.left);
	this.animateTop=0;
	if(typeof(attributes["top"]) !== "undefined")
		this.animateTop=parseInt(attributes["top"]);
	else
		this.animateTop = isNaN(parseFloat(this.style.top)) ? 0 : parseFloat(this.style.top);
	this.animateWidth=0;
	if(typeof(attributes["width"]) !== "undefined")
		this.animateWidth=parseInt(attributes["width"]);
	else
		this.animateWidth = parseFloat(this.clientWidth);
	this.animateHeight=0;
	if(typeof(attributes["height"]) !== "undefined")
		this.animateHeight=parseInt(attributes["height"]);
	else
		this.animateHeight = parseFloat(this.clientHeight);
		
	if (duration < this.t) {
	
		this.style.left = this.animateLeft + "px";
		this.style.top = this.animateTop + "px";
		this.style.width = this.animateWidth + "px";
		this.style.height = this.animateHeight + "px";
		setOpacity(this, this.animateOpacity);
		this.cnt=0;
		if (callback) callback();
		return false;
	};
	
	this.animateOpacityStep=0;
	this.animateOpacityStep=(this.animateOpacity-(isNaN(parseFloat(getOpacity(this))) ? 1 : parseFloat(getOpacity(this))))/this.fps_60;
	this.animateLeftStep=0;
	this.animateLeftStep=(this.animateLeft-(isNaN(parseFloat(this.style.left)) ? 0 : parseFloat(this.style.left)))/this.fps_60;
	this.animateTopStep=0;
	this.animateTopStep=(this.animateTop-(isNaN(parseFloat(this.style.top)) ? 0 : parseFloat(this.style.top)))/this.fps_60;
	this.animateHeightStep=0;
	this.animateHeightStep=(this.animateHeight-parseFloat(this.clientHeight))/this.fps_60;
	this.animateWidthStep=0;
	this.animateWidthStep=(this.animateWidth-parseFloat(this.clientWidth))/this.fps_60;
	this.cnt=0;
	this.cWidth=parseFloat(this.clientWidth);
	this.cHeight=parseFloat(this.clientHeight);
	this.cTop=isNaN(parseFloat(this.style.top)) ? 0 : parseFloat(this.style.top);
	this.cLeft=isNaN(parseFloat(this.style.left)) ? 0 : parseFloat(this.style.left);
	this.cOpacity=isNaN(getOpacity(this)) ? 1 : parseFloat(getOpacity(this));
	var f=function(obj) {
		if (obj.cnt>=parseInt(obj.fps_60)) {
			clearInterval(obj.interval);
			obj.interval=-1;
			obj.style.left=obj.animateLeft + "px";
			obj.style.top=obj.animateTop + "px";
			obj.style.width=obj.animateWidth + "px";
			obj.style.height=obj.animateHeight + "px";
			setOpacity(obj, obj.animateOpacity);
			obj.cnt=0;
			if (callback) callback();
		}
		else {
			obj.cWidth+=obj.animateWidthStep;
			obj.cHeight+=obj.animateHeightStep;
			obj.cTop+=obj.animateTopStep;
			obj.cLeft+= obj.animateLeftStep;
			obj.cOpacity+=obj.animateOpacityStep;
			obj.cnt++;
			setOpacity(obj, obj.cOpacity);
			obj.style.left = obj.cLeft + "px";
			obj.style.top = obj.cTop + "px";
			obj.style.height = obj.cHeight + "px";
			obj.style.width = obj.cWidth + "px";
		}
	};
	var param=this;
	this.interval=setInterval(function() { f(param) }, this.t);
};

var DMD_AUTOPLAY=((typeof(DMD_AUTOPLAY) !== "undefined") ? DMD_AUTOPLAY : 1);

var DMD_LAST_RUNNING=((typeof(DMD_LAST_RUNNING) !== "undefined") ? DMD_LAST_RUNNING : "");
var DMD_CURRENT_RUNNING=((typeof(DMD_CURRENT_RUNNING) !== "undefined") ? DMD_CURRENT_RUNNING : "");
var DMD_JS_EMBED=true;

var DMD_Embeding=function() {
	var DMD_CURRENT_PANO=0;
	var DMD_PANOS_LIST = [];
	var DMD_EMBEDCODE="";
	var DMD_ISOPENED=false;
	var EMPTY_AREA=60;
	var DURATION=100;
	this.init=function() {
		var lftOff=typeof(document.body.scrollLeft)!=="undefined" ? document.body.scrollLeft : window.pageXOffset, topOff=typeof(document.body.scrollTop)!=="undefined" ? document.body.scrollTop : window.pageYOffset;
		lftOff = parseInt(lftOff);
		topOff = parseInt(topOff);
		if (!document.getElementById("dmd_style")) {
			var styleDiv = document.createElement("div");
			styleDiv.id="dmd_style";
			document.getElementsByTagName("body")[0].appendChild(styleDiv);
			styleDiv.innerHTML = "<style>#dmd_error { white-space:nowrap; color:#ff6666; visibility:hidden; background-color:#000000; border:1px solid #aa0000; position:absolute; left:0px; top:0px; padding:50px; } .hovered { border:1px solid #ffffff; background-color:#ffffff; color:#000000 !important; } #dmd_counter td { font-size:12px; color:#FFFFFF; } </style>";
		};
		var dmd_embedder=document.getElementById("dmd_lb");
		if (dmd_embedder)
			dmd_embedder.parentNode.removeChild(dmd_embedder);
		dmd_embedder = document.createElement("div");
		dmd_embedder.id="dmd_lb";
		dmd_embedder.style.position="absolute";
		dmd_embedder.style.left=lftOff + "px";
		dmd_embedder.style.top=topOff + "px";
		dmd_embedder.style.display="block";
		dmd_embedder.style.width="100%";
		dmd_embedder.style.height="100%";
		dmd_embedder.style.overflow="hidden";
		dmd_embedder.style.zIndex="999999";
		document.getElementsByTagName("body")[0].appendChild(dmd_embedder);
		var dmd_mwindow = document.createElement("div");
		dmd_mwindow.id="dmd_mw";
		dmd_mwindow.style.width="0";
		dmd_mwindow.style.height="0";
		dmd_mwindow.style.position="absolute";
		dmd_mwindow.style.left=lftOff + "px";
		dmd_mwindow.style.top=topOff + "px";
		dmd_mwindow.style.display="block";
		dmd_mwindow.style.backgroundColor="#000000";
		dmd_mwindow.style.zIndex="1000000";
		dmd_embedder.appendChild(dmd_mwindow);
		var dmd_swindow = document.createElement("div");
		dmd_swindow.id="dmd_sw";
		dmd_swindow.style.zIndex="1000003";
		dmd_swindow.style.width="0";
		dmd_swindow.style.height="0";
		dmd_swindow.style.position="absolute";
		dmd_swindow.style.left=lftOff + "px";
		dmd_swindow.style.top=topOff + "px";
		dmd_swindow.style.display="block";
		dmd_swindow.style.backgroundColor="#000000";
		dmd_embedder.appendChild(dmd_swindow);
		var dmd_target = document.createElement("div");
		dmd_target.id="dmd_trgt";
		dmd_target.style.width="100%";
		dmd_target.style.height="100%";
		dmd_swindow.appendChild(dmd_target);
		var dmd_cwindow = document.createElement("div");
		dmd_cwindow.id="dmd_cw";
		dmd_cwindow.style.width="0px";
		dmd_cwindow.style.height="0px";
		dmd_cwindow.style.position="absolute";
		dmd_cwindow.style.left=0 + "px";
		dmd_cwindow.style.top=0 + "px";
		dmd_cwindow.style.display="block";
		dmd_cwindow.style.backgroundColor="transparent";
		dmd_cwindow.style.zIndex="1000001";
		dmd_embedder.appendChild(dmd_cwindow);
		var dmd_closebutton = document.createElement("div");
		dmd_closebutton.id="dmd_closebtn";
		dmd_closebutton.style.zIndex="1002";
		dmd_closebutton.style.fontSize="12px";
		dmd_closebutton.style.fontWeight="bold";
		dmd_closebutton.style.display="block";
		dmd_closebutton.style.border="1px solid #ffffff";
		dmd_closebutton.style.position="absolute";
		dmd_closebutton.style.padding="5px";
		dmd_closebutton.style.color="#ffffff";
		dmd_closebutton.style.cursor="pointer";
		dmd_closebutton.onmouseover=function(e) { e.target.className="hovered" };
		dmd_closebutton.onmouseout=function(e) { e.target.className="" };
		dmd_cwindow.appendChild(dmd_closebutton);
		dmd_closebutton.innerHTML="X";
		var dmd_nxt = document.createElement("div");
		dmd_nxt.id="dmd_next";
		dmd_nxt.style.zIndex="1002";
		dmd_nxt.style.fontSize="12px";
		dmd_nxt.style.fontWeight="bold";
		dmd_nxt.style.display="block";
		dmd_nxt.style.border="1px solid #ffffff";
		dmd_nxt.style.position="absolute";
		dmd_nxt.style.padding="5px";
		dmd_nxt.style.color="#ffffff";
		dmd_nxt.style.cursor="pointer";
		dmd_nxt.onmouseover=function() { this.className="hovered" };
		dmd_nxt.onmouseout=function() { this.className="" };
		dmd_cwindow.appendChild(dmd_nxt);
		dmd_nxt.innerHTML="&gt;";
		var dmd_prv = document.createElement("div");
		dmd_prv.id="dmd_prev";
		dmd_prv.style.zIndex="1002";
		dmd_prv.style.fontSize="12px";
		dmd_prv.style.fontWeight="bold";
		dmd_prv.style.display="block";
		dmd_prv.style.border="1px solid #ffffff";
		dmd_prv.style.position="absolute";
		dmd_prv.style.padding="5px";
		dmd_prv.style.color="#ffffff";
		dmd_prv.style.cursor="pointer";
		dmd_prv.onmouseover=function() { this.className="hovered" };
		dmd_prv.onmouseout=function() { this.className="" };
		dmd_cwindow.appendChild(dmd_prv);
		dmd_prv.innerHTML="&lt;";
		var dmd_fst = document.createElement("div");
		dmd_fst.id="dmd_first";
		dmd_fst.style.zIndex="1002";
		dmd_fst.style.fontSize="12px";
		dmd_fst.style.fontWeight="bold";
		dmd_fst.style.display="block";
		dmd_fst.style.border="1px solid #ffffff";
		dmd_fst.style.position="absolute";
		dmd_fst.style.padding="5px";
		dmd_fst.style.color="#ffffff";
		dmd_fst.style.cursor="pointer";
		dmd_fst.onmouseover=function() { this.className="hovered" };
		dmd_fst.onmouseout=function() { this.className="" };
		dmd_cwindow.appendChild(dmd_fst);
		dmd_fst.innerHTML="&lt;&lt;";
		var dmd_lst = document.createElement("div");
		dmd_lst.id="dmd_last";
		dmd_lst.style.zIndex="1002";
		dmd_lst.style.fontSize="12px";
		dmd_lst.style.fontWeight="bold";
		dmd_lst.style.display="block";
		dmd_lst.style.border="1px solid #ffffff";
		dmd_lst.style.position="absolute";
		dmd_lst.style.padding="5px";
		dmd_lst.style.color="#ffffff";
		dmd_lst.style.cursor="pointer";
		dmd_lst.onmouseover=function() { this.className="hovered" };
		dmd_lst.onmouseout=function() { this.className="" };
		dmd_cwindow.appendChild(dmd_lst);
		dmd_lst.innerHTML="&gt;&gt;";
		var dmd_count = document.createElement("div");
		dmd_count.id="dmd_counter";
		dmd_count.style.zIndex="1002";
		dmd_count.style.fontSize="12px";
		dmd_count.style.fontWeight="bold";
		dmd_count.style.display="block";
		dmd_count.style.border="1px solid #ffffff";
		dmd_count.style.position="absolute";
		dmd_count.style.padding="5px";
		dmd_count.style.color="#ffffff";
		dmd_count.style.width="100px";
		dmd_count.style.display="block";
		dmd_cwindow.appendChild(dmd_count);
		dmd_count.innerHTML="";
		var dmd_titlebar = document.createElement("div");
		dmd_titlebar.id="dmd_title";
		dmd_titlebar.style.display="none";
		dmd_titlebar.style.whiteSpace="nowrap";
		dmd_titlebar.style.position="absolute";
		dmd_titlebar.style.backgroundColor="#555555";
		dmd_titlebar.style.padding="10px";
		dmd_titlebar.style.border="1px solid #666666";
		dmd_titlebar.style.color="#ffffff";
		dmd_titlebar.style.zIndex="1000002";
		dmd_cwindow.appendChild(dmd_titlebar);
		dmd_titlebar.animate = animate;
		dmd_embedder.style.visibility = "hidden";
		dmd_mwindow.style.visibility = "hidden"; setOpacity(dmd_mwindow, 0);
		dmd_swindow.style.visibility = "hidden"; setOpacity(dmd_swindow, 0);
		dmd_cwindow.style.visibility = "hidden";
		setOpacity(dmd_titlebar, 0);
		dmd_titlebar.animate({ top: -parseInt(dmd_titlebar.clientHeight) }, 0); // 2 for border
		dmd_closebutton.onclick = this.close;
		dmd_target.style.display="none";
	};
	var DMD_OVERLAY_ORIGIN_LEFT=0;
	var DMD_OVERLAY_ORIGIN_TOP=0;
	this.show=function(new_pano, code, callback) {
		if (DMD_ISOPENED) return false;
		//new 2 lines
		DMD_OVERLAY_ORIGIN_LEFT=typeof(window.pageXOffset)=="undefined" ? parseInt(document.body.scrollLeft) : parseInt(window.pageXOffset);
		DMD_OVERLAY_ORIGIN_TOP=typeof(window.pageYOffset)=="undefined" ? parseInt(document.body.scrollTop) : parseInt(window.pageYOffset);
		DMD_CURRENT_RUNNING=new_pano[0];
		dmdHidePopups();
		for(var i=0; i < DMD_PANOS_LIST.length; i++) { if(DMD_PANOS_LIST[i][0] == new_pano[0]) DMD_CURRENT_PANO = i; }
		this.add(new_pano);
		var C_ID = DMD_PANOS_LIST[DMD_CURRENT_PANO][0];
		var availableHeight=parseInt(document.getElementById("thumbnail_"+C_ID).getAttribute("alt"));
		if(isNaN(availableHeight)) availableHeight = -1;
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var embedcode='<object id="dmd_flash_' + C_ID + '" name="dmd_flash_' + C_ID + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  width="100%" height="100%"><param name="BGCOLOR" value="#000000"></param><param name="movie" value="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+C_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'"></param><embed id="dmd_flash_' + C_ID + '" name="dmd_flash_' + C_ID + '" src="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+C_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'" bgcolor="#000000"></embed></object>';
		code = embedcode;
		DMD_ISOPENED=true;
		var lftOff=typeof(window.pageXOffset)=="undefined" ? document.body.scrollLeft : window.pageXOffset, topOff=typeof(window.pageYOffset)=="undefined" ? document.body.scrollTop : window.pageYOffset;
		lftOff = parseInt(lftOff);
		topOff = parseInt(topOff);
		var dmd_embedder = document.getElementById("dmd_lb");
		var dmd_mwindow = document.getElementById("dmd_mw");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_cwindow = document.getElementById("dmd_cw");
		var dmd_titlebar = document.getElementById("dmd_title");
		var dmd_closebutton = document.getElementById("dmd_closebtn");
		var dmd_count = document.getElementById("dmd_counter");
		var dmd_nxt = document.getElementById("dmd_next");
		var dmd_prv = document.getElementById("dmd_prev");
		var dmd_fst = document.getElementById("dmd_first");
		var dmd_lst = document.getElementById("dmd_last");
		var dmd_target = document.getElementById("dmd_trgt");
		dmd_embedder.style.visibility="visible";
		dmd_embedder.style.left=DMD_OVERLAY_ORIGIN_LEFT+"px";
		dmd_embedder.style.top=DMD_OVERLAY_ORIGIN_TOP+"px";
		//Target Element to be displayed
		dmd_target.innerHTML=code;
		dmd_target.style.display="block";
		//Title of the image
		dmd_titlebar.animate = animate;
		dmd_titlebar.innerHTML = (new_pano[1] == "") ? "Untitled" : new_pano[1];
		dmd_titlebar.style.left=(getLBWidth() - dmd_titlebar.clientWidth)*0.5-parseInt(dmd_titlebar.style.paddingLeft) + "px";
		dmd_titlebar.style.top=-parseInt(dmd_titlebar.clientHeight) - 2*parseInt(dmd_titlebar.style.paddingTop) - 2 + "px";
		//Close Button
		dmd_closebutton.style.left=getLBWidth()-parseInt(dmd_closebutton.clientWidth) - 5 + "px";
		dmd_closebutton.style.top=5 + "px";
		//Next Button
		dmd_nxt.style.left=getLBWidth() / 2 + 100 + "px";
		dmd_nxt.style.top=(getLBHeight()-5-parseInt(dmd_nxt.clientHeight)) + "px";
		dmd_nxt.onclick = function () { dmd_Embedding.next(); };
		dmd_nxt.style.display = (DMD_PANOS_LIST.length <= 1) ? "none" : "block";
		//Prev Button
		dmd_prv.style.left=(getLBWidth() / 2 - 100 - parseInt(dmd_prv.clientWidth)) + "px";
		dmd_prv.style.top=(getLBHeight()-5-parseInt(dmd_prv.clientHeight)) + "px";
		dmd_prv.onclick = function () { dmd_Embedding.previous(); };
		dmd_prv.style.display = (DMD_PANOS_LIST.length <= 1) ? "none" : "block";
		//First Button
		dmd_fst.style.left=(getLBWidth() / 2 - 100 - parseInt(dmd_prv.clientWidth) - parseInt(dmd_fst.clientWidth) - 5) + "px";
		dmd_fst.style.top=(getLBHeight()-5-parseInt(dmd_fst.clientHeight)) + "px";
		dmd_fst.onclick = function () { dmd_Embedding.first(); };
		dmd_fst.style.display = (DMD_PANOS_LIST.length <= 1) ? "none" : "block";
		//Last Button
		dmd_lst.style.left=(getLBWidth() / 2 + 100 + parseInt(dmd_nxt.clientWidth) + 5) + "px";
		dmd_lst.style.top=(getLBHeight()-5-parseInt(dmd_lst.clientHeight)) + "px";
		dmd_lst.onclick = function () { dmd_Embedding.last(); };
		dmd_lst.style.display = (DMD_PANOS_LIST.length <= 1) ? "none" : "block";
		//Counter
		dmd_count.innerHTML='<table cellspacing="0" cellpadding="0" width="100%"><tr><td style="text-align:center; color:#ffffff;">' + (DMD_CURRENT_PANO+1) + '/' + (DMD_PANOS_LIST.length) + '</td></tr></table>';
		dmd_count.style.left=getLBWidth() / 2 - parseInt(dmd_count.clientWidth)/2 + "px";
		dmd_count.style.top=(getLBHeight()-5-parseInt(dmd_count.clientHeight)) + "px";
		dmd_count.style.display = (DMD_PANOS_LIST.length <= 1) ? "none" : "block";
		//Controls Window
		dmd_cwindow.style.width="100%";
		dmd_cwindow.style.height="100%";
		dmd_cwindow.style.visibility="hidden";
		//Main Window
		dmd_mwindow.style.left=0;
		dmd_mwindow.style.top=0;
		dmd_mwindow.style.width=getLBWidth()+"px";
		dmd_mwindow.style.height=getLBHeight()+"px";
		setOpacity(dmd_mwindow, 0);
		dmd_mwindow.animate=animate;
		dmd_mwindow.style.visibility="visible";
		dmd_mwindow.animate({ opacity:0.5}, DURATION, function() { dmd_cwindow.style.visibility="visible"; });
		//Sub Window
		dmd_swindow.style.left=EMPTY_AREA/2+"px";
		dmd_swindow.style.top=EMPTY_AREA/2+"px";
		dmd_swindow.style.width=(getLBWidth()-EMPTY_AREA)+"px";
		dmd_swindow.style.height=(getLBHeight()-EMPTY_AREA)+"px";
		setOpacity(dmd_swindow, 0);
		dmd_swindow.animate=animate;
		dmd_swindow.style.visibility="visible";
		dmd_swindow.animate({opacity:1}, DURATION, function() { dmd_titlebar.animate({ top: 0 }, DURATION); });
		return false;
	};
	this.add=function(new_pano) {
		for(var i=0; i < DMD_PANOS_LIST.length; i++) { if(DMD_PANOS_LIST[i][0] == new_pano[0]) return false; }
		DMD_PANOS_LIST.push(new_pano);
	};
	this.start=function() {
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		DMD_EMBEDCODE ='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + httpOrHttps + '://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="BGCOLOR" value="#000000"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+DMD_PANOS_LIST[DMD_CURRENT_PANO][0]+'&fullscreen=1&source='+encodeURIComponent(location.href)+'"></param><embed src="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" bgcolor="#000000" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+DMD_PANOS_LIST[DMD_CURRENT_PANO][0]+'&fullscreen=1&source='+encodeURIComponent(location.href)+'"></embed></object>';
		document.getElementById("dmd_trgt").innerHTML=DMD_EMBEDCODE;
	};
	var cTimeout=-1;
	this.noPanos=function() {
		var dmd_ew = document.getElementById("dmd_error");
		dmd_ew.parentNode.removeChild(dmd_ew);
		var divError = document.createElement("div");
		divError.id="dmd_error";
		divError.innerHTML="Sorry, there is no panoramas to be displayed.";
		document.getElementsByTagName("body")[0].appendChild(divError);
		dmd_ew = document.getElementById("dmd_error");
		dmd_ew.onclick=function() { setOpacity(dmd_ew, 0); dmd_ew.parentNode.removeChild(dmd_ew); };
		dmd_ew.style.left=getLBWidth()/2 - parseInt(dmd_ew.clientWidth)/2 + "px";
		dmd_ew.style.top=getLBHeight()/2 - parseInt(dmd_ew.clientHeight)/2 + "px";
		setOpacity(dmd_ew, 0);
		dmd_ew.animate=animate;
		dmd_ew.style.visibility="visible";
		dmd_ew.animate( {opacity:1}, DURATION);
		clearTimeout(cTimeout);
		cTimeout = setTimeout(function() { var dmd_ew = document.getElementById("dmd_error"); dmd_ew.animate({opacity:0}, DURATION, function() {dmd_ew.parentNode.removeChild(dmd_ew);})}, 2000);
	};
	this.open=function() {
		if (DMD_ISOPENED) return false;
		if (DMD_PANOS_LIST.length == 0) return this.noPanos();
		this.start();
		DMD_ISOPENED=true;
		var dmd_embedder = document.getElementById("dmd_lb");
		var dmd_mwindow = document.getElementById("dmd_mw");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_cwindow = document.getElementById("dmd_cw");
		var dmd_titlebar = document.getElementById("dmd_title");
		var dmd_closebutton = document.getElementById("dmd_closebtn");
		var dmd_target = document.getElementById("dmd_trgt");
		dmd_embedder.style.visibility="visible";
		dmd_titlebar.animate=animate; 
		//Target Element to be displayed
		dmd_target.style.display="none";
		//Title of the image
		dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1];
		dmd_titlebar.style.left= (getLBWidth() - dmd_titlebar.clientWidth)*0.5 + "px";
		dmd_titlebar.style.top=-parseInt(dmd_titlebar.clientHeight) + "px";
		//Close Button
		dmd_closebutton.style.left=getLBWidth()-parseInt(dmd_closebutton.clientWidth)-5 + "px";
		dmd_closebutton.style.top=5 + "px";
		//Controls Window
		dmd_cwindow.style.width="100%";
		dmd_cwindow.style.height="100%";
		dmd_cwindow.style.visibility="hidden";
		//Main Window
		dmd_mwindow.style.left=0;
		dmd_mwindow.style.top=0;
		dmd_mwindow.style.width=getLBWidth()/2+"px";
		dmd_mwindow.style.height=getLBHeight()/2+"px";
		setOpacity(dmd_mwindow, 0);
		dmd_mwindow.animate=animate;
		dmd_mwindow.style.visibility="visible";
		dmd_mwindow.animate({ opacity:0.5}, DURATION, function() { dmd_cwindow.style.visibility="visible"; });
		//Sub Window
		dmd_swindow.style.left=EMPTY_AREA/2+"px";
		dmd_swindow.style.top=EMPTY_AREA/2+"px";
		dmd_swindow.style.width=(getLBWidth()/2-EMPTY_AREA)+"px";
		dmd_swindow.style.height=(getLBHeight()/2-EMPTY_AREA)+"px";
		setOpacity(dmd_swindow, 0);
		dmd_swindow.animate=animate;
		dmd_swindow.style.visibility="visible";
		dmd_swindow.animate({opacity:1}, DURATION, function() { dmd_titlebar.animate({ top: 0 }, DURATION); dmd_target.style.display="block"; });
		return false;
	};
	this.close=function() {
		dmdHidePopups();
		if (!DMD_ISOPENED) return false;
		DMD_ISOPENED=false;
		var dmd_embedder = document.getElementById("dmd_lb");
		var dmd_mwindow = document.getElementById("dmd_mw");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_cwindow = document.getElementById("dmd_cw");
		var dmd_target = document.getElementById("dmd_trgt");
		//dmd_target.style.display="none";
		dmd_cwindow.style.visibility="hidden";
		dmd_swindow.animate({ opacity:0}, DURATION, function() { dmd_swindow.style.visibility="hidden"; });
		dmd_mwindow.animate({ opacity:0}, DURATION, function() { dmd_mwindow.style.visibility="hidden"; dmd_target.style.display="none"; dmd_embedder.style.visibility="hidden"; });
		return false;
	};
	this.change=function(id) {
		if (!DMD_ISOPENED) return;
		if ((id<0) || (id>=DMD_PANOS_LIST.length)) return false;
		DMD_CURRENT_PANO = id;
		var PANO_ID = DMD_PANOS_LIST[DMD_CURRENT_PANO++][0];
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var embedcode='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  width="100%" height="100%"><param name="BGCOLOR" value="#000000"></param><param name="movie" value="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+PANO_ID+'&fullscreen=1&ap=0&source='+encodeURIComponent(location.href)+'"></param><embed src="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+PANO_ID+'&fullscreen=1&ap=0&source='+encodeURIComponent(location.href)+'" bgcolor="#000000"></embed></object>';
		var dmd_target = document.getElementById("dmd_trgt");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_titlebar = document.getElementById("dmd_title");
		dmd_titlebar.animate=animate;
		dmd_swindow.animate=animate;
		dmd_titlebar.animate({ top: -parseInt(dmd_titlebar.clientHeight) }, DURATION);
		dmd_titlebar.innerHTML(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1];
		dmd_target.style.display="none";
		dmd_swindow.animate({ width:0, height:0, left:getLBWidth()/2, top:getLBHeight()/2, opacity:0}, DURATION, function() { dmd_swindow.style.width="0px"; dmd_swindow.style.height="0px"; dmd_swindow.style.left=getLBWidth()/2; dmd_swindow.style.top=getLBHeight()/2; dmd_target.innerHTML=embedcode; dmd_swindow.animate({ width:getLBWidth(), height:getLBHeight(), left:0, top:0, opacity:.9}, DURATION+200, function() { dmd_swindow.animate({ width:getLBWidth()-EMPTY_AREA, height:getLBHeight()-EMPTY_AREA, left:EMPTY_AREA/2, top:EMPTY_AREA/2, opacity:1}, DURATION, function() { dmd_target.style.display="block"; dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1]; dmd_titlebar.style.left=(getLBWidth() - dmd_titlebar.clientWidth())*0.5; dmd_titlebar.animate({ top: 0 }, DURATION); }); }); });
	};
	this.next=function() {
		if (!DMD_ISOPENED) return;
		//if (DMD_CURRENT_PANO+1 >= DMD_PANOS_LIST.length) DMD_CURRENT_PANO=-1;
		if (DMD_CURRENT_PANO+1 >= DMD_PANOS_LIST.length) return;
		var NEXT_ID = DMD_PANOS_LIST[++DMD_CURRENT_PANO][0];
		DMD_CURRENT_RUNNING=NEXT_ID;
		dmdHidePopups();
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var availableHeight=parseInt(document.getElementById("thumbnail_"+NEXT_ID).getAttribute("alt"));
		if(isNaN(availableHeight)) availableHeight = -1;
		var embedcode='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  width="100%" height="100%"><param name="BGCOLOR" value="#000000"></param><param name="movie" value="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+NEXT_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'"></param><embed src="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+NEXT_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'" bgcolor="#000000"></embed></object>';
		var dmd_target = document.getElementById("dmd_trgt");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_titlebar = document.getElementById("dmd_title");
		var dmd_count = document.getElementById("dmd_counter");
		dmd_count.animate=animate;
		dmd_count.innerHTML='<table cellspacing="0" cellpadding="0" width="100%"><tr><td style="text-align:center; color:#ffffff;">' + (DMD_CURRENT_PANO+1) + '/' + DMD_PANOS_LIST.length + '</td></tr></table>';
		dmd_count.style.left=getLBWidth() / 2 - parseInt(dmd_count.clientWidth)/2 + "px";
		dmd_count.style.top=(getLBHeight()-5-parseInt(dmd_count.clientHeight)) + "px";
		dmd_titlebar.animate=animate;
		//dmd_swindow.animate=animate;
		dmd_titlebar.animate({ top: -parseInt(dmd_titlebar.clientHeight) }, DURATION);
		dmd_target.style.display="none";
		//dmd_swindow.animate({ width:0, height:0, left:getLBWidth()/2, top:getLBHeight()/2, opacity:0}, DURATION, function() { dmd_swindow.style.width="0px"; dmd_swindow.style.height="0px"; dmd_swindow.style.left=getLBWidth()/2; dmd_swindow.style.top=getLBHeight()/2; dmd_target.innerHTML=embedcode; dmd_swindow.animate({ width:getLBWidth(), height:getLBHeight(), left:0, top:0, opacity:.9}, DURATION, function() { dmd_swindow.animate({ width:getLBWidth()-EMPTY_AREA, height:getLBHeight()-EMPTY_AREA, left:EMPTY_AREA/2, top:EMPTY_AREA/2, opacity:1}, DURATION, function() { dmd_target.style.display="block"; dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1]; dmd_titlebar.styleleft=(getLBWidth() - dmd_titlebar.clientWidth)*0.5; dmd_titlebar.animate({ top: 0 }, DURATION); }); }); });
		dmd_target.innerHTML=embedcode;
		dmd_target.style.display="block";
		dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1];
		dmd_titlebar.styleleft=(getLBWidth() - dmd_titlebar.clientWidth)*0.5;
		dmd_titlebar.animate({ top: 0 }, DURATION);
	};
	this.previous=function() {
		if (!DMD_ISOPENED) return;
		//if (DMD_CURRENT_PANO-1 < 0) DMD_CURRENT_PANO=DMD_PANOS_LIST.length;
		if (DMD_CURRENT_PANO-1 < 0) return;
		var PREV_ID = DMD_PANOS_LIST[--DMD_CURRENT_PANO][0];
		DMD_CURRENT_RUNNING=PREV_ID;
		dmdHidePopups();
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var availableHeight=parseInt(document.getElementById("thumbnail_"+PREV_ID).getAttribute("alt"));
		if(isNaN(availableHeight)) availableHeight = -1;
		var embedcode='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  width="100%" height="100%"><param name="BGCOLOR" value="#000000"></param><param name="movie" value="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+PREV_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'"></param><embed src="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+PREV_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'" bgcolor="#000000"></embed></object>';
		var dmd_target = document.getElementById("dmd_trgt");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_titlebar = document.getElementById("dmd_title");
		var dmd_count = document.getElementById("dmd_counter");
		dmd_count.animate=animate;
		dmd_count.innerHTML='<table cellspacing="0" cellpadding="0" width="100%"><tr><td style="text-align:center; color:#ffffff;">' + (DMD_CURRENT_PANO+1) + '/' + DMD_PANOS_LIST.length + '</td></tr></table>';
		dmd_count.style.left=getLBWidth() / 2 - parseInt(dmd_count.clientWidth)/2 + "px";
		dmd_count.style.top=(getLBHeight()-5-parseInt(dmd_count.clientHeight)) + "px";
		dmd_titlebar.animate=animate;
		dmd_swindow.animate=animate;
		dmd_titlebar.animate({ top: -parseInt(dmd_titlebar.clientHeight)}, DURATION);
		dmd_target.style.display="none";
		//dmd_swindow.animate({ width:0, height:0, left:getLBWidth()/2, top:getLBHeight()/2, opacity:0}, DURATION, function() { dmd_swindow.style.width="0px"; dmd_swindow.style.height="0px"; dmd_swindow.style.left=getLBWidth()/2; dmd_swindow.style.top=getLBHeight()/2; dmd_target.innerHTML=embedcode; dmd_swindow.animate({ width:getLBWidth(), height:getLBHeight(), left:0, top:0, opacity:.9}, DURATION, function() { dmd_swindow.animate({ width:getLBWidth()-EMPTY_AREA, height:getLBHeight()-EMPTY_AREA, left:EMPTY_AREA/2, top:EMPTY_AREA/2, opacity:1}, DURATION, function() { dmd_target.style.display="block"; dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1]; dmd_titlebar.style.left=(getLBWidth() - dmd_titlebar.clientWidth)*0.5; dmd_titlebar.animate({ top: 0 }, DURATION); }); }); });
		dmd_target.innerHTML=embedcode;
		dmd_target.style.display="block";
		dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1];
		dmd_titlebar.styleleft=(getLBWidth() - dmd_titlebar.clientWidth)*0.5;
		dmd_titlebar.animate({ top: 0 }, DURATION);
	};
	this.first=function() {
		if (!DMD_ISOPENED) return;
		if (DMD_CURRENT_PANO == 0) retun;
		DMD_CURRENT_PANO = 0;
		var NEXT_ID = DMD_PANOS_LIST[DMD_CURRENT_PANO][0];
		DMD_CURRENT_RUNNING=NEXT_ID;
		dmdHidePopups();
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var availableHeight=parseInt(document.getElementById("thumbnail_"+NEXT_ID).getAttribute("alt"));
		if(isNaN(availableHeight)) availableHeight = -1;
		var embedcode='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  width="100%" height="100%"><param name="BGCOLOR" value="#000000"></param><param name="movie" value="' + httpOrHttps + '://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+NEXT_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'"></param><embed src="' + httpOrHttps + '://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+NEXT_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'" bgcolor="#000000"></embed></object>';
		var dmd_target = document.getElementById("dmd_trgt");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_titlebar = document.getElementById("dmd_title");
		var dmd_count = document.getElementById("dmd_counter");
		dmd_count.animate=animate;
		dmd_count.innerHTML='<table cellspacing="0" cellpadding="0" width="100%"><tr><td style="text-align:center; color:#ffffff;">' + (DMD_CURRENT_PANO+1) + '/' + DMD_PANOS_LIST.length + '</td></tr></table>';
		dmd_count.style.left=getLBWidth() / 2 - parseInt(dmd_count.clientWidth)/2 + "px";
		dmd_count.style.top=(getLBHeight()-5-parseInt(dmd_count.clientHeight)) + "px";
		dmd_titlebar.animate=animate;
		dmd_swindow.animate=animate;
		dmd_titlebar.animate({ top: -parseInt(dmd_titlebar.clientHeight) }, DURATION);
		dmd_target.style.display="none";
		//dmd_swindow.animate({ width:0, height:0, left:getLBWidth()/2, top:getLBHeight()/2, opacity:0}, DURATION, function() { dmd_swindow.style.width="0px"; dmd_swindow.style.height="0px"; dmd_swindow.style.left=getLBWidth()/2; dmd_swindow.style.top=getLBHeight()/2; dmd_target.innerHTML=embedcode; dmd_swindow.animate({ width:getLBWidth(), height:getLBHeight(), left:0, top:0, opacity:.9}, DURATION, function() { dmd_swindow.animate({ width:getLBWidth()-EMPTY_AREA, height:getLBHeight()-EMPTY_AREA, left:EMPTY_AREA/2, top:EMPTY_AREA/2, opacity:1}, DURATION, function() { dmd_target.style.display="block"; dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1]; dmd_titlebar.styleleft=(getLBWidth() - dmd_titlebar.clientWidth)*0.5; dmd_titlebar.animate({ top: 0 }, DURATION); }); }); });
		dmd_target.innerHTML=embedcode;
		dmd_target.style.display="block";
		dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1];
		dmd_titlebar.styleleft=(getLBWidth() - dmd_titlebar.clientWidth)*0.5;
		dmd_titlebar.animate({ top: 0 }, DURATION);
	};
	this.last=function() {
		if (!DMD_ISOPENED) return;
		if (DMD_CURRENT_PANO == DMD_PANOS_LIST.length-1) return;
		DMD_CURRENT_PANO = DMD_PANOS_LIST.length-1;
		var PREV_ID = DMD_PANOS_LIST[DMD_CURRENT_PANO][0];
		DMD_CURRENT_RUNNING=PREV_ID;
		dmdHidePopups();
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var availableHeight=parseInt(document.getElementById("thumbnail_"+PREV_ID).getAttribute("alt"));
		if(isNaN(availableHeight)) availableHeight = -1;
		var embedcode='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"  width="100%" height="100%"><param name="BGCOLOR" value="#000000"></param><param name="movie" value="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?40.0.3"></param><param name="allowfullscreen" value="true"></param><param name="allowscriptaccess" value="always"></param><param name="wmode" value="gpu"></param><param name="flashvars" value="pano='+PREV_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'"></param><embed src="'+httpOrHttps+'://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3" wmode="gpu" type="application/x-shockwave-flash" allowscriptaccess="always" allowfullscreen="true" width="100%" height="100%" flashvars="pano='+PREV_ID+'&fullscreen=1&ap=0&slvl='+availableHeight+'&autoplay=1&source='+encodeURIComponent(location.href)+'" bgcolor="#000000"></embed></object>';
		var dmd_target = document.getElementById("dmd_trgt");
		var dmd_swindow = document.getElementById("dmd_sw");
		var dmd_titlebar = document.getElementById("dmd_title");
		var dmd_count = document.getElementById("dmd_counter");
		dmd_count.animate=animate;
		dmd_count.innerHTML='<table cellspacing="0" cellpadding="0" width="100%"><tr><td style="text-align:center; color:#ffffff;">' + (DMD_CURRENT_PANO+1) + '/' + DMD_PANOS_LIST.length + '</td></tr></table>';
		dmd_count.style.left=getLBWidth() / 2 - parseInt(dmd_count.clientWidth)/2 + "px";
		dmd_count.style.top=(getLBHeight()-5-parseInt(dmd_count.clientHeight)) + "px";
		dmd_titlebar.animate=animate;
		dmd_swindow.animate=animate;
		dmd_titlebar.animate({ top: -parseInt(dmd_titlebar.clientHeight)}, DURATION);
		dmd_target.style.display="none";
		//dmd_swindow.animate({ width:0, height:0, left:getLBWidth()/2, top:getLBHeight()/2, opacity:0}, DURATION, function() { dmd_swindow.style.width="0px"; dmd_swindow.style.height="0px"; dmd_swindow.style.left=getLBWidth()/2; dmd_swindow.style.top=getLBHeight()/2; dmd_target.innerHTML=embedcode; dmd_swindow.animate({ width:getLBWidth(), height:getLBHeight(), left:0, top:0, opacity:.9}, DURATION, function() { dmd_swindow.animate({ width:getLBWidth()-EMPTY_AREA, height:getLBHeight()-EMPTY_AREA, left:EMPTY_AREA/2, top:EMPTY_AREA/2, opacity:1}, DURATION, function() { dmd_target.style.display="block"; dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1]; dmd_titlebar.style.left=(getLBWidth() - dmd_titlebar.clientWidth)*0.5; dmd_titlebar.animate({ top: 0 }, DURATION); }); }); });
		dmd_target.innerHTML=embedcode;
		dmd_target.style.display="block";
		dmd_titlebar.innerHTML=(DMD_PANOS_LIST[DMD_CURRENT_PANO][1] == "") ? "Untitled" : DMD_PANOS_LIST[DMD_CURRENT_PANO][1];
		dmd_titlebar.styleleft=(getLBWidth() - dmd_titlebar.clientWidth)*0.5;
		dmd_titlebar.animate({ top: 0 }, DURATION);
	};
	var _this = this;
	var resTimeout=0;
	this.resize=function() {
		//if (DMD_ISOPENED) this.close();
		clearTimeout(resTimeout);
		resTimeout=setTimeout(function() {
			var dmd_mwindow = document.getElementById("dmd_mw");
			var dmd_swindow = document.getElementById("dmd_sw");
			var dmd_cwindow = document.getElementById("dmd_cw");
			var dmd_titlebar = document.getElementById("dmd_title");
			var dmd_closebutton = document.getElementById("dmd_closebtn");
			//Title of the image
			dmd_titlebar.style.left= (getLBWidth() - dmd_titlebar.clientWidth)*0.5 + "px";
			dmd_titlebar.style.top=-parseInt(dmd_titlebar.clientHeight) + "px";
			//Close Button
			dmd_closebutton.style.left=getLBWidth()-parseInt(dmd_closebutton.clientWidth)-5 + "px";
			dmd_closebutton.style.top=5 + "px";
			//Controls Window
			dmd_cwindow.style.width="100%";
			dmd_cwindow.style.height="100%";
			//Main Window
			dmd_mwindow.style.left=0+"px";
			dmd_mwindow.style.top=0+"px";
			dmd_mwindow.style.width=getLBWidth()+"px";
			dmd_mwindow.style.height=getLBHeight()+"px";
			//Sub Window
			dmd_swindow.style.left=EMPTY_AREA/2 + "px";
			dmd_swindow.style.top=EMPTY_AREA/2 + "px";
			dmd_swindow.style.width=getLBWidth()-EMPTY_AREA+"px";
			dmd_swindow.style.height=getLBHeight()-EMPTY_AREA+"px";
			return false;
		},500);
	};
	/*
	this.scroll=function() { 
		var dmd_embedder=document.getElementById("dmd_lb");
		dmd_embedder.style.left=typeof(window.pageXOffset)=="undefined" ? document.body.scrollLeft + "px" : window.pageXOffset + "px" ;
		dmd_embedder.style.top=typeof(window.pageYOffset)=="undefined" ? document.body.scrollTop + "px" : window.pageYOffset + "px";
	};
	*/
	this.scroll=function () {
		if(document.getElementById("dmd_trgt").style.display == "none") return;
		if (typeof(window.scrollY) !== "undefined") { window.scroll(DMD_OVERLAY_ORIGIN_LEFT, DMD_OVERLAY_ORIGIN_TOP); return;};
		typeof(window.pageXOffset)=="undefined" ? document.body.scrollLeft=DMD_OVERLAY_ORIGIN_LEFT + "px" : window.pageXOffset=DMD_OVERLAY_ORIGIN_LEFT + "px" ;
		typeof(window.pageYOffset)=="undefined" ? document.body.scrollTop=DMD_OVERLAY_ORIGIN_TOP + "px" : window.pageYOffset= DMD_OVERLAY_ORIGIN_TOP + "px";
		window.scroll(DMD_OVERLAY_ORIGIN_LEFT, DMD_OVERLAY_ORIGIN_TOP);
	}
};
if(!document.getElementById("dmd_reporting")) {
	var styleDiv = document.createElement("div");
	styleDiv.id="dmd_codeFuncs";
	styleDiv.innerHTML = '<style> .dmd_details { width:80%; height:80%; position:fixed; left:10%; top:10%; z-index: 99999999; display: none; background-color: rgba(255,255,255,0.0); } .dmd_reporting { width:600px; height:314px; position:fixed; left:50%; top:50%; margin-top:-157px; margin-left:-300px; z-index: 99999999; display: none; background-color: rgba(255,255,255,0.0); } .dmd_embedding { width:600px; height:370px; position:fixed; left:50%; top:50%; margin-top:-185px; margin-left:-300px; display: none; background-color: rgba(255,255,255,0.0); z-index: 99999999; } </style><div id="dmd_details" class="dmd_details"><iframe id="dmd_details_ifrm" src="//www.dermandar.com/details.php?q=" allowtransparency="true" style="background-color:rgba(255,255,255,0.0); border:0px none transparent;" frameborder="0" height="100%" width="100%"></iframe></div><div id="dmd_reporting" class="dmd_reporting"><iframe id="dmd_reporting_ifrm" src="//www.dermandar.com/report.php?id=" frameBorder="0" allowtransparency="true" style="background-color:rgba(255,255,255,0.0); border:0px none transparent;" width="100%"  height="100%"></iframe></div><div id="dmd_embedding" class="dmd_embedding"><iframe id="dmd_embedding_ifrm" src="//www.dermandar.com/embed.php?id=" frameBorder="0" allowtransparency="true" style="background-color:rgba(255,255,255,0.0); border:0px none transparent;" width="100%"  height="100%"></iframe></div>';
	var scr=document.createElement("script");
	scr.innerHTML='function dmdSwfReady() { var objs=document.getElementsByTagName("object"); var objs2=document.getElementsByTagName("embed"); if(objs) for(var i=0; i<objs.length; i++) if(objs[i].id == "dmd_flash_"+DMD_CURRENT_RUNNING) if(objs[i].setInfoEnabled)objs[i].setInfoEnabled(true); if(objs2) for(var i=0; i<objs2.length; i++) if(objs2[i].id == "dmd_flash_"+DMD_CURRENT_RUNNING) if(objs2[i].setInfoEnabled) objs2[i].setInfoEnabled(true); } function dmdDetailsPanorama() { document.getElementById("dmd_details_ifrm").src="//www.dermandar.com/details.php?q="+DMD_CURRENT_RUNNING; document.getElementById("dmd_details").style.display="block"; } function dmdReportPanorama() { document.getElementById("dmd_reporting_ifrm").src="//www.dermandar.com/report.php?id="+DMD_CURRENT_RUNNING; document.getElementById("dmd_reporting").style.display="block"; } function dmdEmbedPanorama() { document.getElementById("dmd_embedding_ifrm").src="//www.dermandar.com/embed.php?id="+DMD_CURRENT_RUNNING; document.getElementById("dmd_embedding").style.display="block" } function dmdHidePopups() { document.getElementById("dmd_embedding").style.display="none"; document.getElementById("dmd_reporting").style.display="none"; document.getElementById("dmd_details").style.display="none"; };';
	styleDiv.appendChild(scr);
	document.getElementsByTagName("body")[0].appendChild(styleDiv);

}
function DermandarEmbedder() {
	this.loadPanoramas = function() {
		while (dmdEmbeds.length > 0) {
			var dmdId = dmdEmbeds.pop();
			this.loadPanorama(dmdId, false);
		}
	};
	this.loadPanorama = function(id, force10) {
		var element = document.getElementById("dmd_pano_" + id);
		if (element == null) {
		
			element = document.getElementById("dmd_pano_" + id + "_loaded");
		}
		
		element.id = "dmd_pano_" + id + "_loaded";
		element.style.padding = "0px";
		element.style.margin = "0px";
		element.style.textAlign="left";
		if((typeof(element.style.width) == "undefined") || (element.style.width=="")) if (typeof(eval(id+"_w")) !== "undefined") element.style.width = eval(id+"_w") + "px"; else element.style.width = "400px"; 
		if((typeof(element.style.height) == "undefined") || (element.style.height=="")) if (typeof(eval(id+"_h")) !== "undefined") element.style.height = eval(id+"_h") + "px"; else element.style.height = "300px"; 
		var code = "";
		
		var httpOrHttps = "http";
		if (window.location.protocol == "https:") httpOrHttps = "https";
		var iOS = navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i);
		var ANDROID = navigator.userAgent.toLowerCase().match(/android/i);
		var enableDmd_Embedding = true;
		if (typeof(dmd_overlay) !== "undefined")if (typeof(dmd_overlay) !== "undefined") enableDmd_Embedding = dmd_overlay;
		var frmTwitter=false;
		if (typeof(dmd_from_twitter) !== "undefined") if (dmd_from_twitter) frmTwitter = dmd_from_twitter;
		var isInIframe = ((window.location != window.parent.location) ? true : false) || !enableDmd_Embedding;
		if (this.flashSupported && !iOS && !ANDROID) {
			var code = "";
			if ((this.getFlashVersion() >= 11) && !force10)
			{
				/*
				if (isInIframe) {
					code = "<script>DMD_CURRENT_RUNNING=\""+id+"\";</script><object id=\"dmd_flash_"+id+"\" name=\"dmd_flash_"+id+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"100%\" height=\"100%\" type=\"application/x-shockwave-flash\" data=\"" + httpOrHttps + "://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\">\
						<param name=\"movie\" value=\"" + httpOrHttps + "://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\">\
						<param name=\"wmode\" value=\"gpu\">\
						<param value=\"true\" name=\"allowFullScreen\">\
						<param name=\"BGCOLOR\" value=\"#000000\"></param>\
						<param name=\"allowscriptaccess\" value=\"always\"></param>\
						<param value=\"all\" name=\"AllowNetworking\">\
						<param value=\"pano=" + id + "&ap=1&fullscreen=1&olm=0"+((DMD_AUTOPLAY==1) ? "&autoplay=1" : "&autoplay=0")+"\" name=\"flashvars\">\
						<param value=\"always\" name=\"allowScriptAccess\">\
						<embed id=\"dmd_flash_"+id+"\" name=\"dmd_flash_"+id+"\" bgcolor=\"#000000\" width=\"100%\" height=\"100%\" flashvars=\"pano="+id+"&ap=1&fullscreen=1&olm=0"+((DMD_AUTOPLAY==1) ? "&autoplay=1" : "&autoplay=0")+"\" type=\"application/x-shockwave-flash\" wmode=\"gpu\" src=\"" + httpOrHttps + "://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\" allowscriptaccess=\"always\" allowfullscreen=\"true\" allownetworking=\"all\"></embed>\
					</object>";
				}
				else {
				*/
					code = "<script>DMD_CURRENT_RUNNING=\""+id+"\";</script><object id=\"dmd_flash_"+id+"\" name=\"dmd_flash_"+id+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"100%\" height=\"100%\" type=\"application/x-shockwave-flash\" data=\"" + httpOrHttps + "://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\">\
						<param name=\"movie\" value=\"" + httpOrHttps + "://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\">\
						<param name=\"wmode\" value=\"gpu\">\
						<param value=\"true\" name=\"allowFullScreen\">\
						<param name=\"BGCOLOR\" value=\"#000000\"></param>\
						<param name=\"allowscriptaccess\" value=\"always\"></param>\
						<param value=\"all\" name=\"AllowNetworking\">\
						<param value=\"pano=" + id + "&ap=0&fullscreen=1&olm=0&source="+encodeURIComponent(location.href)+"\" name=\"flashvars\">\
						<param value=\"always\" name=\"allowScriptAccess\">\
						<embed id=\"dmd_flash_"+id+"\" name=\"dmd_flash_"+id+"\" bgcolor=\"#000000\" width=\"100%\" height=\"100%\" flashvars=\"pano="+id+"&ap=0&fullscreen=1&olm=0&source="+encodeURIComponent(location.href)+"\" type=\"application/x-shockwave-flash\" wmode=\"gpu\" src=\"" + httpOrHttps + "://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\" allowscriptaccess=\"always\" allowfullscreen=\"true\" allownetworking=\"all\"></embed>\
					</object>";
				/*
				}
				*/
				
				DMD_AUTOPLAY = 0;
			}
			else
			{
				code = "<script>DMD_CURRENT_RUNNING=\""+id+"\";</script><object id=\"dmd_flash_"+id+"\" name=\"dmd_flash_"+id+"\" classid=\"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000\" width=\"100%\" height=\"100%\">" +
					"<param name=\"movie\" value=\""+httpOrHttps+"://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\"></param>"+
					"<param name=\"allowfullscreen\" value=\"true\"></param>"+
					"<param name=\"allowscriptaccess\" value=\"always\"></param>"+
					"<param name=\"BGCOLOR\" value=\"#000000\"></param>"+
					"<param name=\"wmode\" value=\"window\"></param>"+
					"<param name=\"flashvars\" value=\"pano=" + id + "&ap=0&olm=0&source="+encodeURIComponent(location.href)+((DMD_AUTOPLAY==1) ? "&autoplay=1" : "&autoplay=0")+"\"></param>"+
					"<embed name=\"dmd_flash_"+id+"\" src=\""+httpOrHttps+"://static.dermandar.com/swf/FlashEmbedder.swf?v=40.0.3\" "+
					"type=\"application/x-shockwave-flash\" allowscriptaccess=\"always\" allowfullscreen=\"true\" "+
					"width=\"100%\" height=\"100%\" wmode=\"window\" flashvars=\"pano=" + id + "&ap=0&olm=0&source="+encodeURIComponent(location.href)+((DMD_AUTOPLAY==1) ? "&autoplay=1" : "&autoplay=0")+"\" bgcolor=\"#000000\"></embed>"+
				"</object>";
				
				DMD_AUTOPLAY = 0;
			};
			if (isInIframe && !frmTwitter) element.innerHTML = code;
			else {
				var width = parseInt(element.clientWidth);
				var height = parseInt(element.clientHeight);
				if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
				if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
				if(width==0) width=400; if(height==0) height=300;
				var iUrl= httpOrHttps+"://static.dermandar.com/php/getimage.php?epid=" + id + "&equi=1&h=128&r=1";
				var prevCode='<div style="width:100%; height:100%; overflow:hidden; padding:0px; margin:0px; position:relative;"><img id="thumbnail_'+id+'" style="max-width:999999px; position:relative; top:0px; border:0px none #000000; padding:0px; margin:0px;" border="0" /></div>';
				element.innerHTML = prevCode;
				element.style.overflow="hidden";
				var thmb=document.getElementById("thumbnail_"+id);
				var playImage = document.createElement("img");
				thmb.style.visibility="hidden";
				playImage.style.visibility="hidden";
				var mapImage=document.createElement("map");
				mapImage.name="dmd_"+id+"_map";
				mapImage.id="dmd_"+id+"_map";
				mapImage.innerHTML+="<area id=\"dmd_"+id+"_map_areaOL\" shape=\"rect\" coords=\"0,0,100,78\" alt=\"Play Overlayed\" href=\"#\">";
				mapImage.innerHTML+="<area id=\"dmd_"+id+"_map_areaIP\" shape=\"rect\" coords=\"100,0,200,78\" alt=\"Play in place\" href=\"#\">";
				mapImage.innerHTML+="<area id=\"dmd_"+id+"_map_areaCP\" shape=\"rect\" coords=\"0,78,200,100\" alt=\"Creator\" target=\"_blank\" href=\"//www.dermandar.com/create/\">";
				element.appendChild(mapImage);
				playImage.setAttribute("usemap","#dmd_"+id+"_map");
				thmb.onload= function() {
					var width = parseInt(element.clientWidth);
					var height = parseInt(element.clientHeight);
					if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
					if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
					if(width==0) width=400; if(height==0) height=300;
					var dASP = width / height;
					var eASP = thmb.width / thmb.height;
					var gHeight=height;
					var imgForGetRealHeight = new Image();
					imgForGetRealHeight.src=thmb.src;
					var originalASP = imgForGetRealHeight.width / imgForGetRealHeight.height;
					thmb.setAttribute("alt", imgForGetRealHeight.height);
					delete imgForGetRealHeight;
					if (eASP >= dASP) { thmb.style.height = height + "px"; gHeight = height; }
					else { thmb.style.width = width + "px";  gHeight = width/eASP; }
					thmb.style.left=-(parseInt(thmb.width)- width)/2 + "px";
					thmb.style.top=-(parseInt(thmb.height)- height)/2 + "px";
					var newUrl="";
					if (gHeight > 256)
					{
						var aquiredHeight = 512;
						while((aquiredHeight * aquiredHeight * originalASP > 4095*4097) || (aquiredHeight * originalASP > 8191)) aquiredHeight--;
						newUrl= httpOrHttps+"://static.dermandar.com/php/getimage.php?epid=" + id + "&equi=1&h=" + aquiredHeight + "&r=1";
					}
					else if (gHeight > 128)
					{
						var aquiredHeight = 256;
						while((aquiredHeight * aquiredHeight * originalASP > 4095*4097) || (aquiredHeight * originalASP > 8191)) aquiredHeight--;
						newUrl= httpOrHttps+"://static.dermandar.com/php/getimage.php?epid=" + id + "&equi=1&h="+aquiredHeight+"&r=1";
					}
					
					var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
					if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
					if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
					if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
					playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
					playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
					
					if (newUrl==thmb.src) return;
					var newImg=new Image();
					newImg.onload = function() {
						thmb.src = newImg.src;
						delete newImg;
					};
					
					if (navigator.userAgent.match(/MSIE/))
						newImg.src=newUrl;
					else if ((document.readyState !== "complete") && isSizePercentaged(element.id))
						window.addEventListener("load", function () { newImg.src=newUrl; });
					else
						newImg.src=newUrl;
					thmb.style.visibility="visible";
					playImage.style.visibility="visible";
				};
				thmb.src=iUrl;
				element.appendChild(playImage);
				var areaOL=document.getElementById("dmd_"+id+"_map_areaOL");
				var areaIP=document.getElementById("dmd_"+id+"_map_areaIP");
				var areaCP=document.getElementById("dmd_"+id+"_map_areaCP");
				areaOL.onclick=function(e) {
					DMD_CURRENT_RUNNING=id;
					if (!frmTwitter) {
						if(DMD_LAST_RUNNING!="") {
							document.getElementById("dmd_flash_"+DMD_LAST_RUNNING).parentNode.parentNode.removeChild(document.getElementById("dmd_flash_"+DMD_LAST_RUNNING).parentNode);
						}
						dmd_Embedding.show([id,""], code, function() {dmdEmbedder.hookEvent(document.getElementById("dmd_flash_"+id));});
						DMD_LAST_RUNNING="";
					}
					else {
						element.innerHTML = code;
					}
					return false;
				};
				areaIP.onclick=function(e) {
					DMD_CURRENT_RUNNING=id;
				 	if (!frmTwitter) {
				 		if(DMD_LAST_RUNNING!="") {
				 			document.getElementById("dmd_flash_"+DMD_LAST_RUNNING).parentNode.parentNode.removeChild(document.getElementById("dmd_flash_"+DMD_LAST_RUNNING).parentNode);
				 		}
				 		DMD_LAST_RUNNING=id;
				 		element.style.position="relative";
				 		var d=document.createElement("div");
				 		d.style.position="absolute";
				 		d.style.left=0;
				 		d.style.top=0;
						d.style.width="100%";
				 		d.style.height="100%";
				 		d.innerHTML=code;
				 		element.appendChild(d);
				 	}
				 	else {
				 		element.innerHTML = code;
				 	}
				 	return false;
				};
				areaCP.onclick=function(e) {
				 	return true;
				};
				window.addEventListener("resize", function () { 
					var width = parseInt(element.clientWidth);
					var height = parseInt(element.clientHeight);
					if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
					if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
					if(width==0) width=400; if(height==0) height=300;

					var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
					if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
					if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
					if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
					playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
					playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
					
					var dASP = width / height;
					var eASP = thmb.width / thmb.height;
					(eASP >= dASP) ? thmb.style.height = height + "px" : thmb.style.width = width + "px";
					thmb.style.left=-(parseInt(thmb.width)- width)/2 + "px";
					thmb.style.top=-(parseInt(thmb.height)- height)/2 + "px";
				});
				playImage.onload=function(e) {
					var width = parseInt(element.clientWidth);
					var height = parseInt(element.clientHeight);
					if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
					if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
					if(width==0) width=400; if(height==0) height=300;
					playImage.style.cursor="pointer";
					playImage.style.position="relative";
					playImage.style.border="0px none #000000";
					playImage.style.background="none repeat scroll 0 0 transparent";

					var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
					if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
					if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
					if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
					playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
					playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
				};
				window.addEventListener("load", function () {
					var width = parseInt(element.clientWidth);
					var height = parseInt(element.clientHeight);
					if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
					if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
					if(width==0) width=400; if(height==0) height=300;

					var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
					if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
					if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
					if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
					playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
					playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
					
					var dASP = width / height;
					var eASP = thmb.width / thmb.height;
					(eASP >= dASP) ? thmb.style.height = height + "px" : thmb.style.width = width + "px";
					thmb.style.left=-(parseInt(thmb.width)- width)/2 + "px";
					thmb.style.top=-(parseInt(thmb.height)- height)/2 + "px";
				});
				playImage.src = httpOrHttps+"://static.dermandar.com/design/images/play.png";
			};
			this.hookEvent(element);
		} else {
			var width = parseInt(element.clientWidth);
			var height = parseInt(element.clientHeight);
			if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
			if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
			if(width==0) width=400; if(height==0) height=300;
			var iUrl= httpOrHttps+"://static.dermandar.com/php/getimage.php?epid=" + id + "&equi=1&h=128&r=1";
			var prevCode='<div style="width:100%; height:100%; overflow:hidden; padding:0px; margin:0px;"><img id="thumbnail_'+id+'" style="max-width:999999px; position:relative; top:0px; border:0px none #000000; padding:0px; margin:0px;" border="0" /></div>';
			element.innerHTML = prevCode;
			element.style.overflow="hidden";
			var thmb=document.getElementById("thumbnail_"+id);
			var playImage = document.createElement("img");
			thmb.style.visibility="hidden";
			thmb.onload= function() {
				var width = parseInt(element.clientWidth);
				var height = parseInt(element.clientHeight);
				if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
				if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
				if(width==0) width=400; if(height==0) height=300;
				var dASP = width / height;
				var eASP = thmb.width / thmb.height;
				var gHeight=height;
				if (eASP >= dASP) { thmb.style.height = height + "px"; gHeight = height; }
				else { thmb.style.width = width + "px";  gHeight = width/eASP; }
				thmb.style.left=-(parseInt(thmb.width)- width)/2 + "px";
				thmb.style.top=-(parseInt(thmb.height)- height)/2 + "px";

				var newUrl="";
				if (gHeight > 256)
				{
					newUrl= httpOrHttps+"://static.dermandar.com/php/getimage.php?epid=" + id + "&equi=1&h=512&r=1";
				}
				else if (gHeight > 128)
				{
					newUrl= httpOrHttps+"://static.dermandar.com/php/getimage.php?epid=" + id + "&equi=1&h=256&r=1";
				}
				
				var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
				if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
				if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
				if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
				playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
				playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
				
				if (newUrl==thmb.src) return;
				var newImg=new Image();
				newImg.onload = function() {
				
					thmb.src = newImg.src;
					delete newImg;
				}
				
				if ((document.readyState !== "complete") && isSizePercentaged(element.id))
					window.addEventListener("load", function () { newImg.src=newUrl; });
				else
					newImg.src=newUrl;
				thmb.style.visibility="visible";
			};
			thmb.src=iUrl;
			element.appendChild(playImage);
			window.addEventListener("resize", function () { 
				var width = parseInt(element.clientWidth);
				var height = parseInt(element.clientHeight);
				if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
				if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
				if(width==0) width=400; if(height==0) height=300;

				var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
				if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
				if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
				if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
				playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
				playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";

				var dASP = width / height;
				var eASP = thmb.width / thmb.height;
				(eASP >= dASP) ? thmb.style.height = height + "px" : thmb.style.width = width + "px";
				thmb.style.left=-(parseInt(thmb.width)- width)/2 + "px";
				thmb.style.top=-(parseInt(thmb.height)- height)/2 + "px";
			});
			playImage.onload=function(e) {
				var width = parseInt(element.clientWidth);
				var height = parseInt(element.clientHeight);
				if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
				if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
				if(width==0) width=400; if(height==0) height=300;
				playImage.style.cursor="pointer";
				playImage.style.position="relative";
				playImage.style.border="0px none #000000";
				playImage.style.background="none repeat scroll 0 0 transparent";

				var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
				if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
				if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
				if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
				playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
				playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
			};
			playImage.src = httpOrHttps+"://static.dermandar.com/design/images/play.png";
			window.addEventListener("load", function () {
				var width = parseInt(element.clientWidth);
				var height = parseInt(element.clientHeight);
				if(width==0) width=parseInt(window.getComputedStyle(element,null).width);
				if(height==0) height=parseInt(window.getComputedStyle(element,null).height);
				if(width==0) width=400; if(height==0) height=300;
				
				var pIW=playImage.clientWidth; var pIH=playImage.clientHeight;
				if((pIW==0) || isNaN(pIW)) pIW=parseInt(window.getComputedStyle(playImage,null).width);
				if((pIH==0) || isNaN(pIH)) pIH=parseInt(window.getComputedStyle(playImage,null).height);
				if((pIW==0) || isNaN(pIW)) pIW=100; if((pIH==0) || isNaN(pIH)) pIH=100;
				playImage.style.top=-parseInt(height)+(parseInt(height) - parseInt(pIH))*.5 + "px";
				playImage.style.left=(parseInt(width) - parseInt(pIW))*.5 + "px";
				
				var dASP = width / height;
				var eASP = thmb.width / thmb.height;
				(eASP >= dASP) ? thmb.style.height = height + "px" : thmb.style.width = width + "px";
				thmb.style.left=-(parseInt(thmb.width)- width)/2 + "px";
				thmb.style.top=-(parseInt(thmb.height)- height)/2 + "px";
			});
			playImage.src = httpOrHttps+"://static.dermandar.com/design/images/play.png";
			if (iOS || ANDROID || null==document.location.toString().match(/^http:\/\/www.dermandar.com/i) || null==document.location.toString().match(/^https:\/\/www.dermandar.com/i))
			{
				playImage.onclick = function () { location.href=httpOrHttps+"://www.dermandar.com/p/" + id;};
				/*
				var supportHTML5=dmd_HTML5SupportDetection();
				if (iOS || (ANDROID && supportHTML5))
					playImage.onclick = function () { location.href=httpOrHttps+"://www.dermandar.com/html5p/" + id;};
				else if (ANDROID)
					playImage.onclick = function () { location.href=httpOrHttps+"://www.dermandar.com/htmlp/" + id;};
				else 
					playImage.onclick = function () { location.href=httpOrHttps+"://www.dermandar.com/htmlp/" + id;};
				*/
			}
		}
	};
	this.getFlashVersion = function() {
		var flashVersion = "0,0,0";
		try {
    		try {
      			var axo = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
      			try { axo.AllowScriptAccess = "always"; }
      			catch(e) { flashVersion = "6,0,0"; }
    		} catch(e) {}
    		flashVersion = new ActiveXObject("ShockwaveFlash.ShockwaveFlash").GetVariable("$version").replace(/\D+/g, "","").match(/^,?(.+),?$/)[1];
  		} catch(e) {
    		try {
      			if(navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin){
       		 		flashVersion = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
      			}
    		} catch(e) {}
  		}
  		flashVersion = flashVersion.split(",").shift();
  		return flashVersion;
	};
	this.flashSupported = this.getFlashVersion() >= 10;
	this.handleWheel = function (e) {
		e = e || window.e;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40;
		var flashApp = e.target || e.srcElement;
		if (!flashApp)
			return true;
		var o = {
			x : e.screenX,
			y : e.screenY,
			delta : wheelData,
			ctrlKey : e.ctrlKey,
			altKey : e.altKey,
			shiftKey : e.shiftKey
		};
		if(flashApp.handleWheel)
			flashApp.handleWheel(o);
		else {
			return false;
		}
		if (e.stopPropagation)
			e.stopPropagation();
		if (e.preventDefault)
			e.preventDefault();
		e.cancelBubble = true;
		e.cancel = true;
		e.returnValue = false;
		return false;
	};
	this.hookEvent = function (element) {
		if (element == null)
			return;
		if (element.addEventListener) {	
			document.addEventListener("DOMMouseScroll", this.handleWheel, false);
			element.addEventListener("mousewheel", this.handleWheel, false);
			element.addEventListener("MozMousePixelScroll", this.handleWheel, false);
			element.addEventListener("wheel", this.handleWheel, false);
		} else if (element.attachEvent)
			element.attachEvent("onmousewheel", this.handleWheel);
	};
};
var dmdEmbedder = dmdEmbedder || new DermandarEmbedder();
var lst = lst || [];
for(var ind=0;ind < dmdEmbeds.length; ind++)
{
	var passthis = false;
	for(var ind2=0;ind2 < lst.length; ind2++)
	{
		if ((typeof(dmdEmbeds[ind]) == "undefined") || (lst[ind2] == dmdEmbeds[ind])) { passthis = true; break; }
	}
	if (passthis) continue;
	lst.push(dmdEmbeds[ind]);
}
if (navigator.userAgent.match(/MSIE/))
	if (document.readyState !== "complete")
		window.addEventListener("load",function() { dmdEmbedder.loadPanoramas(); });
	else
		dmdEmbedder.loadPanoramas();
else
	dmdEmbedder.loadPanoramas();
var dmd_Embedding=null;
function dmd_closeOverlay() {
	dmd_Embedding.close();
}
function initDMD_Embeding() {
	if(dmd_Embedding==null) dmd_Embedding=new DMD_Embeding();
	dmd_Embedding.init();
	//window.onkeydown=function(e) { if(!e) e=window.event; /*if (e.keyCode == 37) { dmd_Embedding.prev(); } else if (e.keyCode == 39) { dmd_Embedding.next(); } else if (e.keyCode == 38) { dmd_Embedding.add(["cKufNm", "Stade Mbombela, Mbombela"]); } else*/ if (e.keyCode == 27) { dmd_Embedding.close(); } };
	window.addEventListener("keydown", function(e) { if(!e) e=window.event; if (e.keyCode == 27) { dmd_closeOverlay(); } });
	window.addEventListener("resize", function() { dmd_Embedding.resize(); });
	window.addEventListener("scroll", function() { dmd_Embedding.scroll(); });
};
if (navigator.userAgent.match(/MSIE/))
	if (document.readyState !== "complete")
		window.addEventListener("load",initDMD_Embeding);
	else
		initDMD_Embeding();
else
	initDMD_Embeding();
	
if (navigator.userAgent.match(/MSIE/))
	if (document.readyState !== "complete")
		window.addEventListener("load", addList);
	else
		addList();
else
	addList();
function addList()
{
	for(var i=0; i < lst.length; i++)
		dmd_Embedding.add([lst[i], ""]);
}
function loadF10(id) { if (dmdEmbedder.getFlashVersion() >= 10) dmdEmbedder.loadPanorama(id, true); };
