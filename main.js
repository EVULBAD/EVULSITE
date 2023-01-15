//cursor-following text box.
let textbox = document.getElementById("textbox");
const onMouseMove = (e) =>{
    textbox.style.left = e.pageX + "px";
    textbox.style.top = e.pageY + "px";
}
document.addEventListener("mousemove", onMouseMove);

//animation.
let button = document.querySelector(".button");
button.addEventListener("click",(e)=>{
    let aniName = e.target.classList[1];
    let frameCount = document.getElementById(aniName).children.length;
    let aniFrames = document.getElementById(aniName);
    let startFrame = aniFrames.firstElementChild.nextElementSibling;
    let nextFrame = startFrame.nextElementSibling;
    startFrame.classList.add("hidden"); startFrame.classList.remove("current");
    nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
    let currentFrame = nextFrame; //currently: 001
    nextFrame = nextFrame.nextElementSibling; //next: 002
    setTimeout(function() {
        currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
        nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
        currentFrame = nextFrame; //currently: 002
        nextFrame = nextFrame.nextElementSibling; //next: 003
    },41.7);
    setTimeout(function() {
        currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
        nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
        currentFrame = nextFrame; //currently: 003
        nextFrame = nextFrame.nextElementSibling; //next: 004
    },(41.7*2));
    setTimeout(function() {
        currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
        nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
        currentFrame = nextFrame; //currently: 004
        nextFrame = nextFrame.nextElementSibling; //next: 005
    },(41.7*3));
    setTimeout(function() {
        currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
        nextFrame.classList.remove("hidden"); nextFrame.classList.add("current");
        currentFrame = nextFrame; //currently: 005
        nextFrame = nextFrame.nextElementSibling; //next: null
    },(41.7*4));
    setTimeout(function() {
        currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
        startFrame.classList.remove("hidden"); startFrame.classList.add("current");
        currentFrame = nextFrame; //currently: start
    },(41.7*5));
})