import { useEffect, useRef, useState } from 'react';
import type { Translate } from '../i18n';
import type { Locale } from '../utils/preferences';
import { projects } from '../data/profile';
import { product, productChapters } from '../data/narrative';
import { SectionHeading } from '../components/SectionHeading';
import { Icon } from '../components/Icon';

const asset = (name: string) => `${import.meta.env.BASE_URL}images/product/${name}-medium.webp`;
export function Projects({ t, locale }: { t: Translate; locale: Locale }) {
  const [active, setActive] = useState(0);
  const story = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.chapter));
        }
      },
      { rootMargin: '-25% 0px -45% 0px', threshold: 0 },
    );
    story.current?.querySelectorAll('[data-chapter]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  const desert = projects[0];
  const rifas = projects[1];
  return (
    <section className="section product-section" id="projects" aria-label={t('selectedWork')}>
      <SectionHeading
        number="01"
        label={t('selectedWork')}
        title={t('workIntro')}
        description={t('workDescription')}
      />
      <article>
        <div className="product-cover">
          <img
            className="desert-landscape"
            src={`${import.meta.env.BASE_URL}images/desert.webp`}
            width="1774"
            height="887"
            alt=""
            loading="lazy"
          />
          <div className="cover-copy">
            <p className="eyebrow">{t('productLabel')}</p>
            <h3>{product.name}</h3>
            <p className="cover-tagline">{t('productTagline')}</p>
            <p>{t('productIntro')}</p>
            <a href={product.website} className="button cover-button">
              {t('launch')} <Icon name="external" />
            </a>
          </div>
          <div className="cover-phone">
            <img
              src={asset('map')}
              width="604"
              height="1313"
              loading="lazy"
              alt={t('screenshot')}
            />
          </div>
          <span className="cover-label" aria-hidden="true">
            DESIERTO DE ALTAR / SONORA, MX
          </span>
        </div>
        <div className="product-overview">
          <p>{t('productSummary')}</p>
          <div className="store-links">
            <a href={product.appStore}>
              App Store <Icon name="external" size={16} />
            </a>
            <a href={product.googlePlay}>
              Google Play <Icon name="external" size={16} />
            </a>
          </div>
        </div>
        <dl className="product-proof">
          <div>
            <dd>
              {product.monthlyActiveUsers.toLocaleString(locale)}
              <span> MAU</span>
            </dd>
            <dt>
              {t('mau')}
              <small>{t('mauNote')}</small>
            </dt>
          </div>
          <div>
            <dd>iOS + Android</dd>
            <dt>
              {t('commercial')}
              <small>{t('commercialDetail')}</small>
            </dt>
          </div>
          <div>
            <dd>{t('lifetime')}</dd>
            <dt>
              {t('lifetimeDetail')}
              <small>RevenueCat</small>
            </dt>
          </div>
        </dl>
        <div className="product-story" ref={story}>
          <div className="sticky-product">
            <p className="eyebrow">{t('productStory')}</p>
            <figure>
              <div className="story-phone">
                {productChapters.map((chapter, index) => (
                  <img
                    key={chapter.id}
                    className={active === index ? 'is-active' : ''}
                    src={asset(chapter.image)}
                    width="604"
                    height="1313"
                    loading="lazy"
                    alt={t(chapter.alt)}
                    aria-hidden={active !== index}
                  />
                ))}
              </div>
              <figcaption>{t('screenshotCaption')}</figcaption>
            </figure>
            <div className="screen-controls" aria-label={t('productScreen')}>
              {productChapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  aria-label={t(chapter.title)}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                >
                  {String(index + 1).padStart(2, '0')}
                </button>
              ))}
            </div>
          </div>
          <div className="product-chapters">
            {productChapters.map((chapter, index) => (
              <div
                id={`product-${chapter.id}`}
                className={`product-chapter ${active === index ? 'is-active' : ''}`}
                data-chapter={index}
                key={chapter.id}
              >
                <span className="chapter-number">
                  0{index + 1} / {t('fieldNotes')}
                </span>
                <h4>{t(chapter.title)}</h4>
                <p>{t(chapter.body)}</p>
                <p className="engineering-note">
                  <Icon name="code" size={18} />
                  {t(chapter.detail)}
                </p>
                <img
                  className="mobile-screen"
                  src={asset(chapter.image)}
                  width="604"
                  height="1313"
                  alt={t(chapter.alt)}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="product-build">
          <p className="eyebrow">{t('buildNotes')}</p>
          <div>
            <h4>{t('ownershipLabel')}</h4>
            <p>{t('desertOwnership')}</p>
            <p>{t('aiWorkflowText')}</p>
          </div>
          <div>
            <h4>{t('decisionsLabel')}</h4>
            <p>{t('productDecisions')}</p>
            <div className="tags">
              {['Flutter', 'Dart', 'Mapbox', 'SQLite', 'Firebase', 'RevenueCat'].map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        </div>
        <details className="case-details">
          <summary>
            {t('caseStudy')} <span aria-hidden="true">+</span>
          </summary>
          <div className="case-content">
            {desert.caseStudy?.map((part) => (
              <div key={part.heading}>
                <h4>{t(part.heading)}</h4>
                <p>{t(part.content)}</p>
              </div>
            ))}
          </div>
        </details>
      </article>
      <article className="additional-product">
        <span className="eyebrow">{t('additionalWork')}</span>
        <div>
          <h3>{rifas.name}</h3>
          <p>{t(rifas.description)}</p>
          <p className="muted">{t('rifasOwnership')}</p>
        </div>
        <a href={rifas.url} className="text-link">
          App Store <Icon name="external" size={16} />
        </a>
      </article>
    </section>
  );
}
