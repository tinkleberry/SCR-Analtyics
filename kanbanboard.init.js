/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Kanbanboard Init Js File
*/

var tasks_list = [
  document.getElementById("kanbanboard"),
  document.getElementById("backlog-task"),
  document.getElementById("waiting-task"),
  document.getElementById("doing-task"),
  document.getElementById("review-task"),
  document.getElementById("done-task"),
  document.getElementById("backlog-card-item"),
  document.getElementById("waiting-card-item"),
  document.getElementById("blank-task"),
]

drake = dragula(tasks_list).on('drag', function (el) {
  el.className = el.className.replace('ex-moved', '');
}).on('drop', function (el) {
  el.className += ' ex-moved';
}).on('over', function (el, container) {
  container.className += ' ex-over';
}).on('out', function (el, container) {
  container.className = container.className.replace('ex-over', '');
  taskCounter();
});


var scroll = autoScroll([
  document.querySelector("#kanbanboard"),
], {
  margin: 20,
  maxSpeed: 100,
  scrollWhenOutside: true,
  autoScroll: function () {
    return this.down && drake.dragging;
  }
});


// search Kanbanboard
function searchKanban() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-kanbanboard");
  filter = input.value.toLowerCase();
  ul = document.getElementById("kanbanboard");
  li = ul.querySelectorAll(".task-box");
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelector(".task-name");
    txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

// Remove Task

function removeTask(id) {
  var dataId = id;
  var myobj = document.getElementById(dataId);
  myobj.remove();
}

function deletekanabanboard(id) {
  var myobj = document.getElementById(id);
  myobj.remove();
}


// Add Taskboard

document
  .getElementById("taskboardStageCreat")
  .addEventListener("click", newKanbanbaord);

function newKanbanbaord() {
  var taskname = document.getElementById("floatingInput").value;

  var uniqueid = Math.floor(Math.random() * 100);

  var randomid = "remove_item_" + uniqueid;

  var dragullaid = "review_task_" + uniqueid;

  kanbanlisthtml =
    '<div class="task-list" id=' +
    randomid +
    ">" +
    '<div class="card bg-light shadow-none card-h-100">' +
    '<div class="card-header bg-transparent border-bottom-0 d-flex align-items-center">' +
    '<div class="flex-1">' +
    '<h4 class="card-title mb-0" id="edit-text-' +
    uniqueid +
    '"><span id="edit-input-' +
    uniqueid +
    '">' +
    taskname +
    '</span><span class="badge badge-soft-secondary ms-2"> 00</span></h4 > ' +
    '<div id="heading-' +
    uniqueid +
    '" class="d-flex visually-hidden">' +
    '<input class="form-control kanbanboard-rename-input" type="text" name="name" id="edit-heading-' +
    uniqueid +
    '">' +
    '<button class="btn btn-soft-success mx-3 kanbanboard-rename-save save-heading" type="button" data-input-id="edit-heading-' +
    uniqueid +
    '" onclick="kanbanboard_heading(`' +
    uniqueid +
    '`)">Save</button>' +
    "</div>" +
    "</div>" +
    '<div class="dropdown">' +
    '<a href="#" class="dropdown-toggle arrow-none font-size-16" data-bs-toggle="dropdown" aria-expanded="false" > ' +
    '<i class="uil uil-ellipsis-h text-muted"></i>' +
    "</a>" +
    '<div class="dropdown-menu dropdown-menu-end">' +
    '<a class="dropdown-item font-size-14 fw-medium text-muted" href = "#" onclick="editHeading(`' +
    uniqueid +
    '`)"><i class="mdi mdi-file-edit-outline me-1" ></i > Edit</a > ' +
    '<a class="dropdown-item font-size-14 fw-medium text-danger delete-item" href = "#" data-id=' +
    randomid +
    ' onclick="deletekanabanboard(`' +
    randomid +
    '`)"><i class="mdi mdi-trash-can-outline me-1" ></i > Delete</a > ' +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div>" +
    '<div data-simplebar class="tasklist-content pt-0 p-3">' +
    "<div id=" +
    dragullaid +
    ' class="task d-flex flex-column">' +
    "</div>" +
    "</div>" +
    '<div class="text-center p-3">' +
    '<a href="javascript: void(0);" class="btn btn-soft-primary w-100 add-new-task" data-bs-toggle="modal" data-bs-target=".bs-task-details-edit" onclick="addTaskDetails(`' +
    randomid +
    '`)"> <i class="mdi mdi-plus me-1" ></i > Add New Task</a > ' +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  var subTask = document.getElementById("kanbanboard");
  subTask.insertAdjacentHTML("beforeend", kanbanlisthtml);

  var link = document.getElementById("btn-close");
  for (var i = 0; i < 50; i++) link.click();

  drake.destroy();
  tasks_list.push(document.getElementById(dragullaid));
  drake = dragula(tasks_list);
  document.getElementById("floatingInput").value = "";
  dropDownMenuCreate();
}

// Add Member List
var datatype = 'image';
var addmember = document.getElementById("add-members");
if (addmember) {
  document.getElementById("add-members").addEventListener("click", function () {

    var checkboxes = document.getElementsByName('member[]');
    for (i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = false;
    }

    var userimgs = document
      .getElementById('allmember')
      .querySelectorAll(".task-assigne a");

    document.getElementById("member-list").innerHTML = "";

    userimgs.forEach(function (item) {
      var assigneusers = item.getAttribute("value");

      if (assigneusers.includes('list-')) {
        document.getElementById(assigneusers).checked = true;
        var checkBoxChecked = document.getElementById(assigneusers);
      } else {
        document.getElementById("list-" + assigneusers).checked = true;
        var checkBoxChecked = document.getElementById("list-" + assigneusers);
      }

      datatype = checkBoxChecked.getAttribute("data-type");

      checkedMember(checkBoxChecked, datatype);
    });
  });
}

function checkedMember(checkBoxChecked, datatype) {
  var id = checkBoxChecked.getAttribute("id");
  var dataImage = checkBoxChecked.getAttribute("data-image");
  var dataname = checkBoxChecked.getAttribute("data-name");

  memberlisthtml =
    '<div class="d-flex d-inline-flex align-items-center m-1 bg-light p-1 rounded-pill" id="new_' +
    id +
    '">' +
    '<div class="flex-shrink-0">';
  if (datatype == "image") {
    memberlisthtml += "<img src=" +
      dataImage +
      ' class="img-fluid avatar-sm rounded-circle" alt="">';
  } else {
    memberlisthtml += '<div class="avatar-sm">\
    <div class="avatar-title rounded-circle bg-primary">\
    ' + dataImage + '\
    </div>\
  </div>';
  }

  memberlisthtml += "</div>" +
    '<div class="flex-grow-1">' +
    '<p class="ms-2 fw-medium mb-0">' +
    dataname +
    "</p>" +
    "</div>" +
    '<a href="#" class="text-muted ms-3" onclick="myDemoFunction(`new_' +
    id +
    '`)"><i class="mdi mdi-close-circle"></i></a>' +
    "</div>";

  var subTask = document.getElementById("member-list");
  subTask.insertAdjacentHTML("beforeend", memberlisthtml);

}

function myDemoFunction(id) {
  var myobj = document.getElementById(id);
  newString = id.replace("new_", "");
  myobj.remove();
  document.getElementById(newString).checked = false;
}

var memberlist = document.getElementsByClassName("member-list-checkbox");

memberlist.forEach(function (itemArray) {
  itemArray.addEventListener("click", function (item) {
    var id = itemArray.getAttribute("id");
    datatype = itemArray.getAttribute("data-type");

    var checkBoxChecked = document.getElementById(id);

    if (checkBoxChecked.checked == true) {
      checkedMember(checkBoxChecked, datatype);
    } else {
      myDemoFunction("new_" + id);
    }
  });
});

// Edit kanband heading

function editHeading(id) {
  document.getElementById("heading-" + id).classList.toggle("visually-hidden");
  document
    .getElementById("edit-text-" + id)
    .classList.toggle("visually-hidden");
  var inputvalue = document.getElementById("edit-input-" + id).textContent;
  document.getElementById("edit-heading-" + id).value = inputvalue;
}

function kanbanboard_heading(id) {
  var el_down = document.getElementById("edit-input-" + id);
  var inputF = document.getElementById("edit-heading-" + id);
  inputF.setAttribute("value", "defaultValue");
  el_down.innerHTML = inputF.value;
  document.getElementById("heading-" + id).classList.toggle("visually-hidden");
  document.getElementById("edit-text-" + id).classList.toggle("visually-hidden");
}


// Add Members

var savemembers = document.querySelector("#saveAllMember");
if (savemembers) {
  document
    .getElementById("saveAllMember")
    .addEventListener("click", function () {
      var taskassignee = new Array();
      var membervalue = new Array();
      var datatypes = new Array();

      var src = "";
      var allmembers = document.querySelectorAll(
        "#member-lists input[type=checkbox]:checked"
      );

      allmembers.forEach(function (task) {
        membervalue.push(task.getAttribute("id"));
        datatypes.push(task.getAttribute("data-type"));

        if (task.getAttribute("data-type") == "image") {
          var src = task.nextElementSibling.getAttribute("src");
        } else {
          var src = task.nextElementSibling;
        }
        taskassignee.push(src);
      });

      for (i = 0; i < datatypes.length; i++) {
        if (datatypes[i] == "image") {
          src = src +
            '<div class="avatar-group-item">' +
            '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
            membervalue[i] +
            ' title="" data-bs-original-title="Abel Owen">' +
            "<img src=" +
            taskassignee[i] +
            ' alt="" class="rounded-circle avatar-sm"></img>' +
            "</a>" +
            "</div>";
        } else {
          var taskassign = taskassignee[i].outerHTML;
          src = src +
            '<div class="avatar-group-item">' +
            '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
            membervalue[i] +
            ' title="" data-bs-original-title="Abel Owen">' +
            taskassign +
            "</a>" +
            "</div>";
        }
      }

      var userimgs =
        "<div class='avatar-group float-start task-assigne'>" + src + "</div>";
      document.getElementById("allmember").innerHTML = userimgs;
      var uid = document.getElementById("add-members").getAttribute('data-id');

      document.getElementById("all-member-lists-" + uid).innerHTML = userimgs;

      var link = document.getElementById("save-employee");
      for (var i = 0; i < 1; i++) link.click();
    });
}

var cancelMembers = document.querySelector("#cancelMember");
if (cancelMembers) {
  document
    .getElementById("cancelMember")
    .addEventListener("click", function () {
      var uid = document.getElementById("add-members").getAttribute('data-id');

      userimgs = document.getElementById("allmember").innerHTML;

      document.getElementById("all-member-lists-" + uid).innerHTML = userimgs;
    });
}

document.getElementById("createnote").addEventListener("click", function () {
  document.getElementById("cancelMember").click();
});

var cancelMembers = document.querySelector("#edit-modal");
if (cancelMembers) {
  document
    .getElementById("edit-modal")
    .addEventListener("click", function () {

      var uid = document.getElementById("add-members").getAttribute('data-id');

      userimgs = document.getElementById("allmember").innerHTML;

      document.getElementById("all-member-lists-" + uid).innerHTML = userimgs;
    });
}

//Update Kanbanboard
var selectedstatus = "Waiting";
var updateid = "";
var newuid = "";
var maintaskid = "";
var alltask = "";
var selectedtask = "";
var CurrentId = "";
var isprogressbar = true;
var isduedate = true;

//Edit Task Details with Validation

function editTask(id) {
  updateid = id;
  newuid = updateid.split("remove-item-")[1];
  document.getElementById("attachments-files").innerHTML = "";
  document.querySelector("#updatetaskdetail").style.display = "block";
  document.querySelector("#addtask").style.display = "none";
  document.querySelector(".update-task-title").style.display = "block";
  document.querySelector(".add-task-title").style.display = "none";
  var name = document
    .getElementById(updateid)
    .querySelector(".task-name").textContent;

  var desc = document
    .getElementById(updateid)
    .querySelector(".task-desc").innerHTML;

  if (!!document.getElementById(updateid).querySelector(".progress-bar")) {
    var progressBarWidth = document
      .getElementById(updateid)
      .querySelector(".progress-bar")
      .getAttribute("value");
    document.querySelector("#task-progressbar").style.display = "block";
    document.querySelector("#taskprogressbar").value = progressBarWidth;
    isprogressbar = true;
  } else {
    isprogressbar = false;
    document.querySelector("#task-progressbar").style.display = "none";
  }

  var category = document
    .getElementById(updateid)
    .querySelector(".task-category").textContent;

  if (!!document.getElementById(updateid).querySelector(".edit-task-images")) {
    var taskimgs = document
      .getElementById(updateid)
      .querySelectorAll(".edit-task-images img");

    var taskimghtml =
      '<div class="d-flex align-items-center mb-2">' +
      '<div class="flex-grow-1">' +
      '<p class="fw-medium mb-0">Attachments Files</p>' +
      "</div>" +
      "<div>" +
      '<div class="dropdown">' +
      '<button class="btn btn-custom fw-medium shadow-none btn-sm dropdown-toggle" type="button" id="dropdownMenuButton2" data-bs-toggle="dropdown" aria-expanded="false">' +
      '<i class="mdi mdi-plus"></i>' +
      "</button>" +
      '<div class="dropdown-menu">' +
      '<a class="dropdown-item text-muted fw-medium" href="javascript: void(0);"><i class="mdi mdi-monitor me-2"></i>My Computer</a>' +
      '<a class="dropdown-item text-muted fw-medium" href="javascript: void(0);"><i class="mdi mdi-google-drive me-2"></i>Google Drive</a>' +
      '<a class="dropdown-item text-muted fw-medium" href="javascript: void(0);"><i class="mdi mdi-link-variant me-2"></i>Attach Link</a>' +
      "</div>" +
      "</div>" +
      "</div>" +
      "</div>" +
      '<ul class="list-inline attach-file">';

    taskimgs.forEach(function (item) {
      var assigneusersrc = item.getAttribute("src");
      var alttext = item.getAttribute("alt");

      taskimghtml +=
        '<li class="list-inline-item attach-doc-list me-3 me-0">' +
        '<div class="card mb-0 shadow-none">' +
        '<div class="card-body p-2">' +
        '<div class="position-relative">' +
        '<div class="bg-overlay"></div>' +
        '<a href="#">' +
        '<img src="' +
        assigneusersrc +
        '" alt="' +
        alttext +
        '" class="img-fluid">' +
        "</a>" +
        '<div class="attach-icon position-absolute top-50 start-50 translate-middle">' +
        '<a href="#">' +
        '<i class="mdi mdi-cloud-download text-white mdi-24px"></i>' +
        "</a>" +
        "</div>" +
        "</div>" +
        "</div>" +
        '<div class="card-footer border-top-0 p-0 px-2">' +
        ' <div class="media">' +
        '<i class="mdi mdi-file-link text-muted font-size-16"></i>' +
        '<div class="media-body ms-2">' +
        '<p class="font-size-12 mb-2 text-muted">' +
        alttext +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</li>";
    });

    taskimghtml += "</ul>";
    document.getElementById("attachments-files").innerHTML = taskimghtml;
  }

  var userimgs = document.getElementById(updateid).querySelectorAll(".task-assigne a");

  CurrentId = document.getElementById(updateid).querySelector(".current-id").innerHTML;

  userimgs.forEach(function (item) {
    var assigneusers = item.getAttribute("value");
    assigneusers = assigneusers.replace("list-", "");

    document.getElementById(assigneusers).checked = true;
  });

  document.querySelector("#taskname").value = name.trim();
  document.querySelector("#taskdesc").value = desc.trim();
  document.querySelector("#TaskStatus").value = category;

  if (!!document.getElementById(updateid).querySelector(".due-date")) {
    var duedate = document
      .getElementById(updateid)
      .querySelector(".due-date").textContent;
    duedate = moment(duedate, "DD/MM/YY").format("YYYY-MM-DD");
    document.querySelector("#taskbudget").style.display = "block";
    document.querySelector("#task-due-date").value = duedate;
    isduedate = true;
  } else {
    isduedate = false;
    document.querySelector("#taskbudget").style.display = "none";
  }
}

document.getElementById("updatetaskdetail").addEventListener("click", function () {
  var taskname = document.querySelector("#taskname").value;
  var duedate = document.querySelector("#task-due-date").value;


  duedate = moment(duedate, "YYYY-MM-DD").format("DD/MM/YY");

  var taskdesc = document.querySelector("#taskdesc").value;
  var taskstatus = document.querySelector("#TaskStatus").value;
  var categorycolor;

  if (taskstatus == "Web Design") {
    categorycolor = "badge-soft-primary";
  } else if (taskstatus == "UI/UX") {
    categorycolor = "badge-soft-purple";
  } else if (taskstatus == "React") {
    categorycolor = "badge-soft-warning";
  }

  var taskassignee = new Array();
  var membervalue = new Array();
  var datatypes = new Array();

  var src = "";
  var allmembers = document.querySelectorAll("#taskassignee input[type=checkbox]:checked");

  allmembers.forEach(function (task) {
    membervalue.push(task.getAttribute("id"));
    datatypes.push(task.getAttribute("data-type"));

    if (task.getAttribute("data-type") == "image") {
      var src = task.nextElementSibling.getAttribute("src");
    } else {
      var src = task.nextElementSibling;
    }
    taskassignee.push(src);
  });

  for (i = 0; i < datatypes.length; i++) {
    if (datatypes[i] == "image") {
      src = src +
        '<div class="avatar-group-item">' +
        '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
        membervalue[i] +
        ' title="" data-bs-original-title="Abel Owen">' +
        "<img src=" +
        taskassignee[i] +
        ' alt="" class="rounded-circle avatar-sm"></img>' +
        "</a>" +
        "</div>";
    } else {
      var taskassign = taskassignee[i].outerHTML;
      src = src +
        '<div class="avatar-group-item">' +
        '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
        membervalue[i] +
        ' title="" data-bs-original-title="Abel Owen">' +
        taskassign +
        "</a>" +
        "</div>";
    }
  }

  alltasks = document.getElementById("sub-tasks").querySelectorAll(".checklist").length;
  selectedtask = document.getElementById("sub-tasks").querySelectorAll("input[name=subtask]:checked").length;

  var taskimghtml = "";

  if (!!document.querySelectorAll("#attachments-files img")) {
    var taskimgs = document.querySelectorAll("#attachments-files img");

    taskimghtml += '<ul class="list-inline edit-task-images">';
    taskimgs.forEach(function (item) {
      itemsrc = item.getAttribute('src');
      itemalt = item.getAttribute('alt');
      taskimghtml +=
        '<li class="list-inline-item">' +
        '<a href="#">' +
        "<div>" +
        '<img src="' + itemsrc + '" class="rounded" alt="' + itemalt + '" height="48">' +
        "</div>" +
        "</a>" +
        "</li>";
    });
    taskimghtml += "</ul>";
  }

  var updatetaskhtml =
    "<div class='card-body'>" +
    "<div class='d-flex mb-3'>" +
    "<div class='flex-grow-1 align-items-start'>" +
    "<div>" +
    "<p class='text-primary fw-medium mb-0 current-id'>" +
    "" +
    CurrentId +
    "</p>" +
    "</div>" +
    "</div>" +
    "<div class='dropdown ms-2'>" +
    "<a href='#' class='dropdown-toggle font-size-16 text-muted' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
    "<i class='mdi mdi-dots-horizontal'></i>" +
    "</a>" +
    "<div class='dropdown-menu dropdown-menu-end'>" +
    "<div class='dropdown dropdown-move'>" +
    "<a class='dropdown-item dropdown-toggle arrow-none' href='javascript:void(0)'>Move</a>" +
    "<div class='dropdown-menu'>" +
    "<a href='#' class='dropdown-item'>Backlog</a>" +
    "<a href='#' class='dropdown-item'>Waiting</a>" +
    "<a href='#' class='dropdown-item'>Doing</a>" +
    "<a href='#' class='dropdown-item'>Review</a>" +
    "<a href='#' class='dropdown-item'>Done</a>" +
    "</div>" +
    "</div>" +
    "<a class='dropdown-item' data-bs-toggle='modal' data-bs-target='.bs-task-details-edit' href='#' onclick='editTask(`" +
    updateid +
    "`)'>Edit</a>" +
    "<a class='dropdown-item delete-item' href='#' onclick='removeTask(`" +
    updateid +
    "`)'>Remove</a>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<a href='#' class='font-size-15 fw-medium text-dark task-name edit-task-details' onclick='editTaskDetails(`" +
    updateid +
    "','" + parseInt(newuid) + "')' data-bs-toggle='modal' data-bs-target='.bs-task-details'>" +
    taskname +
    "</a>" +
    "<p class='text-muted text-truncate mt-1 font-size-13 task-desc'>" +
    taskdesc +
    "</p>";

  if (taskimghtml != "") {
    updatetaskhtml += taskimghtml;
  }

  if (isduedate) {
    updatetaskhtml += "<div class='d-flex'>" +
      "<div class='flex-grow-1'>" +
      "<p class='text-muted font-size-13 fw-medium mb-2'>" +
      "<i class='mdi mdi-calendar-range me-1'></i><span class='due-date'>" +
      duedate +
      "</span></p>" +
      "</div>" +
      "<div>" +
      "<p class='text-muted font-size-13 fw-medium mb-2'>" +
      "<i class='mdi mdi-check-all me-1 align-middle'></i>" +
      selectedtask +
      "/" +
      alltasks +
      "" +
      "</p>" +
      "</div>" +
      "<div class='ms-4'>" +
      "<p class='text-muted font-size-13 fw-medium mb-3'>" +
      "<i class='mdi mdi-message-outline me-1 align-middle'></i>0" +
      "</p>" +
      "</div>" +
      "</div>";
  }

  if (isprogressbar) {
    var progressbarWidth = document.querySelector("#taskprogressbar").value;
    updatetaskhtml += "<div class='progress progress-sm animated-progess mb-3' style='height: 4px;'>" +
      "<div class='progress-bar' role='progressbar' style='width: " +
      progressbarWidth +
      "%' aria-valuenow=" +
      progressbarWidth +
      " aria-valuemin=" +
      progressbarWidth +
      " value=" +
      progressbarWidth +
      " aria-valuemax='100'></div>" +
      "</div>";
  }
  updatetaskhtml += "<div class='d-flex'><div id='all-member-lists-" + newuid + "' class='flex-grow-1'><div class='avatar-group float-start flex-grow-1 task-assigne'>" +
    src +
    "</div></div><div class='align-self-end'>" +
    "<span class='badge " +
    categorycolor +
    " p-2 task-category'>" +
    taskstatus +
    "</span>" +
    "</div>" +
    " </div>" +
    "</div>";

  document.getElementById(updateid).innerHTML = updatetaskhtml;

  var link = document.getElementById("update-task");
  for (var i = 0; i < 1; i++) link.click();
  document.getElementById("NewtaskForm").reset();
});

function addTaskDetails(id) {
  document.getElementById("NewtaskForm").reset();
  maintaskid = id;

  document.querySelector(".update-task-title").style.display = "none";
  document.querySelector(".add-task-title").style.display = "block";
}

function addTaskDetails(id) {
  document.getElementById("NewtaskForm").reset();
  maintaskid = id;
  document.querySelector(".update-task-title").style.display = "none";
  document.querySelector(".add-task-title").style.display = "block";
  document.querySelector("#updatetaskdetail").style.display = "none";
  document.querySelector("#addtask").style.display = "block";
}


document.getElementById("addtask").addEventListener("click", function () {

  var taskname = document.querySelector("#taskname").value;
  var duedate = document.querySelector("#task-due-date").value;
  var progressbarWidth = document.querySelector("#taskprogressbar").value;
  duedate = moment(duedate, "YYYY-MM-DD").format("DD/MM/YY");

  var taskdesc = document.querySelector("#taskdesc").value;
  var taskstatus = document.querySelector("#TaskStatus").value;
  var categorycolor;

  var progressbarColor;
  if (progressbarWidth <= 10) {
    progressbarColor = "bg-danger";
  } else if (progressbarWidth > 10 && progressbarWidth < 25) {
    progressbarColor = "bg-warning";
  } else if (progressbarWidth > 25 && progressbarWidth < 50) {
    progressbarColor = "bg-info";
  } else if (progressbarWidth > 50 && progressbarWidth < 75) {
    progressbarColor = "bg-primary";
  } else if (progressbarWidth > 75 && progressbarWidth <= 100) {
    progressbarColor = "bg-success";
  }

  if (taskstatus == "Web Design") {
    categorycolor = "badge-soft-primary";
  } else if (taskstatus == "UI/UX") {
    categorycolor = "badge-soft-purple";
  } else if (taskstatus == "React") {
    categorycolor = "badge-soft-warning";
  }

  var taskassignee = new Array();
  var membervalue = new Array();
  var datatypes = new Array();

  var src = "";
  var allmembers = document.querySelectorAll(
    "#taskassignee input[type=checkbox]:checked"
  );
  allmembers.forEach(function (task) {
    membervalue.push(task.getAttribute("id"));
    datatypes.push(task.getAttribute("data-type"));
    if (task.getAttribute("data-type") == "image") {
      var src = task.nextElementSibling.getAttribute("src");
    } else {
      var src = task.nextElementSibling;
    }
    taskassignee.push(src);
  });
  for (i = 0; i < datatypes.length; i++) {
    if (datatypes[i] == "image") {
      src =
        src +
        '<div class="avatar-group-item">' +
        '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
        membervalue[i] +
        ' title="" data-bs-original-title="Abel Owen">' +
        "<img src=" +
        taskassignee[i] +
        ' alt="" class="rounded-circle avatar-sm"></img>' +
        "</a>" +
        "</div>";
    } else {
      var taskassign = taskassignee[i].outerHTML;
      src =
        src +
        '<div class="avatar-group-item">' +
        '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
        membervalue[i] +
        ' title="" data-bs-original-title="Abel Owen">' +
        taskassign +
        "</a>" +
        "</div>";
    }
  }
  if (
    taskname.length == 0 ||
    selectedstatus.length == 0 ||
    taskassignee.length == 0
  ) {
    document.querySelector("#NewtaskForm").validate().element("#taskname");
    document
      .querySelector("#NewtaskForm")
      .validate()
      .element("#taskassignee input:checkbox");
    document.querySelector("#NewtaskForm").validate().element("#TaskStatus");
  } else {
    alltasks = document
      .getElementById("sub-tasks")
      .querySelectorAll(".checklist").length;

    selectedtask = document
      .getElementById("sub-tasks")
      .querySelectorAll("input[name=subtask]:checked").length;

    var updateid = "remove-item-" + createRandomId(2);
    var projectctid = createRandomId(2);

    var newproject = "<div class='card task-box shadow-none' id = " + updateid + ">\
                        <div class='card-body' >\
                          <div class='d-flex mb-3'> \
                            <div class='flex-grow-1 align-items-start'>\
                              <div>\
                                <p class='text-primary fw-medium mb-0 current-id'>#PM00 " + projectctid + "</p>\
                              </div>\
                            </div>\
                            <div class='dropdown ms-2'>\
                              <a href='#' class='dropdown-toggle font-size-16 text-muted' data-bs-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>\
                                <i class='mdi mdi-dots-horizontal'></i>\
                              </a>\
                              <div class='dropdown-menu dropdown-menu-end'>\
                                <div class='dropdown dropdown-move'>\
                                  <a class='dropdown-item dropdown-toggle arrow-none' href='javascript:void(0)' role='button'>Move</a>\
                                  <div class='dropdown-menu'>\
                                    <a href='#' class='dropdown-item'>Backlog</a>\
                                    <a href='#' class='dropdown-item'>Waiting</a>\
                                    <a href='#' class='dropdown-item'>Doing</a>\
                                    <a href='#' class='dropdown-item'>Review</a>\
                                    <a href='#' class='dropdown-item'>Done</a>\
                                  </div>\
                                </div>\
                                <a class='dropdown-item' data-bs-toggle='modal' data-bs-target='.bs-task-details-edit' href='#' onclick='editTask(`" + updateid + "`)'>Edit</a>\
                                <a class='dropdown-item delete-item' href='#' onclick='removeTask(`" + updateid + "`)'>Remove</a>\
                              </div>\
                            </div>\
                          </div>\
                          <a href='#' class='font-size-15 fw-medium text-dark task-name edit-task-details' onclick='editTaskDetails(`" + updateid + "`,`" + projectctid + "`)' data-bs-toggle='modal' data-bs-target='.bs-task-details'>" + taskname + "</a>\
                          <p class='text-muted text-truncate mt-1 font-size-13 task-desc'>" + taskdesc + "</p>\
                          <div class='d-flex'>\
                            <div class='flex-grow-1'>\
                              <p class='text-muted font-size-13 fw-medium mb-2'>\
                                <i class='mdi mdi-calendar-range me-1'></i><span class='due-date'>" + duedate + "</span>\
                              </p >\
                            </div>\
                          <div>\
                          <p class='text-muted font-size-13 fw-medium mb-2'>\
                            <i class='mdi mdi-check-all me-1 align-middle'></i>" + selectedtask + "/" + alltasks + "\
                          </p>\
                        </div>\
                        <div class='ms-4'>\
                          <p class='text-muted font-size-13 fw-medium mb-3'>\
                            <i class='mdi mdi-message-outline me-1 align-middle'></i>0\
                          </p>\
                        </div>\
                      </div>\
                      <div class='progress progress-sm animated-progess mb-3' style='height: 4px;'>\
                        <div class='progress-bar " + progressbarColor + "' role='progressbar' style='width: " + progressbarWidth + "%' aria-valuenow=" + progressbarWidth + " aria-valuemin=" + progressbarWidth + " value=" + progressbarWidth + " aria-valuemax='100'></div>\
                      </div>\
                      <div class='d-flex' id='all-member-lists-" + projectctid + "'><div class='avatar-group float-start flex-grow-1 task-assigne'>" + src + "</div>\
                        <div class='align-self-end'>\
                          <span class='badge " + categorycolor + " p-2 task-category'>" + taskstatus + "</span>\
                        </div>\
                      </div>";
    //</div>\
    //</div>";
    //+ progressbarColor +
    var subTask = document.querySelectorAll(
      "#" + maintaskid + " .tasklist-content .task"
    )[0];
    subTask.insertAdjacentHTML("afterbegin", newproject);

    var link = document.getElementById("update-task");
    for (var i = 0; i < 1; i++) link.click();
    document.getElementById("NewtaskForm").reset();
  }
  dropDownMenuCreate();
});

// Add comment
var commenttask = document.getElementsByClassName("send-task-comment");

if (commenttask.length > 0) {
  document
    .querySelector(".send-task-comment")
    .addEventListener("click", function () {
      var currentTime = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      var comment = document.querySelector(".task-comment").value;

      var newComment =
        '<div class="d-flex mt-2 align-items-start border-bottom py-4">' +
        '<img class="me-3 rounded-circle avatar-sm" src="assets/images/users/avatar-5.jpg" alt="">' +
        '<div class="flex-1">' +
        '<h5 class="font-size-15 mt-0 mb-1">Janice Morgan <small class="text-muted float-end">' +
        currentTime +
        "</small></h5>" +
        '<p class="text-muted">' +
        comment +
        "</p>" +
        '<a href="javascript: void(0);" class="text-muted font-size-13 d-inline-block"><i class="mdi mdi-reply"></i> Reply</a>' +
        "</div>" +
        "</div>";

      var subTask = document.getElementById("comments");
      subTask.insertAdjacentHTML("afterbegin", newComment);
      document.querySelector(".task-comment").value = "";
    });
}

// Edit More task detail

function editTaskDetails(id, uid) {

  document.getElementById("allmember").innerHTML = "";
  var userimgs = document.getElementById(id).querySelector(".task-assigne");
  document
    .getElementById("add-members").setAttribute('data-id', uid);
  document
    .getElementById("allmember")
    .insertAdjacentElement("beforeend", userimgs);
}

// Task Counter

taskCounter();

function taskCounter() {
  task_lists = document.querySelectorAll("#kanbanboard .task-list");
  task_lists.forEach(function (element) {
    tasks = element.getElementsByClassName("task");
    tasks.forEach(function (ele) {
      task_box = ele.getElementsByClassName("task-box");
      task_counted = task_box.length
    });
    badge = element.querySelector(".card-title .badge").innerText = "";
    badge = element.querySelector(".card-title .badge").innerText = task_counted;
  });

}

// Dropdown Mennu 

dropDownMenuCreate();

function dropDownMenuCreate() {
  var tasks_name = new Array();
  task_lists = document.querySelectorAll("#kanbanboard .task-list");
  task_lists.forEach(function (i) {
    id = i.id;
    var task = i.querySelector(".card .card-header .flex-1 .card-title  span");
    t_name = task.innerHTML;
    tasks_name.push({
      "id": id,
      "name": t_name
    });
  });

  dropdown_menu = document.querySelectorAll(".task-list div .task .task-box .dropdown .dropdown-menu .dropdown-move .dropdown-menu");
  dropdown_menu.forEach(function (j) {
    task_box = j.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
    task_box_id = task_box.id;
    j.innerHTML = "";
    tasks_name.forEach(function (t) {
      var a = document.createElement('a');
      var link = document.createTextNode(t['name']);
      a.appendChild(link);
      a.setAttribute('data-id', t['id']);
      a.setAttribute('data-task-id', task_box_id);
      a.setAttribute('onclick', "moveTask(this)");
      a.classList += "dropdown-item moveableTask";
      j.appendChild(a);
    });
  });
}

function moveTask(data) {
  var task_box_id = data.getAttribute("data-task-id");
  var containers_id = data.getAttribute("data-id");
  var itm = document.getElementById(task_box_id);
  var cln = itm.cloneNode(true);
  var tasks_list = document.querySelector("#" + containers_id);
  var tasks = tasks_list.querySelector('.card div .simplebar-wrapper .simplebar-mask .simplebar-content .task')
  // remove_d_down = cln.querySelector(".card-body .d-flex .dropdown .dropdown-menu");
  // remove_d_down.classList.remove("show");
  tasks.appendChild(cln);

  removeTask(task_box_id);
  // data.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.remove();
  taskCounter();
};