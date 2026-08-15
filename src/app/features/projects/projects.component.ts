import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

interface Project {
  title: string;
  image: string;
  alt: string;
  description: string;
  year: string;
  type: string;
  stack?: string[];
  liveUrl?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'ePlanning / eBudgeting Platform — DPR RI',
      image: '/assets/projects/eplanning/image.svg',
      alt: 'ePlanning eBudgeting DPR RI',
      description:
        'National-scale budget planning and realization platform for the Indonesian House of Representatives. Covers an 8-level budget structure, a 5-stage approval workflow, cash planning (SICAPING), realization reporting with 7-level drill-down, Keycloak SSO with in-app RBAC administration, and a secured provider API for other government systems.',
      year: '2026 – Present',
      type: 'Government Enterprise Platform',
      stack: [
        'Laravel 12',
        'PHP 8.2',
        'nwidart/laravel-modules',
        'MySQL (multi-database)',
        'Redis',
        'Keycloak / OIDC',
        'Tailwind CSS v4',
        'Vite',
        'Yajra DataTables',
        'mPDF',
        'maatwebsite/excel',
        'Docker',
        'GitLab CI',
        'Kaniko',
        'Helm',
        'Kubernetes',
      ],
    },
    {
      title: 'Crypto Market Intelligence Dashboard',
      image: '/assets/projects/crypto/image.svg',
      alt: 'Crypto Market Intelligence Dashboard',
      description:
        'Multi-module analytics dashboard for crypto market intelligence covering derivatives, spot microstructure, on-chain metrics, ETF/institutional flow, volatility regime, macro overlay, and sentiment analysis. Built collaboratively with real-time and historical data integration.',
      year: '2025 – 2026',
      type: 'Crypto Analytics Dashboard',
      stack: ['Laravel', 'REST APIs', 'MySQL', 'JavaScript', 'GitHub'],
    },
    {
      title: 'Chatbot with RAG',
      image: '/assets/projects/ibm/image.png',
      alt: 'IBM',
      description:
        'A web-based AI chatbot that provides personalized answers based on user-uploaded documents using Retrieval Augmented Generation (RAG). Features Google OAuth login, a responsive dashboard, and user data security. Deployed on a DigitalOcean VPS with Nginx reverse proxy, systemd automation, and full server monitoring via Prometheus and Grafana.',
      year: '2025',
      type: 'AI Chatbot with IBM Granite',
      stack: [
        'Next.js',
        'FastAPI',
        'IBM Granite (Replicate API)',
        'Tailwind CSS',
        'Google OAuth',
        'DigitalOcean',
        'Nginx',
        'Prometheus',
        'Grafana',
      ],
      liveUrl: 'https://ibmskills.documentme.my.id/',
    },
    {
      title: 'Web Movie Explorer',
      image: '/assets/projects/movie/image.png',
      alt: 'Movie',
      description:
        'Web movie explorer using Laravel 5.8 & OMDb API to search movies by genre/year, with responsive UI based on Tailwind.',
      year: '2025',
      type: 'Movie Discovery Platform',
      stack: ['Laravel 5.8', 'OMDb API', 'Tailwind CSS'],
      liveUrl: 'https://movie.documentme.my.id',
    },
    {
      title: 'Rental PS Booking System',
      image: '/assets/projects/bookingps/image.png',
      alt: 'Bookingps',
      description:
        'Laravel-based PS4/PS5 rental application with online booking system and automatic payment integration via Midtrans.',
      year: '2025',
      type: 'Online PlayStation Rental with Midtrans Payment',
      stack: ['Laravel', 'Midtrans', 'MySQL'],
    },
    {
      title: 'SALUT DOKTORTJ Website',
      image: '/assets/projects/salut/image.png',
      alt: 'Salut Doktortj',
      description:
        'Laravel-based educational service website to support the digitalization of SALUT DOKTORTJ TEGAL.',
      year: '2025',
      type: 'Digital Education Support',
      stack: ['Laravel', 'MySQL', 'Bootstrap'],
    },
    {
      title: 'TechNova Blog Platform',
      image: '/assets/projects/blogme/image.png',
      alt: 'TechNova Blog',
      description:
        'A modern technical blogging platform with server-side rendering, real-time content management via Sanity CMS, dark mode, smooth animations, and responsive design across all devices.',
      year: '2024',
      type: 'Technical Blog Platform',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Sanity CMS', 'Valtio'],
      liveUrl:
        'https://blog-yumna-155nrjch7-wisnu-yumna-yudhantas-projects.vercel.app',
    },
    {
      title: 'Duplicate Sentence & Document Detector',
      image: '/assets/projects/dupcek/image.png',
      alt: 'Deteksi Duplikat',
      description:
        'Django & Sastrawi based duplicate sentence detection application, generates similarity percentage and reference sources automatically.',
      year: '2024',
      type: 'Plagiarism Detection Tool',
      stack: ['Django', 'Sastrawi', 'Python'],
    },
    {
      title: 'Employee Attendance Application',
      image: '/assets/projects/attendance/image.png',
      alt: 'Absensi Karyawan',
      description:
        'Digital attendance using Face Recognition & GPS, complete with dashboard and automatic report export.',
      year: '2023',
      type: 'Thesis Project',
      stack: ['Face Recognition', 'GPS', 'Python', 'Reporting Dashboard'],
    },
  ];

  page = 1;
  pageSize = 4;

  get totalPages(): number {
    return Math.ceil(this.projects.length / this.pageSize);
  }

  get pagedProjects(): Project[] {
    const start = (this.page - 1) * this.pageSize;
    return this.projects.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) this.page++;
  }

  prevPage() {
    if (this.page > 1) this.page--;
  }
}
