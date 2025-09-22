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
  readMore?: string;
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
      title: 'Chatbot with RAG',
      image: '/assets/projects/ibm/image.png',
      alt: 'IBM',
      description:
        'A web-based AI chatbot leveraging Retrieval Augmented Generation (RAG), built with Next.js and FastAPI, integrated with IBM Granite via Replicate API. It supports Google OAuth, responsive dashboards, and ensures secure access to personalized information.',
      year: '2025',
      type: 'Integrate Granite Instructure',
      readMore: '/projects/not-found',
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
      readMore: '/projects/not-found',
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
      readMore: '/projects/not-found',
    },
    {
      title: 'SALUT DOKTORTJ Website',
      image: '/assets/projects/salut/image.png',
      alt: 'Salut Doktortj',
      description:
        'Laravel-based educational service website to support the digitalization of SALUT DOKTORTJ TEGAL.',
      year: '2025',
      type: 'Digital Education Support',
      readMore: '/projects/not-found',
    },
    {
      title: 'Personal Blog',
      image: '/assets/projects/blogme/image.png',
      alt: 'Blog Me',
      description:
        'A personal blog site built with Next.js (TypeScript) and powered by Sanity CMS for flexible and structured content management.',
      year: '2024',
      type: 'Personal Blog with Next.js & Sanity CMS',
      readMore: '/projects/not-found',
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
      readMore: '/projects/not-found',
    },
    {
      title: 'Employee Attendance Application',
      image: '/assets/projects/attendance/image.png',
      alt: 'Absensi Karyawan',
      description:
        'Digital attendance using Face Recognition & GPS, complete with dashboard and automatic report export.',
      year: '2023',
      type: 'Thesis Project',
      readMore: '/projects/not-found',
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
