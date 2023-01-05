const button = document.querySelector(".button");
const locked = document.querySelector("#locked");

button.addEventListener("click",()=>{
    locked.classList.add("ani_locked");
    setTimeout(function() {
        locked.classList.remove("ani_locked");
    },200);
})