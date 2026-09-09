const STORAGE_KEY = "gs60d_analytics_v1";

export type AnalyticsData = {
  firstVisit: string;
  lastVisit: string;
  pageViews: number;
  ctaClicks: Record<string, number>;
  sectionViews: Record<string, number>;
  formSteps: Record<string, number>;
  formSubmits: number;
  formQualified: number;
};

function defaultData(): AnalyticsData {
  const now = new Date().toISOString();
  return {
    firstVisit: now,
    lastVisit: now,
    pageViews: 0,
    ctaClicks: {},
    sectionViews: {},
    formSteps: {},
    formSubmits: 0,
    formQualified: 0,
  };
}

function isBrowser() {
  return typeof window !== "undefined";
}

export function getAnalyticsData(): AnalyticsData {
  if (!isBrowser()) return defaultData();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultData();
    return { ...defaultData(), ...JSON.parse(raw) };
  } catch {
    return defaultData();
  }
}

function save(data: AnalyticsData) {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore storage errors (private mode, quota, etc.)
  }
}

function mutate(fn: (data: AnalyticsData) => void) {
  const data = getAnalyticsData();
  data.lastVisit = new Date().toISOString();
  fn(data);
  save(data);
}

export function trackPageview() {
  mutate((d) => {
    d.pageViews += 1;
  });
}

export function trackCtaClick(id: string) {
  mutate((d) => {
    d.ctaClicks[id] = (d.ctaClicks[id] || 0) + 1;
  });
}

export function trackSectionView(id: string) {
  mutate((d) => {
    d.sectionViews[id] = (d.sectionViews[id] || 0) + 1;
  });
}

export function trackFormStep(step: number) {
  mutate((d) => {
    const key = `step_${step}`;
    d.formSteps[key] = (d.formSteps[key] || 0) + 1;
  });
}

export function trackFormSubmit(qualified: boolean) {
  mutate((d) => {
    d.formSubmits += 1;
    if (qualified) d.formQualified += 1;
  });
}

export function resetAnalyticsData() {
  if (!isBrowser()) return;
  localStorage.removeItem(STORAGE_KEY);
}
