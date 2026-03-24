(async () => {
  const btn = document.getElementById('tc-download-btn');
  if (!btn) return;

  // Detect OS
  const ua = navigator.userAgent;
  let platform = 'unknown';
  if (/Win/i.test(ua)) platform = 'win';
  else if (/Mac/i.test(ua)) platform = 'mac';
  else if (/Linux/i.test(ua)) platform = 'linux';

  // Fetch latest LITE release from GitHub
  let downloadUrl = null;
  let version = null;
  try {
    const res = await fetch('https://api.github.com/repos/unfoldingWord/translationCore/releases?per_page=10');
    const releases = await res.json();
    const liteRelease = releases.find(r => r.tag_name.toLowerCase().includes('-lite'));
    if (liteRelease) {
      version = liteRelease.tag_name;
      const assets = liteRelease.assets;
      if (platform === 'win') {
        const asset = assets.find(a => /tC-win-x64/i.test(a.name) && /LITE/i.test(a.name));
        downloadUrl = asset?.browser_download_url;
      } else if (platform === 'mac') {
        const asset = assets.find(a => /tC-macos-universal/i.test(a.name) && /LITE/i.test(a.name));
        downloadUrl = asset?.browser_download_url;
      } else if (platform === 'linux') {
        const asset = assets.find(a => /tC-linux-x64/i.test(a.name) && /LITE/i.test(a.name));
        downloadUrl = asset?.browser_download_url;
      }
    }
  } catch (e) {
    // fall through to fallback
  }

  if (downloadUrl) {
    btn.href = downloadUrl;
    btn.setAttribute('download', '');
    const status = document.querySelector('.hero-status');
    if (status && version) status.textContent = `Latest: ${version} — Windows, macOS, Linux`;
  } else {
    btn.href = 'https://github.com/unfoldingWord/translationCore/releases';
    btn.removeAttribute('download');
  }
})();
