import type { Translate, TranslationKey } from '../i18n';
import type { OpenSourceProject } from '../data/types';
import data from '../data/open-source.json';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
const repositories: OpenSourceProject[] = data.map((repo) => ({
  ...repo,
  description: repo.description as TranslationKey,
}));
export function OpenSource({ t, locale }: { t: Translate; locale: string }) {
  return (
    <section className="section source-section" id="openSource" aria-label={t('openSource')}>
      <SectionHeading
        number="03"
        label={t('openSource')}
        title={t('sourceIntro')}
        description={t('sourceDescription')}
      />
      {repositories.map((repo) => (
        <article className="source-card" key={repo.id}>
          <div className="source-repo-icon">
            <Icon name="github" size={28} />
          </div>
          <div className="source-copy">
            <div className="source-name">
              <h3>
                <a href={repo.repository}>{repo.name}</a>
              </h3>
              <span className="source-badge">{t('maintainer')}</span>
            </div>
            <p>{t(repo.description)}</p>
            <a href={repo.repository} className="text-link">
              {t('source')}
              <Icon name="external" size={15} />
            </a>
          </div>
          <div className="repo-metadata">
            <dl>
              {[
                [
                  t('stars'),
                  repo.stars === null
                    ? t('unavailable')
                    : Intl.NumberFormat(locale).format(repo.stars),
                ],
                [t('release'), repo.release ?? t('unavailable')],
                [t('languageStat'), repo.language],
                [t('license'), repo.license],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p>
              {t('snapshot')} ·{' '}
              {Intl.DateTimeFormat(locale, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                timeZone: 'America/Mexico_City',
              }).format(new Date(repo.fetchedAt))}
            </p>
          </div>
        </article>
      ))}
    </section>
  );
}
