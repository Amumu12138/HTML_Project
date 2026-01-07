Equipment_width="720";

if(/Android(?:\s+|\/)(\d+\.\d+)?/.test(navigator.userAgent)) {

if (window.orientation == 90 || window.orientation == -90) {
//横屏
$("body").attr("class", "landscape");
orientation = 'landscape';
Equipment_width="436";//436
}
else if (window.orientation == 0 || window.orientation == 180) {
//竖屏
$("body").attr("class", "portrait");
orientation = 'portrait';
Equipment_width="720";
}else{
Equipment_width="720";
}


}else if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {

if (window.orientation == 90 || window.orientation == -90) {

$("body").attr("class", "landscape");
orientation = 'landscape';
Equipment_width="432";//432

}
else if (window.orientation == 0 || window.orientation == 180) {
//竖屏
$("body").attr("class", "portrait");
orientation = 'portrait';
Equipment_width="720";
}else{
Equipment_width="720";
}

}else{
		
}

! function(e) {
	if(/Android(?:\s+|\/)(\d+\.\d+)?/.test(navigator.userAgent)) {

		css="az";
		document.write('<meta name="viewport" content="width=' + e + ',target-densitydpi=device-dpi">');
	} else {
		if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		document.write('<meta name="viewport" content="width=' + e + ',user-scalable=no,target-densitydpi=device-dpi,minimal-ui,viewport-fit=cover">');
		
	
		css="ios";
		}else{
		css="pc";
	
		}
	}
}(Equipment_width);