document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".hamburger"),n=document.querySelector(".nav"),o=document.querySelectorAll(".nav a");function t(){function o(){window.matchMedia("(min-width: 500px)").matches?document.body.classList.remove("over_hidden"):e.classList.contains("hamburger_open")&&document.body.classList.add("over_hidden")}e.classList.toggle("hamburger_open"),n.classList.toggle("nav_mobile"),window.matchMedia("(max-width: 500px)").matches?document.body.classList.toggle("over_hidden"):document.body.classList.remove("over_hidden"),e.classList.contains("hamburger_open")?window.addEventListener("resize",o):window.removeEventListener("resize",o)}e.onclick=t,o.forEach((e=>{e.onclick=t}))}));