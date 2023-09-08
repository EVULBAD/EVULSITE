//declaration.
let bodyClass;

//js for file uploading on the form page. implements limitations to user uploads.
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
  } else if (target.files.length <= 1) {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " file selected.";
  } else if (target.files.length = 0) {
    "no more than 3 files may be uploaded.";
  } else {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " files selected.";
  }
}

//background size adjuster thanks to perttu on stack overflow. very slightly adjusted to suit my needs.
//keeps the scrollbar from resizing the bg, because i'm a tightass about stuff like that.
function fixBackgroundSizeCover(bodyClass) {
  let bgImageWidth = 1920,
    bgImageHeight = 1080,
    bgImageRatio = bgImageWidth / bgImageHeight,
    windowSizeRatio = window.innerWidth / window.innerHeight;

  if (bgImageRatio > windowSizeRatio) {
    document.getElementById(bodyClass).style.backgroundSize = "auto 100vh";
  } else {
    document.getElementById(bodyClass).style.backgroundSize = "100vw auto";
  }

  console.log("resize bg has run");
};

if (document.body.classList.contains("twod") === true) {
  console.log("twod")
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("twod")
  });
} else if (document.body.classList.contains("threed") === true) {
  console.log("threed")
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("threed")
  });
} else {
  console.log("index")
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("threed")
  });
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("twod")
  });
}