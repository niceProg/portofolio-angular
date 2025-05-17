import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './certificates.component.html',
})
export class CertificatesComponent {
  showModal = false;
  selectedIndex = 0;
  isFading = false;

  certificates = [
    {
      title: 'MSIB Kampus Merdeka',
      issuer: 'PT Central Artificial Intelligence',
      year: '2022',
      images: [
        '/assets/certificates/msib/image_1.png',
        '/assets/certificates/msib/image_2.png',
        '/assets/certificates/msib/image_3.png',
        '/assets/certificates/msib/image_4.png',
      ],
    },
    {
      title: 'IT Essentials',
      issuer: 'Cisco Network Academy',
      year: '2020',
      images: [
        '/assets/certificates/cisco/image.png',
      ],
    },
    {
      title: 'DevOps Basics',
      issuer: 'Dicoding',
      year: '2024',
      images: [
        '/assets/certificates/dicoding/devops_1.png',
        '/assets/certificates/dicoding/devops_2.png',
      ],
    },
    {
      title: 'HCIA-Cloud Computing V4.0 Course',
      issuer: 'Huawei',
      year: '2022',
      images: [
        '/assets/certificates/huawei/image.png',
      ],
    },
    {
      title: 'Introduciton to DevOps: Roadmap to DevOps Career',
      issuer: 'Udemy',
      year: '2025',
      images: [
        '/assets/certificates/udemy/image.png',
      ],
    },
    {
      title: 'Machine Learning',
      issuer: 'Bisa.ai Academy',
      year: '2022',
      images: [
        '/assets/certificates/bisaai/machine_learning.png',
      ],
    },
    {
      title: 'Nodejs Basics',
      issuer: 'Bisa.ai Academy',
      year: '2022',
      images: [
        '/assets/certificates/bisaai/nodejs_basics.png',
      ],
    },
    {
      title: 'Python Basics',
      issuer: 'Bisa.ai Academy',
      year: '2022',
      images: [
        '/assets/certificates/bisaai/python_basics.png',
      ],
    },
    {
      title: 'Application Of AI Business',
      issuer: 'Speaker In The Webinar',
      year: '2022',
      images: [
        '/assets/certificates/centralai/speaker_1.png',
      ],
    },
    {
      title: 'Introduction To Image Processing',
      issuer: 'Speaker In The Webinar',
      year: '2022',
      images: [
        '/assets/certificates/centralai/speaker_2.png',
      ],
    },
    {
      title: 'Introduction To Web Accessibility Wcag 2.1',
      issuer: 'Speaker In The Webinar',
      year: '2022',
      images: [
        '/assets/certificates/centralai/speaker_3.png',
      ],
    },
    {
      title: 'Learn More About The Industrial Revolution',
      issuer: 'Speaker In The Webinar',
      year: '2022',
      images: [
        '/assets/certificates/centralai/speaker_4.png',
      ],
    },
  ];

  openModal(index: number) {
    this.selectedIndex = index;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  async updateMainImage(index: number, newImage: string) {
    const cert = this.certificates[index];

    if (newImage === cert.images[0]) return;

    this.isFading = true;
    await new Promise((res) => setTimeout(res, 500));

    cert.images = [newImage, ...cert.images.filter((img) => img !== newImage)];

    this.isFading = false;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.showModal) return;

    const cert = this.certificates[this.selectedIndex];
    const images = cert.images;

    if (event.key === 'ArrowRight' && images.length > 1) {
      // ⏩ Geser ke kanan: 0 → belakang
      const first = images.shift(); // hapus index 0
      if (first) images.push(first); // tambahkan ke akhir
    }

    if (event.key === 'ArrowLeft' && images.length > 1) {
      // ⏪ Geser ke kiri: akhir → depan
      const last = images.pop(); // hapus index terakhir
      if (last) images.unshift(last); // tambahkan ke depan
    }
  }

  get currentImage(): string {
    return this.certificates[this.selectedIndex].images[0];
  }
}
