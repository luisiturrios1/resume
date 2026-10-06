import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { Icon } from '../components/Icon';
import { ResumeLink } from '../components/ResumeLink';
export function Hero({ t, locale }: { t: Translate; locale: Locale }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-topline">
        <span className="eyebrow">
          <span className="tiny-cross" aria-hidden="true">
            +
          </span>{' '}
          {t('role')}
        </span>
        <span className="hero-coordinate" aria-hidden="true">
          Flutter · Swift · iOS
        </span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="hero-name">Luis Iturrios</p>
          <h1 id="hero-title">
            {t('heroFirst')}
            <br />
            <span>{t('heroSecond')}</span>
          </h1>
          <p className="hero-description">{t('heroDescription')}</p>
          <div className="hero-actions">
            <a href="#projects" className="button primary">
              {t('viewWork')}
              <Icon name="arrow" size={17} />
            </a>
            <ResumeLink t={t} locale={locale} />
          </div>
        </div>
        <div className="system-visual" role="img" aria-label={t('diagramLabel')}>
          <div className="visual-top">
            <span>{t('engineering')}</span>
            <span aria-hidden="true">01 — 03</span>
          </div>
          <div className="stack-item stack-product">
            <span className="stack-index">01</span>
            <div>
              <strong>{t('layerProduct')}</strong>
              <span>Flutter · Dart · iOS · Android</span>
            </div>
            <Icon name="code" size={24} />
          </div>
          <div className="stack-connector" aria-hidden="true">
            <span />
            <span>↓</span>
          </div>
          <div className="stack-item stack-platform">
            <span className="stack-index">02</span>
            <div>
              <strong>{t('layerPlatform')}</strong>
              <span>Swift · ActivityKit · Kotlin</span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 5h7v6H3Zm11 8h7v6h-7ZM6 11v5h8M10 8h7v5" />
            </svg>
          </div>
          <div className="stack-connector" aria-hidden="true">
            <span />
            <span>↓</span>
          </div>
          <div className="stack-item stack-infra">
            <span className="stack-index">03</span>
            <div>
              <strong>{t('layerInfrastructure')}</strong>
              <span>Firebase · AWS · CI/CD</span>
            </div>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="m12 3 9 5-9 5-9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" />
            </svg>
          </div>
          <div className="visual-bottom">
            <span aria-hidden="true" className="visual-dots">
              ● ● ●
            </span>
            <span>{t('heroNote')}</span>
          </div>
        </div>
      </div>
      <div className="hero-foot">
        <span className="micro-label">{t('technology')}</span>
        <div>
          {['Flutter', 'Dart', 'Swift', 'ActivityKit', 'Mapbox', 'Firebase'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <a href="#projects" className="scroll-arrow" aria-label={t('viewWork')}>
          ↓
        </a>
      </div>
    </section>
  );
}
