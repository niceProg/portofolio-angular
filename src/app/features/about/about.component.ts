import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SkillGroup {
  category: string;
  items: string[];
}

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [CommonModule],
})
export class AboutComponent {
  experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Sekretariat Jenderal DPR RI at Jakarta (Hybrid)',
      period: 'April 2026 - Present',
      tech: 'Laravel 12, PHP 8.2, MySQL Multi-Database, Redis, Keycloak/OIDC, Tailwind CSS v4, Docker, Kubernetes, Helm, GitLab CI',
      detail:
        'Solo developer of the eBudgeting module of ePlanning, the budgeting system of the Indonesian House of Representatives, a Laravel 12 modular monolith with 4 modules and 4 separate MySQL databases, covering the full budgeting lifecycle from planning to realization reporting',
      points: [
        'Built an 8-level budget structure tree with a lazy-loaded work-tree UI, search, and bulk expand/collapse.',
        'Implemented a 5-stage approval pipeline with state transitions, cascading approvals, and server-side validation enforcing that total spend never exceeds the ceiling.',
        'Integrated 6 internal government APIs using a pull → snapshot → local-filter pattern with SHA-256 fingerprint de-duplication (order-independent row multiset).',
        'Migrated authentication from shared sessions to pure OIDC on Keycloak (Authorization Code + PKCE S256, JWKS RS256 verification, reactive token refresh, back-channel logout).',
        'Built in-app Keycloak RBAC administration: a 24-role catalog, email-based reconciliation between the HR system and the identity provider, and role/group assignment with a full audit trail.',
        'Delivered a read-only provider API for external consumers, secured by hashed DB-backed API keys with per-request audit logging, plus self-service key management and API docs.',
        'Built budget realization reporting with 7-level drill-down, layered filters, collapsible work-tree tables, roll-up subtotals, and styled PDF (mPDF) / XLSX exports including Excel row outline grouping.',
        'Automated data ingestion with Kubernetes CronJobs, chosen over in-pod scheduling to avoid triple-firing on a 3-replica deployment; maintained GitLab CI → Kaniko → Helm → Kubernetes delivery.',
        'Wrote 89 test files (TDD for pure logic, HTTP fakes for integrations), standardized ~20 listing tables onto server-side DataTables, and cut heavy-page latency by replacing 12-month query loops with SQL aggregation and caching.',
        'Remediated security findings including CVE-2022-50897 in mPDF, PDF template output escaping, hardcoded credential removal, and internal security scan results.',
      ],
    },
    {
      title: 'AI/ML Engineer',
      company: 'Dragonfortune.ai at Surabaya (Contract · Remote)',
      period: 'January 2026 - May 2026',
      tech: 'Python, FastAPI, XGBoost, QuantConnect, Scraping, Docker, Shell Scripting, Linux Server (WHCP, aaPanel), CI/CD',
      detail:
        'AI/ML engineer building crypto analytics and AI-powered trading workflows, from automated data collection and ML signal generation to strategy validation and production deployment.',
      points: [
        'Built and maintained crypto data scraping pipelines across Coinglass, CryptoQuant, Hyblock, and TensorCharts.',
        'Built automated pipelines for data ingestion, scraping, cleaning, and feature engineering from exchange APIs and market sources.',
        'Trained and optimized XGBoost models on financial time-series data to generate accurate predictive trading signals.',
        'Developed Python and FastAPI services for model training, inference, and REST API integration.',
        'Backtested and validated trading strategies on QuantConnect to evaluate accuracy, drawdown, and profitability.',
        'Created shell scripts to automate Docker-based scraping jobs and operational workflows.',
        'Provisioned and managed Linux servers with WHCP and aaPanel for reliable deployments.',
        'Implemented Dockerized Linux/VPS deployments and CI/CD workflows for dependable delivery.',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Dragonfortune.ai at Surabaya (Contract · Remote)',
      period: 'August 2025 - January 2026',
      tech: 'Laravel, REST API, MySQL, JavaScript, Interactive Charts, GitHub',
      detail:
        'Collaboratively designed and developed a complex multi-navigation analytics dashboard for crypto market intelligence, covering Derivatives Core, Spot Microstructure, On-Chain Metrics, ETF & Institutional, Volatility & Regime, Macro Overlay, and Sentiment & Flow.',
      points: [
        'Worked closely with cross-functional teams (product, data, and engineering) to define requirements, split module scope, and deliver features incrementally.',
        'Implemented feature-rich pages: Funding Rate, Open Interest, Long/Short Ratio, Liquidation Heatmap, Liquidation Order Stream, Aggregated Liquidations, and Basis & Term Structure.',
        'Built end-to-end frontend and backend using Laravel, REST APIs, and SQL databases for real-time and historical analytics.',
        'Developed reusable UI components and interactive chart/table views to maintain consistent UX across all modules.',
        'Maintained development records and source control in GitHub with structured branching, PRs, commit history, and code reviews.',
      ],
    },
    {
      title: 'Full Stack Engineer',
      company: 'DOKTORTJ Digital Institute at Tegal (Internship · On-site)',
      period: 'November 2024 - February 2025',
      tech: 'PHP, Laravel, MySQL, RBAC, Midtrans, Flutter, Figma, cPanel Deployment',
      detail:
        'Led the end-to-end delivery of three web projects for a digital institute, with a focus on marketing impact, user experience, and operational efficiency — while also teaching as a technical instructor.',
      points: [
        'Led end-to-end development of two business websites and one client platform, from planning through production release.',
        'Built robust backend architecture with RESTful API integration, MySQL database design, and Role-Based Access Control (RBAC).',
        'Transformed Figma designs into responsive, high-performance dashboard interfaces using HTML, CSS, and JavaScript.',
        'Designed mobile app mockups in Figma and implemented them as Android applications using Flutter.',
        'Served as technical instructor for Scratch Programming, Flutter (Intermediate), and Web Programming courses.',
      ],
    },
    {
      title: 'Data Engineer',
      company:
        'DPD Partai Golkar Kota Jakarta Pusat (Part-time · On-site)',
      period: 'December 2023 - May 2024',
      tech: 'Python, BeautifulSoup, Web Scraping, Data Cleaning, VPS Automation, Ms. Excel',
      detail:
        'Engineered an automated data collection system for a political organization to support voter data verification and strategic decision-making ahead of the 2024 Indonesian general election.',
      points: [
        'Managed and operated data entry systems to support organizational information requirements with accurate data processing and retrieval.',
        "Utilized Python and web scraping to collect detailed population data from the official 'Cek DPT Online' platform, automating a previously manual lookup process.",
        'Implemented data validation logic with duplicate filters to produce clean, accurate datasets and generated Excel bar chart reports.',
        'Developed and optimized VPS automation scripts to reduce human error and handle large-scale datasets effectively.',
        'Successfully collected and compiled 25,000+ data entries within 2 weeks.',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'Politeknik Purbaya at Slawi (Freelance · Hybrid)',
      period: 'May 2023 - August 2023',
      tech: 'Python, Flask, Authentication & Authorization, Machine Learning Integration',
      detail:
        'Developed and maintained web applications end-to-end for a campus environment, covering new features, security hardening, and data management.',
      points: [
        'Developed and maintained web applications end-to-end, including new features and performance improvements.',
        'Implemented robust authentication and authorization systems to enhance application security.',
        'Designed and implemented efficient data management systems using Flask and integrated ML components.',
      ],
    },
    {
      title: 'Full Stack Developer',
      company: 'PT. Central Artificial Intelligence at Jakarta (Contract · Remote)',
      period: 'August 2022 - January 2023',
      tech: 'Python, Flask, HTML, CSS, JavaScript, Bootstrap 5, Figma, Postman, GitLab CI/CD',
      detail:
        'Developed and delivered web-based dashboard interfaces for an AI-focused technology company by translating Figma designs into clean, responsive front-end implementations.',
      points: [
        'Built interactive web dashboards from Figma designs using HTML, CSS, and JavaScript.',
        'Integrated and tested REST APIs to ensure proper feature synchronization between frontend and backend.',
        'Designed mobile application prototypes in Figma with a user-friendly, intuitive approach.',
        'Developed web pages with film routing logic and implemented them using Flask.',
        'Integrated CI/CD pipelines with automated testing frameworks to improve deployment reliability and accelerate feature releases.',
      ],
    },
  ];
  selectedIndex = 0;
  isFlipped = false;
  nextExperience: any = null;

  get selectedExperience() {
    return this.experiences[this.selectedIndex];
  }

  selectExperience(i: number) {
    if (i === this.selectedIndex) return;
    this.nextExperience = this.experiences[i];
    this.isFlipped = true;
    setTimeout(() => {
      this.selectedIndex = i;
      this.isFlipped = false;
      this.nextExperience = null;
    }, 600); // duration must match CSS
  }

  skillGroups: SkillGroup[] = [
    {
      category: 'Languages',
      items: [
        'PHP (Laravel)',
        'Python (FastAPI / Flask)',
        'TypeScript',
        'JavaScript',
        'SQL',
        'Bash / Shell',
      ],
    },
    {
      category: 'Frontend',
      items: [
        'Next.js',
        'Blade',
        'Tailwind CSS',
        'Vite',
        'AngularJS',
        'HTML5',
        'CSS3',
        'Flutter',
        'DataTables',
        'CKEditor',
      ],
    },
    {
      category: 'Backend & Database',
      items: [
        'Laravel (modular monolith)',
        'Eloquent multi-database',
        'FastAPI',
        'RESTful API design',
        'MySQL / MariaDB',
        'PostgreSQL',
        'Redis',
        'NoSQL',
      ],
    },
    {
      category: 'Auth & Security',
      items: [
        'Keycloak',
        'OpenID Connect (PKCE)',
        'JWT / JWKS',
        'spatie/laravel-permission',
        'RBAC',
        'API-key authentication',
        'Audit logging',
        'CVE & Checkmarx remediation',
      ],
    },
    {
      category: 'AI / ML',
      items: [
        'XGBoost',
        'Time-Series Modeling',
        'RAG (Retrieval Augmented Generation)',
        'Prompt Engineering',
        'QuantConnect',
      ],
    },
    {
      category: 'Data Engineering',
      items: [
        'Data Pipeline Design',
        'Web Scraping',
        'Feature Engineering',
        'ETL & Snapshot Sync',
        'De-duplication Strategies',
      ],
    },
    {
      category: 'DevOps & Cloud',
      items: [
        'Docker',
        'Kubernetes (Deployment + CronJob)',
        'Helm',
        'Kaniko',
        'GitLab CI/CD',
        'GCP',
        'Azure',
        'DigitalOcean',
        'Linux Server (aaPanel / WHCP)',
        'Nginx',
        'Prometheus',
        'Grafana',
      ],
    },
    {
      category: 'Practices & Tools',
      items: [
        'TDD / PHPUnit',
        'Code Review',
        'Technical Spec & Design Docs',
        'Git / GitHub / GitLab',
        'Figma (UI/UX, Prototyping)',
        'Postman',
        'Microsoft Excel',
      ],
    },
  ];

  coreCompetencies: string[] = [
    'Full Stack Development',
    'Enterprise Systems Integration',
    'Identity & Access Management',
    'AI/ML Engineering',
    'Data Pipeline Architecture',
    'DevOps & Automation',
    'Test-Driven Development',
    'UI/UX Design',
    'Team Collaboration',
    'Problem Solving',
    'Agile Development',
  ];
}
