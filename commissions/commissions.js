//declaration.
let bodyClass,
  currentURL,
  pageType = null,
  prevURL = document.referrer;

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

  //console.log("resize bg has run");
};

//function that delays loading a new page when a link is clicked.
function delay(url) {
  setTimeout(function() {
    window.location = url
  }, 1000);
}

//figuring out the current url.
if (document.body.classList.contains("twod") === true) {
  currentURL = "twod";
  pageType = document.body.classList[0];
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("twod")
  });
} else if (document.body.classList.contains("threed") === true) {
  currentURL = "threed";
  pageType = document.body.classList[0];
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("threed")
  });
} else {
  currentURL = "index";
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("threed")
  });
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("twod")
  });
}

//figuring out the previous url.
if (prevURL.indexOf("/commissions/index") != -1) {
  prevURL = "index"
} else if (prevURL.indexOf("/commissions/3d") != -1) {
  prevURL = "3d info"
} if (prevURL.indexOf("/commissions/3d-form") != -1) {
  prevURL = "3d form"
}

console.log("previous url: " + prevURL)
console.log("current url: " + currentURL)

//usings the buttons.
const btns = document.querySelectorAll('.btn');
for (const btn of btns) {
  btn.addEventListener("click", function() {
    let clickedBtn = btn.id,
      content = document.querySelectorAll("content.leftright")[0],
      leftNav = document.querySelectorAll("nav.left.leftright")[0],
      rightNav = document.querySelectorAll("nav.right.leftright")[0],
      jumpNav = document.querySelectorAll("jump.updown")[0];
    if (currentURL === "index") {
      if (clickedBtn === "twod" || clickedBtn === "threed") {
        console.log("loading url: " + clickedBtn)
        btn.classList.add("full-width");
      }
    } else if (currentURL === "threed") {
      if (clickedBtn === "toform") {
        console.log("loading url: 3d form")
        content.classList.add("to-left");
        rightNav.classList.add("to-left");
        jumpNav.classList.add("to-top");
      } else if (clickedBtn === "toinfo") {
        console.log("3d, form to info")
        content.classList.add("to-right");
      } else if (clickedBtn === "toindex") {
        console.log("3d, info to index");
        content.classList.add("to-right");
        rightNav.classList.add("to-right");
        leftNav.classList.add("to-right");
        jumpNav.classList.add("to-top");
      }
    }
  });
}