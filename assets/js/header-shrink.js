(function () {
  var header = document.querySelector('.site-header');
  if (!header) return;

  // Dos umbrales distintos (en vez de uno solo) para evitar que el logo
  // parpadee cuando el scroll queda justo en el punto de cambio.
  var shrinkAt = 70;   // se achica recién pasado este punto
  var growAt = 30;     // se agranda recién por debajo de este otro

  var ticking = false;

  function update() {
    var y = window.scrollY;
    if (y > shrinkAt) {
      header.classList.add('scrolled');
    } else if (y < growAt) {
      header.classList.remove('scrolled');
    }
    // Entre growAt y shrinkAt no se toca nada: es la "zona muerta".
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }

  update();
  window.addEventListener('scroll', onScroll, { passive: true });
})();
