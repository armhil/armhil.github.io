(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&n(s)}).observe(document,{childList:!0,subtree:!0});function c(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function n(e){if(e.ep)return;e.ep=!0;const t=c(e);fetch(e.href,t)}})();const i=document.querySelector("#app");if(i){i.innerHTML=`
    <main class="card">
      <h1>Emoji Charades</h1>
      <p>Vite + TypeScript starter for the couples.games playable.</p>
      <button id="ping-btn" type="button">Ping</button>
      <p id="status" class="status">Ready</p>
    </main>
  `;const o=document.querySelector("#ping-btn"),r=document.querySelector("#status");o==null||o.addEventListener("click",()=>{r&&(r.textContent="Pong")})}
