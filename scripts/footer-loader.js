document.addEventListener('DOMContentLoaded', () => {
  const footerElement = document.getElementById('site-footer');
  if (footerElement) {
    footerElement.innerHTML = `
      <div class="footer-columns">
        <div class="footer-brand">
          <div class="footer-brand-row">
            <img src="/assets/images/tc_logo.png" alt="translationCore">
            <span>translationCore&reg;</span>
          </div>
          <p>translationCore&reg; is a project of unfoldingWord.</p>
        </div>

        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="/translation-helps/">Translation Notes</a></li>
            <li><a href="/translation-helps/">Translation Words</a></li>
            <li><a href="/translation-helps/">Key Terms</a></li>
            <li><a href="/translation-helps/">Study Resources</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>translationCore&reg; App</h4>
          <ul>
            <li><a href="/translationcore/">translationCore&reg;</a></li>
            <li><a href="https://github.com/unfoldingWord/translationCore/releases" target="_blank" rel="noopener">Release Notes</a></li>
            <li><a href="https://github.com/unfoldingWord/translationCore" target="_blank" rel="noopener">GitHub</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>Support</h4>
          <ul>
            <li><a href="https://foundationsbt.com" target="_blank" rel="noopener">Foundations BT</a></li>
            <li><a href="https://forum.door43.org/c/software/translationcore" target="_blank" rel="noopener">Community Forum</a></li>
            <li><a href="https://unfoldingword.org" target="_blank" rel="noopener">About unfoldingWord</a></li>
          </ul>
        </div>
      </div>

      <hr class="footer-divider">

      <div class="footer-bottom">
        <p>License: CC BY-SA 4.0</p>
      </div>
    `;
  }
});
