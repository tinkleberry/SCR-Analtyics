/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Employee init js
*/

// User profile img



//  Edit Task
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

    newproject = '<div class="card task-box rounded-3">\
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


// delete task
function deleteProjects(id) {
    updateid = id;

    var myobj = document.getElementById(updateid);

    myobj.remove();
}