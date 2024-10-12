/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: team projects 
*/

// Remove
var itemid = 11;
var updateid = '';

function deleteProjects(id) {
  updateid = id;

  var myobj = document.getElementById(updateid);

  myobj.remove();
}

function editProjects(id) {
  updateid = id;

  var teamstatus = document.getElementById(updateid).querySelector(".team-status").textContent;

  var teamtitle = document.getElementById(updateid).querySelector(".team-title").textContent;

  var teamdescription = document.getElementById(updateid).querySelector(".team-description").textContent;

  var userimgs = document.getElementById(updateid).querySelectorAll(".task-assigne a");

  userimgs.forEach(function (item) {
    var assigneusers = item.getAttribute("value");
    document.getElementById(assigneusers).checked = true;

  });

  document.querySelector("#projectName").value = teamtitle;
  document.querySelector("#projectDetails").value = teamdescription.trim();

  var duedate = document.getElementById(updateid).querySelector(".team-date").textContent;

  document.querySelector("#task-due-date").value = duedate;

  document.querySelector("#team-status").value = teamstatus;
  document.querySelector("#updateprojectdetail").style.display = "block";
  document.querySelector("#addproject").style.display = "none";
  document.querySelector(".update-project-title").style.display = "block";
  document.querySelector(".add-project-title").style.display = "none";

}

function addProjects() {

  document.getElementById("NewtaskForm").reset();

  document.querySelector("#updateprojectdetail").style.display = "none";
  document.querySelector("#addproject").style.display = "block";

  document.querySelector(".update-project-title").style.display = "none";
  document.querySelector(".add-project-title").style.display = "block";

}

document.getElementById("updateprojectdetail").addEventListener("click", function () {
  var projectname = document.querySelector("#projectName").value;
  var duedate = document.querySelector("#task-due-date").value;
  var projectdetails = document.querySelector("#projectDetails").value;
  var teamstatus = document.querySelector("#team-status").value;

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

  var more = 0;
  for (i = 0; i < datatypes.length; i++) {
    if (i < 3) {
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
    } else {
      more++;
    }
  }

  if (src != null || src != "") {
    if (more > 0) {
      src = src +
        '<div class="avatar-group-item">' +
        '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
        more +
        ' title="" data-bs-original-title="Abel Owen">' +
        "<div class='avatar-sm'>" +
        "<div class='avatar-title rounded-circle bg-primary'> +" +
        more +
        "</div>" +
        "</div>" +
        "</a>" +
        "</div>";
    }
  }

  if (teamstatus == 'Pending') {
    color = 'danger';
  } else if (teamstatus == 'Progress') {
    color = 'warning';
  } else {
    color = 'success';
  }

  updatetaskhtml = '<div class="card">\
          <div class="card-body">\
              <div class="d-flex mb-3">\
                  <div class="flex-grow-1 align-items-start">\
                      <div>\
                          <h6 class="mb-0 text-muted">\
                              <i class="mdi mdi-circle-medium text-' + color + ' fs-3 align-middle"></i>\
                              <span class="team-date">' + duedate + '</span>\
                          </h6>\
                      </div>\
                  </div>\
                  <div class="dropdown ms-2">\
                      <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                          <i class="mdi mdi-dots-horizontal"></i>\
                      </a>\
                    <div class="dropdown-menu dropdown-menu-end">\
                          <a class="dropdown-item" href="javascript: void(0)" data-bs-toggle="modal" data-bs-target=".bs-example-new-project" onclick="editProjects(`' + updateid + '`)">Edit</a>\
                          <a class="dropdown-item" href="javascript: void(0)">Share</a>\
                          <div class="dropdown-divider"></div>\
                          <a class="dropdown-item delete-item" onclick="deleteProjects(`' + updateid + '`)" data-id="project-items-10" href="javascript: void(0);">Delete</a>\
                      </div>\
                  </div>\
              </div>\
            <div class="mb-4">\
                  <h5 class="mb-1 font-size-17 team-title">' + projectname + '</h5>\
                  <p class="text-muted text-truncate mb-0 team-description">' + projectdetails + '</p>\
              </div>\
              <div class="d-flex">\
                  <div class="avatar-group float-start flex-grow-1 task-assigne">\
                      ' + src + '\
                  </div>\
                  <div class="align-self-end">\
                      <span class="badge badge-soft-' + color + ' p-2 team-status">' + teamstatus + '</span>\
                  </div>\
              </div>\
          </div>\
      </div>';

  document.getElementById(updateid).innerHTML = updatetaskhtml;

  var link = document.getElementById("update-team");
  link.click();
  document.getElementById("NewtaskForm").reset();

  itemid++;

});

document.getElementById("addproject").addEventListener("click", function () {
  var newid = 'project-items-' + itemid;
  var projectname = document.querySelector("#projectName").value;
  var projectdetails = document.querySelector("#projectDetails").value;
  var teamstatus = document.querySelector("#team-status").value;
  var duedate = document.querySelector("#task-due-date").value;
  var color = '';

  if (teamstatus == 'Pending') {
    color = 'danger';
  } else if (teamstatus == 'Progress') {
    color = 'warning';
  } else {
    color = 'success';
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

  var more = 0;
  for (i = 0; i < datatypes.length; i++) {
    if (i < 3) {
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
    } else {
      more++;
    }
  }
  if (src != null || src != "") {
    if (more > 0) {
      src = src +
        '<div class="avatar-group-item">' +
        '<a href="" class="d-inline-block" data-bs-toggle="tooltip" data-bs-placement="top" value=' +
        membervalue[i] +
        ' title="" data-bs-original-title="Abel Owen">' +
        "<div class='avatar-sm'>" +
        "<div class='avatar-title rounded-circle bg-primary'> +" +
        more +
        "</div>" +
        "</div>" +
        "</a>" +
        "</div>";
    }
  }

  newproject = '<div class="col-xl-3 col-md-6 team-box" id="' + newid + '">\
      <div class="card">\
          <div class="card-body">\
              <div class="d-flex mb-3">\
                  <div class="flex-grow-1 align-items-start">\
                      <div>\
                          <h6 class="mb-0 text-muted">\
                              <i class="mdi mdi-circle-medium text-' + color + ' fs-3 align-middle"></i>\
                              <span class="team-date">' + duedate + '</span>\
                          </h6>\
                      </div>\
                  </div>\
                  <div class="dropdown ms-2">\
                      <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                          <i class="mdi mdi-dots-horizontal"></i>\
                      </a>\
                    <div class="dropdown-menu dropdown-menu-end">\
                          <a class="dropdown-item" href="javascript: void(0)" data-bs-toggle="modal" data-bs-target=".bs-example-new-project" onclick="editProjects(`' + newid + '`)">Edit</a>\
                          <a class="dropdown-item" href="javascript: void(0)">Share</a>\
                          <div class="dropdown-divider"></div>\
                          <a class="dropdown-item delete-item" onclick="deleteProjects(`' + newid + '`)" data-id="' + newid + '" href="javascript: void(0);">Delete</a>\
                      </div>\
                  </div>\
              </div>\
            <div class="mb-4">\
                  <h5 class="mb-1 font-size-17 team-title">' + projectname + '</h5>\
                  <p class="text-muted text-truncate mb-0 team-description">' + projectdetails + '</p>\
              </div>\
              <div class="d-flex">\
                  <div class="avatar-group float-start flex-grow-1 task-assigne">\
                      ' + src + '\
                  </div>\
                  <div class="align-self-end">\
                      <span class="badge badge-soft-' + color + ' p-2 team-status">' + teamstatus + '</span>\
                  </div>\
              </div>\
          </div>\
      </div>\
    </div>';

  var subTask = document.querySelectorAll("#all-projects")[0];

  subTask.insertAdjacentHTML("afterbegin", newproject);

  var link = document.getElementById("update-team");
  link.click();
  document.getElementById("NewtaskForm").reset();

  itemid++;

});

//Search Project

function searchTeam() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("search-team");
  filter = input.value.toLowerCase();
  ul = document.getElementById("all-projects");
  li = ul.querySelectorAll(".team-box");
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelector(".team-title");
    txtValue = a.textContent || a.innerText;
    if (txtValue.toLowerCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}