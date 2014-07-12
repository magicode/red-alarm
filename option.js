

var selectLocation = $('#selectLocation');


window._locationDataRow.forEach(function(e,index){
  if(e[0] && e[2]){
    selectLocation.append($("<option></option>")
         .attr("value",e[2])
         .text(e[0]).attr('id','loc-' + index));
  }
});


if(localStorage["selectLocationId"])
{
	$('#'+localStorage["selectLocationId"]).attr('selected', 'selected');
}else{
	localStorage["selectLocation"] = '';
	localStorage["selectLocationId"] = ''
}


$('#selectLocation').change(function(){
	localStorage["selectLocation"] = $('#selectLocation option:selected').val();
	localStorage["selectLocationId"] = $('#selectLocation option:selected').attr('id');
});


$("#play-alarm").on('click',function(){
  new Audio("alarm.mp3").play();
});


$(".setting-checkbox").on('change',function(){
  var kay = $(this).attr("name"); 
  localStorage[kay] = $(this).is(":checked");  
});

$(".setting-checkbox").each(function(){
   var kay = $(this).attr("name");
   $(this).attr('checked',!(localStorage[kay] == "false"));
});

$("[data-tab]").on('click',function(){
    $(".tab").hide();
    var show = $(this).attr('data-tab');
    $(show).show();
});

if(localStorage.log){
  var log = $("#allLog");
  localStorage.log.split("\n").forEach(function(item){
    item = JSON.parse(item);
    log.prepend("<p></p>").text(item.time + "\n" + item.cities);
  });
}

