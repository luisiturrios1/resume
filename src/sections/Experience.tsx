import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { experiences } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';
export function Experience({ t, locale }: { t: Translate; locale: Locale }) {
  return (
    <section className="section experience-section" id="experience" aria-label={t('experience')}>
      <SectionHeading
        number="02"
        label={t('experience')}
        title={t('experienceIntro')}
        description={t('experienceDescription')}
      />
      <div className="experience-grid">
        <aside className="scale-card">
          <p className="eyebrow">
            <span className="status-dot" />
            {t('scaleLabel')}
          </p>
          <div className="scale-numbers">
            <span>50</span>
            <span className="scale-arrow" aria-hidden="true">
              ↗
            </span>
            <strong>350</strong>
          </div>
          <p className="scale-unit">{t('requests')}</p>
          <div className="scale-comparison" aria-hidden="true">
            <span style={{ width: `${(50 / 350) * 100}%` }} />
            <span />
          </div>
          <p className="scale-description">{t('scaleDescription')}</p>
          <div className="tags">
            <span>Kubernetes</span>
            <span>Amazon EKS</span>
          </div>
        </aside>
        <ol className="timeline">
          {experiences.map((entry, index) => (
            <li key={entry.id} className={index === 0 ? 'latest' : ''}>
              <div className="timeline-year">
                <span className="sr-only">{t('startYear')} </span>
                {entry.year}
                <span className="timeline-dot" />
              </div>
              <div className="timeline-content">
                <h3>{entry.employer}</h3>
                <p className="role">{t(entry.role)}</p>
                {entry.startMonth && (
                  <p className="job-period">
                    <time dateTime={`${entry.year}-${String(entry.startMonth).padStart(2, '0')}`}>
                      {Intl.DateTimeFormat(locale, {
                        month: 'long',
                        year: 'numeric',
                        timeZone: 'UTC',
                      }).format(new Date(Date.UTC(entry.year, entry.startMonth - 1, 1)))}
                    </time>
                    {entry.current && ` — ${t('present')}`}
                  </p>
                )}
                {entry.description && <p className="job-description">{t(entry.description)}</p>}
                {entry.technologies.length > 0 && (
                  <ul className="job-technologies" aria-label={t('technology')}>
                    {entry.technologies.map((tech) => (
                      <li key={tech}>{tech}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
