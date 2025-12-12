export function svgDataUri(label: string, opts?: { bg?: string; fg?: string }) {
  const bg = opts?.bg ?? "#f4f4f5";
  const fg = opts?.fg ?? "#18181b";
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="1200" viewBox="0 0 1200 1200">
  <rect width="1200" height="1200" fill="${bg}"/>
  <rect x="60" y="60" width="1080" height="1080" fill="none" stroke="${fg}" stroke-opacity="0.15" stroke-width="2"/>
  <text x="600" y="620" text-anchor="middle" font-family="ui-sans-serif, system-ui, -apple-system" font-size="44" fill="${fg}" fill-opacity="0.7">${escapeXml(
    label,
  )}</text>
</svg>`;

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function escapeXml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

