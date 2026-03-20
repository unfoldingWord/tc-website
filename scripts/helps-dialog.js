document.addEventListener('DOMContentLoaded', () => {
  const helpsTrigger = document.getElementById('download-helps');
  const helpsDialog = document.getElementById('helps-dialog');
  const helpsCloseButtons = helpsDialog ? helpsDialog.querySelectorAll('[data-helps-close]') : [];
  const helpsSelect = helpsDialog ? helpsDialog.querySelector('#book-select') : null;
  const helpsMessage = helpsDialog ? helpsDialog.querySelector('#download-message') : null;
  let lastFocusedElement = null;

  const isDialogOpen = () => Boolean(helpsDialog && !helpsDialog.hasAttribute('hidden'));

  const closeHelpsDialog = () => {
    if (!helpsDialog) return;
    helpsDialog.classList.remove('is-open');
    helpsDialog.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('dialog-open');
    setTimeout(() => {
      if (helpsDialog.getAttribute('aria-hidden') === 'true') {
        helpsDialog.setAttribute('hidden', '');
      }
    }, 180);

    if (helpsTrigger) {
      helpsTrigger.setAttribute('aria-expanded', 'false');
    }

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  };

  const openHelpsDialog = () => {
    if (!helpsDialog) return;
    lastFocusedElement = document.activeElement;
    helpsDialog.removeAttribute('hidden');
    helpsDialog.setAttribute('aria-hidden', 'false');
    document.body.classList.add('dialog-open');
    requestAnimationFrame(() => {
      helpsDialog.classList.add('is-open');
    });

    if (helpsTrigger) {
      helpsTrigger.setAttribute('aria-expanded', 'true');
    }

    if (helpsSelect) {
      helpsSelect.selectedIndex = 0;
      helpsSelect.focus();
    }

    if (helpsMessage) {
      helpsMessage.textContent = '';
    }
  };

  if (helpsTrigger && helpsDialog) {
    helpsTrigger.addEventListener('click', (event) => {
      event.preventDefault();
      openHelpsDialog();
    });

    helpsCloseButtons.forEach((button) => {
      button.addEventListener('click', () => {
        closeHelpsDialog();
      });
    });

    helpsDialog.addEventListener('click', (event) => {
      if (event.target && event.target.hasAttribute('data-helps-close')) {
        closeHelpsDialog();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isDialogOpen()) {
        closeHelpsDialog();
      }
    });
  }
});
