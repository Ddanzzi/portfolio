const menu = document.querySelector(".menu");
const nav = document.querySelector(".nav-links");
menu?.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

const cursor = document.querySelector(".cursor");
const dot = document.querySelector(".cursor-dot");
if (window.matchMedia("(pointer:fine)").matches) {
  let mx=window.innerWidth/2,my=window.innerHeight/2,cx=mx,cy=my;
  window.addEventListener("mousemove", e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+"px"; dot.style.top=my+"px"; });
  function animateCursor(){
    cx += (mx-cx)*.14; cy += (my-cy)*.14;
    cursor.style.left=cx+"px"; cursor.style.top=cy+"px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll("a,button,.service,.project").forEach(el=>{
    el.addEventListener("mouseenter",()=>{cursor.style.width="58px";cursor.style.height="58px"});
    el.addEventListener("mouseleave",()=>{cursor.style.width="38px";cursor.style.height="38px"});
  });
}

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove", e=>{
    const r=el.getBoundingClientRect();
    const x=(e.clientX-r.left-r.width/2)*.12;
    const y=(e.clientY-r.top-r.height/2)*.12;
    el.style.transform=`translate(${x}px,${y}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="translate(0,0)");
});
