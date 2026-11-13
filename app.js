/* Despensa — PWA estática. Datos solo en localStorage, clave despensaPwa.v1 */
'use strict';

const STORAGE_KEY = 'despensaPwa.v1';
/* La sal, el aceite y el agua se dan por hecho en casa: nunca cuentan como faltantes. */
const STAPLES = ['sal', 'aceite', 'agua'];

const QUICK_ITEMS = [
  { name: 'Huevo', qty: 12, unit: 'pzas', category: 'Lácteos' },
  { name: 'Jitomate', qty: 4, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Cebolla', qty: 2, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Tortilla', qty: 10, unit: 'pzas', category: 'Pan y tortillas' },
  { name: 'Frijol', qty: 2, unit: 'tazas', category: 'Granos y pasta' },
  { name: 'Arroz', qty: 2, unit: 'tazas', category: 'Granos y pasta' },
  { name: 'Leche', qty: 1, unit: 'l', category: 'Lácteos' },
  { name: 'Pan', qty: 4, unit: 'pzas', category: 'Pan y tortillas' },
  { name: 'Queso', qty: 200, unit: 'g', category: 'Lácteos' },
  { name: 'Pollo', qty: 500, unit: 'g', category: 'Carnes' },
  { name: 'Aguacate', qty: 2, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Limón', qty: 4, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Chile', qty: 2, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Papa', qty: 4, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Zanahoria', qty: 3, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Plátano', qty: 4, unit: 'pzas', category: 'Frutas y verduras' },
  { name: 'Crema', qty: 200, unit: 'ml', category: 'Lácteos' },
  { name: 'Ajo', qty: 4, unit: 'pzas', category: 'Frutas y verduras' }
];

/* Recetario: recetas mexicanas reales, ingredientes con cantidad y pasos. */
const RECIPES = [
  { name: 'Huevos a la mexicana', time: '15 min',
    ingredients: [{ name: 'Huevo', qty: 4, unit: 'pzas' }, { name: 'Jitomate', qty: 2, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Chile', qty: 1, unit: 'pzas' }],
    steps: ['Pica el jitomate, la cebolla y el chile.', 'Sofríe la verdura en un poco de aceite.', 'Agrega los huevos batidos y revuelve hasta que cuajen.', 'Sirve con tortillas calientes.'] },
  { name: 'Quesadillas de queso', time: '10 min',
    ingredients: [{ name: 'Tortilla', qty: 4, unit: 'pzas' }, { name: 'Queso', qty: 200, unit: 'g' }],
    steps: ['Pon queso sobre cada tortilla.', 'Dobla por la mitad y calienta en el comal.', 'Voltea hasta que el queso se derrita.', 'Sirve con salsa al gusto.'] },
  { name: 'Chilaquiles verdes', time: '25 min',
    ingredients: [{ name: 'Tortilla', qty: 8, unit: 'pzas' }, { name: 'Salsa verde', qty: 1, unit: 'paquetes' }, { name: 'Queso', qty: 100, unit: 'g' }, { name: 'Crema', qty: 100, unit: 'ml' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Pollo', qty: 200, unit: 'g' }],
    steps: ['Corta las tortillas en triángulos y dóralas en aceite.', 'Calienta la salsa verde y baña los totopos.', 'Agrega el pollo deshebrado, la crema, el queso y la cebolla.', 'Sirve de inmediato para que queden crujientes.'] },
  { name: 'Tacos de pollo', time: '20 min',
    ingredients: [{ name: 'Tortilla', qty: 6, unit: 'pzas' }, { name: 'Pollo', qty: 300, unit: 'g' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Limón', qty: 2, unit: 'pzas' }, { name: 'Aguacate', qty: 1, unit: 'pzas' }],
    steps: ['Cuece o asa el pollo y deshébralo.', 'Calienta las tortillas en el comal.', 'Arma los tacos con pollo, cebolla, aguacate y limón.', 'Ponles salsa al gusto.'] },
  { name: 'Arroz rojo', time: '30 min',
    ingredients: [{ name: 'Arroz', qty: 2, unit: 'tazas' }, { name: 'Jitomate', qty: 2, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Ajo', qty: 2, unit: 'pzas' }],
    steps: ['Licúa el jitomate con la cebolla, el ajo y agua.', 'Dora el arroz en aceite hasta que se vea doradito.', 'Vierte lo licuado, sazona y tapa.', 'Cuece a fuego bajo 20 minutos sin destapar.'] },
  { name: 'Frijoles de la olla', time: '1 h 30 min',
    ingredients: [{ name: 'Frijol', qty: 2, unit: 'tazas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Ajo', qty: 2, unit: 'pzas' }],
    steps: ['Lava y remoja los frijoles.', 'Cuécelos en agua con la cebolla y el ajo.', 'Sazona con sal al final de la cocción.', 'Sirve caldosos, con tortillas o solos.'] },
  { name: 'Sopa de tortilla', time: '30 min',
    ingredients: [{ name: 'Tortilla', qty: 4, unit: 'pzas' }, { name: 'Jitomate', qty: 3, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Queso', qty: 100, unit: 'g' }, { name: 'Crema', qty: 100, unit: 'ml' }, { name: 'Chile', qty: 1, unit: 'pzas' }],
    steps: ['Licúa el jitomate con la cebolla y el chile.', 'Cuece la salsa 10 minutos.', 'Dora las tortillas en tiras.', 'Sirve el caldo con las tiras, el queso y la crema.'] },
  { name: 'Enchiladas verdes', time: '30 min',
    ingredients: [{ name: 'Tortilla', qty: 6, unit: 'pzas' }, { name: 'Pollo', qty: 300, unit: 'g' }, { name: 'Salsa verde', qty: 1, unit: 'paquetes' }, { name: 'Queso', qty: 100, unit: 'g' }, { name: 'Crema', qty: 100, unit: 'ml' }],
    steps: ['Calienta la salsa verde.', 'Pasa cada tortilla por la salsa y rellénala de pollo.', 'Enrolla y acomoda en un refractario.', 'Baña con más salsa, crema y queso.'] },
  { name: 'Guacamole', time: '10 min',
    ingredients: [{ name: 'Aguacate', qty: 3, unit: 'pzas' }, { name: 'Jitomate', qty: 1, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Limón', qty: 2, unit: 'pzas' }, { name: 'Chile', qty: 1, unit: 'pzas' }],
    steps: ['Machaca los aguacates en un tazón.', 'Agrega el jitomate, la cebolla y el chile picados.', 'Exprime los limones y mezcla.', 'Sazona y sirve con totopos.'] },
  { name: 'Huevos con chorizo', time: '15 min',
    ingredients: [{ name: 'Huevo', qty: 4, unit: 'pzas' }, { name: 'Chorizo', qty: 150, unit: 'g' }],
    steps: ['Fríe el chorizo hasta que suelte su grasa.', 'Agrega los huevos batidos.', 'Revuelve hasta que el huevo esté cocido.', 'Sirve con tortillas y frijoles.'] },
  { name: 'Caldo de pollo', time: '45 min',
    ingredients: [{ name: 'Pollo', qty: 500, unit: 'g' }, { name: 'Papa', qty: 2, unit: 'pzas' }, { name: 'Zanahoria', qty: 2, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Arroz', qty: 1, unit: 'tazas' }],
    steps: ['Cuece el pollo en agua con la cebolla.', 'Agrega la papa y la zanahoria en trozos.', 'Añade el arroz y cuece 20 minutos más.', 'Sazona y sirve bien caliente.'] },
  { name: 'Picadillo', time: '35 min',
    ingredients: [{ name: 'Carne molida', qty: 400, unit: 'g' }, { name: 'Papa', qty: 2, unit: 'pzas' }, { name: 'Jitomate', qty: 2, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Zanahoria', qty: 1, unit: 'pzas' }],
    steps: ['Fríe la cebolla y la carne molida.', 'Agrega el jitomate picado.', 'Añade la papa y la zanahoria en cubitos con un poco de agua.', 'Cuece tapado hasta que la verdura esté suave.'] },
  { name: 'Sopa de fideo', time: '25 min',
    ingredients: [{ name: 'Fideo', qty: 200, unit: 'g' }, { name: 'Jitomate', qty: 2, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Ajo', qty: 1, unit: 'pzas' }],
    steps: ['Dora el fideo en aceite hasta que tome color.', 'Licúa el jitomate con la cebolla y el ajo.', 'Vierte lo licuado sobre el fideo y agrega agua.', 'Cuece 15 minutos a fuego bajo.'] },
  { name: 'Tostadas de frijol', time: '15 min',
    ingredients: [{ name: 'Tostada', qty: 4, unit: 'pzas' }, { name: 'Frijol', qty: 2, unit: 'tazas' }, { name: 'Queso', qty: 100, unit: 'g' }, { name: 'Crema', qty: 100, unit: 'ml' }, { name: 'Lechuga', qty: 1, unit: 'pzas' }],
    steps: ['Unta los frijoles refritos sobre las tostadas.', 'Ponle lechuga picada encima.', 'Agrega el queso y la crema.', 'Sirve con salsa al gusto.'] },
  { name: 'Molletes', time: '15 min',
    ingredients: [{ name: 'Pan', qty: 4, unit: 'pzas' }, { name: 'Frijol', qty: 1, unit: 'tazas' }, { name: 'Queso', qty: 150, unit: 'g' }],
    steps: ['Parte el pan por la mitad.', 'Unta frijoles refritos en cada mitad.', 'Cubre con queso y hornea o calienta hasta gratinar.', 'Sirve con pico de gallo si tienes.'] },
  { name: 'Licuado de plátano', time: '5 min',
    ingredients: [{ name: 'Plátano', qty: 2, unit: 'pzas' }, { name: 'Leche', qty: 2, unit: 'tazas' }],
    steps: ['Pela los plátanos y échalos a la licuadora.', 'Agrega la leche.', 'Licúa hasta que quede cremoso.', 'Sirve frío, con hielo si quieres.'] },
  { name: 'Ensalada de nopal', time: '20 min',
    ingredients: [{ name: 'Nopal', qty: 300, unit: 'g' }, { name: 'Jitomate', qty: 2, unit: 'pzas' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Queso', qty: 100, unit: 'g' }, { name: 'Limón', qty: 1, unit: 'pzas' }],
    steps: ['Cuece los nopales en agua con sal y escúrrelos.', 'Mezcla con el jitomate y la cebolla picados.', 'Agrega el queso en cubitos y el jugo de limón.', 'Sirve fresca con tostadas.'] },
  { name: 'Rajas con crema', time: '25 min',
    ingredients: [{ name: 'Chile poblano', qty: 3, unit: 'pzas' }, { name: 'Crema', qty: 200, unit: 'ml' }, { name: 'Cebolla', qty: 1, unit: 'pzas' }, { name: 'Queso', qty: 100, unit: 'g' }],
    steps: ['Asa los chiles poblanos, pélalos y córtalos en rajas.', 'Sofríe la cebolla en rebanadas.', 'Agrega las rajas y la crema.', 'Cuece 5 minutos y añade el queso.'] },
  { name: 'Arroz con leche', time: '40 min',
    ingredients: [{ name: 'Arroz', qty: 1, unit: 'tazas' }, { name: 'Leche', qty: 1, unit: 'l' }, { name: 'Azúcar', qty: 4, unit: 'pzas' }],
    steps: ['Cuece el arroz en agua hasta que esté suave.', 'Agrega la leche y el azúcar.', 'Cuece a fuego bajo moviendo seguido.', 'Sirve tibio o frío, con canela.'] }
];

/* ---------- Funciones puras (probadas con node) ---------- */
function normalize(name) {
  return String(name || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim();
}
function isStaple(name) { return STAPLES.includes(normalize(name)); }

function pantryMap(pantry) {
  const map = {};
  (pantry || []).forEach((it) => { map[normalize(it.name)] = (map[normalize(it.name)] || 0) + Number(it.qty || 0); });
  return map;
}

/* Qué le falta a una receta según la despensa (sal, aceite y agua no cuentan). */
function missingFor(recipe, pantry) {
  const map = pantryMap(pantry);
  return recipe.ingredients
    .filter((ing) => !isStaple(ing.name))
    .filter((ing) => (map[normalize(ing.name)] || 0) < ing.qty)
    .map((ing) => ({ name: ing.name, qty: ing.qty - (map[normalize(ing.name)] || 0), unit: ing.unit }));
}
function canMake(recipe, pantry) { return missingFor(recipe, pantry).length === 0; }

/* Total del Súper: suma precio por unidad × cantidad. Precio vacío = 0 y marca total parcial. */
function shoppingTotal(shopping) {
  let total = 0;
  let partial = false;
  (shopping || []).forEach((it) => {
    const price = Number(it.price);
    if (!it.price && it.price !== 0) { partial = true; return; }
    if (isNaN(price)) { partial = true; return; }
    total += price * Number(it.qty || 0);
  });
  return { total, partial };
}

function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }

/* ---------- Estado ---------- */
function defaultState() { return { pantry: [], shopping: [], superMode: true }; }
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const s = JSON.parse(raw);
    return { pantry: Array.isArray(s.pantry) ? s.pantry : [], shopping: Array.isArray(s.shopping) ? s.shopping : [], superMode: s.superMode !== false };
  } catch (e) { return defaultState(); }
}
function saveState(state) { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

let state = (typeof localStorage !== 'undefined') ? loadState() : defaultState();

/* Si un producto se acaba y el Modo Súper está prendido, va a la lista de compras. */
function addToShoppingIfMissing(name, qty, unit) {
  if (!state.superMode) return;
  const existing = state.shopping.find((it) => normalize(it.name) === normalize(name) && !it.bought);
  if (existing) { existing.qty = Number(existing.qty) + Number(qty || 1); return; }
  state.shopping.push({ id: uid(), name, qty: qty || 1, unit: unit || 'pzas', price: '', bought: false });
}

function removePantryItem(item, reason) {
  state.pantry = state.pantry.filter((it) => it.id !== item.id);
  if (reason === 'depleted') addToShoppingIfMissing(item.name, 1, item.unit);
}

/* ---------- Interfaz (solo navegador) ---------- */
function el(id) { return document.getElementById(id); }
function money(n) { return '$' + Number(n || 0).toFixed(2) + ' MXN'; }
function esc(s) { return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

let recipeFilter = 'all';

function renderAll() { renderPantry(); renderRecipes(); renderShopping(); el('superModeToggle').checked = state.superMode; }

function renderPantry() {
  const list = el('pantryList');
  el('pantryEmpty').style.display = state.pantry.length ? 'none' : 'block';
  list.innerHTML = state.pantry.map((it) => `
    <li>
      <span class="item-name">${esc(it.name)}</span>
      <span class="cat">${esc(it.category || 'Otros')}</span>
      <button class="qty-btn" data-act="minus" data-id="${it.id}" aria-label="Quitar uno">−</button>
      <span class="item-qty">${it.qty} ${esc(it.unit)}</span>
      <button class="qty-btn" data-act="plus" data-id="${it.id}" aria-label="Agregar uno">+</button>
      <button class="btn small danger" data-act="depleted" data-id="${it.id}">Se acabó</button>
      <button class="btn small" data-act="delete" data-id="${it.id}">✕</button>
    </li>`).join('');
}

function renderRecipes() {
  const list = el('recipeList');
  const cards = RECIPES.map((r) => {
    const missing = missingFor(r, state.pantry);
    const ready = missing.length === 0;
    if (recipeFilter === 'ready' && !ready) return '';
    if (recipeFilter === 'missing' && ready) return '';
    const ingList = r.ingredients.map((ing) => {
      const have = (pantryMap(state.pantry)[normalize(ing.name)] || 0) >= ing.qty || isStaple(ing.name);
      return `<li class="${have ? 'have' : 'need'}">${have ? '✅' : '❌'} ${esc(ing.name)} — ${ing.qty} ${esc(ing.unit)}</li>`;
    }).join('');
    return `
    <article class="recipe-card ${ready ? 'ready' : ''}">
      <h3>${esc(r.name)}</h3>
      <p class="recipe-status ${ready ? 'ok' : 'miss'}">${ready ? '✅ ¡La puedes hacer hoy!' : '⚠️ Te faltan ' + missing.length + ' ingrediente(s): ' + missing.map((m) => esc(m.name)).join(', ')}</p>
      <p class="hint">⏱ ${esc(r.time)}</p>
      <ul>${ingList}</ul>
      <details><summary>Ver pasos</summary><ol>${r.steps.map((s) => `<li>${esc(s)}</li>`).join('')}</ol></details>
      <div class="recipe-actions">
        ${ready ? `<button class="btn cook" data-cook="${esc(r.name)}">🍳 Cocinar — descontar de la despensa</button>` : ''}
        ${missing.length ? `<button class="btn secondary" data-add-missing="${esc(r.name)}">🛒 Mandar lo que falta al Súper</button>` : ''}
      </div>
    </article>`;
  }).join('');
  list.innerHTML = cards || '<p class="empty">No hay recetas con ese filtro.</p>';
}

function renderShopping() {
  const list = el('shoppingList');
  const pending = state.shopping.filter((it) => !it.bought);
  el('shoppingEmpty').style.display = pending.length ? 'none' : 'block';
  el('shoppingCount').textContent = pending.length;
  list.innerHTML = state.shopping.map((it) => {
    const line = (Number(it.price) || 0) * Number(it.qty || 0);
    return `
    <li>
      <input type="checkbox" data-bought="${it.id}" ${it.bought ? 'checked' : ''} style="width:24px;height:24px">
      <span class="item-name" style="${it.bought ? 'text-decoration:line-through;opacity:.6' : ''}">${esc(it.name)}</span>
      <span class="item-qty">${it.qty} ${esc(it.unit)}</span>
      <label>$ <input type="number" class="price-input" data-price="${it.id}" value="${it.price === '' ? '' : it.price}" min="0" step="0.01" placeholder="Precio" aria-label="Precio en pesos"></label>
      <span class="line-total">${money(line)}</span>
      <button class="btn small" data-shop-del="${it.id}">✕</button>
    </li>`;
  }).join('');
  const t = shoppingTotal(pending);
  el('shoppingTotal').textContent = money(t.total);
  el('partialNote').hidden = !t.partial;
}

function addPantryItem(name, qty, unit, category) {
  const clean = String(name || '').trim();
  if (!clean) return;
  const existing = state.pantry.find((it) => normalize(it.name) === normalize(clean));
  if (existing) { existing.qty = Number(existing.qty) + Number(qty || 1); }
  else { state.pantry.push({ id: uid(), name: clean, qty: Number(qty || 1), unit: unit || 'pzas', category: category || 'Otros' }); }
  saveState(state); renderAll();
}

function cookRecipe(recipeName) {
  const recipe = RECIPES.find((r) => r.name === recipeName);
  if (!recipe) return;
  recipe.ingredients.forEach((ing) => {
    if (isStaple(ing.name)) return;
    const item = state.pantry.find((it) => normalize(it.name) === normalize(ing.name));
    if (!item) return;
    item.qty = Number(item.qty) - ing.qty;
    if (item.qty <= 0) removePantryItem(item, 'depleted');
  });
  saveState(state); renderAll();
  alert('¡Listo! Se descontaron los ingredientes de tu despensa. 🍳');
}

function init() {
  /* Tabs */
  document.querySelectorAll('.tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.tab').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.panel').forEach((p) => p.classList.remove('active'));
      btn.classList.add('active');
      el('tab-' + btn.dataset.tab).classList.add('active');
    });
  });

  /* Modo Súper */
  el('superModeToggle').addEventListener('change', (e) => {
    state.superMode = e.target.checked;
    saveState(state);
  });

  /* Agregar a despensa */
  el('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    addPantryItem(el('itemName').value, el('itemQty').value, el('itemUnit').value, el('itemCategory').value);
    el('itemName').value = '';
    el('itemQty').value = 1;
  });

  /* Botones rápidos */
  el('quickAdd').innerHTML = QUICK_ITEMS.map((q) => `<button class="chip" data-quick="${esc(q.name)}">+ ${esc(q.name)}</button>`).join('');
  el('quickAdd').addEventListener('click', (e) => {
    const name = e.target.dataset.quick;
    if (!name) return;
    const q = QUICK_ITEMS.find((x) => x.name === name);
    addPantryItem(q.name, q.qty, q.unit, q.category);
  });

  /* Acciones de la despensa (delegación) */
  el('pantryList').addEventListener('click', (e) => {
    const btn = e.target.closest('[data-act]');
    if (!btn) return;
    const item = state.pantry.find((it) => it.id === btn.dataset.id);
    if (!item) return;
    if (btn.dataset.act === 'plus') { item.qty = Number(item.qty) + 1; }
    if (btn.dataset.act === 'minus') {
      item.qty = Number(item.qty) - 1;
      if (item.qty <= 0) removePantryItem(item, 'depleted');
    }
    if (btn.dataset.act === 'depleted') removePantryItem(item, 'depleted');
    if (btn.dataset.act === 'delete') state.pantry = state.pantry.filter((it) => it.id !== item.id);
    saveState(state); renderAll();
  });

  /* Filtros de recetas */
  document.querySelectorAll('.filter').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      recipeFilter = btn.dataset.filter;
      renderRecipes();
    });
  });

  /* Acciones de recetas */
  el('recipeList').addEventListener('click', (e) => {
    const cookBtn = e.target.closest('[data-cook]');
    if (cookBtn) { cookRecipe(cookBtn.dataset.cook); return; }
    const missBtn = e.target.closest('[data-add-missing]');
    if (missBtn) {
      const recipe = RECIPES.find((r) => r.name === missBtn.dataset.addMissing);
      missingFor(recipe, state.pantry).forEach((m) => addToShoppingIfMissing(m.name, m.qty, m.unit));
      saveState(state); renderAll();
      alert('Lo que te falta ya está en tu lista del Súper. 🛒');
    }
  });

  /* Lista del Súper */
  el('shopForm').addEventListener('submit', (e) => {
    e.preventDefault();
    state.shopping.push({ id: uid(), name: el('shopName').value.trim(), qty: Number(el('shopQty').value) || 1, unit: el('shopUnit').value, price: '', bought: false });
    el('shopName').value = '';
    saveState(state); renderAll();
  });

  el('shoppingList').addEventListener('change', (e) => {
    const priceInput = e.target.closest('[data-price]');
    if (priceInput) {
      const item = state.shopping.find((it) => it.id === priceInput.dataset.price);
      if (item) { item.price = priceInput.value === '' ? '' : Number(priceInput.value); saveState(state); renderShopping(); }
      return;
    }
    const boughtBox = e.target.closest('[data-bought]');
    if (boughtBox) {
      const item = state.shopping.find((it) => it.id === boughtBox.dataset.bought);
      if (!item) return;
      item.bought = boughtBox.checked;
      if (item.bought) {
        addPantryItem(item.name, item.qty, item.unit, 'Otros');
        state.shopping = state.shopping.filter((it) => it.id !== item.id);
      }
      saveState(state); renderAll();
    }
  });

  el('shoppingList').addEventListener('click', (e) => {
    const del = e.target.closest('[data-shop-del]');
    if (!del) return;
    state.shopping = state.shopping.filter((it) => it.id !== del.dataset.shopDel);
    saveState(state); renderAll();
  });

  el('clearBought').addEventListener('click', () => {
    state.shopping = state.shopping.filter((it) => !it.bought);
    saveState(state); renderAll();
  });

  renderAll();
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', init);
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
}

/* Exportar funciones puras para pruebas en node */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { normalize, isStaple, missingFor, canMake, shoppingTotal, pantryMap, RECIPES, STAPLES, STORAGE_KEY };
}
