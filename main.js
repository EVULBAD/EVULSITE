const animation = document.querySelector(".animation");
const locked = document.querySelector("#locked");

animation.addEventListener('click',()=>{
    animation.classList.add("ani_locked");
    setTimeout(function() {
        animation.classList.remove("ani_locked");
    },210);
})