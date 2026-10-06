import type { Translate } from '../i18n';
import { education, skillCategories } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
export function About({ t }: { t: Translate }) {
  return (
    <section className="section about-section" id="about" aria-label={t('about')}>
      <SectionHeading number="04" label={t('about')} title={t('aboutTitle')} />
      <div className="about-grid">
        <div className="about-copy">
          <p>{t('aboutText')}</p>
          <div className="location">
            <span aria-hidden="true">↗</span>
            {t('location')}
          </div>
          <div className="education">
            <h3 className="micro-label">{t('education')}</h3>
            {education.map((entry) => (
              <div key={entry.qualification} className="education-entry">
                <span className="min-w-6 shrink-0">{entry.year ?? ''}</span>
                <div>
                  <h4>{t(entry.qualification)}</h4>
                  <p>{entry.institution}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="technical-profile">
          <h3>{t('profile')}</h3>
          <p>{t('profileDescription')}</p>
          <div className="skill-grid">
            {skillCategories.map((group) => (
              <div className="skill-group" key={group.label}>
                <h4>{t(group.label)}</h4>
                <ul>
                  {group.technologies.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
