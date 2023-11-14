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
  result;

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
        plusDivs(target, current);
      } else if (classes.contains("currentSlide") != false) {
        current = parseInt(btn.getAttribute("data-viewport")),
        target = parseInt(btn.getAttribute("data-target"));
        currentSlide(target, current);
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

//set of functions to run everytime the window loads.
function onLoadFunctions() {
  currentURL = currentURLFinder();
  //commented out while i work on SA.redirection_mobile();
  buttonListener();
  fixBackgroundElements();
  removeHalfWidth();
}

/*LIGHTBOX FUNCTIONS*/
//declarations.
let slideIndex = [1, 1, 1, 1, 1],
slideId = ["bustModal", "halfbodyModal", "fullbodyModal", "lowpolyModal", "highpolyModal"];

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

function currentSlide(n, id) {
  showDivs(slideIndex[id] = n, id);
  openSelectModal(id);
  openModal();
}

function openModal() {
  document.getElementsByTagName("modal")[0].style.display = "block";
}

function closeModal() {
  let elements = document.querySelectorAll('[id*="Modal"]');
  document.getElementsByTagName("modal")[0].style.display = "none";
  for (i = 0; i < elements.length; i++) {
    elements[i].style.display = "none";
  }
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

//INITIALIZATION AND ANIMATIONS:
//intializing page by getting current url and listening for buttons.
if (document.getElementsByClassName("form_result").length > 0) {
  document.getElementById("displayDate").innerHTML = displayDate;
} else {
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
            $("logo").addClass("hide"); $("footer").addClass("hide");
            $("#" + clickedBtn).addClass("full-width");
            transition = "from-bottom";
          } else if (current > target){
            $("logo").addClass("hide"); $("footer").addClass("hide");
            $("#" + clickedBtn).addClass("full-width");
            transition = "from-top";
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
              $("logo").removeClass("hide"); $("footer").removeClass("hide");
              $(".full-width").removeClass("full-width");
              $("a#threed").addClass("half-width");
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
}