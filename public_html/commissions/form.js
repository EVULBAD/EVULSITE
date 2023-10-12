//FORM FUNCTIONS:
let form = document.getElementById("form"),
  submitButton = document.getElementById("submit");

//function for file uploading on the form page. implements limitations to user uploads.
function uploadFile(target) {
  let fileSize,
    fileMb,
    fileName,
    fileRejects = [];

  for (var i = 0; i < target.files.length; i++) {
    fileName = target.files.item(i).name;
    fileSize = target.files.item(i).size;
    fileMb = fileSize / 1024 ** 2;
    if (fileMb > 10) {
      fileRejects += fileName + "\n";
      fileRejects[fileRejects.length - 1] = fileRejects[fileRejects.length - 1].replace("\n", "")
    }
  }

  if (fileRejects.length >= 1) {
    alert("maximum file size is 10mb. files listed below exceed maximum file size:\n" + fileRejects)
  } else if (target.files.length > 3) {
    alert("you may only upload up to 3 files.");
  } else if (target.files.length === 1) {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " file selected.";
  } else if (target.files.length === 0) {
    "no more than 3 files may be uploaded.";
  } else {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " files selected.";
  }
}

//function to edit the button when form is sending an email.
form.addEventListener("submit", (e) => {
  submitButton.innerHTML = "SENDING...";
});