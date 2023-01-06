//declaration of button.
const button = document.querySelector(".button");

//when svg w/ class ".button" is clicked...
button.addEventListener("click",(e)=>{
    //searches for the second class in clicked target's class list, which is the name of the animation.
    let aniName = e.target.classList[1];
    //gets the amount of frames (excluding start frame):
    //  1. uses aniName to search for the element with the same id as aniName.
    //  2. it then counts the amount of children inside the div that shares said id, which is the number of frames for the animation.
    let frameCount = document.getElementById(aniName).children.length;
    //finds div that contains animation frames.
    let aniFrames = document.getElementById(aniName);
    //finds div's start frame.
    let startFrame = aniFrames.firstElementChild;
    //finds div's first frame.
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