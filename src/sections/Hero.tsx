import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { Icon } from '../components/Icon';
import { ResumeLink } from '../components/ResumeLink';
import { profile } from '../data/profile';

export function Hero({ t, locale }: { t: Translate; locale: Locale }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-topline eyebrow">
        <span>
          <span className="status-dot" /> {t('heroIdentity')}
        </span>
        <span className="hero-edition">{t('portfolioEdition')}</span>
      </div>
      <div className="hero-heading">
        <h1 id="hero-title">
          {t('heroFirst')}
          <br />
          <span>{t('heroSecond')}</span>
        </h1>
        <div className="hero-symbol" aria-hidden="true">
          <svg viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="82" />
            <ellipse cx="100" cy="100" rx="82" ry="32" transform="rotate(-35 100 100)" />
            <ellipse cx="100" cy="100" rx="32" ry="82" transform="rotate(-35 100 100)" />
            <path d="M100 6v188M6 100h188" />
            <circle className="orbit-dot" cx="167" cy="53" r="6" />
          </svg>
          <span>{t('buildConnectEnable')}</span>
        </div>
      </div>
      <div className="hero-bottom">
        <div className="hero-copy">
          <p className="hero-description">{t('heroDescription')}</p>
          <div className="hero-actions">
            <a href="#projects" className="button primary">
              {t('viewWork')} <Icon name="arrow" />
            </a>
            <ResumeLink t={t} locale={locale} className="text-link" />
            <a href={profile.github} className="text-link">
              GitHub <Icon name="external" size={15} />
            </a>
            <a href="#contact" className="text-link">
              {t('contact')} <Icon name="external" size={15} />
            </a>
          </div>
        </div>
        <nav className="work-index" aria-label={t('heroIndex')}>
          {(
            [
              ['01', 'projects', 'heroProduct'],
              ['02', 'engineering', 'heroPlatform'],
              ['03', 'openSource', 'heroSource'],
            ] as const
          ).map(([number, id, label]) => (
            <a href={`#${id}`} key={id}>
              <span>{number}</span>
              {t(label)}
              <Icon name="external" size={16} />
            </a>
          ))}
        </nav>
      </div>
      <div className="hero-foot">
        <span>{t('heroLocation')}</span>
        <a href="#projects">
          {t('selectedWork')} <span aria-hidden="true">↓</span>
        </a>
      </div>
    </section>
  );
}
