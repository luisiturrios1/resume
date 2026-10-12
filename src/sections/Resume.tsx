import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { ResumeLink } from '../components/ResumeLink';
import { Icon } from '../components/Icon';
export function Resume({ t, locale }: { t: Translate; locale: Locale }) {
  return (
    <section className="resume-section" id="resume" aria-labelledby="resume-title">
      <div className="resume-icon" aria-hidden="true">
        <Icon name="download" size={32} />
      </div>
      <div>
        <p className="eyebrow">06 / {t('resume')}</p>
        <h2 id="resume-title">{t('resumeTitle')}</h2>
        <p>{t('resumeDescription')}</p>
        <span className="resume-meta">{t('resumeMeta')}</span>
      </div>
      <ResumeLink t={t} locale={locale} className="button primary" />
    </section>
  );
}
