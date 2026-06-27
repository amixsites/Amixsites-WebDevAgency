export interface ServiceItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  features: string[];
  gradient: string;
  accentColor: string;
}

export interface SaaSProductItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  modules: string[];
  browserUrl: string;
  imageFallback: string;
}

export interface PortfolioProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  url: string;
  tags: string[];
  stats: string;
  imageFallback: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  content: string;
}

export interface ProcessStepItem {
  step: number;
  title: string;
  iconName: string;
  description: string;
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
  iconName: string;
}
