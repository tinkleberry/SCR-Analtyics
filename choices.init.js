/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Choice init js
*/

var multiSelect = document.getElementById("choices-multiple-remove-button");

 // multiple Remove CancelButton
if (multiSelect){
  var multipleCancelButton = new Choices(
    '#choices-multiple-remove-button',
    {
      removeItemButton: true,
    }
  );  
}  

// Chocies Select plugin
document.addEventListener('DOMContentLoaded', function () {
  var genericExamples = document.querySelectorAll('[data-trigger]');
  for (i = 0; i < genericExamples.length; ++i) {
    var element = genericExamples[i];
    new Choices(element, {
      placeholderValue: 'This is a placeholder set in the config',
      searchPlaceholderValue: 'This is a search placeholder',
    })
  }
});