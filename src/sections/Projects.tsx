import type { Translate } from '../i18n';
import { projects } from '../data/profile';
import repositories from '../data/open-source.json';
import metrics from '../data/app-metrics.json';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
export function Projects({ t }: { t: Translate }) {
  const [desert, python] = projects;
  const repo = repositories[0];
  const base = import.meta.env.BASE_URL;
  return (
    <section id="projects" className="section projects-section" aria-label={t('projects')}>
      <SectionHeading
        number="01"
        label={t('selectedWork')}
        title={t('workIntro')}
        description={t('workDescription')}
      />
      <div className="project-grid">
        <article className="project-card desert-card">
          <div className="project-visual desert-visual">
            <img
              className="desert-image"
              src={`${base}images/desert.webp`}
              alt=""
              width="1774"
              height="887"
              loading="lazy"
            />
            <div className="desert-visual-title">
              <span>
                Desierto
                <br />
                de Altar<span className="desert-gps">GPS</span>
              </span>
              <span className="desert-symbol" aria-hidden="true">
                ↗
              </span>
            </div>
            <img
              className="app-screen"
              src={`${base}images/app-map.webp`}
              srcSet={`${base}images/app-map-small.webp 402w, ${base}images/app-map.webp 604w`}
              sizes="(max-width: 600px) 114px, 122px"
              width="604"
              height="1313"
              alt={t('screenshot')}
              loading="lazy"
            />
            <span className="capture-caption">{t('screenshotCaption')}</span>
          </div>
          <div className="project-body">
            <p className="eyebrow">
              <span className="status-dot" />
              {t('productLabel')}
            </p>
            <h3>{desert.name}</h3>
            <p>{t(desert.description)}</p>
            <ul className="project-technologies" aria-label={t('technology')}>
              {desert.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
            <div className="project-links">
              <a href={desert.url} target="_blank" rel="noreferrer" className="text-link">
                {t('launch')}
                <Icon name="external" size={17} />
              </a>
            </div>
            <section className="app-metrics" aria-label={t('productMetrics')}>
              <h4>{t('productMetrics')}</h4>
              <dl className="app-metrics-grid">
                <div>
                  <dd>{metrics.analytics.activeUsersRounded}</dd>
                  <dt>{t('activeUsersMetric')}</dt>
                </div>
                <div>
                  <dd>{metrics.analytics.engagement}</dd>
                  <dt>{t('engagementMetric')}</dt>
                </div>
                <div>
                  <dd>{metrics.appStore.rating}/5</dd>
                  <dt>
                    <a href={metrics.appStore.url} target="_blank" rel="noreferrer">
                      App Store ↗
                    </a>
                    <br />
                    {metrics.appStore.ratings} {t('appStoreRatings')}
                  </dt>
                </div>
                <div>
                  <dd>{metrics.googlePlay.rating}/5</dd>
                  <dt>
                    <a href={metrics.googlePlay.url} target="_blank" rel="noreferrer">
                      Google Play ↗
                    </a>
                    <br />
                    {metrics.googlePlay.reviews} {t('playStoreReviews')}
                  </dt>
                </div>
                <div>
                  <dd>{metrics.googlePlay.downloads}</dd>
                  <dt>{t('androidDownloads')}</dt>
                </div>
              </dl>
              <p className="metrics-note">{t('metricsNote')}</p>
            </section>
            <div className="native-proof">
              <h4>{t('nativeEngineering')}</h4>
              <p>{t('nativeEngineeringText')}</p>
            </div>
            <details className="case-details">
              <summary>
                {t('caseStudy')}
                <span aria-hidden="true">+</span>
              </summary>
              <div className="case-content">
                {desert.caseStudy?.map((section) => (
                  <div key={section.heading}>
                    <h4>{t(section.heading)}</h4>
                    <p>{t(section.content)}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        </article>
        <article className="project-card python-card">
          <div className="project-visual python-visual">
            <svg
              className="python-watermark"
              viewBox="0 0 400 200"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              aria-hidden="true"
            >
              <path d="M120 20H90q-15 0-15 15v40q0 25-25 25 25 0 25 25v40q0 15 15 15h30M280 20h30q15 0 15 15v40q0 25 25 25-25 0-25 25v40q0 15-15 15h-30" />
            </svg>
            <span className="python-small-label">PYTHON / CFDI</span>
            <div className="python-logo" aria-hidden="true">
              <svg viewBox="0 0 90 90" fill="none">
                <path
                  d="M45 13H27c-8 0-12 5-12 12v10h29v5H12C4 40 0 45 0 53v9c0 8 5 13 13 13h10V61c0-8 5-13 13-13h25c7 0 12-5 12-12V25c0-8-5-12-12-12H45Z"
                  fill="#a9bea6"
                />
                <path
                  d="M45 77h18c8 0 12-5 12-12V55H46v-5h32c8 0 12-5 12-13v-9c0-8-5-13-13-13H67v14c0 8-5 13-13 13H29c-7 0-12 5-12 12v11c0 8 5 12 12 12h16Z"
                  fill="#e3e8de"
                  transform="translate(0 8)"
                />
                <circle cx="29" cy="24" r="3" fill="#29352b" />
                <circle cx="61" cy="73" r="3" fill="#29352b" />
              </svg>
            </div>
            <div className="python-visual-text">
              <strong>python-cfdiclient</strong>
              <span>pip install cfdiclient</span>
            </div>
            <span className="python-visual-tag">{t('openSource')}</span>
          </div>
          <div className="project-body">
            <p className="eyebrow">
              <Icon name="github" size={14} />
              {t('maintainer')}
            </p>
            <h3>{python.name}</h3>
            <p>{t(python.description)}</p>
            <div className="project-mini-stats">
              <span>
                <Icon name="star" size={15} />
                {repo.stars} <span>{t('stars')}</span>
              </span>
              <span>{repo.language}</span>
              <span>{repo.license}</span>
            </div>
            <div className="project-links">
              <a href={python.url} target="_blank" rel="noreferrer" className="text-link">
                {t('source')}
                <Icon name="external" size={17} />
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
