(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function a(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(o){if(o.ep)return;o.ep=!0;const i=a(o);fetch(o.href,i)}})();const p=[{id:"a4",name:"A4 Portrait",detail:"210 x 297mm",label:"A4 portrait",width:210,height:297,columnLimit:8},{id:"a4-landscape",name:"A4 Landscape",detail:"297 x 210mm",label:"A4 landscape",width:297,height:210,columnLimit:10},{id:"b4",name:"B4 Portrait",detail:"250 x 353mm",label:"B4 portrait",width:250,height:353,columnLimit:10},{id:"b4-landscape",name:"B4 Landscape",detail:"353 x 250mm",label:"B4 landscape",width:353,height:250,columnLimit:12}],g=[{id:"standard",name:"Standard paper",detail:"Crisp white, pencil and ink friendly"},{id:"moleskine",name:"Moleskine type",detail:"Warm ivory, smoother notebook feel"},{id:"waterproof",name:"Waterproof",detail:"Synthetic stock for spray and rain"}],f=[{id:"soft",name:"Soft-cover",detail:"Flexible marine-blue cover"},{id:"hard",name:"Hard-cover",detail:"Rigid casebound boards"},{id:"leather",name:"Leather binding",detail:"Textured wrap with stitched spine"}],h=[{id:"voyage",name:"Voyage log",preview:"Voyage log"},{id:"vessel",name:"Vessel name",preview:""},{id:"date",name:"Date",preview:""}],T=["Date","Time","Position (lat)","Position (long)","Course","COG","Speed","SOG","Depth","Wind","Sea state","Barometer","Engine hours","Crew","Remarks"],P=[{id:"column",name:"Column"},{id:"line",name:"Separate line"}],R=[1,2,3],M=new Set(["Time","Course","COG","Speed","SOG","Depth","Wind","Barometer","Engine hours"]),e={format:p[0],paper:g[2],binding:f[2],headerFields:["voyage"],remarksLayout:"column",remarksHeight:1,columns:["Date","Time","Position (lat)","Position (long)","Course","Speed","Wind"]},b=document.querySelector("#size-options"),y=document.querySelector("#paper-options"),L=document.querySelector("#binding-options"),k=document.querySelector("#header-options"),v=document.querySelector("#column-options"),c=document.querySelector("#column-order-list"),$=document.querySelector("#remarks-options"),S=document.querySelector("#remarks-height-options"),m=document.querySelector("#notebook-preview"),E=document.querySelector("#left-page-header"),F=document.querySelector("#right-page-header"),j=document.querySelector("#left-log-table"),D=document.querySelector("#right-log-table"),w=document.querySelector("#custom-column-form"),u=document.querySelector("#custom-column-input"),N=w.querySelector("button");function B(){b.innerHTML=p.map(t=>`
        <button class="format-card" type="button" data-format="${t.id}" aria-pressed="${e.format.id===t.id}">
          <span class="mini-page" style="--mini-ratio:${t.width/t.height}; --mini-width:${t.width>t.height?42:30}px; --mini-height:${t.width>t.height?30:42}px"></span>
          <span>
            <strong>${t.name}</strong>
            <small>${t.detail}</small>
          </span>
        </button>
      `).join("")}function A(){y.innerHTML=g.map(t=>`
        <button class="paper-card ${t.id}" type="button" data-paper="${t.id}" aria-pressed="${e.paper.id===t.id}">
          <span class="paper-swatch"></span>
          <span>
            <strong>${t.name}</strong>
            <small>${t.detail}</small>
          </span>
        </button>
      `).join("")}function W(){L.innerHTML=f.map(t=>`
        <button class="binding-card ${t.id}" type="button" data-binding="${t.id}" aria-pressed="${e.binding.id===t.id}">
          <span class="binding-swatch"></span>
          <span>
            <strong>${t.name}</strong>
            <small>${t.detail}</small>
          </span>
        </button>
      `).join("")}function z(){k.innerHTML=h.map(t=>{const n=e.headerFields.includes(t.id);return`
        <button class="header-chip" type="button" data-header-field="${t.id}" aria-pressed="${n}">
          <span class="chip-check" aria-hidden="true"></span>
          ${t.name}
        </button>
      `}).join("")}function G(){const t=[...new Set([...T,...e.columns])],n=e.columns.length>=e.format.columnLimit;v.innerHTML=t.map(a=>{const r=e.columns.includes(a);return`
        <button class="column-chip" type="button" data-column="${a}" aria-pressed="${r}" ${!r&&n?"disabled":""}>
          <span class="chip-check" aria-hidden="true"></span>
          ${a}
        </button>
      `}).join("")}function V(){if(!e.columns.length){c.innerHTML='<p class="empty-order">Select columns to set their print order.</p>';return}c.innerHTML=e.columns.map((t,n)=>`
        <div class="column-order-item" draggable="true" data-order-index="${n}">
          <span class="drag-handle" aria-hidden="true"></span>
          <span class="order-number">${n+1}</span>
          <strong>${t}</strong>
          <div class="order-actions">
            <button type="button" data-move-column="${n}" data-direction="-1" ${n===0?"disabled":""} aria-label="Move ${t} earlier">Up</button>
            <button type="button" data-move-column="${n}" data-direction="1" ${n===e.columns.length-1?"disabled":""} aria-label="Move ${t} later">Down</button>
          </div>
        </div>
      `).join("")}function I(){$.innerHTML=P.map(t=>`
        <button class="remarks-option" type="button" data-remarks-layout="${t.id}" aria-pressed="${e.remarksLayout===t.id}">
          ${t.name}
        </button>
      `).join(""),S.innerHTML=R.map(t=>`
        <button class="remarks-height-option" type="button" data-remarks-height="${t}" aria-pressed="${e.remarksHeight===t}" ${e.remarksLayout==="line"?"":"disabled"}>
          ${t}x
        </button>
      `).join("")}function K(){const n=h.filter(a=>e.headerFields.includes(a.id)).map(a=>`
        <div class="page-header-field ${a.id==="voyage"?"page-header-title":""}">
          ${a.id==="voyage"?`<span>${a.preview}</span>`:`<span>${a.name}</span>`}
        </div>
      `).join("");E.innerHTML=n,F.innerHTML=n}function U(){const t=e.remarksLayout==="line"&&e.columns.includes("Remarks"),n=t?e.remarksHeight:1,a=t?e.columns.filter(s=>s!=="Remarks"):e.columns,r=a.length?a:["Choose columns"],l=t?Math.max(1,Math.floor((({a4:31,"a4-landscape":21,b4:37,"b4-landscape":25}[e.format.id]??23)-1)/(1+n))):{a4:32,"a4-landscape":20,b4:38,"b4-landscape":24}[e.format.id]??24,x=r.map(s=>`<div class="table-cell table-head">${s}</div>`).join(""),q=Array.from({length:l},()=>{const s=r.map(()=>'<div class="table-cell"></div>').join("");return t?`${s}<div class="table-cell remarks-line">Remarks</div>`:s}).join("");for(const s of[j,D])s.style.setProperty("--columns",r.length),s.style.setProperty("--table-columns",r.map(H=>M.has(H)?"minmax(18px, 0.5fr)":"minmax(28px, 1fr)").join(" ")),s.style.setProperty("--rows",t?l*(1+n)+1:l+1),s.style.setProperty("--remarks-span",n),s.dataset.remarksLayout=t?"line":"column",s.innerHTML=x+q}function C(){e.remarksLayout==="line"&&!e.columns.includes("Remarks")&&(e.remarksLayout="column")}function J(){e.columns.length<=e.format.columnLimit||(e.columns=e.columns.slice(0,e.format.columnLimit),C())}function Q(){const t=e.format.width/e.format.height;m.style.setProperty("--page-ratio",t),m.style.setProperty("--spread-ratio",t*2),m.dataset.paper=e.paper.id,m.dataset.format=e.format.id,m.dataset.binding=e.binding.id,document.querySelector("#size-readout").textContent=e.format.label,document.querySelector("#paper-readout").textContent=e.paper.name,document.querySelector("#binding-readout").textContent=e.binding.name,document.querySelector("#header-readout").textContent=e.headerFields.length?`${e.headerFields.length} selected`:"No header",document.querySelector("#column-count").textContent=`${e.columns.length}/${e.format.columnLimit} selected`,document.querySelector("#preview-title").textContent=`${e.format.name} ${e.binding.name.toLowerCase()} logbook`,document.querySelector("#preview-meta").textContent=`${e.format.detail} · ${e.paper.name} · ${e.columns.length}/${e.format.columnLimit} columns`,u.disabled=e.columns.length>=e.format.columnLimit,N.disabled=e.columns.length>=e.format.columnLimit,u.placeholder=e.columns.length>=e.format.columnLimit?"Column limit reached":"e.g. Reefing notes",K(),U()}function d(){J(),C(),B(),A(),W(),z(),G(),V(),I(),Q()}function O(t,n){if(n<0||n>=e.columns.length||t===n)return;const a=[...e.columns],[r]=a.splice(t,1);a.splice(n,0,r),e.columns=a,d()}b.addEventListener("click",t=>{const n=t.target.closest("[data-format]");n&&(e.format=p.find(a=>a.id===n.dataset.format),d())});y.addEventListener("click",t=>{const n=t.target.closest("[data-paper]");n&&(e.paper=g.find(a=>a.id===n.dataset.paper),d())});L.addEventListener("click",t=>{const n=t.target.closest("[data-binding]");n&&(e.binding=f.find(a=>a.id===n.dataset.binding),d())});k.addEventListener("click",t=>{const n=t.target.closest("[data-header-field]");if(!n)return;const a=n.dataset.headerField;e.headerFields.includes(a)?e.headerFields=e.headerFields.filter(r=>r!==a):e.headerFields=[...e.headerFields,a],d()});v.addEventListener("click",t=>{const n=t.target.closest("[data-column]");if(!n)return;const a=n.dataset.column;if(e.columns.includes(a))e.columns=e.columns.filter(r=>r!==a);else if(e.columns.length<e.format.columnLimit)e.columns=[...e.columns,a];else return;d()});c.addEventListener("click",t=>{const n=t.target.closest("[data-move-column]");if(!n)return;const a=Number(n.dataset.moveColumn),r=Number(n.dataset.direction);O(a,a+r)});c.addEventListener("dragstart",t=>{const n=t.target.closest("[data-order-index]");n&&(t.dataTransfer.effectAllowed="move",t.dataTransfer.setData("text/plain",n.dataset.orderIndex),n.classList.add("is-dragging"))});c.addEventListener("dragend",t=>{t.target.closest("[data-order-index]")?.classList.remove("is-dragging")});c.addEventListener("dragover",t=>{t.target.closest("[data-order-index]")&&(t.preventDefault(),t.dataTransfer.dropEffect="move")});c.addEventListener("drop",t=>{const n=t.target.closest("[data-order-index]");if(!n)return;t.preventDefault();const a=Number(t.dataTransfer.getData("text/plain")),r=Number(n.dataset.orderIndex);O(a,r)});$.addEventListener("click",t=>{const n=t.target.closest("[data-remarks-layout]");n&&(e.remarksLayout=n.dataset.remarksLayout,e.remarksLayout==="line"&&!e.columns.includes("Remarks")&&(e.columns.length>=e.format.columnLimit?e.columns=[...e.columns.slice(0,e.format.columnLimit-1),"Remarks"]:e.columns=[...e.columns,"Remarks"]),d())});S.addEventListener("click",t=>{const n=t.target.closest("[data-remarks-height]");!n||n.disabled||(e.remarksHeight=Number(n.dataset.remarksHeight),d())});w.addEventListener("submit",t=>{t.preventDefault();const n=u.value.trim().replace(/\s+/g," ");!n||e.columns.includes(n)||e.columns.length>=e.format.columnLimit||(e.columns=[...e.columns,n],u.value="",d())});d();
