
const btn1 = document.querySelector(".tooltip-container");
const k45 = document.querySelector(".tooltip");
const text = document.querySelector(".text");
const text_dark = document.querySelector(".text-dark");
const btn2 = document.querySelector(".tooltip-container-dark");
btn1.onclick = () => {
    btn1.style.display = "none";
    k45.style.display = "none";
    text.style.display = "none";
    text_dark.style.display = "flex";
    btn2.style.display = "flex";
}
const btn_1 = document.querySelector(".tooltip-container");
const k10 = document.querySelector(".tooltip");
const text2 = document.querySelector(".text");
const text_dark2 = document.querySelector(".text-dark");
const btn_2 = document.querySelector(".tooltip-container-dark");
btn_2.onclick = () => {
    btn_1.style.display = "flex";
    k10.style.display = "flex";
    text2.style.display = "flex";
    text_dark2.style.display = "none";
    btn_2.style.display = "none";
}
const btn = document.querySelector(".btnpost");
const post = document.querySelector(".post");
const widget = document.querySelector(".star-widget");
const editBtn = document.querySelector(".edit");
btn.onclick = () => {
    widget.style.display = "none";
    post.style.display = "block";
    editBtn.onclick = ()=>{
        widget.style.display = "block";
        post.style.display = "none";
    }
return false;
}