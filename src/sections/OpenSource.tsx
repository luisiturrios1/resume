import { useState } from 'react';
import type { Translate } from '../i18n';
import { sourceSteps } from '../data/narrative';
import { Icon } from '../components/Icon';
import { SectionHeading } from '../components/SectionHeading';
import data from '../data/open-source.json';

export function OpenSource({ t, locale }: { t: Translate; locale: string }) {
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const repo = data.find((item) => item.id === 'cfdiclient') ?? data[0];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText('python -m pip install cfdiclient');
      setCopyStatus('copied');
    } catch {
      setCopyStatus('failed');
    }
  };
  return (
    <section className="section source-section" id="openSource" aria-label={t('openSource')}>
      <SectionHeading number="03" label={t('openSource')} title={t('sourceIntro')} />
      <div className="source-grid">
        <div className="source-copy">
          <p className="eyebrow">
            <Icon name="github" size={17} /> {t('maintainer')} / GPL-3.0
          </p>
          <h3>
            python-
            <br />
            cfdiclient<span>.</span>
          </h3>
          <p className="lead-copy">{t('sourceProblem')}</p>
          <p>{t('sourceExplanation')}</p>
          <div className="source-links">
            <a href="https://github.com/luisiturrios1/python-cfdiclient" className="text-link">
              GitHub <Icon name="external" size={16} />
            </a>
            <a href="https://pypi.org/project/cfdiclient/" className="text-link">
              PyPI <Icon name="external" size={16} />
            </a>
          </div>
          {repo.stars !== null && (
            <p className="source-snapshot">
              <Icon name="star" size={14} /> {Intl.NumberFormat(locale).format(repo.stars)}{' '}
              {t('stars')} · {t('snapshot')}{' '}
              {Intl.DateTimeFormat(locale, {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                timeZone: 'America/Mexico_City',
              }).format(new Date(repo.fetchedAt))}
            </p>
          )}
        </div>
        <div className="source-terminal">
          <div className="terminal-header">
            <span aria-hidden="true">● ● ●</span>
            <span>cfdiclient / Python</span>
            <Icon name="code" size={17} />
          </div>
          <div className="terminal-body">
            <p className="code-comment"># {t('installLabel')}</p>
            <div className="install-command">
              <code>
                <span>$ </span>python -m pip install cfdiclient
              </code>
              <button onClick={copy} aria-label={t('copyCommand')}>
                <Icon name="code" size={17} />
              </button>
            </div>
            <p className="copy-status" role="status">
              {copyStatus === 'idle'
                ? '\u00a0'
                : t(copyStatus === 'copied' ? 'copied' : 'copyFailed')}
            </p>
            <p className="code-comment"># {t('exampleLabel')}</p>
            <pre>
              <code>
                <span className="syntax-keyword">from</span> cfdiclient{' '}
                <span className="syntax-keyword">import</span> (<br />
                {'    '}Fiel,
                <br />
                {'    '}Autenticacion,
                <br />
                {'    '}SolicitaDescargaRecibidos,
                <br />
                {'    '}VerificaSolicitudDescarga,
                <br />
                {'    '}DescargaMasiva,
                <br />
                {'    '}Validacion,
                <br />)
              </code>
            </pre>
          </div>
          <a
            className="terminal-footer"
            href="https://github.com/luisiturrios1/python-cfdiclient#ejemplo-completo"
          >
            {t('readDocs')} <Icon name="arrow" size={16} />
          </a>
        </div>
      </div>
      <div className="source-flow">
        <p className="eyebrow">{t('sourceWorkflow')}</p>
        <ol>
          {sourceSteps.map((step, i) => (
            <li key={step.label}>
              <span className="flow-number">0{i + 1}</span>
              <h4>{t(step.label)}</h4>
              <code>
                {step.label === 'requestInvoices' ? `CFDI / ${t('metadata')}` : step.detail}
              </code>
            </li>
          ))}
        </ol>
        <p>{t('sourceAsync')}</p>
      </div>
      <div className="source-quality">
        <h3>{t('qualityTitle')}</h3>
        <p>{t('qualityBody')}</p>
        <div className="tags">
          {['GitHub Actions', 'pytest', 'SemVer', 'CodeQL', t('dependencyReview')].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
