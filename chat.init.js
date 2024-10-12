/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Chat init js
*/

// scroll
document.addEventListener("DOMContentLoaded", function (event) {
  scrollToBottom("chat-conversation-list", "chat-conversation");
});

//add an eventListener to the from
var chatForm = document.querySelectorAll(".chatinput-form");
var itemList = document.getElementById("chat-conversation-list");

//single chat
var singleitemList = document.getElementById("single-chat-list");

var chatItems = [];

var getChatList = function (chatItems, dataid) {

  var currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  var itemList = document.getElementById(dataid);
  itemList.insertAdjacentHTML(
    "beforeend",
    '<li class="chat-list right">\
      <div class="conversation-list">\
      <div class="d-flex">\
      <div class="chat-user">\
      <img src="assets/images/users/avatar-10.jpg" class="avatar-sm img-fluid rounded-circle" alt="">\
      </div>\
      <div class="flex-1 chat-arrow">\
      <div class="d-flex justify-content-end">\
      <div class="ctext-wrap">\
      <p class="mb-0">' +
    chatItems +
    '</p>\
      </div>\
      <div class="dropdown align-self-end">\
      <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
      <i class="bx bx-dots-vertical-rounded"></i>\
      </a>\
      <div class="dropdown-menu">\
      <a class="dropdown-item fw-medium text-muted" href="javascript: void(0);">\
      <i class="mdi mdi-content-copy me-2"></i>Copy</a>\
      <a class="dropdown-item fw-medium text-muted" href="javascript: void(0);">\
      <i class="mdi mdi-star-outline me-2"></i>Star</a>\
      <a class="dropdown-item fw-medium text-muted" href="javascript: void(0);">\
      <i class="mdi mdi-reply-all-outline me-2"></i>Reply</a>\
      <a class="dropdown-item fw-medium text-muted" href="javascript: void(0);">\
      <i class="mdi mdi-share-all-outline me-2"></i>Forward</a>\
      <div class="dropdown-divider"></div>\
      <a class="dropdown-item fw-medium text-danger delete-chat-item" href="javascript: void(0);">\
      <i class="mdi mdi-trash-can-outline me-2"></i>Delete</a>\
      </div>\
      </div>\
      </div>\
      <div class="conversation-name fw-medium text-primary mb-2 mt-1">\
      Jansh Wells <small class="chat-time text-muted fw-medium">' +
    currentTime +
    "</small>\
      </div>\
      </div>\
      </div>\
      </div>\
    </li>"
  );

  // remove chat list
  itemList.querySelectorAll(".chat-list").forEach(function (item) {
    // delete event listener
    item.querySelectorAll(".delete-chat-item").forEach(function (subitem) {
      subitem.addEventListener("click", function () {
        itemList.removeChild(item);
      });
    });
  });
};

// remove single chat list
itemList
  .querySelectorAll(".chat-list")
  .forEach(function (item) {
    // delete event listener
    item
      .querySelectorAll(".delete-chat-item")
      .forEach(function (subitem) {
        subitem.addEventListener("click", function () {
          itemList.removeChild(item);
        });
      });
  });

// remove single chat list
var singlechatlist = singleitemList
  .querySelectorAll(".chat-list")
  .forEach(function (singleitem) {
    // delete event listener
    singleitem
      .querySelectorAll(".delete-chat-item")
      .forEach(function (singlesubitem) {
        singlesubitem.addEventListener("click", function () {
          singleitemList.removeChild(singleitem);
        });
      });
  });

function scrollToBottom(dataid, chatid) {
  var simpleBar = document.querySelector(
    "#" + chatid + " .simplebar-content-wrapper"
  );
  var offsetHeight = document.getElementById(dataid) ?
    document.getElementById(dataid).scrollHeight - window.innerHeight + 450 :
    0;
  if (offsetHeight)
    simpleBar.scrollTo({
      top: offsetHeight,
      behavior: "smooth"
    });
}

if (chatForm) {
  chatForm.forEach(function (item) {
    //add an item to the List, including to local storage
    item.addEventListener("submit", function (e) {
      e.preventDefault();

      var dataid = item.getAttribute("data-id");

      var chatInputValue = item.querySelector(".chat-input").value;

      if (chatInputValue.length !== 0) {
        getChatList(chatInputValue, dataid);

        dataid == "chat-conversation-list" ?
          scrollToBottom(dataid, "chat-conversation") :
          scrollToBottom(dataid, "single-chat-conversation");
      }
      item.querySelector(".chat-input").value = "";
    });
  });
}

// change chat 

document.querySelectorAll(".group-chat").forEach(function (item) {
  // delete event listener
  item.querySelectorAll("ul li").forEach(function (subitem) {
    subitem.addEventListener("click", function () {
      var elems = document.querySelectorAll("li.active");
      [].forEach.call(elems, function (el) {
        el.classList.remove("active");
      });
      subitem.classList.add('active');

      var chattitle = subitem.querySelector('.chat-text').innerText;
      document.querySelector('.chat-title-text').innerHTML = chattitle;

      var chaticon = subitem.querySelector('.avatar-title').innerHTML;
      document.querySelector('.avatar-icon').innerHTML = chaticon;

      document.getElementById("group-chat-conversation").classList.add("d-block");
      document.getElementById("user-chat-conversation").classList.add("d-none");
      document.getElementById("group-chat-conversation").classList.remove("d-none");
      document.getElementById("user-chat-conversation").classList.remove("d-block");
    });
  });
});

document.querySelectorAll("ul.single-chat li").forEach(function (subitem) {
  subitem.addEventListener("click", function () {
    var elems = document.querySelectorAll("li.active");
    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });
    subitem.classList.add('active');

    var chattitle = subitem.querySelector('.chat-text').innerText;
    document.querySelector('.single-chat-title').innerHTML = chattitle;
    var img = subitem.querySelector('.chat-user-img img').getAttribute("src");
    document.querySelector("#user-chat-conversation .single-chat-img").setAttribute('src', img);

    var elems = document.querySelectorAll("#single-chat-list .left .chat-user img");
    [].forEach.call(elems, function (el) {
      el.setAttribute('src', img);
    })

    document.getElementById("user-chat-conversation").classList.add("d-block");
    document.getElementById("group-chat-conversation").classList.add("d-none");
    document.getElementById("user-chat-conversation").classList.remove("d-none");
    document.getElementById("group-chat-conversation").classList.remove("d-block");
    scrollToBottom("single-chat-list", "single-chat-conversation");
  });
});

// Seacrh

function searchChat() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-chat");
  filter = input.value.toLowerCase();

  ul = document.getElementById("all-chat");
  li = ul.querySelectorAll("li");
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelector(".ms-3");
    txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}