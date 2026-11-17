const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('#site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    siteNav.classList.toggle('is-open', !open);
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    siteNav.classList.remove('is-open');
  }));
}

const filterButtons = document.querySelectorAll('[data-filter]');
const menuItems = document.querySelectorAll('.menu-item[data-category]');
filterButtons.forEach((button) => button.addEventListener('click', () => {
  const category = button.dataset.filter;
  filterButtons.forEach((item) => {
    const selected = item === button;
    item.classList.toggle('is-active', selected);
    item.setAttribute('aria-pressed', String(selected));
  });
  menuItems.forEach((item) => { item.hidden = category !== 'all' && item.dataset.category !== category; });
}));

const prices = { 'Ayam Sambal Matah': 32000, 'Ayam Kecombrang': 34000, 'Rendang Suwir': 38000 };
const menuChoice = document.querySelector('#menu-choice');
document.querySelectorAll('[data-order]').forEach((button) => button.addEventListener('click', () => {
  if (menuChoice) menuChoice.value = button.dataset.order;
  document.querySelector('#pesan')?.scrollIntoView({ behavior: 'smooth' });
  window.setTimeout(() => menuChoice?.focus({ preventScroll: true }), 450);
}));

const orderForm = document.querySelector('#order-form');
const orderResult = document.querySelector('#order-result');
if (orderForm && orderResult) orderForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(orderForm);
  const menu = String(data.get('menu'));
  const quantity = Number(data.get('quantity'));
  const area = String(data.get('area'));
  const total = (prices[menu] || 0) * quantity;
  const formatted = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(total);
  orderResult.textContent = `Simulasi: ${quantity} ${menu} untuk area ${area}. Estimasi ${formatted}. Pesanan belum dikirim.`;
});
