export function Icon({
  name,
  size = 18,
}: {
  name:
    | 'arrow'
    | 'external'
    | 'download'
    | 'github'
    | 'linkedin'
    | 'sun'
    | 'moon'
    | 'menu'
    | 'close'
    | 'star'
    | 'globe'
    | 'mail'
    | 'code';
  size?: number;
}) {
  const paths = {
    arrow: 'M4 12h16m-6-6 6 6-6 6',
    external: 'M6 18 18 6M6 6h12v12',
    download: 'M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4',
    github:
      'M9 19c-5 1-5-2-7-3m14 5v-4c0-1-.3-2-1-3 3-.3 6-1.5 6-6a5 5 0 0 0-1-3c0-1 0-3-1-4-2 0-3 1-4 2a13 13 0 0 0-6 0C8 2 6 1 4 1c-1 1-1 3-1 4a5 5 0 0 0-1 3c0 4.5 3 5.7 6 6-.7 1-1 2-1 3v4',
    linkedin: 'M5 9v11M5 4v.1M10 20V9h4v2c1-3 6-3 6 2v7M14 20v-7',
    sun: 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
    moon: 'M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11',
    menu: 'M4 7h16M4 12h16M4 17h16',
    close: 'm6 6 12 12M6 18 18 6',
    star: 'm12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2-5.5-3-5.5 3 1-6.2L3 9.6l6.2-.9Z',
    globe: 'M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18',
    mail: 'M3 5h18v14H3ZM3 5l9 7 9-7',
    code: 'm8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16',
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
