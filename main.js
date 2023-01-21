window.onload = function() {
    //audio.
    let volumeInput = document.querySelector("#volume_input"),
        volumeButton = document.querySelector("#volume_button"),
        volumeButtonClass = volumeButton.classList,
        volHigh = "fa-volume-high",
        volLow = "fa-volume-low",
        volX = "fa-volume-xmark",
        ambience = new Audio("sounds/ambience.mp3");
    ambience.volume = volumeInput.value / 100;
    ambience.loop = true;
    ambience.play();
    function volumeJumper(){
        if (volumeInput.value == 0) {
            volumeInput.value = 50; ambience.volume = .5;
            volumeButtonClass.remove(volHigh); volumeButtonClass.remove(volX); volumeButtonClass.add(volLow)
        } else if (volumeInput.value == 50) {
            volumeInput.value = 100; ambience.volume = 1;
            volumeButtonClass.remove(volLow); volumeButtonClass.remove(volX); volumeButtonClass.add(volHigh)
        } else {
            volumeInput.value = 0; ambience.volume = .0;
            volumeButtonClass.remove(volLow); volumeButtonClass.remove(volHigh); volumeButtonClass.add(volX)
        }};
    volumeInput.addEventListener("change", function(e){
        volumeInput.value = e.currentTarget.value; ambience.volume = e.currentTarget.value / 100;
        if (volumeInput.value == 0) {
            volumeButtonClass.remove(volHigh); volumeButtonClass.remove(volLow); volumeButtonClass.add(volX)
        } else if (volumeInput.value <= 50) {
            volumeButtonClass.remove(volHigh); volumeButtonClass.remove(volX); volumeButtonClass.add(volLow)
        } else {
            volumeButtonClass.remove(volLow); volumeButtonClass.remove(volX); volumeButtonClass.add(volHigh)
        }});
    if (volumeInput.value == 0) {
        volumeButtonClass.remove(volHigh); volumeButtonClass.remove(volLow); volumeButtonClass.add(volX)
    } else if (volumeInput.value <= 50) {
        volumeButtonClass.remove(volHigh); volumeButtonClass.remove(volX); volumeButtonClass.add(volLow)
    } else {
        volumeButtonClass.remove(volLow); volumeButtonClass.remove(volX); volumeButtonClass.add(volHigh)
    }
    volumeButton.addEventListener("click", volumeJumper);

    //overlay resizer.
    const overlay = document.getElementById("overlay");
    let overlayRef = document.querySelector(".animate img"),
        overlayWidth = overlayRef.getBoundingClientRect().width,
        overlayHeight = overlayRef.getBoundingClientRect().height;
        overlay.style.width = overlayWidth + "px"; overlay.style.height = overlayHeight + "px";
    window.addEventListener("resize", function(){
        overlayRef = document.querySelector(".animate img");
        overlayWidth = overlayRef.getBoundingClientRect().width;
        overlayHeight = overlayRef.getBoundingClientRect().height;
        overlay.style.width = overlayWidth + "px"; overlay.style.height = overlayHeight + "px";
    });

    //declaration of cursor-following text box.
    function cursorPal(e) {
        textbox.style.left = e.pageX + "px"; textbox.style.top = e.pageY + "px";
    }

    //animation.
    let button = document.querySelector(".button"),
        timer;
    button.addEventListener("click",(e)=>{
        let aniName = e.target.classList[1],
            frameCount = (document.getElementById(aniName).children.length)-1,
            aniFrames = document.getElementById(aniName),
            startFrame = aniFrames.firstElementChild,
            nextFrame = startFrame.nextElementSibling;
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
            },(41.7*i))}
        setTimeout(function() {
            currentFrame.classList.add("hidden"); currentFrame.classList.remove("current");
            startFrame.classList.remove("hidden"); startFrame.classList.add("current");
            currentFrame = nextFrame;
        },(41.7*frameCount));
        //button audio.
        let audio = new Audio("sounds/" + aniName + ".wav"); 
        audio.volume = volumeInput.value / 100; audio.play();
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
    document.removeEventListener("mousemove",cursorPal)};