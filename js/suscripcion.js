(function () {
  var EMAILJS_PUBLIC_KEY  = 'HKiIThGpeT7T6eLPK';
  var EMAILJS_SERVICE_ID  = 'service_blppxsc';
  var EMAILJS_TEMPLATE_ID = 'template_h4n4lcg';

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  var form = document.getElementById('form-suscripcion');
  if (!form) return;

  var btn       = form.querySelector('[type="submit"]');
  var successEl = form.querySelector('.form-success-msg');
  var errorEl   = form.querySelector('.form-error-msg');

  function showMsg(el, duration) {
    el.style.display = 'block';
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(function () { el.style.display = 'none'; }, duration || 6000);
  }

  form.querySelectorAll('[required]').forEach(function (field) {
    field.addEventListener('input', function () { this.classList.remove('is-invalid'); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var valid = true;
    form.querySelectorAll('[required]').forEach(function (field) {
      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });
    if (!valid) return;

    var originalLabel = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Enviando…';

    var params = {
      nombre:  document.getElementById('sus-nombre').value.trim(),
      email:   document.getElementById('sus-email').value.trim(),
      interes: document.getElementById('sus-interes').value || 'No especificado',
      sede:    document.getElementById('sus-sede').value    || 'No especificada',
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
      .then(function () {
        form.reset();
        showMsg(successEl, 7000);
      })
      .catch(function (err) {
        console.error('EmailJS error:', err);
        showMsg(errorEl, 6000);
      })
      .finally(function () {
        btn.disabled = false;
        btn.innerHTML = originalLabel;
      });
  });
})();
