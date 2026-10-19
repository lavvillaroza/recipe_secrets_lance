// Recipe Secrets — shared behaviour: mobile nav, scroll fade-ins, reservation form validation.
(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- mobile nav toggle ---------- */
  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- fade-in on scroll ---------- */
  function initFadeIn() {
    var targets = document.querySelectorAll('.fade-in');
    if (!targets.length) return;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ---------- reservation form: time slots ---------- */
  function populateTimeSlots() {
    var select = document.getElementById('time');
    if (!select) return;

    var openHour = 17; // 5:00 PM
    var closeHour = 21.5; // last seating 9:30 PM

    for (var h = openHour; h <= closeHour; h += 0.5) {
      var hour24 = Math.floor(h);
      var minutes = h % 1 === 0 ? '00' : '30';
      var hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
      var period = hour24 < 12 ? 'AM' : 'PM';
      var label = hour12 + ':' + minutes + ' ' + period;
      var value = (hour24 < 10 ? '0' + hour24 : hour24) + ':' + minutes;

      var option = document.createElement('option');
      option.value = value;
      option.textContent = label;
      select.appendChild(option);
    }
  }

  /* ---------- reservation form: validation + submit ---------- */
  function initReservationForm() {
    var form = document.getElementById('reservation-form');
    if (!form) return;

    var dateInput = document.getElementById('date');
    if (dateInput) {
      var today = new Date();
      var yyyy = today.getFullYear();
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var dd = String(today.getDate()).padStart(2, '0');
      dateInput.min = yyyy + '-' + mm + '-' + dd;
    }

    var successBox = document.getElementById('form-success');

    function showError(field, message) {
      var group = field.closest('.form-group');
      if (!group) return;
      group.classList.add('has-error');
      var errorEl = group.querySelector('.error-message');
      if (errorEl) errorEl.textContent = message;
    }

    function clearError(field) {
      var group = field.closest('.form-group');
      if (!group) return;
      group.classList.remove('has-error');
    }

    function validateField(field) {
      field.dataset.touched = 'true';
      var value = field.value.trim();

      if (field.hasAttribute('required') && !value) {
        showError(field, 'This field is required.');
        return false;
      }

      if (field.type === 'email' && value) {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
          showError(field, 'Enter a valid email address.');
          return false;
        }
      }

      if (field.type === 'tel' && value) {
        var digits = value.replace(/\D/g, '');
        if (digits.length < 7) {
          showError(field, 'Enter a valid phone number.');
          return false;
        }
      }

      if (field.id === 'date' && value) {
        var selected = new Date(value + 'T00:00:00');
        var todayMidnight = new Date();
        todayMidnight.setHours(0, 0, 0, 0);
        if (selected < todayMidnight) {
          showError(field, 'Please choose today or a future date.');
          return false;
        }
      }

      if (field.id === 'party-size' && value) {
        var num = Number(value);
        if (num < 1 || num > 10) {
          showError(field, 'Party size must be between 1 and 10.');
          return false;
        }
      }

      clearError(field);
      return true;
    }

    var fields = form.querySelectorAll('input[required], select[required], input[type="email"], input[type="tel"], #party-size, #date');

    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.dataset.touched === 'true') validateField(field);
      });
    });

    form.addEventListener('submit', function (event) {
      var isValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) isValid = false;
      });

      if (!isValid) {
        event.preventDefault();
        var firstError = form.querySelector('.has-error input, .has-error select');
        if (firstError) firstError.focus();
        return;
      }

      // Let Formspree handle the actual network submission via fetch,
      // then show an inline success message instead of navigating away.
      event.preventDefault();

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
        .then(function () {
          form.reset();
          if (successBox) {
            successBox.classList.add('visible');
            successBox.setAttribute('role', 'status');
            successBox.focus();
          }
        })
        .catch(function () {
          if (successBox) {
            successBox.textContent =
              'Something went wrong sending your request. Please call us directly to reserve.';
            successBox.classList.add('visible');
          }
        });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initNavToggle();
    initFadeIn();
    populateTimeSlots();
    initReservationForm();
  });
})();
