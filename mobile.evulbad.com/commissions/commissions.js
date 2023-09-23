//DECLARATIONS:
let bodyClass,
  currentURL,
  prevURL = document.referrer,
  clickedBtn;

//STANDALONE FUNCTIONS:
//gets current url.
function currentURLFinder() {
  return window.location.href;
}

//finds btns and saves id of whichever btn is clicked.
function buttonListener(){
  const btns = document.querySelectorAll(".btn");
  for (const btn of btns) {
    btn.addEventListener("click", function() {
      clickedBtn = btn.id;
      //console.log(clickedBtn);
    });
  }
}

//background size adjuster thanks to perttu on stack overflow. very slightly adjusted to suit my needs.
//keeps the scrollbar from resizing the bg, because i"m a tightass about stuff like that.
function fixBackgroundSizeCover(value) {
  let bgImageWidth = 1920,
    bgImageHeight = 1080,
    bgImageRatio = bgImageWidth / bgImageHeight,
    windowSizeRatio = window.innerWidth / window.innerHeight;

  if (document.getElementById(value) != null && bgImageRatio > windowSizeRatio) {
    document.getElementById(value).style.backgroundSize = "auto 100vh";
  } else if (document.getElementById(value) != null && bgImageRatio < windowSizeRatio) {
    document.getElementById(value).style.backgroundSize = "100vw auto";
  } else {
    return;
  }

  //console.log("resize bg has run");
};

//function that figures out which elements to slap fixBackgroundSizeCover onto.
function fixBackgroundElements() {
  fixBackgroundSizeCover("threed");
  window.addEventListener("resize", (e) => {
    fixBackgroundSizeCover("threed")
  });
  fixBackgroundSizeCover("twod");
  window.addEventListener("resize", (e) => {
    fixBackgroundSizeCover("twod")
  });
}

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

//function to run when smooth state is exiting so that i'm not copy-pasting the same text over and over again.
function smoothStateIsExiting($container, $newContent) {
  $container.removeClass("is-exiting");
  $container.html($newContent);
  clickedBtn = null;
  fixBackgroundElements();
  buttonListener();
}

//set of functions to run everytime the window loads.
function onLoadFunctions() {
  currentURL = currentURLFinder();
  //commented out while i work on mobile SA.redirection_mobile();
  buttonListener();
  fixBackgroundElements();
}


//ACTUAL WORK:
//intializing page by getting current url and listening for buttons.
window.onload = onLoadFunctions;

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
          target = $anchor.data("target"),
        currentURL = currentURLFinder();
        current = current ? current : 0;
        target = target ? target : 0;
        if (current < target) {
          if (currentURL.indexOf("3d") === -1 && currentURL.indexOf("2d") === -1) {
            $("#" + clickedBtn).addClass("full-width");
          }
          transition = "from-right";
        } else if (current > target){
          if (currentURL.indexOf("3d") === -1 && currentURL.indexOf("2d") === -1) {
            $("#" + clickedBtn).addClass("full-width");
          }
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
          if (clickedBtn === "toindex") {
            $body.css("overflow", "hidden");
            $(".full-width").removeClass("full-width");
            setTimeout(function(){
              smoothStateIsExiting($container, $newContent);
              $body.css("overflow", "");
            }, 400)
          } else if (clickedBtn === "totwod") {
            $(".full-width").removeClass("full-width");
            $("#twod").addClass("full-width");
            setTimeout(function(){
              smoothStateIsExiting($container, $newContent);
            }, 400)
          } else if (clickedBtn === "tothreed") {
            $(".full-width").removeClass("full-width");
            $("#threed").addClass("full-width");
            setTimeout(function(){
              smoothStateIsExiting($container, $newContent);
            }, 400)
          } else {
            smoothStateIsExiting($container, $newContent)
          }
        }
      },

      onAfter: function() {
        fixBackgroundElements();
        currentURL = currentURLFinder();
      }
    }).data("smoothState");
  });
}(jQuery));