//ambience.
/*let ambience = new Audio("sounds/ambience.mp3");
window.onload = function() {
    ambience.loop=true;
    ambience.play();
};*/

//overlay resizer.
let overlayRef = document.querySelector(".animate img");
const overlay = document.getElementById("overlay");
let overlayWidth = overlayRef.getBoundingClientRect().width;
let overlayHeight = overlayRef.getBoundingClientRect().height;
overlay.style.width = overlayWidth + "px"; overlay.style.height = overlayHeight + "px";
window.addEventListener("resize", function(){
    overlayRef = document.querySelector(".animate img");
    overlayWidth = overlayRef.getBoundingClientRect().width;
    overlayHeight = overlayRef.getBoundingClientRect().height;
    overlay.style.width = overlayWidth + "px"; overlay.style.height = overlayHeight + "px";
    }
)

//declaration of cursor-following text box.
function cursorPal(e) {
    textbox.style.left = e.pageX + "px"; textbox.style.top = e.pageY + "px";
}

//animation.
let button = document.querySelector(".button");
let timer;
button.addEventListener("click",(e)=>{
    let aniName = e.target.classList[1];
    let frameCount = (document.getElementById(aniName).children.length)-1;
    let aniFrames = document.getElementById(aniName);
    let startFrame = aniFrames.firstElementChild;
    let nextFrame = startFrame.nextElementSibling;
    clearTimeout(timer);
    startFrame.classList.add("hidden"); startFrame.classList.remove("current");
    nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
    let currentFrame = nextFrame;
    nextFrame = nextFrame.nextElementSibling;
    for (let i=1; i<=(frameCount-1); i++) {
        setTimeout(function() {
            currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
            nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
            currentFrame = nextFrame;
            nextFrame = nextFrame.nextElementSibling;
        },(41.7*i));
    }
    setTimeout(function() {
        currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
        startFrame.classList.remove("hidden"); startFrame.classList.add("current");
        currentFrame = nextFrame;
    },(41.7*frameCount));
    //button audio.
    let audio = new Audio("sounds/" + aniName + ".wav"); audio.play();
    //activation of cursor-following text box w/ click.
    const textbox = document.getElementById("textbox");
    textbox.style.left = e.pageX + "px"; textbox.style.top = e.pageY + "px";
    textbox.classList.remove("hidden");
    document.addEventListener("mousemove", cursorPal);
    timer = setTimeout(function() {
        textbox.classList.add("hidden");
        document.removeEventListener("mousemove",cursorPal);
    },5000)
});
document.removeEventListener("mousemove",cursorPal);