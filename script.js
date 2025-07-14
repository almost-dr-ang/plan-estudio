document.addEventListener('DOMContentLoaded', () => {
  const ramos = document.querySelectorAll('.ramo');

  ramos.forEach(boton => {
    boton.addEventListener('click', () => {
      // Evita que se interactúe con ramos bloqueados
      if (boton.classList.contains('bloqueado') || boton.classList.contains('aprobado')) return;

      // Marca como aprobado
      boton.classList.add('aprobado');

      // Obtiene los IDs de los ramos que se desbloquean
      const targets = boton.dataset.targets;
      if (targets) {
        const ids = targets.split(',').map(id => id.trim());
        ids.forEach(id => {
          const siguiente = document.querySelector(`.ramo[data-id="${id}"]`);
          if (siguiente && siguiente.classList.contains('bloqueado')) {
            siguiente.classList.remove('bloqueado');
          }
        });
      }
    });
  });
});
