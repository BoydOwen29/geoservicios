document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.service-card');
  const detailPanel = document.getElementById('service-detail');
  const detailHeading = detailPanel?.querySelector('h3');
  const detailParagraph = detailPanel?.querySelector('p');
  const detailList = detailPanel?.querySelector('ul');
  const form = document.querySelector('.contact-form');
  const status = document.getElementById('form-status');

  const renderDetail = (card) => {
    if (!detailPanel || !card) {
      return;
    }
    const title = card.querySelector('h3')?.textContent ?? 'Servicio destacado';
    const detailText = card.dataset.detail ?? 'Seleccioná un servicio para conocer plazos, entregables y foco técnico.';
    const highlights = (card.dataset.highlights || '')
      .split(';')
      .map((item) => item.trim())
      .filter(Boolean);

    detailHeading && (detailHeading.textContent = title);
    detailParagraph && (detailParagraph.textContent = detailText);
    if (detailList) {
      detailList.innerHTML = highlights.length
        ? highlights.map((item) => `<li>${item}</li>`).join('')
        : '<li>El equipo responde en 24 hs con el resumen de pasos siguientes.</li>';
    }
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      cards.forEach((item) => item.classList.remove('active'));
      card.classList.add('active');
      renderDetail(card);
    });
  });

  if (cards.length) {
    cards[0].classList.add('active');
    renderDetail(cards[0]);
  }

  const showStatus = (message) => {
    if (!status) {
      return;
    }
    status.textContent = message;
    status.classList.add('visible');
    clearTimeout(Number(status.dataset.timeout));
    const timer = setTimeout(() => status.classList.remove('visible'), 3200);
    status.dataset.timeout = String(timer);
  };

  form?.addEventListener('submit', (event) => {
    event.preventDefault();
    showStatus('Gracias por escribir. Te responderé con una propuesta preliminar en breve.');
    form.reset();
  });
});