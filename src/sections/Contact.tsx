import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { profile } from '../data/profile';
import { Icon } from '../components/Icon';
import { ResumeLink } from '../components/ResumeLink';
export function Contact({ t, locale }: { t: Translate; locale: Locale }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <p className="eyebrow">07 / {t('contact')}</p>
      <div className="contact-grid">
        <div>
          <h2 id="contact-title">{t('contactTitle')}</h2>
          <p>{t('contactDescription')}</p>
          <a className="contact-email" href={`mailto:${profile.email}`}>
            {profile.email}
            <Icon name="external" size={25} />
          </a>
        </div>
        <div className="contact-links">
          <a href={profile.github}>
            GitHub
            <Icon name="external" />
          </a>
          <a href={profile.linkedin}>
            LinkedIn
            <Icon name="external" />
          </a>
          <ResumeLink locale={locale} t={t} className="text-link" />
        </div>
      </div>
    </section>
  );
}
