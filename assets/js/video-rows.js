// Videos de cada concierto: cada uno mantiene su orientación original.
// Este script solo detecta si un video es horizontal o vertical (por su imagen de portada,
// que carga siempre, incluso en iPhone) y le pone la clase que corresponde. Los tamaños
// están en edicion-2026.css: todos los horizontales miden lo mismo, todos los verticales
// también, y cada fila se centra.
(function () {
  var figs = document.querySelectorAll('.edition-videos .edition-video');
  figs.forEach(function (fig) {
    var v = fig.querySelector('video');
    if (!v || !v.poster) return fig.classList.add('is-landscape');
    var img = new Image();
    img.onload = function () {
      fig.classList.add(img.naturalHeight > img.naturalWidth ? 'is-portrait' : 'is-landscape');
      fig.parentNode.classList.add('is-sized');
    };
    img.onerror = function () { fig.classList.add('is-landscape'); };
    img.src = v.poster;
  });
})();
