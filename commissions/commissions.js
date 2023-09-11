//declarations.
let bodyClass,
  currentURL,
  prevURL = document.referrer,
  clickedBtn;

//STANDALONE FUNCTIONS:
//self-explanatory. gets current url.
function currentURLFinder() {
  return window.location.href;
}

//saving values of clicked links.
const btns = document.querySelectorAll(".btn");
for (const btn of btns) {
  btn.addEventListener("click", function() {
    clickedBtn = btn.id;
    return clickedBtn;
  });
}

//background size adjuster thanks to perttu on stack overflow. very slightly adjusted to suit my needs.
//keeps the scrollbar from resizing the bg, because i"m a tightass about stuff like that.
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
  } else if (target.files.length <= 1) {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " file selected.";
  } else if (target.files.length = 0) {
    "no more than 3 files may be uploaded.";
  } else {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " files selected.";
  }
}

//ACTUAL WORK:
//intializing page by getting current url.
currentURL = currentURLFinder();

//
if (currentURL.indexOf("2d") != -1) {
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("twod")
  });
} else if (currentURL.indexOf("3d") != -1) {
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("threed")
  });
} else {
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("threed")
  });
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", function(e) {
    fixBackgroundSizeCover("twod")
  });
}

//jQuery for smoothState.
(function ($) {
  "use strict";
  $(document).ready(function () {
    let $body = $("body"),
      $main = $("#main"),
      $site = $("html, body"),
      transition;
    $main.smoothState({
      onBefore: function($anchor, $container) {
        let current = $("[data-viewport]").first().data("viewport"),
          target = $anchor.data("target");
        currentURL = currentURLFinder();
        current = current ? current : 0;
        target = target ? target : 0;
        //console.log("current: " + current)
        //console.log("target: " + target)
        //console.log("current URL: " + currentURL)
        if (current < target) {
          if (currentURL.indexOf("3d") === -1 && currentURL.indexOf("2d") === -1) {
            $("#" + clickedBtn).addClass("full-width");
            transition = "from-right";
          } else {
            transition = "from-right";
          }
        } else if (current > target){
          transition = "from-left";
        } else {
          transition = "none";
        }
      },
      onStart: {
        duration: 400,
        render: function(url, $container) {
          $main.attr("data-transition", transition);
          $main.addClass("is-exiting");
        }
      },
      onReady: {
        duration: 0,
        render: function($container, $newContent) {
          $site.animate({scrollTop: 0});
          $container.html($newContent);
          $container.removeClass("is-exiting");
        }
      },
      }).data("smoothState");
  });
}(jQuery));