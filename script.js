/* =========================================================
   PAINEL DOS SEUS PROJETOS
   ---------------------------------------------------------
   Para trocar um projeto, edite SOMENTE esta lista.

   image = imagem principal do projeto
   video = vídeo opcional (deixe "" se não tiver)
   title = nome do projeto
   category = tipo do trabalho
   year = ano
   link = link opcional (deixe "#" se não tiver)

   Arquivos recomendados:
   assets/projetos/nome-do-projeto.jpg
   assets/projetos/nome-do-projeto.mp4
   ========================================================= */

const PROJECTS = [
  {
    title: "@jpd.mkt",
    category: "Identidade visual & direção criativa",
    year: "2026",
    image: "assets/projetos/Primeira foto.png",
    video: "",
    link: "https://www.instagram.com/jpd.mkt09/"
  },
  {
    title: "Edição de Vídeo",
    category: "Conteúdo & design digital",
    year: "2026",
    image: "assets/projetos/ediçao.png",
    video: "",
    link: "#"
  },
  {
    title: "Digital Experience",
    category: "UI design & front-end",
    year: "2026",
    image: "assets/projetos/bastidores.png",
    video: "",
    link: "#"
  }
];

const projectsContainer = document.querySelector(".projects");

if (projectsContainer) {
  projectsContainer.innerHTML = PROJECTS.map((project, index) => {
    const media = project.video
      ? `<video class="project-media-video" src="${project.video}" poster="${project.image}" muted loop playsinline preload="metadata"></video>`
      : `<img class="project-media-image" src="${project.image}" alt="${project.title}" loading="lazy">`;

    return `
      <article class="project ${index === 0 ? "project-large" : ""} reveal">
        <a href="${project.link || "#"}" ${project.link && project.link !== "#" ? 'target="_blank" rel="noopener"' : ""}>
          <div class="project-art project-media">
            ${media}
            <small>${project.category.toUpperCase()} / ${project.year}</small>
            ${project.video ? '<span class="project-video-badge">VIDEO ↗</span>' : ""}
          </div>
          <div class="project-meta">
            <div>
              <h3>${project.title}</h3>
              <p>${project.category}</p>
            </div>
            <b>↗</b>
          </div>
        </a>
      </article>
    `;
  }).join("");

  // Vídeos dos projetos começam a tocar ao passar o mouse.
  projectsContainer.querySelectorAll(".project").forEach(project => {
    const video = project.querySelector("video");
    if (!video) return;

    project.addEventListener("mouseenter", () => video.play().catch(() => {}));
    project.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}

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
