document.addEventListener("DOMContentLoaded",(function(){const e=document.querySelector(".hamburger"),t=document.querySelector(".nav"),n=document.querySelectorAll(".nav a");function o(){function n(){window.matchMedia("(min-width: 500px)").matches?document.body.classList.remove("over_hidden"):e.classList.contains("hamburger_open")&&document.body.classList.add("over_hidden")}e.classList.toggle("hamburger_open"),t.classList.toggle("nav_mobile"),window.matchMedia("(max-width: 500px)").matches?document.body.classList.toggle("over_hidden"):document.body.classList.remove("over_hidden"),e.classList.contains("hamburger_open")?window.addEventListener("resize",n):window.removeEventListener("resize",n)}e.onclick=o,n.forEach((function(e){e.onclick=o}));const l=document.querySelector("#header .header_line");let c=0;document.addEventListener("scroll",(function(){let e=window.scrollY;l.style.top=e>c?"-100%":0,c=e,window.scrollY>l.offsetHeight?l.classList.add("header_bgc"):l.classList.remove("header_bgc")})),document.querySelectorAll(".header_menu a").forEach((function(e){e.addEventListener("click",(function(t){t.preventDefault();document.querySelector(e.getAttribute("href")).scrollIntoView({behavior:"smooth"})}))})),document.querySelector("#getInTouchBtn").addEventListener("click",(function(e){e.preventDefault(),document.querySelector("#contactForm").scrollIntoView({behavior:"smooth"})}));document.querySelectorAll(".bg_parallax").forEach((function(e){function t(t){let n=70*((t.pageX-window.scrollX)/window.innerWidth-.5),o=20*((t.pageY-window.scrollY)/window.innerHeight-.5);e.style.backgroundPosition=`${50+n}% ${50+o}%`}e.addEventListener("mousemove",t),e||e.removeEventListener("mousemove",t)}));const r=document.querySelector("#tel"),i=/^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{3}[-\s]?\d{2}[-\s]?\d{2}$/g,s=/^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{3}[-\s]?\d{2}$/g,d=/^(\+\d{1,3}[-\s]?)?(\(?\d{3}\)?[-\s]?)\d{2}[-\s]?\d{2}[-\s]?\d{3}$/g;let a=document.querySelector("#errorTel"),u=r.closest("form").querySelector(".disabledBtn"),m=[];m.tel=!1,r.oninput=function(){let e=r.value.replace(/[^+0-9\(\)\-\s]/g,"");r.value=e,e.length>0?e.length>=10?e.includes("(")&&!e.includes(")")||!e.includes("(")&&e.includes(")")?(m.tel=!0,u.setAttribute("disabled",""),a.innerHTML="Неправильно введений номер"):i.test(e)||s.test(e)||d.test(e)||i.test(e)||s.test(e)||d.test(e)?(m.tel=!1,a.innerHTML=""):(m.tel=!0,u.setAttribute("disabled",""),a.innerHTML="Неправильно введений номер"):(m.tel=!0,u.setAttribute("disabled","")):m.tel=!1,m.tel||m.email||u.removeAttribute("disabled")};const v=document.querySelectorAll(".email"),f=/^([a-z][a-z0-9._-]+)(@[a-z][a-z0-9_-]+)(\.[a-z][a-z]+)(\.[a-z][a-z]+)?$/gi;m.email=!0,v.forEach((function(e){const t=e.nextElementSibling;let n=e.closest("form").querySelector(".disabledBtn");e.oninput=function(){let o=e.value;o.length>=10?f.test(o)||f.test(o)?(m.email=!1,t.innerHTML=""):(m.email=!0,n.setAttribute("disabled",""),t.innerHTML="Такої ел. адреси не існує"):(m.email=!0,n.setAttribute("disabled","")),m.tel||m.email||n.removeAttribute("disabled")}}));const h=document.querySelector("#sign_popup"),g=h.querySelector("#closeBtn");function y(){h.classList.add("hidden"),document.body.classList.remove("over_hidden"),m.tel=!1,m.email=!1}document.querySelector("#getStarted").addEventListener("click",(function(){h.classList.remove("hidden"),document.body.classList.add("over_hidden"),h.addEventListener("click",(function(e){e.target===h&&y()})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&y()})),g.onclick=y}));const L=document.querySelector("#signBtn");L.addEventListener("click",(function(){const e=L.closest("form").querySelector('[name="name"]'),t=L.closest("form").querySelector('[name="email"]'),n=L.closest("form").querySelector('[name="tel"]');let o={name:e.value,email:t.value,tel:n.value};localStorage.setItem("user",JSON.stringify(o)),e.value=null,t.value=null,n.value=null,y()})),console.log(localStorage.getItem("user"));const S=document.querySelectorAll(".hacked");let b=0,q=null;document.querySelector(".triple_click").addEventListener("click",(function(){if(b++,clearTimeout(q),3===b){let e=[];S.forEach((function(t,n){e[n]=t.innerHTML,t.innerHTML="Triple click!",t.classList.add("red")})),setTimeout((function(){S.forEach((function(t,n){t.innerHTML=e[n],t.classList.remove("red")}))}),3e3),b=0}q=setTimeout((function(){b=0}),500)}));const w=document.querySelectorAll("#blog .text"),E=document.querySelectorAll("#blog .readMore");let p=[];w.forEach((function(e,t){e.innerText.length>150&&(p[t]=e.innerText,e.innerText=e.innerText.slice(0,145)+" ...")})),E.forEach((function(e,t){let n=!1;e.addEventListener("click",(function(o){!function(o){o.preventDefault(),n?(w[t].innerText=w[t].innerText.slice(0,145)+" ...",e.innerText="Read more",n=!1):(w[t].innerText=p[t],e.innerText="Show less",n=!0)}(o)}))}));const T=document.querySelector("#contactForm"),k=document.querySelector("#sendMsgPopup"),_=T.querySelector("#showConfirmBtn"),A=T.querySelector("#cancelBtn");if(_.addEventListener("click",(function(){function e(){k.classList.add("hidden"),m.email=!1}k.classList.remove("hidden"),k.addEventListener("click",(function(t){t.target===k&&e()})),document.addEventListener("keydown",(function(t){"Escape"===t.key&&e()})),A.onclick=e})),null!==localStorage.getItem("user")){let e=JSON.parse(localStorage.getItem("user"));T.querySelector('[name="name"]').value=e.name,T.querySelector('[name="email"]').value=e.email,_.removeAttribute("disabled")}}));