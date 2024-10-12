Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("#myDropzone", {
    paramName: "file", // The name that will be used to transfer the file
    maxFiles: 10,
    maxFilesize: 10, // MB
    addRemoveLinks: false,
    previewsContainer: ".dropzone-previews",
    previewTemplate: document.querySelector('#uploadPreviewTemplate').innerHTML,
    getPreviewIcon: true,
});