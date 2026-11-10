// Video de fondo de la portada.
// Si la persona prefiere menos movimiento o tiene activado el ahorro de datos,
// no se reproduce ni se descarga: queda fija la imagen de portada (el "poster").
(function () {
  var video = document.querySelector('.hero-bg-video');
  if (!video) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var saveData = !!(connection && connection.saveData);
  if (!reduceMotion && !saveData) return;

  video.removeAttribute('autoplay');
  video.pause();
  video.preload = 'none';
  Array.prototype.forEach.call(video.querySelectorAll('source'), function (s) { s.remove(); });
  video.load();
})();
