(function () {
  var header = document.querySelector('.site-header');
  var toggle = document.querySelector('.menu-toggle');
  if (!header || !toggle) return;

  // Con JavaScript activo, el botón existe y las secciones secundarias
  // (Historia a Contacto) pasan a ser un menú desplegable en el celular.
  // Sin JavaScript el botón queda oculto y los enlaces siguen visibles.
  toggle.hidden = false;
  header.classList.add('has-menu');

  function setOpen(open) {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  toggle.addEventListener('click', function () {
    setOpen(!header.classList.contains('menu-open'));
  });

  // Se cierra al tocar fuera, con Esc o al elegir una sección
  document.addEventListener('click', function (e) {
    if (!header.classList.contains('menu-open')) return;
    if (!header.contains(e.target)) setOpen(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
  header.querySelectorAll('.nav-more a').forEach(function (a) {
    a.addEventListener('click', function () { setOpen(false); });
  });

  // Si la pantalla pasa a modo escritorio, se cierra
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) setOpen(false);
  });
})();
