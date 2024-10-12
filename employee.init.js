/*
Template Name: Probic - Admin & Dashboard Template
Author: Themesdesign
Version: 1.0.0
Website: https://themesdesign.in/
Contact: themesdesign@gmail.in
File: Employee init js
*/

// User profile img

document.querySelector("#profile-img-file-input").addEventListener("change", function () {
    var preview = document.querySelector(".user-profile-image");

    if (!preview) {

        var preview = '<img src="assets/images/users/avatar-1.jpg" id="userProfileImage" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">';
        document.querySelector(".profile-user .avatar-lg").outerHTML = preview;
        preview = document.querySelector(".user-profile-image");

    }

    var file = document.querySelector(".profile-img-file-input").files[0];
    var reader = new FileReader();
    reader.addEventListener(
        "load",
        function () {
            preview.src = reader.result;
        },
        false
    );
    if (file) {
        reader.readAsDataURL(file);
    }
});


// Remove
var itemid = 11;
var updateid = '';

function deleteEmployee(id) {

    updateid = id;

    var myobj = document.getElementById(updateid);

    myobj.remove();

}

function editProjects(id) {
    updateid = id;
    var employeedesignation = document.getElementById(updateid).querySelector(".employee-designation").textContent;
    var employeename = document.getElementById(updateid).querySelector(".employee-name").textContent;
    var employeetype = document.getElementById(updateid).querySelector(".employee-image").getAttribute('data-type');
    if (employeetype == 'text') {
        var employeeimage = document.getElementById(updateid).querySelector(".employee-image").innerHTML;
        document.querySelector("#employee-image-form").innerHTML = "";
        document.querySelector("#employee-image-form").innerHTML = "<div class='avatar-lg mx-auto img-thumbnail rounded-circle'>\
            <span class='avatar-title rounded-circle fs-4 bg-soft-primary text-primary'>\
                " + employeename[0] + "\
            </span>\
        </div>"
    } else {
        var employeeimage = document.getElementById(updateid).querySelector(".employee-image").getAttribute('src');
        document.querySelector("#employee-image-form").innerHTML = "";
        document.querySelector("#employee-image-form").innerHTML = "<div class='user-profile'>\
            <img src='" + employeeimage + "' id='userProfileImage'\
                class='rounded-circle avatar-xl img-thumbnail user-profile-image'\
                alt='user-profile-image'>\
        </div>"
    }
    var employeephone = document.getElementById(updateid).querySelector(".employee-phoneno").getAttribute('data-bs-original-title');
    var employeeemail = document.getElementById(updateid).querySelector(".employee-email").getAttribute('data-bs-original-title');
    var tags = document.getElementById(updateid).querySelectorAll(".employee-tags .badge");
    tags.forEach(function (tag) {
        var assigneusers = tag.innerHTML;
        multipleCancelButton.setChoiceByValue(assigneusers);
    });
    document.querySelector("#employeeName").value = employeename;
    document.querySelector("#employeePosition").value = employeedesignation.trim();
    document.querySelector("#exampleEmailId").value = employeeemail;
    document.querySelector("#PhoneNo").value = employeephone;
    document.querySelector("#updatetaskdetail").style.display = "block";
    document.querySelector("#addtask").style.display = "none";
    document.querySelector(".update-task-title").style.display = "block";
    document.querySelector(".add-task-title").style.display = "none";
}

function addEmployee() {

    document.getElementById("NewtaskForm").reset();

    user_icon = "<div class='avatar-lg mx-auto img-thumbnail rounded-circle'>\
                    <span class='avatar-title rounded-circle fs-4 bg-soft-primary text-primary'>\
                        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-user'><path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'></path><circle cx='12' cy='7' r='4'></circle></svg>\
                    </span>\
                </div>"
    document.querySelector("#employee-image-form").innerHTML = "";
    document.querySelector("#employee-image-form").innerHTML = user_icon;
    document.querySelector("#updatetaskdetail").style.display = "none";
    document.querySelector("#addtask").style.display = "block";

    document.querySelector(".update-task-title").style.display = "none";
    document.querySelector(".add-task-title").style.display = "block";
}

document.getElementById("updatetaskdetail").addEventListener("click", function () {

    newid = updateid;

    var employeeName = document.querySelector("#employeeName").value;
    var employeePosition = document.querySelector("#employeePosition").value;
    var selectbox = document.querySelector("#choices-multiple-remove-button");
    var emailId = document.querySelector("#exampleEmailId").value;
    var Phoneno = document.querySelector("#PhoneNo").value;

    var preview = document.querySelector(".user-profile-image");

    var empimg = '';

    if (!preview) {
        empimg = "<div class='avatar-lg mx-auto img-thumbnail rounded-circle'>\
            <span class='avatar-title rounded-circle fs-4 bg-soft-primary text-primary'>\
            " + employeeName[0] + "\
            </span>\
        </div>";
    } else {
        var employeeimg = document.querySelector("#userProfileImage").getAttribute('src');
        empimg = '<img src="' + employeeimg + '" class="avatar-lg img-fluid rounded-circle employee-image" data-type="image" alt="user-image">';
    }

    var taskassignee = new Array();

    var src = "";

    var i;

    for (i = selectbox.options.length - 1; i >= 0; i--) {
        taskassignee.push(selectbox[i].value);
    }

    for (i = 0; i < taskassignee.length; i++) {
        src =
            src + '<span class="badge badge-soft-secondary p-2">' +
            taskassignee[i] +
            '</span> ';
    }

    updateEmployee = '<div class="card">\
      <div class="card-body">\
          <div class="text-end">\
              <div class="dropdown">\
                  <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                      <i class="mdi mdi-dots-horizontal"></i>\
                  </a>\
                  <div class="dropdown-menu dropdown-menu-end">\
                      <a class="dropdown-item text-primary" href="javascript: void(0);" data-bs-toggle="modal" data-bs-target=".bs-example-edit-employee" onclick="editProjects(`' + updateid + '`)">\
                          <i class="mdi mdi-file-document-edit-outline me-2"></i>Edit</a>\
                      <a class="dropdown-item text-danger delete-item" onclick="deleteEmployee(`' + updateid + '`)" href="javascript: void(0);"><i class="mdi mdi-trash-can-outline me-2"></i>Remove</a>\
                  </div>\
              </div>\
          </div>\
          <div class="text-center">\
              ' + empimg + '\
              <h6 class="font-size-15 mt-3 mb-1"><a href="user-profile.html" class="text-primary employee-name">' + employeeName + '</a></h6>\
              <p class="text-muted mb-0 font-size-12 fw-medium employee-designation">' + employeePosition + '</p>\
          </div>\
          <div class="d-flex flex-wrap gap-2 mt-3 justify-content-center">\
              <div>\
                  <p class="text-muted fw-medium mb-0">Tag :</p>\
              </div>\
              <div class="employee-tags d-flex flex-wrap gap-1">\
                  ' + src + ' \
              </div>\
          </div>\
      </div>\
      <div class="card-footer p-0">\
          <div class="row g-0">\
              <div class="col-6">\
                  <div class="text-center border-end p-3">\
                      <h6 class="font-size-14 mb-0">\
                          <a href="javascript: void(0);" class="text-muted employee-email" data-bs-toggle="tooltip" data-bs-placement="top" title="' + emailId + '" aria-describedly="descriptionClose">\
                              <i class="mdi mdi-email-outline align-middle me-2"></i>E-mail\
                          </a>\
                      </h6>\
                  </div>\
              </div>\
              <div class="col-6">\
                  <div class="text-center p-3">\
                      <h6 class="font-size-14 text-muted mb-0">\
                          <a href="javascript: void(0);" class="text-muted employee-phoneno" data-bs-toggle="tooltip" data-bs-placement="top" title="' + Phoneno + '" aria-describedly="descriptionClose">\
                              <i class="mdi mdi-phone-outline align-middle me-2"></i>Phone\
                          </a>\
                      </h6>\
                  </div>\
              </div>\
          </div>\
      </div>\
    </div>';

    document.getElementById(newid).innerHTML = updateEmployee;

    var link = document.getElementById("update-emplyoee");

    link.click();

    document.getElementById("NewtaskForm").reset();

    itemid++;
    // document.querySelector('.user-profile').innerHTML = '<img src="assets/images/users/avatar-1.jpg" id="userProfileImage" class="rounded-circle avatar-xl img-thumbnail user-profile-image" alt="user-profile-image">';
});

document.getElementById("addtask").addEventListener("click", function () {

    var newid = 'employee-items-' + itemid;
    var employeeName = document.querySelector("#employeeName").value;
    var employeePosition = document.querySelector("#employeePosition").value;
    var selectbox = document.querySelector("#choices-multiple-remove-button");
    var emailId = document.querySelector("#exampleEmailId").value;
    var Phoneno = document.querySelector("#PhoneNo").value;
    // var employeeimg = document.querySelector("#userProfileImage").getAttribute('src');

    var taskassignee = new Array();

    if (document.querySelector("#profile-img-file-input").files.length != 0 || document.querySelector("#profile-img-file-input").files.length != 0) {
        var employeeimg = document.querySelector("#userProfileImage").getAttribute('src');
        var employeeimg = '<img src="' + employeeimg + '" class="avatar-lg img-fluid rounded-circle employee-image" data-type="image" alt="user-image">';
    } else {
        var employeeimg = "";
    }

    var src = "";

    var i;

    for (i = selectbox.options.length - 1; i >= 0; i--) {
        taskassignee.push(selectbox[i].value);
    }

    for (i = 0; i < taskassignee.length; i++) {
        src =
            src + '<span class="badge badge-soft-secondary p-2">' +
            taskassignee[i] +
            '</span> ';
    }

    if (employeeimg === "" || employeeimg === null) {
        newemployee = '<div class="col-xl-3 col-md-6 employee-item" id="' + newid + '">\
        <div class="card">\
            <div class="card-body">\
                <div class="text-end">\
                    <div class="dropdown">\
                        <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                            <i class="mdi mdi-dots-horizontal"></i>\
                        </a>\
                       <div class="dropdown-menu dropdown-menu-end">\
                            <a class="dropdown-item text-primary" href="javascript: void(0);" data-bs-toggle="modal" data-bs-target=".bs-example-edit-employee" onclick="editProjects(`' + newid + '`)">\
                                <i class="mdi mdi-file-document-edit-outline me-2"></i>Edit</a>\
                            <a class="dropdown-item text-danger delete-item" onclick="deleteEmployee(`' + newid + '`)" href="javascript: void(0);"><i class="mdi mdi-trash-can-outline me-2"></i>Remove</a>\
                        </div>\
                    </div>\
                </div>\
               <div class="text-center">\
                    <div class="employee-image" data-type="text">\
                        <div class="avatar-lg mx-auto">\
                            <span class="avatar-title rounded-circle fs-4 bg-soft-primary text-primary">\
                                ' + employeeName[0] + '\
                            </span>\
                        </div>\
                    </div>\
                    <h6 class="font-size-15 mt-3 mb-1"><a href="user-profile.html" class="text-primary employee-name">' + employeeName + '</a></h6>\
                    <p class="text-muted mb-0 font-size-12 fw-medium employee-designation">' + employeePosition + '</p>\
                </div>\
                <div class="d-flex flex-wrap gap-2 mt-3 justify-content-center">\
                    <div>\
                        <p class="text-muted fw-medium mb-0">Tag :</p>\
                    </div>\
                    <div class="employee-tags d-flex flex-wrap gap-1">\
                        ' + src + ' \
                    </div>\
                </div>\
            </div>\
            <div class="card-footer p-0">\
                <div class="row g-0">\
                    <div class="col-6">\
                        <div class="text-center border-end p-3">\
                            <h6 class="font-size-14 mb-0">\
                                <a href="javascript: void(0);" class="text-muted employee-email" data-bs-toggle="tooltip" data-bs-placement="top" title="' + emailId + '">\
                                    <i class="mdi mdi-email-outline align-middle me-2"></i>E-mail\
                                </a>\
                            </h6>\
                        </div>\
                    </div>\
                    <div class="col-6">\
                        <div class="text-center p-3">\
                            <h6 class="font-size-14 text-muted mb-0">\
                                <a href="javascript: void(0);" class="text-muted employee-phoneno" data-bs-toggle="tooltip" data-bs-placement="top" title="' + Phoneno + '" data-bs-original-title="' + Phoneno + '" aria-described="descriptionClose">\
                                    <i class="mdi mdi-phone-outline align-middle me-2"></i>Phone\
                                </a>\
                            </h6>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';
    } else {
        newemployee = '<div class="col-xl-3 col-md-6 employee-item" id="' + newid + '">\
        <div class="card">\
            <div class="card-body">\
                <div class="text-end">\
                    <div class="dropdown">\
                        <a href="#" class="dropdown-toggle font-size-16 text-muted" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
                            <i class="mdi mdi-dots-horizontal"></i>\
                        </a>\
                       <div class="dropdown-menu dropdown-menu-end">\
                            <a class="dropdown-item text-primary" href="javascript: void(0);" data-bs-toggle="modal" data-bs-target=".bs-example-edit-employee" onclick="editProjects(`' + newid + '`)">\
                                <i class="mdi mdi-file-document-edit-outline me-2"></i>Edit</a>\
                            <a class="dropdown-item text-danger delete-item" onclick="deleteEmployee(`' + newid + '`)" href="javascript: void(0);"><i class="mdi mdi-trash-can-outline me-2"></i>Remove</a>\
                        </div>\
                    </div>\
                </div>\
               <div class="text-center">\
                   ' + employeeimg + '\
                    <h6 class="font-size-15 mt-3 mb-1"><a href="user-profile.html" class="text-primary employee-name">' + employeeName + '</a></h6>\
                    <p class="text-muted mb-0 font-size-12 fw-medium employee-designation">' + employeePosition + '</p>\
                </div>\
                <div class="d-flex flex-wrap gap-2 mt-3 justify-content-center">\
                    <div>\
                        <p class="text-muted fw-medium mb-0">Tag :</p>\
                    </div>\
                    <div class="employee-tags d-flex flex-wrap gap-1">\
                        ' + src + ' \
                    </div>\
                </div>\
            </div>\
            <div class="card-footer p-0">\
                <div class="row g-0">\
                    <div class="col-6">\
                        <div class="text-center border-end p-3">\
                            <h6 class="font-size-14 mb-0">\
                                <a href="javascript: void(0);" class="text-muted employee-email" data-bs-toggle="tooltip" data-bs-placement="top" title="' + emailId + '">\
                                    <i class="mdi mdi-email-outline align-middle me-2"></i>E-mail\
                                </a>\
                            </h6>\
                        </div>\
                    </div>\
                    <div class="col-6">\
                        <div class="text-center p-3">\
                            <h6 class="font-size-14 text-muted mb-0">\
                                <a href="javascript: void(0);" class="text-muted employee-phoneno" data-bs-toggle="tooltip" data-bs-placement="top" title="' + Phoneno + '" data-bs-original-title="' + Phoneno + '" aria-described="descriptionClose">\
                                    <i class="mdi mdi-phone-outline align-middle me-2"></i>Phone\
                                </a>\
                            </h6>\
                        </div>\
                    </div>\
                </div>\
            </div>\
        </div>\
    </div>';

    }


    var subTask = document.querySelectorAll("#employee-items")[0];

    subTask.insertAdjacentHTML("afterbegin", newemployee);

    var link = document.getElementById("update-emplyoee");

    link.click();
    document.getElementById("NewtaskForm").reset();

    itemid++;

});

// Search team

function searchEmployee() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search-employee");
    filter = input.value.toLowerCase();
    ul = document.getElementById("employee-items");
    li = ul.querySelectorAll(".employee-item");
    for (i = 0; i < li.length; i++) {
        a = li[i].querySelector(".employee-name");
        txtValue = a.textContent || a.innerText;
        if (txtValue.toLowerCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}