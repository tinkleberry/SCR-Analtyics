/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Remove Js File
*/

// Remove
var deleteItem = document.getElementsByClassName("delete-item");
deleteItem.forEach(function (itemArray) {
  itemArray.addEventListener("click", function (item) {
    var dataId = itemArray.getAttribute("data-id");
    var myobj = document.getElementById(dataId);
    myobj.remove();
  });
});