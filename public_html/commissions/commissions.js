//DECLARATIONS:
let bodyClass,
  currentURL,
  prevURL = document.referrer,
  clickedBtn,
  monthNames = ["January", "February", "March", "April", "May","June","July", "August", "September", "October", "November","December"],
  todaysDate = new Date(),
  twoDays = new Date(),
  month,
  day,
  year,
  displayDate,
  result,
  script;

//setting the date that will display on the form success page.
result = twoDays.setDate(todaysDate.getDate() + 2);
day = twoDays.getDate();
month = monthNames[twoDays.getMonth()];
year = twoDays.getFullYear();
displayDate = month + " " + day + ", " + year;

//STANDALONE FUNCTIONS:
//gets current url.
function currentURLFinder() {
  return window.location.href;
}

//finds btns, saves id of whichever btn is clicked, and performs function depending on classlist of btn.
function buttonListener(){
  const btns = document.querySelectorAll(".btn");
  let classes, current, target;
  for (const btn of btns) {
    btn.addEventListener("click", function() {
      clickedBtn = btn.id;
      classes = btn.classList;
      if (classes.contains("closeModal") != false) {
        closeModal();
      } else if (classes.contains("slideSwap") != false) {
        current = parseInt(btn.getAttribute("data-viewport")),
        target = parseInt(btn.getAttribute("data-target"));
        plusMatchingDivs(target, current);
      } else if (classes.contains("currentSlide") != false) {
        current = parseInt(btn.getAttribute("data-viewport")),
        target = parseInt(btn.getAttribute("data-target"));
        currentSlide(current, target);
      } else if (clickedBtn === "submit") {
        document.getElementById(clickedBtn).innerHTML = "SENDING...";
        submitForm();
      }
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

//function to run when smooth state is exiting so that i'm not copy-pasting the same text over and over again.
function smoothStateIsExiting($container, $newContent) {
  $container.removeClass("is-exiting");
  $container.html($newContent);
  clickedBtn = null;
  fixBackgroundElements();
  buttonListener();
}

//function that adds a mousemove event to add and remove some classes.
function removeHalfWidth() {
  document.addEventListener("mousemove", (e) => {
    $(".half-width").removeClass("half-width");
    $("#twod").addClass("hover"); $("#threed").addClass("hover");
  }, {once: true});
}

//SLIDESHOW FUNCTIONS:
//declarations.
let slideIndex = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
slideId = ["bustSlides", "halfbodySlides", "fullbodySlides", "bustModal", "halfbodyModal", "fullbodyModal", "lowpolySlides", "highpolySlides", "lowpolyModal", "highpolyModal"];

//functions.
function showDivs(n, id) {
  let currentSlideshow = document.getElementsByClassName(slideId[id]);
  if (n > currentSlideshow.length) {
    slideIndex[id] = 1;
  } else if (n < 1) {
    slideIndex[id] = currentSlideshow.length;
  }
  for (i = 0; i < currentSlideshow.length; i++) {
    currentSlideshow[i].style.display = "none";
  }
  currentSlideshow[slideIndex[id] - 1].style.display = "block";
}

function plusDivs(n, id) {
  showDivs(slideIndex[id] += n, id);
}

function plusMatchingDivs(n, id) {
  let array = returnMatchingSlideshows(id);
  for (i in array) {
    plusDivs(n, array[i]);
  }
}

function currentSlide(n, id) {
  showDivs(slideIndex[id] = n, id);
  openSelectModal(id);
  openModal();
}

function openModal() {
  document.getElementsByTagName("modal")[0].style.display = "block";
  setTimeout(() => {
    document.getElementsByTagName("modal")[0].style.opacity = "1";
  }, 100);
}

function closeModal() {
  let elements = document.querySelectorAll('[id*="Modal"]');
  document.getElementsByTagName("modal")[0].style.opacity = "0";
  setTimeout(() => {
    document.getElementsByTagName("modal")[0].style.display = "none";
    for (i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }
  }, 300);
}

function openSelectModal(id) {
  let array = returnMatchingSlideshows(id),
    modal = slideId[array[1]];
  document.getElementById(modal).style.display = "block";
}

function returnMatchingSlideshows(id) {
  let currentGroup = slideId[id],
    indexOfSlides,
    indexOfModal,
    array = [];
  if (currentGroup.indexOf("Slides") != -1) {
    currentGroup = currentGroup.replace("Slides", "");
  } else {
    currentGroup = currentGroup.replace("Modal", "");
  }
  indexOfSlides = slideId.indexOf(currentGroup + "Slides");
  indexOfModal = slideId.indexOf(currentGroup + "Modal");
  array.push(indexOfSlides); array.push(indexOfModal);
  return array;
}

//FORM FUNCTIONS:
//declarations.
let form = document.getElementById("form"),
  submitButton = document.getElementById("submit"),
  fileSizeLarge = false,
  wrongFileType = false;

//function for file uploading on the form page. implements limitations to user uploads.
function uploadFile(target) {
  let fileSize,
    fileMb,
    fileName,
    filesExceedMax = [],
    filesWrongType = [],
    rejected = false,
    imageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'],
    errorArray = [];

  for (var i = 0; i < target.files.length; i++) {
    fileName = target.files.item(i).name;
    fileSize = target.files.item(i).size;
    fileType = target.files.item(i).type;
    fileMb = fileSize / 1024 ** 2;
    if (fileMb > 10) {
      filesExceedMax += fileName + ", ";
      filesExceedMax[filesExceedMax.length - 1] = filesExceedMax[filesExceedMax.length - 1].replace(", ", "")
    } else if (!imageTypes.includes(fileType)) {
      filesWrongType += fileName + ", ";
      filesWrongType[filesWrongType.length - 1] = filesWrongType[filesWrongType.length - 1].replace(", ", "")
    }
  }

  if (filesExceedMax.length >= 1) {
    errorArray.push("file(s) listed larger than maximum 10mb: " + filesExceedMax);
    document.getElementById("file-count").value = "";
    document.getElementById("file-count").innerHTML = " up to 3 files no larger than 10mb each.";
    rejected = true;
    fileSizeLarge = true;
  } else if (filesWrongType.length >= 1) {
    errorArray.push("file(s) listed are not png/jpg/gif: " + filesWrongType);
    document.getElementById("file-count").value = "";
    document.getElementById("file-count").innerHTML = " up to 3 files no larger than 10mb each.";
    rejected = true;
    wrongFileType = true;
  } else if (target.files.length > 3) {
    errorArray.push("more than 3 files selected; you may only upload up to 3 files total");
    document.getElementById("file-count").value = "";
    document.getElementById("file-count").innerHTML = " up to 3 files no larger than 10mb each.";
    rejected = true;
  } else {
    fileSizeLarge = false;
    wrongFileType = false;
  }

  if (rejected === true) {
    alertMessage = "file upload unsuccessful. following errors detected:\n";
    for (i = 0; i < errorArray.length; i++) {
      alertMessage += "\n-" + errorArray[i];
    }
    alertMessage += "\n\nplease try again.";
    alert(alertMessage);
  } else if (target.files.length === 1 && rejected === false) {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " file selected."
  } else if (rejected === false) {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " files selected."
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

  if (uploadFiles > 3) {
    errorArray.push("file count exceeds maximum of 3")
  }

  if (fileSizeLarge) {
    errorArray.push("file(s) in upload exceeds maximum of 10mb")
  }

  if (wrongFileType) {
    errorArray.push("file(s) in upload are not png/jpg/gif")
  }

  if (tosValue === false) {
    errorArray.push("terms of service unchecked")
  }

  return errorArray;
}

//function for form submission.
function submitForm() {
  $("#form").submit(function(e){
    openModal();
    e.preventDefault();
    e.stopImmediatePropagation();
    $form = $(this);
    let alertMessage,
      errorArray;
  
    $.ajax({
      type: "POST",
      url: 'mailer.php',
      data: new FormData( this ),
      processData: false,
      contentType: false,
      success: function() {
        window.location = "success.html";
      },
      error: function() {
        closeModal();
        alertMessage = "form submission unsuccessful. following errors detected:\n";
        errorArray = formErrors();
        for (i = 0; i < errorArray.length; i++) {
          alertMessage += "\n-" + errorArray[i];
        }
        alertMessage += "\n\nplease double check that the form is filled out correctly and try again.";
        alert(alertMessage);
        document.getElementById("submit").innerHTML = "SUBMIT";
      }
    });
  });
}

//INITIALIZATION AND ANIMATIONS:
//set of functions to run everytime the window loads.
function onLoadFunctions() {
  currentURL = currentURLFinder();
  //commented out while i work on SA.redirection_mobile();
  buttonListener();
  fixBackgroundElements();
  removeHalfWidth();
}

//intializing page by getting current url and listening for buttons.
if (document.getElementsByClassName("form_result").length > 0) {
  document.getElementById("displayDate").innerHTML = displayDate;
} else {
  onLoadFunctions();

  //jQuery for smoothState.
  (function ($) {
    "use strict";
    $(document).ready(function () {
      let $body = $("body"),
        $main = $("#main"),
        $site = $("html, body"),
        transition;
      $main.smoothState({
        blacklist: '.no-smoothState',
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
                removeHalfWidth();
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
}