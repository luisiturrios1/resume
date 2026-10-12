import { useState } from 'react';
import type { Translate } from '../i18n';
import { transformation } from '../data/narrative';
import { SectionHeading } from '../components/SectionHeading';

export function Engineering({ t }: { t: Translate }) {
  const [selected, setSelected] = useState<'before' | 'after'>('after');
  return (
    <section
      id="engineering"
      className="section engineering-section"
      aria-label={t('engineeringImpact')}
    >
      <SectionHeading number="02" label={t('engineeringImpact')} title={t('kueskiTitle')} />
      <div className="engineering-intro">
        <p className="company-label">
          Kueski<span>2021—2025</span>
        </p>
        <div>
          <p className="lead-copy">{t('kueskiIntro')}</p>
          <p>{t('kueskiOwnership')}</p>
        </div>
      </div>
      <div className="architecture-diagram" data-selected={selected}>
        <div className="architecture-top">
          <span className="eyebrow">EC2 / JENKINS → EKS / GITHUB</span>
          <div className="diagram-controls" role="group" aria-label={t('architectureControl')}>
            {(['before', 'after'] as const).map((state) => (
              <button
                key={state}
                aria-pressed={selected === state}
                onClick={() => setSelected(state)}
              >
                {t(state)}
              </button>
            ))}
          </div>
        </div>
        <div className="architecture-panels">
          <figure
            className={`architecture-panel before-panel ${selected === 'before' ? 'is-selected' : ''}`}
          >
            <figcaption>
              <span>01 / {t('before')}</span>
              <h3>{t('legacyWorkflow')}</h3>
            </figcaption>
            <div className="diagram-node team-node">
              {t('applicationTeams')}
              <span>↓</span>
            </div>
            <div className="diagram-node bottleneck-node">
              {t('platformIntervention')}
              <small>{t('manualChanges')}</small>
              <span>↓</span>
            </div>
            <div className="diagram-node runtime-node">
              <span>Jenkins</span>
              <span>Amazon EC2</span>
            </div>
            <p className="diagram-outcome">{t('legacyOutcome')}</p>
          </figure>
          <span className="transformation-arrow" aria-hidden="true">
            →
          </span>
          <figure
            className={`architecture-panel after-panel ${selected === 'after' ? 'is-selected' : ''}`}
          >
            <figcaption>
              <span>02 / {t('after')}</span>
              <h3>{t('modernWorkflow')}</h3>
            </figcaption>
            <div className="diagram-node team-node">
              {t('applicationTeams')}
              <span>↓</span>
            </div>
            <div className="diagram-node autonomy-node">
              {t('githubWorkflows')}
              <small>{t('routineChanges')}</small>
              <span>↓</span>
            </div>
            <div className="diagram-node runtime-node">
              <span>Amazon EKS</span>
            </div>
            <p className="diagram-outcome">{t('modernOutcome')}</p>
          </figure>
        </div>
        <p className="diagram-caption">{t('conceptual')}</p>
        <p className="diagram-status" role="status">
          {t(selected === 'before' ? 'legacyBody' : 'selfServiceBody')}
        </p>
      </div>
      <div className="impact-grid">
        {transformation
          .filter((_, i) => [2, 4, 6].includes(i))
          .map((item, i) => (
            <div key={item.title}>
              <span className="eyebrow">0{i + 1}</span>
              <h3>{t(item.title)}</h3>
              <p>{t(item.body)}</p>
            </div>
          ))}
      </div>
      <details className="case-details">
        <summary>
          {t('kueskiCase')}
          <span aria-hidden="true">+</span>
        </summary>
        <div className="case-content">
          {transformation.map((part) => (
            <div key={part.title}>
              <h4>{t(part.title)}</h4>
              <p>{t(part.body)}</p>
            </div>
          ))}
        </div>
      </details>
      <p className="secondary-milestone">
        <span aria-hidden="true">↳</span>
        {t('dmsSecondary')}
      </p>
    </section>
  );
}
