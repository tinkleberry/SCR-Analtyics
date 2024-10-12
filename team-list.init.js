/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Team Js File
*/

//User profile
var leaveteam = document.getElementsByClassName("leave-team");
leaveteam.forEach(function (team) {
  team.addEventListener("click", function (item) {
    var dataId = team.getAttribute("data-id");
    document.getElementById('leaving-team').setAttribute('data-id' , dataId);
  });
});

document.getElementById('leaving-team').addEventListener("click",function (e){
  var dataid = document.getElementById('leaving-team').getAttribute('data-id');
  var myobj = document.getElementById('team-' + dataid);
  myobj.remove();

  var link = document.getElementById("btn-close");
    link.click();
});


