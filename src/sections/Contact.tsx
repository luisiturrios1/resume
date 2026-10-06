import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { profile } from '../data/profile';
import { Icon } from '../components/Icon';
import { ResumeLink } from '../components/ResumeLink';
export function Contact({ t, locale }: { t: Translate; locale: Locale }) {
  return (
    <section className="contact-section" id="contact" aria-labelledby="contact-title">
      <div>
        <p className="eyebrow">05 / {t('contact')}</p>
        <h2 id="contact-title">{t('contactTitle')}</h2>
        <p>{t('contactDescription')}</p>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
          <Icon name="external" size={25} />
        </a>
      </div>
      <div className="contact-links">
        <a href={profile.github}>
          <Icon name="github" />
          GitHub
          <Icon name="external" size={15} />
        </a>
        <a href={profile.linkedin}>
          <Icon name="linkedin" />
          LinkedIn
          <Icon name="external" size={15} />
        </a>
        <ResumeLink locale={locale} t={t} className="button contact-resume" />
      </div>
    </section>
  );
}
