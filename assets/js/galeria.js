(function () {
  var dialog = document.querySelector('.lightbox');
  var buttons = document.querySelectorAll('.edition-photo');
  if (!dialog || !buttons.length || typeof dialog.showModal !== 'function') return;

  var img = dialog.querySelector('.lightbox-img');
  var caption = dialog.querySelector('.lightbox-caption');
  var count = dialog.querySelector('.lightbox-count');
  var prev = dialog.querySelector('.lightbox-prev');
  var next = dialog.querySelector('.lightbox-next');
  var items = [];
  var index = 0;

  function show(i) {
    index = (i + items.length) % items.length;
    var b = items[index];
    img.src = b.getAttribute('data-src');
    img.alt = b.getAttribute('data-alt') || '';
    caption.textContent = b.getAttribute('data-caption') || '';
    count.textContent = items.length > 1 ? (index + 1) + ' / ' + items.length : '';
  }

  Array.prototype.forEach.call(buttons, function (btn) {
    btn.addEventListener('click', function () {
      var group = btn.getAttribute('data-group');
      items = Array.prototype.filter.call(buttons, function (b) {
        return b.getAttribute('data-group') === group;
      });
      var single = items.length < 2;
      prev.hidden = single;
      next.hidden = single;
      show(items.indexOf(btn));
      dialog.showModal();
    });
  });

  prev.addEventListener('click', function () { show(index - 1); });
  next.addEventListener('click', function () { show(index + 1); });
  dialog.querySelector('.lightbox-close').addEventListener('click', function () { dialog.close(); });

  // Click en el fondo oscuro cierra el visor
  dialog.addEventListener('click', function (e) {
    if (e.target === dialog) dialog.close();
  });

  dialog.addEventListener('keydown', function (e) {
    if (items.length < 2) return;
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  dialog.addEventListener('close', function () { img.removeAttribute('src'); });
})();
