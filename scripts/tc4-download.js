/**
 * Resolve translationCore 4 download buttons to real release assets via the GitHub API.
 * Without JS, or if the API fails, buttons keep their href (the Releases page) and the
 * static install notes stay as written (test builds note SmartScreen steps).
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
    let release;
    if (PREFER_STABLE) {
      try {
        const latestRes = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`);
        if (latestRes.ok) release = await latestRes.json();
      } catch (_) { /* fall back to release list */ }
    }
    if (!release) {
      const res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=10`);
      if (!res.ok) throw new Error(`GitHub API ${res.status}`);
      const all = (await res.json()).filter(r => !r.draft);
      release = (PREFER_STABLE && all.find(r => !r.prerelease)) || all[0];
    }
    if (!release) return;
    links.forEach(link => {
      const p = PATTERNS[link.dataset.tc4Asset];
      const asset = p && release.assets?.find(a => p.test(a.name));
      if (asset) { link.href = asset.browser_download_url; link.title = asset.name; }
    });
    document.querySelectorAll('[data-tc4-version]').forEach(el => {
      el.textContent = release.tag_name + (release.prerelease ? ' (pre-release)' : '');
    });
    // Static HTML defaults to the unsigned SmartScreen note. Once a signed stable build arrives, swap to signed.
    const winAsset = release.assets?.find(a => PATTERNS.windows.test(a.name));
    const isUnsigned = release.prerelease || (winAsset && /unsigned/i.test(winAsset.name));
    if (!isUnsigned) {
      document.querySelectorAll('[data-tc4-windows-note]').forEach(el => {
        el.innerHTML = '<strong>Windows:</strong> the installer is signed. Run it and follow the steps.';
      });
    }
    document.querySelectorAll('[data-tc4-notes]').forEach(el => { el.href = release.html_url; });
  } catch (e) {
    console.warn('Could not fetch translationCore 4 releases:', e);
  }
})();
