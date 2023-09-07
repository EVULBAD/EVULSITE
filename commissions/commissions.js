//js for file uploading on the form page.
function uploadFile(target) {
  if (target.files.length > 3) {
    alert("you many only upload up to 3 files.");
  } else if (target.files.length <= 1) {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " file selected.";
  } else  {
    document.getElementById("file-count").innerHTML = " " + target.files.length + " files selected.";
  }
}

//background size adjuster thanks to perttu on stack overflow.
//keeps the scrollbar from resizing the bg, because i'm a tightass about stuff like that.
fixBackgroundSizeCover = function(event) {
  let bgImageWidth = 1920,
    bgImageHeight = 1080,
    bgImageRatio = bgImageWidth / bgImageHeight,
    windowSizeRatio = window.innerWidth / window.innerHeight;

  if (bgImageRatio > windowSizeRatio) {
    document.getElementById("twod").style.backgroundSize = 'auto 100vh';
    document.getElementById("threed").style.backgroundSize = 'auto 100vh';
  } else {
    document.getElementById("twod").style.backgroundSize = '100vw auto';
    document.getElementById("threed").style.backgroundSize = '100vw auto';
  }
};
  
fixBackgroundSizeCover();

window.addEventListener('resize', fixBackgroundSizeCover());