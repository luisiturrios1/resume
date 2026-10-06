import files from '../data/resumes.json';
import type { Translate } from '../i18n';
import { resumeUrl, type Locale } from '../utils/preferences';
import { Icon } from './Icon';
export function ResumeLink({
  locale,
  t,
  className = 'button secondary',
}: {
  locale: Locale;
  t: Translate;
  className?: string;
}) {
  const url = resumeUrl(locale, files, import.meta.env.BASE_URL);
  return url ? (
    <a href={url} download className={className}>
      {t('download')}
      <Icon name="download" size={16} />
    </a>
  ) : (
    <span className={className} title={t('resumeHelp')}>
      {t('resumePending')}
    </span>
  );
}
