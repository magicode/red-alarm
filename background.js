
var lastWarningId = 0;

var locationData  = window._locationData;

function checkWarning() {
    var req = new XMLHttpRequest();
    req.open("GET", "http://www.oref.org.il/WarningMessages/Alert/alerts.json?v=1", true);
    req.onload = getJson;
    req.send(null);
}

Number.prototype.pad = function (len) {
    return (new Array(len + 1).join("0") + this).slice(-len);
}

function getJson(e){
	var data = {};
	try{
	  data = JSON.parse(e.target.responseText);
	}catch(e){}
	      
	
	if(!data.id || data.id == lastWarningId || !data.data || !data.data.length || localStorage.isActivated == "false") return;
	
	lastWarningId = data.id;
	var selectLocation = localStorage["selectLocation"];
	var inSelectLocation = false;
	
	data.data = data.data.map(function(l){
	    if(selectLocation == l) inSelectLocation = true;
	    return locationData && locationData[l] ? "[" + l +"] [" + (locationData[l].time ||'') + "] " + 
	    locationData[l].name.join(', ')   :
	    l;
	});
	
	
	
	var cities = data.data.join("\n");
	
	var time = new Date();
	var timeString = time.getHours().pad(2) + ":" + time.getMinutes().pad(2) + ":" + time.getSeconds().pad(2);
	var notification = new Notification("התרעות לשעה " + timeString , { body: cities , icon: "icon.png" });
	
	if(!localStorage.log) localStorage.log = '';
	localStorage.log += JSON.stringify({ time: new Date() , cities: cities, data: data }) + "\n";
	
	if(!(localStorage.soundActivated  == "false")){
	  new Audio(inSelectLocation ? "alarm.mp3": "beep-08b.mp3").play();
	}
	
	setTimeout(function () {
	    notification.close();
	}, 30 * 1000);
};
    
function test(){
   lastWarningId = 0;
    getJson( { target : {responseText: 
   '{ "id" : "1405053379253","title" : "פיקוד העורף התרעה במרחב ","data" : ["test" , "נגב 299"]}' } });
}

setInterval(checkWarning, 2000);

