export interface WebsiteCheckResult {
  url: string;
  mobileResponsiveness: MobileResponsivenessResult;
  seoPerformance: SEOPerformanceResult;
  security: SecurityResult;
  integrations: IntegrationsResult;
  legalCompliance: LegalComplianceResult;
  ads: AdsResult;
}

export interface MobileResponsivenessResult {
  score: number;
  devices: DeviceTest[];
  issues: string[];
}

export interface DeviceTest {
  name: string;
  screenSize: string;
  status: 'pass' | 'fail' | 'warning';
  issues: string[];
}

export interface SEOPerformanceResult {
  keywords: Keyword[];
  organicTraffic?: number;
  // lighthouse: LighthouseScore;
  lighthouse?: AllLighthouseData;
  recommendations?: string[];
}

export interface Keyword {
  keyword: string;
  position: number;
  volume: number;
}

// export interface LighthouseScore {
//   performance: number;
//   accessibility: number;
//   bestPractices: number;
//   seo: number;
//   mobile: number;
//   desktop: number;
// }

type LighthouseResult = {
  // strategy: "mobile" | "desktop";
  performance: number;
  accessibility: number;
  bestPractices: number;
  seo: number;
};

type AllLighthouseData = {
  mobile: LighthouseResult | null;
  desktop: LighthouseResult | null;
};


export interface SecurityResult {
  ssl?: SSLResult;
  headers?: SecurityHeader[];
  mixedContent: MixedContentResult;
  sensitiveRoutes?: SensitiveRoute[];
  sslQuality?: SSLQualityResult;
}

export interface SSLResult {
  valid: boolean;
  issuer: string;
  expiry: string;
  grade: string;
  subject: string;
  validFrom: string;
  validTo: string;
  signatureAlgorithm: string;
  keySize: string;
  tlsVersions: string[];
}

export interface SSLQualityResult {
  overallGrade: string;
  protocolSupport: ProtocolSupport[];
  cipherSuites: CipherSuite[];
  vulnerabilities: string[];
  keyExchange: string;
  certificateChain: CertificateInfo[];
}

export interface ProtocolSupport {
  protocol: string;
  supported: boolean;
  secure: boolean;
}

export interface CipherSuite {
  name: string;
  strength: 'strong' | 'weak' | 'insecure';
  keySize: number;
}

export interface CertificateInfo {
  subject: string;
  issuer: string;
  validFrom: string;
  validTo: string;
  signatureAlgorithm: string;
}

export interface SecurityHeader {
  name: string;
  status: 'present' | 'missing' | 'misconfigured';
  value: string;
  recommendation: string;
}

export interface MixedContentResult {
  issues: string[];
  categories: {
    images: string[];
    scripts: string[];
    iframes: string[];
    other: string[];
  };
}

export interface SensitiveRoute {
  path: string;
  accessible: boolean;
  // severity: 'low' | 'medium' | 'high';
  status: number,
}

export interface IntegrationsResult {
  chatSystems: string[];
  trackers: Tracker[];
}

export interface Tracker {
  name: string;
  platform: string;
  purpose: string;
}

export interface LegalComplianceResult {
  privacyPolicy: boolean;
  cookiePolicy: boolean;
  trackingConsent: boolean;
  ssl: boolean;
  formConsent: boolean;
  embeddedVideos: boolean;
  googleFonts: boolean;
  cookies: Cookie[];
  isWordPress: boolean;
}

export interface Cookie {
  name: string;
  platform: string;
  description: string;
  retention: string;
}

export interface AdsResult {
  googleAds: Ad[];
  metaAds: Ad[];
}

export interface Ad {
  title: string;
  platform: string;
  status: string;
  preview?: string;
}