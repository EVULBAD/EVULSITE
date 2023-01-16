//ambience.
/*let ambience = new Audio("sounds/ambience.mp3");
window.onload = function() {
    ambience.loop=true;
    ambience.play();
};*/

//animation.
let button = document.querySelector(".button");
let timer;
button.addEventListener("click",(e)=>{
    let aniName = e.target.classList[1];
    let frameCount = (document.getElementById(aniName).children.length)-3;
    let aniFrames = document.getElementById(aniName);
    let startFrame = aniFrames.firstElementChild.nextElementSibling.nextElementSibling.nextElementSibling;
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
    let audio = new Audio("sounds/" + aniName + ".mp3"); audio.play();
    //cursor-following text box.
    function cursorPal(e) {
        textbox.style.left = e.pageX + "px"; textbox.style.top = e.pageY + "px";
    }
    let textbox = document.getElementById("textbox");
    textbox.style.left = e.pageX + "px"; textbox.style.top = e.pageY + "px";
    textbox.classList.remove("hidden");
    document.addEventListener("mousemove", cursorPal);
    timer = setTimeout(function() {
        textbox.classList.add("hidden");
        document.removeEventListener("mousemove",cursorPal);
    },5000)
});