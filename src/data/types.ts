import type { TranslationKey } from '../i18n';
export interface Experience {
  id: string;
  employer: string;
  year: number;
  startMonth?: number;
  current?: boolean;
  role: TranslationKey;
  description?: TranslationKey;
  technologies: string[];
}
export interface Project {
  id: string;
  name: string;
  url: string;
  description: TranslationKey;
  kind: 'product' | 'open-source';
  technologies: string[];
  caseStudy?: { heading: TranslationKey; content: TranslationKey }[];
}
export interface OpenSourceProject {
  id: string;
  name: string;
  repository: string;
  description: TranslationKey;
  stars: number | null;
  release: string | null;
  language: string;
  license: string;
  fetchedAt: string;
}
export interface Education {
  year?: number;
  qualification: TranslationKey;
  institution: string;
}
export interface SkillCategory {
  label: TranslationKey;
  technologies: string[];
}
