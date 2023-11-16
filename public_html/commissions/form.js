//FORM FUNCTIONS:
//declarations.
let form = document.getElementById("form"),
  submitButton = document.getElementById("submit"),
  valueName;

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

//function to read a value from the form.
function formReader(valueName) {
  return document.getElementById(valueName).value;
}

//function that uses formReader() to determine why a form may have an error.
function formErrors() {
  let emailValue = formReader("email"),
    uploadFiles = document.getElementById("files").files.length,
    refUrls = formReader("urls"),
    tosValue = document.querySelector(".tos").checked,
    errorArray = [];

  if (!emailValue) {
    errorArray.push("email field is empty")
  }

  if (uploadFiles === 0 && !refUrls) {
    errorArray.push("no references attached")
  }

  if (tosValue === false) {
    errorArray.push("terms of service unchecked")
  }

  return errorArray;
}

//functions for form submission.
$(form).submit(function(e){
  e.preventDefault();
  $form = $(this);
  let alertMessage,
    errorArray;

  submitButton.innerHTML = "SENDING...";

  $.ajax({
    type: "POST",
    url: 'mailer.php',
    data: $form.serialize(),
    dataType: "html",
    success: function() {
      window.location = "success.html";
    },
    error: function() {
      submitButton.innerHTML = "SUBMIT";
      alertMessage = "form submission unsuccessful. following errors detected:\n";
      errorArray = formErrors();
      for (i = 0; i < errorArray.length; i++) {
        alertMessage += "\n-" + errorArray[i];
      }
      alertMessage += "\n\nplease double check that the form is filled out correctly and try again.";
      alert(alertMessage);
    }
  });
});