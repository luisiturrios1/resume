import type { TranslationKey } from '../i18n';

export const product = {
  name: 'Desierto de Altar GPS',
  website: 'https://desierto-de-altar-gps.web.app',
  appStore: 'https://apps.apple.com/app/id6788148149',
  googlePlay: 'https://play.google.com/store/apps/details?id=com.iturriosdev.desiertodealtar',
  // Updated résumé and explicit owner confirmation in the redesign brief.
  monthlyActiveUsers: 3000,
};

export const productChapters: {
  id: string;
  title: TranslationKey;
  body: TranslationKey;
  detail: TranslationKey;
  image: string;
  alt: TranslationKey;
}[] = [
  {
    id: 'offline',
    title: 'offlineTitle',
    body: 'offlineBody',
    detail: 'offlineDetail',
    image: 'downloads',
    alt: 'offlineAlt',
  },
  {
    id: 'routes',
    title: 'routesTitle',
    body: 'routesBody',
    detail: 'routesDetail',
    image: 'route',
    alt: 'routesAlt',
  },
  {
    id: 'places',
    title: 'placesTitle',
    body: 'placesBody',
    detail: 'placesDetail',
    image: 'poi',
    alt: 'placesAlt',
  },
];

export const transformation: { title: TranslationKey; body: TranslationKey }[] = [
  { title: 'challengeTitle', body: 'challengeBody' },
  { title: 'legacyTitle', body: 'legacyBody' },
  { title: 'ownershipTitle', body: 'ownershipBody' },
  { title: 'transformationTitle', body: 'transformationBody' },
  { title: 'selfServiceTitle', body: 'selfServiceBody' },
  { title: 'autonomyTitle', body: 'autonomyBody' },
  { title: 'impactTitle', body: 'impactBody' },
];

export const sourceSteps: { label: TranslationKey; detail: string }[] = [
  { label: 'authenticate', detail: 'Fiel → Autenticacion' },
  { label: 'requestInvoices', detail: 'CFDI / Metadata' },
  { label: 'verifyRequest', detail: 'VerificaSolicitudDescarga' },
  { label: 'downloadPackages', detail: 'DescargaMasiva → ZIP' },
];
