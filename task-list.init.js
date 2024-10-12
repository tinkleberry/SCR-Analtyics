/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Main Js File
*/

// drake = dragula([
//     document.getElementById("landing-task"),
//     document.getElementById("design-task"),
//     document.getElementById("blog-task"),
//     document.getElementById("comp-task"),
//     document.getElementById("app-task"),
//     document.getElementById("gallery-task"),
//     document.getElementById("about-task"),
//     document.getElementById("ecom-task"),
//     document.getElementById("brand-task"),
//     document.getElementById("general-tasks"),
//     document.getElementById("sub-tasks"),
// ]);

// delete task
function deleteProjects(id) {
    updateid = id;

    var myobj = document.getElementById(updateid);

    myobj.remove();
}

var itemid = 11;

// Add Task Element


function newElement() {
    var inputValue = document.getElementById("myInput").value;
    if (inputValue === "") {
        alert("You must write something task!");
    } else {
        var demo = '<div class="sub-group-item">';
        demo += '<div class="checklist px-0 d-flex form-check align-items-center font-size-15 mb-1"><div class="flex-grow-1"><input type="checkbox" name="subtask" class="form-check-input ms-0" id="' + inputValue + '">';
        demo += '<label class="form-check-label mb-0 ms-3" for="' + inputValue + '">';
        demo += inputValue;
        demo += "</label>";
        demo += '</div><div><i class="mdi mdi-text mdi-24px text-muted"></i></div></div></div>';

        var subTask = document.getElementById("sub-tasks");
        subTask.insertAdjacentHTML("beforeend", demo);

    }
    document.getElementById("myInput").value = "";
}

function addTask() {

    document.getElementById("NewtaskForm").reset();

    document.querySelector("#updatetaskdetail").style.display = "none";
    document.querySelector("#addtask").style.display = "block";

    document.querySelector(".update-task-title").style.display = "none";
    document.querySelector(".add-task-title").style.display = "block";

}

document.getElementById("addtask").addEventListener("click", function () {
    var newid = 'task-item-' + itemid;
    var tasksName = document.querySelector("#tasksName").value;
    var TaskStatus = document.querySelector("#TaskStatus").value;

    var color = '';
    var src = "";

    if (TaskStatus == 'Pending') {
        color = 'danger';
    } else if (TaskStatus == 'Progress') {
        color = 'warning';
    } else {
        color = 'success';
    }

    var taskassignee = new Array();
    var membervalue = new Array();
    var datatypes = new Array();

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

            src +=
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

            src +=
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

    newproject = '<div id="' + newid + '">\
        <div class="card list-group-item rounded-3">\
            <div class="card-body">\
                <div class="row align-items-center">\
                    <div class="col-xl-6 col-sm-5">\
                        <div class="checklist form-check font-size-15">\
                            <input type="checkbox" class="form-check-input" id="customCheck1">\
                            <label class="form-check-label ms-1 task-title" for="customCheck1">' + tasksName + '</label>\
                        </div>\
                    </div>\
                    <div class="col-xl-6 col-sm-7">\
                        <div class="row align-items-center">\
                            <div class="col-xl-5 col-md-6 col-sm-5">\
                                <div class="avatar-group mt-3 mt-xl-0 task-assigne">\
                                    ' + src + '\
                                </div>\
                            </div>\
                            <div class="col-xl-7 col-md-6 col-sm-7">\
                                <div class="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">\
                                    <div>\
                                        <span class="badge rounded-pill badge-soft-' + color + ' font-size-11 task-status">' + TaskStatus + '</span>\
                                    </div>\
                                    <div>\
                                        <a href="#" class="mb-0 text-muted fw-medium"><i class="mdi mdi-checkbox-marked-circle-outline me-1"></i>' + selectedtask + ' / ' + alltasks + ' </a>\
                                    </div>\
                                    <div>\
                                        <a href="#" class="mb-0 text-muted fw-medium" data-bs-toggle="modal" data-bs-target=".bs-example-new-task"><i class="mdi mdi-square-edit-outline font-size-16 align-middle" onclick="editTask(`' + newid + '`)"></i></a>\
                                    </div>\
                                    <div>\
                                        <a href="#" class="delete-item" onclick="deleteProjects(`' + newid + '`)">\
                                            <i class="mdi mdi-trash-can-outline align-middle font-size-16 text-danger"></i>\
                                        </a>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';

    var subTask = document.querySelectorAll("#landing-task")[0];

    subTask.insertAdjacentHTML("afterbegin", newproject);

    var link = document.getElementById("update-task");
    link.click();

    document.getElementById("NewtaskForm").reset();

    itemid++;

});


function editTask(id) {

    updateid = id;

    var teamstatus = document.getElementById(updateid).querySelector(".task-status").textContent;
    var teamtitle = document.getElementById(updateid).querySelector(".task-title").textContent;

    var userimgs = document.getElementById(updateid).querySelectorAll(".task-assigne a");

    userimgs.forEach(function (item) {
        var assigneusers = item.getAttribute("value");
        document.getElementById(assigneusers).checked = true;
    });

    document.querySelector("#tasksName").value = teamtitle;
    document.querySelector("#TaskStatus").value = teamstatus;


    // const element = document.querySelector('#TaskStatus');
    // const choices = new Choices(element).setChoices([teamstatus]);

    document.querySelector(".updatetaskdetail").style.display = "block";
    document.querySelector(".addtask").style.display = 'none';
    document.querySelector("#update-task-title").style.display = "block";
    document.querySelector("#add-task-title").style.display = "none";

}

document.getElementById("updatetaskdetail").addEventListener("click", function () {
    var tasksName = document.querySelector("#tasksName").value;
    var TaskStatus = document.querySelector("#TaskStatus").value;

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

    if (TaskStatus == 'Pending') {
        color = 'danger';
    } else if (TaskStatus == 'Progress') {
        color = 'warning';
    } else {
        color = 'success';
    }


    alltasks = document.getElementById("sub-tasks").querySelectorAll(".checklist").length;
    selectedtask = document.getElementById("sub-tasks").querySelectorAll("input[name=subtask]:checked").length;

    newproject = '<div class="card list-group-item rounded-3">\
        <div class="card-body">\
            <div class="row align-items-center">\
                <div class="col-xl-6 col-sm-5">\
                    <div class="checklist form-check font-size-15">\
                        <input type="checkbox" class="form-check-input" id="customCheck1">\
                        <label class="form-check-label ms-1 task-title" for="customCheck1">' + tasksName + '</label>\
                    </div>\
                </div>\
                <div class="col-xl-6 col-sm-7">\
                    <div class="row align-items-center">\
                        <div class="col-xl-5 col-md-6 col-sm-5">\
                            <div class="avatar-group mt-3 mt-xl-0 task-assigne">\
                                ' + src + '\
                            </div>\
                        </div>\
                        <div class="col-xl-7 col-md-6 col-sm-7">\
                            <div class="d-flex flex-wrap gap-3 mt-3 mt-xl-0 justify-content-md-end">\
                                <div>\
                                    <span class="badge rounded-pill badge-soft-' + color + ' font-size-11 task-status">' + TaskStatus + '</span>\
                                </div>\
                                <div>\
                                    <a href="#" class="mb-0 text-muted fw-medium"><i class="mdi mdi-checkbox-marked-circle-outline me-1"></i>' + selectedtask + ' / ' + alltasks + '</a>\
                                </div>\
                                <div>\
                                    <a href="#" class="mb-0 text-muted fw-medium" data-bs-toggle="modal" data-bs-target=".bs-example-new-task"><i class="mdi mdi-square-edit-outline font-size-16 align-middle" onclick="editTask(`' + updateid + '`)"></i></a>\
                                </div>\
                                <div>\
                                    <a href="#" class="delete-item" onclick="deleteProjects(`' + updateid + '`)">\
                                        <i class="mdi mdi-trash-can-outline align-middle font-size-16 text-danger"></i>\
                                    </a>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';

    document.getElementById(updateid).innerHTML = newproject;

    var link = document.getElementById("update-task");
    link.click();
    document.getElementById("NewtaskForm").reset();

});

//Search Task

function searchTask() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-task");
    filter = input.value.toLowerCase();
    ul = document.getElementById("all-task");
    li = ul.querySelectorAll(".task-list-box");
    for (i = 0; i < li.length; i++) {
        a = li[i].querySelector(".task-title");
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}