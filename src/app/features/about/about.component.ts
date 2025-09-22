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
      title: 'Internship Fullstack Engineer',
      company: 'DOKTORTJ DIGITAL INSTITUTE',
      period: 'November 2024 - April 2025',
      tech: 'PHP, Laravel, Midtrans, Flutter, Production Deployment Cpanel',
      detail:
        'Experienced developer specializing in company website development, UI/UX redesign for SMEs, IoT mobile app prototyping with Flutter, and active as a tech tutor and speaker.',
      points: [
        'Developing the company website by adding CRUD features, integrating the Midtrans payment gateway, and creating support pages as needed by the system.',
        'Redesigning the dashboard and key features, as well as designing a more modern and attractive interface (SMEs).',
        'Designing and creating mockups for a mobile app for IoT mining using Figma and slicing Flutter code.',
        'Contributing as a private tutor for Scratch Programming, Flutter Intermediate, and Web Programming, as well as speaking at an event.',
      ],
    },
    {
      title: 'Data Engineer',
      company: 'Golkar DKI',
      period: 'December 2023 - May 2024',
      tech: 'Python, Scraping Beautifulsoup, Excel, Ms. Excel, Data Entry, Data Cleaning',
      detail:
        'Experienced in managing and automating large-scale data collection processes, leveraging Python, web scraping, and VPS optimization to ensure accurate, valid, and efficient dataset handling.',

      points: [
        'Manage and operate data entry systems efficiently to support organizational information requirements, ensuring flawless data processing and retrieval.',
        'Utilize Python and web scraping methods to obtain detailed population data from the Cek DPT Online website, automating the data collection process for accuracy and neatness.',
        'Implement program logic for data validation, including filtering and duplicate detection, to ensure clear, structured, and reliable datasets, then generate reports using Excel bar charts.',
        'Develop and optimize VPS environments to automate information retrieval, reduce human errors, and improve efficiency in handling large-scale data sets.',
        'Successfully collected, compiled, and processed more than 25,000 data entries within a 2-week period.',
      ],
    },
    {
      title: 'Fullstack Developer',
      company: 'PT Central Artificial Intelligence',
      period: 'August 2022 - January 2024',
      tech: 'Python, Flask, Postman, HTML, CSS, Figma, Bootstrap 5, Gitlab, CI/CD',
      detail:
        'Skilled developer experienced in building interactive dashboards with Flask, integrating and testing REST APIs, prototyping mobile apps with Figma, and developing web pages based on film routes.',
      points: [
        'Creating interactive and intuitive web dashboards using Figma, then slicing them into HTML, CSS, and JavaScript with the Flask framework.',
        'Integrating and testing Rest APIs to ensure features match requests.',
        'Creating mobile app prototypes using Figma with understandable user experiences.',
        'Designing and developing web pages based on film routes and implementing them with Flask.',
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
    'Flutter',
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
