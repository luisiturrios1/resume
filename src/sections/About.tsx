import type { Translate } from '../i18n';
import { education } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

export function About({ t }: { t: Translate }) {
  return (
    <section className="section about-section" id="about" aria-label={t('about')}>
      <SectionHeading number="05" label={t('about')} title={t('aboutTitle')} />
      <div className="about-grid">
        <div className="about-copy">
          <p className="lead-copy">{t('aboutText')}</p>
          <h3>{t('philosophyTitle')}</h3>
          <p>{t('philosophyBody')}</p>
          <p className="location">
            <span aria-hidden="true">↗</span>
            {t('location')}
          </p>
          <p className="discipline-list">{t('engineeringScope')}</p>
        </div>
        <div className="education">
          <h3 className="eyebrow">{t('education')}</h3>
          {education.map((entry) => (
            <div className="education-entry" key={entry.qualification}>
              <h4>{t(entry.qualification)}</h4>
              <p>{entry.institution}</p>
              {entry.qualification === 'awsSolutionsArchitect' && (
                <>
                  <p className="muted">{t('awsPeriod')}</p>
                  <a
                    className="text-link"
                    href="https://www.credly.com/badges/1b5cb384-a727-4694-bd25-77196f016aa3/linked_in_profile"
                  >
                    {t('credential')}
                    <Icon name="external" size={14} />
                  </a>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
