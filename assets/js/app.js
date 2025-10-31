(function(){
    const $ = (s,ctx=document)=>ctx.querySelector(s);
    const $$ = (s,ctx=document)=>Array.from(ctx.querySelectorAll(s));

    // Datos de métodos (cafeteras)
    const METODOS = {
        v60:{
            id:'v60', nombre:'V60 / Filtro', icon:'🌀', etiqueta:'Filtrado',
            ratios:{suave:17, media:15, fuerte:14}, molido:'Medio-fino', tiempo:'2:30–3:00 min',
            imagen:'assets/img/v60.png', // opcional
            pasos:[
                'Molido medio-fino (como sal fina).',
                'Enjuaga el filtro con agua caliente y desecha esa agua.',
                'Proporción base 1:15. Ej.: 20 g café → 300 ml agua.',
                'Vierte un poco para “florecer” 30–40 s, luego en espiral hasta completar.',
            ]
        },
        prensa:{
            id:'prensa', nombre:'Prensa francesa', icon:'🫙', etiqueta:'Inmersión',
            ratios:{suave:16, media:15, fuerte:14}, molido:'Grueso', tiempo:'4:00 min',
            imagen:'assets/img/prensa.png',
            pasos:[
                'Molido grueso (sal kosher).',
                'Agrega café y agua caliente, remueve y coloca la tapa sin bajar.',
                'Infunde 4 minutos. Rompe costra y retira espuma.',
                'Presiona suave y sirve.',
            ]
        },
        moka:{
            id:'moka', nombre:'Moka italiana', icon:'☕', etiqueta:'Presión',
            ratios:{suave:12, media:11, fuerte:10}, molido:'Medio', tiempo:'2:00–3:00 min',
            imagen:'assets/img/moka.png',
            pasos:[
                'Llena la base con agua caliente hasta la válvula.',
                'Rellena el filtro sin compactar (molido medio).',
                'Fuego bajo. Retira al primer borboteo para evitar amargor.',
            ]
        },
        espresso:{
            id:'espresso', nombre:'Espresso', icon:'🎯', etiqueta:'9 bar',
            ratios:{suave:2.2, media:2.0, fuerte:1.8}, molido:'Fino', tiempo:'25–30 s (doble)',
            imagen:'assets/img/espresso.png',
            pasos:[
                'Usa 18 g en canasta doble como referencia.',
                'Distribuye, nivela y tampea firme y recto.',
                'Busca 36–40 g en 25–30 s (relación 1:2).',
            ]
        },
    };

    // Datos de bebidas
    const BEBIDAS = {
        americano:{
            id:'americano', nombre:'Americano', icon:'💧+🎯',
            desc:'1 espresso + 120–180 ml de agua caliente. Primero el agua, luego el espresso.',
            pasos:[
                'Prepara 1 espresso (≈30–40 g).',
                'Calienta agua a 90–96 °C.',
                'Sirve el agua primero y añade el espresso.'
            ],
            imagen:'assets/img/americano.png'
        },
        latte:{
            id:'latte', nombre:'Latte', icon:'🥛+🎯',
            desc:'1 espresso + 180–240 ml de leche vaporizada. Textura sedosa 55–60 °C.',
            pasos:[
                'Prepara 1 espresso.',
                'Vaporiza leche hasta 55–60 °C con microespuma fina.',
                'Vierte centrado y constante.'
            ],
            imagen:'assets/img/latte.png'
        },
        capuccino:{
            id:'capuccino', nombre:'Capuccino', icon:'🫧+🎯',
            desc:'1 espresso + 120 ml de leche con microespuma.',
            pasos:[
                'Prepara 1 espresso.',
                'Vaporiza leche con algo más de aire (espuma).',
                'Vierte en proporción 1:1:1 (espresso:leche:espuma aprox.).'
            ],
            imagen:'assets/img/capuccino.png'
        },
        filtrado:{
            id:'filtrado', nombre:'Café filtrado', icon:'🫗',
            desc:'Cualquier método de filtro a 1:15 como base. Limpio y balanceado.',
            pasos:[
                'Usa 20 g café por 300 ml de agua (ajusta a gusto).',
                'Molido medio-fino. Agua a 90–96 °C.',
                'Vierte en 2–3 etapas para extraer parejo.'
            ],
            imagen:'assets/img/filtrado.png'
        }
    };

    // Construcción de UI dinámica
    function buildCards(dataMap, container, group){
        container.innerHTML = '';
        const grid = document.createElement('div');
        grid.className = 'select-cards';
        for(const key of Object.keys(dataMap)){
            const item = dataMap[key];
            const card = document.createElement('button');
            card.type = 'button';
            card.className = 'select-card';
            card.setAttribute('data-id', item.id);
            card.setAttribute('data-group', group);
            card.innerHTML = `
                <span class="figure" aria-hidden="true">${item.icon || '☕'}</span>
                <span>
                    <strong>${item.nombre}</strong>
                    ${item.etiqueta ? `<span class="badge">${item.etiqueta}</span>`:''}
                    ${item.desc ? `<div class="small">${item.desc}</div>`:''}
                </span>
            `;
            grid.appendChild(card);
        }
        container.appendChild(grid);
    }

    function detalleMetodo(id){
        const box = $('#detalle-metodo');
        const m = METODOS[id] || METODOS.v60;
        box.innerHTML = `
            <h3>${m.nombre} <span class="badge">${m.etiqueta}</span></h3>
            <div class="small">Proporción base (media): 1:${m.ratios.media} • Molido: ${m.molido} • Tiempo: ${m.tiempo}</div>
            <div class="steps" style="margin-top:8px">
                ${m.pasos.map(p=>`<div class="step"><i>✅</i><div>${p}</div></div>`).join('')}
            </div>
            <div class="small" style="margin-top:8px">TIP: Ajusta primero la <strong>molienda</strong> para corregir tiempos y sabor.</div>
        `;
        box.classList.add('in');
        window.scrollTo({top:box.getBoundingClientRect().top + window.scrollY - 90, behavior:'smooth'});
    }

    function detalleBebida(id){
        const box = $('#detalle-bebida');
        const b = BEBIDAS[id] || BEBIDAS.americano;
        box.innerHTML = `
            <h3>${b.nombre}</h3>
            <div class="small">${b.desc || ''}</div>
            <div class="steps" style="margin-top:8px">
                ${b.pasos.map(p=>`<div class="step"><i>👉</i><div>${p}</div></div>`).join('')}
            </div>
        `;
        box.classList.add('in');
        window.scrollTo({top:box.getBoundingClientRect().top + window.scrollY - 90, behavior:'smooth'});
    }

    // Asistente
    function fillAsistenteMetodos(){
        const sel = $('#asist-metodo');
        sel.innerHTML = Object.values(METODOS).map(m=>`<option value="${m.id}">${m.nombre}</option>`).join('');
    }
    function calcAsistente(){
        const m = METODOS[$('#asist-metodo').value] || METODOS.v60;
        const intensidad = $('#asist-intensidad').value || 'media';
        const tazas = Math.max(1, Number($('#asist-tazas').value||0));
        let coffee, water;
        if(m.id==='espresso'){
            coffee = tazas * 18; // doble espresso por taza
            water = Math.round(coffee * m.ratios[intensidad]);
        }else{
            water = tazas * 200;
            coffee = Math.round(water / m.ratios[intensidad]);
        }
        $('#asist-agua').value = water;
        $('#asist-cafe').value = coffee;
        $('#asist-tiempo').value = `${m.tiempo} • ${m.molido}`;
    }

    // Tabs (Cafetera / Bebida)
    function setupTabs(){
        const tabMet = $('#tab-metodos'), tabBeb = $('#tab-bebidas');
        const pMet = $('#panel-metodos'), pBeb = $('#panel-bebidas');
        function activate(which){
            const met = which==='met';
            tabMet.classList.toggle('active', met);
            tabMet.setAttribute('aria-selected', met);
            tabBeb.classList.toggle('active', !met);
            tabBeb.setAttribute('aria-selected', !met);
            pMet.classList.toggle('show', met);
            pMet.hidden = !met;
            pBeb.classList.toggle('show', !met);
            pBeb.hidden = met;
        }
        tabMet.addEventListener('click', ()=>activate('met'));
        tabBeb.addEventListener('click', ()=>activate('beb'));
    }

    // Menú móvil
    const menuBtn = $('#menuBtn');
    const topnav = $('#topnav');
    menuBtn?.addEventListener('click', ()=>{
        topnav.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', topnav.classList.contains('open'));
    });

    // Reveal animations
    const io = new IntersectionObserver((entries)=>{
        entries.forEach(e=>{
            if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
        });
    },{threshold:0.12});
    $$('.reveal, .reveal-sm').forEach(el=>io.observe(el));

    // Form submit (Formspree)
    const form = $('#form-contacto');
    form?.addEventListener('submit', async (e)=>{
        const status = $('#status');
        if(form.action.includes('REEMPLAZA_AQUI')){ return; } // sin configurar aún
        e.preventDefault();
        status.textContent = 'Enviando...';
        try{
            const res = await fetch(form.action, { method:'POST', headers:{'Accept':'application/json'}, body:new FormData(form) });
            if(res.ok){ status.textContent = '¡Gracias! Te responderemos pronto.'; form.reset(); }
            else{ status.textContent = 'No se pudo enviar. Intenta de nuevo o escribe a hola@cajaicafe.me'; }
        }catch{
            status.textContent = 'Error de red. Intenta nuevamente.';
        }
    });

    // Build UI
    buildCards(METODOS, $('#cards-metodos'), 'metodos');
    buildCards(BEBIDAS, $('#cards-bebidas'), 'bebidas');
    fillAsistenteMetodos();
    calcAsistente();

    // Listeners
    document.addEventListener('click', (e)=>{
        const btn = e.target.closest('.select-card');
        if(!btn) return;
        const group = btn.getAttribute('data-group');
        $$(`.select-card[data-group="${group}"]`).forEach(c=>c.classList.remove('active'));
        btn.classList.add('active');
        if(group==='metodos') detalleMetodo(btn.getAttribute('data-id'));
        if(group==='bebidas') detalleBebida(btn.getAttribute('data-id'));
    });
    ['#asist-metodo','#asist-intensidad','#asist-tazas'].forEach(s=>{
        $(s)?.addEventListener('input', calcAsistente);
    });

    // Tabs init
    setupTabs();
    // Selecciones iniciales
    detalleMetodo('v60');
    detalleBebida('americano');
})();