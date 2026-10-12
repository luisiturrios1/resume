import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import type { Experience as ExperienceRecord } from '../data/types';
import { experiences } from '../data/profile';
import { SectionHeading } from '../components/SectionHeading';

function Period({ entry, locale, t }: { entry: ExperienceRecord; locale: Locale; t: Translate }) {
  const date = (year: number, month = 1) =>
    Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(
      new Date(Date.UTC(year, month - 1, 1)),
    );
  return (
    <span className="job-period">
      <time dateTime={`${entry.year}-${String(entry.startMonth ?? 1).padStart(2, '0')}`}>
        {date(entry.year, entry.startMonth)}
      </time>{' '}
      —{' '}
      {entry.current ? (
        t('present')
      ) : entry.endYear ? (
        <time dateTime={`${entry.endYear}-${String(entry.endMonth ?? 1).padStart(2, '0')}`}>
          {date(entry.endYear, entry.endMonth)}
        </time>
      ) : (
        ''
      )}
    </span>
  );
}
export function Experience({ t, locale }: { t: Translate; locale: Locale }) {
  const aloi = experiences[0];
  const kueski = experiences.filter((entry) => entry.employer === 'Kueski');
  const earlier = experiences
    .filter((entry) => entry.employer !== 'Kueski' && entry.id !== 'aloi')
    .sort((a, b) => b.year - a.year);
  return (
    <section
      className="section experience-section"
      id="experience"
      aria-label={t('experience')}
      lang={locale}
    >
      <SectionHeading
        number="04"
        label={t('experience')}
        title={t('experienceIntro')}
        description={t('experienceDescription')}
      />
      <div className="career-row">
        <span className="career-year">2025—</span>
        <div>
          <div className="career-heading">
            <h3>{aloi.employer}</h3>
            <span className="current-label">
              <span className="status-dot" />
              {t('present')}
            </span>
          </div>
          <h4>{t(aloi.role)}</h4>
          <Period entry={aloi} t={t} locale={locale} />
          {aloi.description && <p>{t(aloi.description)}</p>}
        </div>
      </div>
      <div className="career-row kueski-career">
        <span className="career-year">2021—2025</span>
        <div>
          <h3>Kueski</h3>
          <p className="career-subtitle">{t('kueskiCareer')}</p>
          <ol className="role-progression">
            {kueski.map((entry) => (
              <li key={entry.id}>
                <h4>{t(entry.role)}</h4>
                <Period entry={entry} t={t} locale={locale} />
              </li>
            ))}
          </ol>
          <p>{t('staffText')}</p>
          <a href="#engineering" className="text-link">
            {t('engineeringImpact')} ↗
          </a>
        </div>
      </div>
      <details className="earlier-career" open>
        <summary>
          {t('earlierExperience')}
          <span aria-hidden="true">↓</span>
        </summary>
        <ol>
          {earlier.map((entry) => (
            <li key={entry.id}>
              <span className="career-year">{entry.year}</span>
              <div>
                <h3>{entry.employer}</h3>
                <h4>{t(entry.role)}</h4>
                <Period entry={entry} t={t} locale={locale} />
                {entry.description && <p>{t(entry.description)}</p>}
              </div>
            </li>
          ))}
        </ol>
      </details>
    </section>
  );
}
