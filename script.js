// Year
document.getElementById('yr').textContent = new Date().getFullYear();

// Typewriter
const phrases = ['Hardware Engineer','PCB Designer','Robot Builder','ML Developer','Software Enthusiast'];
let pi=0,ci=0,del=false;
const tw=document.getElementById('tw');
function type(){
  const w=phrases[pi];
  tw.textContent=del?w.slice(0,ci--):w.slice(0,ci++);
  let d=del?50:85;
  if(!del&&ci>w.length){d=1800;del=true;}
  if(del&&ci<0){del=false;pi=(pi+1)%phrases.length;ci=0;d=300;}
  setTimeout(type,d);
}
type();

// Mobile nav
const burger=document.getElementById('burger');
const mobMenu=document.getElementById('mob-menu');
burger.addEventListener('click',()=>mobMenu.classList.toggle('open'));
mobMenu.querySelectorAll('.mm-link').forEach(l=>l.addEventListener('click',()=>mobMenu.classList.remove('open')));

// Scroll reveal with stagger
const revEls=document.querySelectorAll('.reveal');
const ro=new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting){
      e.target.style.transitionDelay=(i*0.07)+'s';
      e.target.classList.add('vis');
      ro.unobserve(e.target);
    }
  });
},{threshold:0.1});
revEls.forEach(el=>ro.observe(el));

// Active nav
const sections=document.querySelectorAll('section[id]');
const navLinks=document.querySelectorAll('.nl');
window.addEventListener('scroll',()=>{
  let cur='';
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-100)cur=s.id;});
  navLinks.forEach(a=>{
    const isActive=a.getAttribute('href')==='#'+cur;
    a.classList.toggle('active',isActive);
  });
},{passive:true});

// Nav shadow on scroll
const nav=document.getElementById('nav');
window.addEventListener('scroll',()=>{
  nav.style.boxShadow=window.scrollY>20?'0 4px 30px rgba(0,0,0,0.4)':'';
},{passive:true});
