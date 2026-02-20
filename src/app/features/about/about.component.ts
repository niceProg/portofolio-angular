import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  imports: [CommonModule],
})
export class AboutComponent {
  experiences = [
    {
      title: 'AI/ML Engineer & Fullstack Developer',
      company: 'Dragonfortune.ai at Surabaya',
      period: 'August 2025 - February 2026',
      tech: 'Python, CLI, Machine Learning, QuantConnect, Server Deployment, Scraping, Automation, Docker, GitHub',
      detail:
        'AI/ML engineer building crypto analytics and AI-powered trading workflows, from automated data collection and ML signal generation to strategy validation and production deployment.',
      points: [
        'Built and maintained crypto data scraping pipelines across Coinglass, CryptoQuant, Hyblock, and TensorCharts.',
        'Provisioned and managed Linux servers with WHCP and aaPanel for reliable deployments.',
        'Built automated pipelines for ingestion, scraping, cleaning, and feature engineering from exchange APIs and market sources.',
        'Created shell scripts to automate Docker-based scraping jobs and operational workflows.',
        'Trained and optimized XGBoost models on financial time-series data for predictive trading signals.',
        'Developed Python and FastAPI services for model training, inference, and API integration.',
        'Built platform modules in Laravel for dashboards, user management, and strategy configuration.',
        'Backtested and validated strategies on QuantConnect to evaluate accuracy, drawdown, and profitability.',
        'Implemented Dockerized Linux/VPS deployments and CI/CD workflows for dependable delivery.',
      ],
    },
    {
      title: 'Internship Fullstack Engineer',
      company: 'DOKTORTJ DIGITAL INSTITUTE at Tegal',
      period: 'November 2024 - Februari 2025',
      tech: 'PHP, Laravel, Midtrans, Flutter, Production Deployment Cpanel',
      detail:
        'Led the end-to-end delivery of three web projects for a digital institute, with a focus on marketing impact, user experience, and operational efficiency.',
      points: [
        'Delivered two business-facing websites and one customer-facing platform from planning to production release.',
        'Built reliable platform architecture through RESTful API integration, MySQL database design, and role-based access control to support secure and scalable operations.',
        'Collaborated closely with stakeholders and project managers to align technical execution with business goals and deliver all projects on schedule.',
      ],
    },
    {
      title: 'Data Engineer',
      company: 'Golkar DKI at Jakarta',
      period: 'December 2023 - May 2024',
      tech: 'Python, Scraping Beautifulsoup, Excel, Ms. Excel, Data Entry, Data Cleaning',
      detail:
        'Engineered an automated data collection system for a political organization to support voter data verification and strategic decision-making ahead of the 2024 Indonesian general election.',

      points: [
        "Built a Python web scraping pipeline using BeautifulSoup and Requests to extract detailed citizen data from the official 'Cek DPT Online' platform, replacing manual lookup processes.",
        'Designed and implemented data validation workflows including automated duplicate detection, cross-referencing, and data normalization to ensure dataset integrity and consistency.',
        'Scraped, cleaned, structured, and stored more than 25,000 citizen records in a relational database, reducing data collection time by approximately 90% versus manual entry.',
        'Developed reusable and modular Python pipeline scripts that enabled the team to scale data retrieval operations efficiently across multiple regions.',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'PT Central Artificial Intelligence at Jakarta',
      period: 'August 2022 - January 2023',
      tech: 'Python, Flask, Postman, HTML, CSS, Figma, Bootstrap 5, Gitlab, CI/CD',
      detail:
        'Developed and delivered web-based dashboard interfaces for an AI-focused technology company by translating Figma designs into clean, responsive front-end implementations.',
      points: [
        'Built responsive dashboard interfaces using HTML, CSS, and JavaScript based on approved Figma designs.',
        'Integrated RESTful APIs and performed thorough API testing to ensure data accuracy and reliable server communication.',
        'Designed interactive mobile app prototypes in Figma and presented wireframes and user flows to stakeholders for iterative improvement.',
        'Built and launched landing pages for film and entertainment projects from design interpretation to pixel-perfect front-end delivery.',
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

  skills: string[] = [
    'Python',
    'PHP',
    'JavaScript',
    'Bootstrap 5 CSS',
    'Tailwind CSS',
    'MySQL',
    'MongoDB',
    'Redis',
    'Laravel',
    'Flask',
    'Django',
    'FastAPI',
    'XGBoost',
    'QuantConnect',
    'Flutter',
    'Docker',
    'GIT',
    'CI/CD',
    'Postman',
    'TensorFlow',
    'OpenCV',
    'Face Recognition',
    'Selenium',
    'Linux Server Terminal',
    'Figma',
  ];
}
