function toggleRamo(ramoID) {
  const checkbox = document.querySelector(`#${ramoID} input[type="checkbox"]`);
  const aprobado = checkbox.checked;

  // Revisar todos los ramos para ver si deben desbloquearse
  document.querySelectorAll('.ramo').forEach(div => {
    const prereqs = div.dataset.prereqs;
    if (!prereqs) return;

    const prereqArray = prereqs.split(',');
    const fulfilled = prereqArray.every(id => {
      const cb = document.querySelector(`#${id} input[type="checkbox"]`);
      return cb && cb.checked;
    });

    const input = div.querySelector('input[type="checkbox"]');
    input.disabled = !fulfilled;
  });
}

