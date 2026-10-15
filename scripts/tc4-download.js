/**
 * Resolve translationCore 4 download buttons to real release assets via the GitHub API.
 * Without JS, or if the API fails, buttons keep their href (the Releases page) and the
 * static install notes stay as written.
 * Picks the newest non-draft release; set PREFER_STABLE = true once v4.0.0 ships
 * to use only full releases (falls back to the newest prerelease if none exist).
 */
(async () => {
  const REPO = 'unfoldingWord/translationCore4';
  const PREFER_STABLE = false;
  const PATTERNS = {
    windows: /windows-x64.*\.exe$/i,
    macos:   /macos-arm64.*\.pkg$/i,
    linux:   /linux-x64.*\.zip$/i,
  };
  const links = document.querySelectorAll('[data-tc4-asset]');
  if (!links.length) return;
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=10`);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const all = (await res.json()).filter(r => !r.draft);
    const release = (PREFER_STABLE && all.find(r => !r.prerelease)) || all[0];
    if (!release) return;
    links.forEach(link => {
      const p = PATTERNS[link.dataset.tc4Asset];
      const asset = p && release.assets.find(a => p.test(a.name));
      if (asset) { link.href = asset.browser_download_url; link.title = asset.name; }
    });
    document.querySelectorAll('[data-tc4-version]').forEach(el => {
      el.textContent = release.tag_name + (release.prerelease ? ' (pre-release)' : '');
    });
    // Test builds are unsigned on Windows: swap in the SmartScreen note.
    const winAsset = release.assets.find(a => PATTERNS.windows.test(a.name));
    if (release.prerelease || (winAsset && /unsigned/i.test(winAsset.name))) {
      document.querySelectorAll('[data-tc4-windows-note]').forEach(el => {
        el.innerHTML = '<strong>Windows:</strong> test builds are not signed yet. ' +
          'If Windows SmartScreen warns you on first launch, choose <em>More info</em>, then <em>Run anyway</em>.';
      });
    }
    document.querySelectorAll('[data-tc4-notes]').forEach(el => { el.href = release.html_url; });
  } catch (e) {
    console.warn('Could not fetch translationCore 4 releases:', e);
  }
})();
