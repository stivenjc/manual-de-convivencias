// ==========================================================================
// Manual de Convivencia Escolar · Lógica interactiva y PWA
// ==========================================================================

const PROTOCOLS = {
  tipo1: {
    title: 'Protocolo para Faltas Tipo 1 (Situaciones Leves)',
    badge: 'Tipo 1 · Manejo pedagógico inmediato',
    steps: [
      '1. Escuchar de forma inmediata y respetuosa a las personas involucradas en el conflicto.',
      '2. Mediar de manera pedagógica para que las partes expongan su punto de vista y reconozcan el impacto de sus actos.',
      '3. Establecer una acción reparadora o pacto de convivencia proporcional (disculpas sinceras, orden del aula o compromiso escrito).',
      '4. Registrar la situación y los acuerdos en el observador escolar, respetando el derecho a descargos.',
      '5. Hacer seguimiento en los días siguientes y dialogar con la familia si la conducta se repite.'
    ]
  },
  tipo2: {
    title: 'Protocolo para Faltas Tipo 2 (Situaciones Graves)',
    badge: 'Tipo 2 · Comité Escolar de Convivencia',
    steps: [
      '1. Garantizar atención inmediata en salud física o emocional si alguien resultó afectado.',
      '2. Remitir el caso a Coordinación y activar medidas de protección para evitar represalias contra la víctima.',
      '3. Informar de manera oportuna a padres o acudientes y recibir descargos respetando el debido proceso.',
      '4. Documentar evidencias objetivas (en ciberacoso, conservar capturas de pantalla de forma confidencial).',
      '5. Presentar el caso ante el Comité Escolar de Convivencia para definir acciones restaurativas, acompañamiento psicosocial y seguimiento periódico.'
    ]
  },
  tipo3: {
    title: 'Protocolo para Faltas Tipo 3 (Situaciones Gravísimas)',
    badge: 'Tipo 3 · Activación urgente de ruta externa',
    steps: [
      '1. Atender de forma urgente la salud física y psicológica de la persona afectada (primeros auxilios / urgencias).',
      '2. Proteger inmediatamente a la víctima y mantener reserva absoluta de su identidad.',
      '3. Informar de inmediato a rectoría y a las familias o acudientes (excepto si el presunto agresor pertenece al entorno familiar).',
      '4. Reportar sin demora ante autoridades competentes: Policía de Infancia y Adolescencia, ICBF, Fiscalía o Comisaría de Familia.',
      '5. Dejar constancia formal ante el Comité Escolar de Convivencia y colaborar con las autoridades sin hacer interrogatorios que revictimicen.'
    ]
  }
};

const QUIZ_DATA = [
  {
    question: '1. Un estudiante interrumpe la clase varias veces hablando fuerte y usando el celular sin permiso, pero sin agredir a nadie. ¿Qué tipo de falta es y cuál es la mejor solución inicial?',
    options: [
      'Tipo 1 (Leve): diálogo formativo, pacto de aula y registro pedagógico.',
      'Tipo 2 (Grave): expulsión inmediata del colegio.',
      'Tipo 3 (Gravísima): denuncia ante la Fiscalía.'
    ],
    correct: 0,
    explanation: 'Es una situación Tipo 1 porque afecta el clima escolar de forma menor sin daño físico o acoso. Se resuelve con diálogo, acuerdos y seguimiento.'
  },
  {
    question: '2. Varios estudiantes crean un grupo en redes sociales para burlarse diariamente de un compañero y compartir fotos suyas sin permiso. ¿Cómo se clasifica?',
    options: [
      'Tipo 1 (Leve): solo es una broma entre amigos.',
      'Tipo 2 (Grave): es ciberacoso repetitivo y requiere ruta del Comité de Convivencia.',
      'No aplica al Manual de Convivencia porque ocurrió en internet.'
    ],
    correct: 1,
    explanation: 'El ciberacoso sistemático entre escolares es una falta Tipo 2. Requiere proteger a la víctima, citar familias, acompañamiento psicosocial y reparación.'
  },
  {
    question: '3. Si se detecta el porte de un arma blanca o la venta de sustancias psicoactivas dentro de la institución, ¿qué acción es obligatoria?',
    options: [
      'Resolverlo solo con una disculpa en el salón.',
      'Clasificarlo como Tipo 1 y dejarlo sin registro.',
      'Clasificarlo como Tipo 3, proteger a la comunidad y activar ruta externa con Policía de Infancia / ICBF.'
    ],
    correct: 2,
    explanation: 'Constituye un presunto delito y riesgo grave (Tipo 3). Exige activar de inmediato las rutas externas de protección y justicia.'
  },
  {
    question: '4. ¿Qué garantiza el "debido proceso" al atender cualquier falta en el Manual de Convivencia?',
    options: [
      'Sancionar sin escuchar al estudiante para ahorrar tiempo.',
      'Escuchar versiones y descargos, informar a la familia y aplicar medidas justas y proporcionales.',
      'Publicar el nombre del estudiante en la cartelera del colegio.'
    ],
    correct: 1,
    explanation: 'El debido proceso protege el derecho a ser escuchado, presentar descargos, preservar la confidencialidad y recibir medidas formativas justas.'
  },
  {
    question: '5. ¿Cuál es el enfoque principal de las "posibles soluciones" en la convivencia escolar moderna?',
    options: [
      'El enfoque restaurativo: dialogar, reparar el daño y prevenir que vuelva a ocurrir.',
      'Ignorar los conflictos hasta que terminen solos.',
      'Aplicar siempre el castigo más duro sin importar el tipo de falta.'
    ],
    correct: 0,
    explanation: 'La convivencia busca formar ciudadanía: dialogar, mediar, reparar el daño causado y fortalecer el respeto mutuo.'
  }
];

const announcer = document.getElementById('announcer');
function announce(message) {
  if (!announcer) return;
  announcer.textContent = '';
  requestAnimationFrame(() => {
    announcer.textContent = message;
  });
}

// ==========================================================================
// 1. Navbar responsive (ResizeObserver + Popover fallback)
// ==========================================================================
function initNavbar() {
  const header = document.getElementById('site-header');
  const inner = document.getElementById('header-inner');
  const menu = document.getElementById('site-menu');
  const menuBtn = document.getElementById('menu-button');
  if (!header || !inner || !menu || !menuBtn) return;

  const hasNativePopover = Object.hasOwn(HTMLElement.prototype, 'popover');
  let lastHeaderWidth = header.getBoundingClientRect().width;

  if (!hasNativePopover) {
    menuBtn.addEventListener('click', () => {
      const open = menu.classList.toggle(':popover-open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  function updateLayout(forceMeasure = true) {
    const currentWidth = header.getBoundingClientRect().width;
    const isCurrentlyWide = header.classList.contains('is-wide');
    if (!forceMeasure && !isCurrentlyWide && currentWidth <= lastHeaderWidth) {
      lastHeaderWidth = currentWidth;
      return;
    }
    lastHeaderWidth = currentWidth;

    const wasPopoverOpen =
      hasNativePopover &&
      menu.hasAttribute('popover') &&
      menu.matches(':popover-open');

    header.classList.add('is-measuring');
    header.classList.add('is-wide');
    menu.removeAttribute('popover');

    const fitsInline = inner.scrollWidth <= inner.clientWidth + 1;

    if (fitsInline) {
      header.classList.add('is-wide');
      menu.removeAttribute('popover');
      menu.classList.remove(':popover-open');
    } else {
      header.classList.remove('is-wide');
      menu.setAttribute('popover', 'auto');
      if (wasPopoverOpen && hasNativePopover) {
        try {
          menu.showPopover();
        } catch (_) {}
      }
    }

    requestAnimationFrame(() => {
      header.classList.remove('is-measuring');
    });
  }

  updateLayout(true);

  if (typeof ResizeObserver !== 'undefined') {
    const observer = new ResizeObserver(() => updateLayout(false));
    observer.observe(header);
    observer.observe(menu);
  } else {
    window.addEventListener('resize', () => updateLayout(true));
  }

  // Cerrar popover al navegar a un ancla en móvil + actualizar aria-current
  const navLinks = Array.from(menu.querySelectorAll('a[href^="#"]'));
  menu.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    for (const item of navLinks) {
      item.removeAttribute('aria-current');
    }
    link.setAttribute('aria-current', 'page');

    if (!header.classList.contains('is-wide')) {
      if (hasNativePopover && menu.matches(':popover-open')) {
        menu.hidePopover();
      } else {
        menu.classList.remove(':popover-open');
      }
    }
  });
}

// ==========================================================================
// 2. Buscador y filtros por Tipo 1, 2 y 3
// ==========================================================================
function initSearchAndFilter() {
  const searchInput = document.getElementById('buscador-faltas');
  const clearBtn = document.getElementById('clear-search-btn');
  const filterBtns = Array.from(document.querySelectorAll('.filter-chip'));
  const cards = Array.from(document.querySelectorAll('.falta-card'));
  const feedback = document.getElementById('search-feedback');
  const emptyState = document.getElementById('empty-search-state');
  const resetBtn = document.getElementById('reset-filters-btn');

  let activeFilter = 'all';

  function normalizeText(str) {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '');
  }

  function applyFilters() {
    const query = normalizeText(searchInput.value.trim());
    clearBtn.hidden = query.length === 0;

    let visibleCount = 0;

    for (const card of cards) {
      const type = card.dataset.type;
      const matchesType = activeFilter === 'all' || type === activeFilter;
      const cardText = normalizeText(card.textContent);
      const matchesQuery = query === '' || cardText.includes(query);

      const isVisible = matchesType && matchesQuery;
      card.hidden = !isVisible;
      if (isVisible) {
        visibleCount += 1;
        if (query !== '') {
          for (const details of card.querySelectorAll('details')) {
            if (normalizeText(details.textContent).includes(query)) {
              details.open = true;
            }
          }
        }
      }
    }

    emptyState.hidden = visibleCount > 0;

    let statusText = '';
    if (visibleCount === 0) {
      statusText = 'No hay coincidencias con tu búsqueda actual.';
    } else if (visibleCount === 3 && activeFilter === 'all' && query === '') {
      statusText = 'Mostrando los 3 tipos de faltas completos.';
    } else {
      statusText = `Mostrando ${visibleCount} de 3 categorías de faltas.`;
    }
    feedback.textContent = statusText;
    announce(statusText);
  }

  searchInput.addEventListener('input', applyFilters);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    searchInput.focus();
    applyFilters();
  });

  for (const btn of filterBtns) {
    btn.addEventListener('click', () => {
      activeFilter = btn.dataset.filter;
      for (const other of filterBtns) {
        other.setAttribute('aria-pressed', String(other === btn));
      }
      applyFilters();
    });
  }

  resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    activeFilter = 'all';
    for (const btn of filterBtns) {
      btn.setAttribute('aria-pressed', String(btn.dataset.filter === 'all'));
    }
    applyFilters();
    searchInput.focus();
  });
}

// ==========================================================================
// 3. Acordeón: Expandir todo / Contraer todo (con fallback si falta commandfor)
// ==========================================================================
function initAccordions() {
  const toggleAllBtn = document.getElementById('toggle-all-accordions');
  const grid = document.getElementById('faltas-grid');
  if (!toggleAllBtn || !grid) return;

  const getAllDetails = () => Array.from(grid.querySelectorAll('details'));

  function syncToggleButton() {
    const items = getAllDetails();
    const allOpen = items.length > 0 && items.every((item) => item.open);
    toggleAllBtn.setAttribute('aria-expanded', String(allOpen));
  }

  function runToggleAll() {
    const expand = toggleAllBtn.getAttribute('aria-expanded') !== 'true';
    for (const item of getAllDetails()) {
      item.open = expand;
    }
    syncToggleButton();
  }

  if (Object.hasOwn(HTMLButtonElement.prototype, 'commandForElement')) {
    grid.addEventListener(
      'command',
      (event) => {
        if (event.command !== '--toggle-all') return;
        runToggleAll();
      },
      { capture: true }
    );
  } else {
    toggleAllBtn.addEventListener('click', runToggleAll);
  }

  grid.addEventListener(
    'toggle',
    (event) => {
      if (event.target.matches('details')) {
        syncToggleButton();
      }
    },
    { capture: true }
  );

  syncToggleButton();
}

// ==========================================================================
// 4. Diálogos nativos (<dialog>) + fallback closedby="any" + Protocolos
// ==========================================================================
function initDialogs() {
  const supportsCommand = Object.hasOwn(HTMLButtonElement.prototype, 'commandForElement');
  if (!supportsCommand) {
    document.addEventListener('click', (event) => {
      const btn = event.target.closest('button[command="show-modal"][commandfor]');
      if (!btn) return;
      const target = document.getElementById(btn.getAttribute('commandfor'));
      if (target instanceof HTMLDialogElement && !target.open) {
        target.showModal();
      }
    });
  }

  if (!('closedBy' in HTMLDialogElement.prototype)) {
    const outside = (e, dialog) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    for (const dialog of document.querySelectorAll('dialog[closedby="any"]')) {
      let pressedOutside = false;
      dialog.addEventListener('pointerdown', (e) => {
        pressedOutside = outside(e, dialog);
      });
      dialog.addEventListener('pointerup', (e) => {
        if (pressedOutside && outside(e, dialog)) dialog.close();
      });
    }
  }

  const protocolDialog = document.getElementById('protocol-dialog');
  const protocolTitle = document.getElementById('protocol-dialog-title');
  const protocolBody = document.getElementById('protocol-dialog-body');

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-protocol]');
    if (!trigger || !protocolDialog) return;

    const info = PROTOCOLS[trigger.dataset.protocol];
    if (!info) return;

    protocolTitle.textContent = info.title;
    protocolBody.replaceChildren();

    const badge = document.createElement('p');
    badge.className = `type-badge badge-${trigger.dataset.protocol}`;
    badge.textContent = info.badge;
    protocolBody.appendChild(badge);

    const list = document.createElement('ol');
    list.className = 'install-steps';
    for (const step of info.steps) {
      const li = document.createElement('li');
      li.textContent = step.replace(/^\d+\.\s*/, '');
      list.appendChild(li);
    }
    protocolBody.appendChild(list);

    protocolDialog.showModal();
  });
}

// ==========================================================================
// 5. Asistente rápido "¿Qué tipo de falta es?"
// ==========================================================================
function initClassifier() {
  const form = document.getElementById('classifier-form');
  const badge = document.getElementById('res-badge');
  const title = document.getElementById('res-title');
  const desc = document.getElementById('res-desc');
  const consequence = document.getElementById('res-consequence');
  const solution = document.getElementById('res-solution');
  if (!form) return;

  function evaluate() {
    const data = new FormData(form);
    const delito = data.get('q_delito') === 'si';
    const agresion = data.get('q_agresion') === 'si';
    const repite = data.get('q_repite') === 'si';

    badge.classList.remove('badge-tipo-1', 'badge-tipo-2', 'badge-tipo-3');

    if (delito) {
      badge.classList.add('badge-tipo-3');
      badge.textContent = 'Resultado orientativo: Tipo 3 · Gravísima';
      title.textContent = 'Presunto delito o riesgo grave para la integridad';
      desc.textContent = 'Requiere activación urgente de ruta externa y protección inmediata a la persona afectada.';
      consequence.textContent = 'Reporte obligatorio a autoridades (Policía de Infancia, ICBF o Fiscalía), medidas de protección y proceso disciplinario institucional.';
      solution.textContent = 'Atención médica/psicológica urgente, reserva de identidad, acompañamiento a la familia y remisión formal sin revictimizar.';
    } else if (agresion || repite) {
      badge.classList.add('badge-tipo-2');
      badge.textContent = 'Resultado orientativo: Tipo 2 · Grave';
      title.textContent = 'Agresión escolar, acoso o reincidencia sistemática';
      desc.textContent = 'No configura delito penal, pero afecta la convivencia y exige atención formal del Comité Escolar de Convivencia.';
      consequence.textContent = 'Proceso formal con citación a acudientes, registro en observador, medidas de reparación y matrícula en observación si aplica.';
      solution.textContent = 'Proteger a quien sufrió el daño, intervención de orientación escolar, círculos restaurativos con familias y seguimiento de compromisos.';
    } else {
      badge.classList.add('badge-tipo-1');
      badge.textContent = 'Resultado orientativo: Tipo 1 · Leve';
      title.textContent = 'Conflicto cotidiano o indisciplina leve';
      desc.textContent = 'No involucra delito ni agresión sistemática. Se aborda con diálogo formativo inmediato y acuerdos de aula.';
      consequence.textContent = 'Llamado de atención respetuoso, registro pedagógico con descargos y reparación simbólica.';
      solution.textContent = 'Escucha activa entre las partes, mediación escolar y compromiso de convivencia.';
    }
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    evaluate();
    announce(`${badge.textContent}. ${title.textContent}`);
  });

  form.addEventListener('change', evaluate);
  form.addEventListener('reset', () => {
    requestAnimationFrame(evaluate);
  });
}

// ==========================================================================
// 6. Autoevaluación (Mini-Quiz)
// ==========================================================================
function initQuiz() {
  const container = document.getElementById('quiz-list');
  const scoreEl = document.getElementById('quiz-score');
  const totalEl = document.getElementById('quiz-total');
  const resetBtn = document.getElementById('reset-quiz-btn');
  if (!container) return;

  totalEl.textContent = String(QUIZ_DATA.length);
  let score = 0;

  function renderQuiz() {
    score = 0;
    scoreEl.textContent = '0';
    container.replaceChildren();

    QUIZ_DATA.forEach((item, qIndex) => {
      const card = document.createElement('article');
      card.className = 'quiz-card';

      const heading = document.createElement('h3');
      heading.textContent = item.question;
      card.appendChild(heading);

      const optionsWrap = document.createElement('div');
      optionsWrap.className = 'quiz-options';

      const feedback = document.createElement('p');
      feedback.className = 'quiz-feedback';
      feedback.hidden = true;

      item.options.forEach((optText, optIndex) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option-btn';
        btn.textContent = optText;

        btn.addEventListener('click', () => {
          const siblings = Array.from(optionsWrap.querySelectorAll('button'));
          for (const s of siblings) s.disabled = true;

          if (optIndex === item.correct) {
            btn.classList.add('is-correct');
            score += 1;
            scoreEl.textContent = String(score);
            feedback.textContent = `¡Correcto! ${item.explanation}`;
          } else {
            btn.classList.add('is-wrong');
            siblings[item.correct].classList.add('is-correct');
            feedback.textContent = `Respuesta sugerida: ${item.explanation}`;
          }

          feedback.hidden = false;
          announce(`Pregunta ${qIndex + 1} respondida. Puntaje actual ${score} de ${QUIZ_DATA.length}.`);
        });

        optionsWrap.appendChild(btn);
      });

      card.appendChild(optionsWrap);
      card.appendChild(feedback);
      container.appendChild(card);
    });
  }

  resetBtn.addEventListener('click', () => {
    renderQuiz();
    announce('Autoevaluación reiniciada.');
  });

  renderQuiz();
}

// ==========================================================================
// 7. Selector de apariencia (Claro / Oscuro / Sistema)
// ==========================================================================
function initThemeControl() {
  const meta = document.querySelector('meta[name="color-scheme"]');
  const radios = Array.from(document.querySelectorAll('input[name="theme-choice"]'));
  if (!meta || radios.length === 0) return;

  function syncRadios() {
    let saved = 'light dark';
    try {
      saved = localStorage.getItem('color-scheme') || 'light dark';
    } catch (_) {}
    for (const radio of radios) {
      radio.checked = radio.value === saved;
    }
  }

  for (const radio of radios) {
    radio.addEventListener('change', () => {
      if (!radio.checked) return;
      const value = radio.value;
      meta.content = value;
      try {
        if (value === 'light dark') {
          localStorage.removeItem('color-scheme');
        } else {
          localStorage.setItem('color-scheme', value);
        }
      } catch (_) {}
    });
  }

  window.addEventListener('storage', (event) => {
    if (event.key !== 'color-scheme') return;
    meta.content = event.newValue || 'light dark';
    syncRadios();
  });

  syncRadios();
}

// ==========================================================================
// 8. PWA: Registro de Service Worker, estado de red e instalación
// ==========================================================================
function initPWA() {
  const installBtn = document.getElementById('pwa-install-btn');
  const connectionPill = document.getElementById('connection-pill');
  const connectionText = document.getElementById('connection-text');
  let deferredPrompt = null;

  function updateOnlineStatus() {
    if (!connectionPill || !connectionText) return;
    if (navigator.onLine) {
      connectionPill.classList.remove('is-offline');
      connectionText.textContent = 'Listo en línea y sin conexión';
    } else {
      connectionPill.classList.add('is-offline');
      connectionText.textContent = 'Modo sin conexión (PWA activa)';
    }
  }

  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
  updateOnlineStatus();

  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;
    if (installBtn) {
      installBtn.hidden = false;
    }
  });

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      const result = await deferredPrompt.userChoice;
      deferredPrompt = null;
      installBtn.hidden = true;
      if (result.outcome === 'accepted') {
        announce('Aplicación instalada correctamente.');
      }
    });
  }

  window.addEventListener('appinstalled', () => {
    if (installBtn) installBtn.hidden = true;
    announce('Manual de Convivencia instalado como aplicación.');
  });

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('./sw.js').catch(() => {
        // Silencioso en entornos sin HTTPS/localhost
      });
    });
  }
}

initNavbar();
initSearchAndFilter();
initAccordions();
initDialogs();
initClassifier();
initQuiz();
initThemeControl();
initPWA();
