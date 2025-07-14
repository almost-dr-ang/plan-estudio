document.addEventListener('DOMContentLoaded', () => {
  const botones = document.querySelectorAll('.ramo');

  // Construir un mapa de dependencias inversas: qué ramos dependen de cuál
  const dependencias = {};
  const requisitos = {};

  botones.forEach(boton => {
    const id = boton.dataset.id;
    const targets = boton.dataset.targets ? boton.dataset.targets.split(',').map(t => t.trim()) : [];

    requisitos[id] = targets;

    targets.forEach(target => {
      if (!dependencias[target]) {
        dependencias[target] = [];
      }
      dependencias[target].push(id);
    });
  });

  const getEstado = (id) => {
    const boton = document.querySelector(`.ramo[data-id="${id}"]`);
    return boton.classList.contains('aprobado');
  };

  const actualizarEstado = () => {
    botones.forEach(boton => {
      const id = boton.dataset.id;
      const reqs = requisitos[id];

      if (reqs.length === 0 || reqs.every(getEstado)) {
        boton.classList.remove('bloqueado');
      } else {
        if (!boton.classList.contains('aprobado')) {
          boton.classList.add('bloqueado');
        }
      }
    });
  };

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const id = boton.dataset.id;

      // Ignora si está bloqueado
      if (boton.classList.contains('bloqueado')) return;

      // Toggle estado
      boton.classList.toggle('aprobado');

      // Actualiza todos los ramos que dependen de este
      actualizarEstado();
    });
  });

  // Inicializa el estado una vez cargado
  actualizarEstado();
});
