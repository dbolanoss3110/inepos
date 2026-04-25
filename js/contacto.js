(function () {

  var EMAILJS_PUBLIC_KEY  = 'HKiIThGpeT7T6eLPK';
  var EMAILJS_SERVICE_ID  = 'service_blppxsc';
  var EMAILJS_TEMPLATE_ID = 'template_5kukohc';

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

  var form = document.getElementById('form-contacto');
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

    var originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando…';

    var params = {
      nombre:        document.getElementById('con-nombre').value.trim(),
      email:         document.getElementById('con-email').value.trim(),
      telefono:      document.getElementById('con-telefono').value.trim(),
      tipo_consulta: document.getElementById('con-tipo').value,
      sede:          document.getElementById('con-sede').value,
      mensaje:       document.getElementById('con-mensaje').value.trim(),
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
        btn.textContent = originalLabel;
      });
  });
})();
