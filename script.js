(function () {
  // close the mobile menu after choosing a page
  document.querySelectorAll('nav a').forEach(function (a) {
    a.addEventListener('click', function () { document.body.classList.remove('nav-open'); });
  });

  // click-to-enlarge photos
  var shots = Array.prototype.slice.call(document.querySelectorAll('.zoom'));
  if (!shots.length) return;
  var box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.innerHTML = '<button class="lb-close" type="button" aria-label="Close">×</button>' +
    '<button class="lb-prev" type="button" aria-label="Previous photo">‹</button>' +
    '<img alt=""><p></p>' +
    '<button class="lb-next" type="button" aria-label="Next photo">›</button>';
  document.body.appendChild(box);
  var img = box.querySelector('img'), cap = box.querySelector('p'), cur = 0, opener = null;
  // the gallery photos only (the top banner photo repeats photo 1)
  var list = shots.filter(function (b) { return !b.classList.contains('hero-shot'); });
  if (!list.length) list = shots;

  function show(i) {
    cur = (i + list.length) % list.length;
    img.src = list[cur].getAttribute('data-full');
    cap.textContent = list[cur].getAttribute('data-caption') || '';
    img.alt = cap.textContent;
  }
  function open(btn) {
    var i = list.indexOf(btn);
    opener = btn;
    show(i < 0 ? 0 : i);
    box.classList.add('open');
    box.querySelector('.lb-close').focus();
    var multi = list.length > 1;
    box.querySelector('.lb-prev').style.display = multi ? '' : 'none';
    box.querySelector('.lb-next').style.display = multi ? '' : 'none';
  }
  function close() { box.classList.remove('open'); if (opener) opener.focus(); }

  shots.forEach(function (b) { b.addEventListener('click', function () { open(b); }); });
  box.querySelector('.lb-close').addEventListener('click', close);
  box.querySelector('.lb-prev').addEventListener('click', function () { show(cur - 1); });
  box.querySelector('.lb-next').addEventListener('click', function () { show(cur + 1); });
  box.addEventListener('click', function (ev) { if (ev.target === box) close(); });
  document.addEventListener('keydown', function (ev) {
    if (!box.classList.contains('open')) return;
    if (ev.key === 'Escape') close();
    else if (ev.key === 'ArrowLeft') show(cur - 1);
    else if (ev.key === 'ArrowRight') show(cur + 1);
  });
})();
