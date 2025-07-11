import { Component, OnInit, HostListener, inject, signal } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ChatbotComponent } from '../../../features/chatbot/chatbot.component';

import { VisitorService } from '../../services/visitor.service';
import reportWebVitals from '@vercel/speed-insights';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ChatbotComponent,
  ],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  visitorCount = signal(0);
  showScrollTop = false;
  showChat = signal(false); // ➕ untuk toggle chatbot

  private platformId = inject(PLATFORM_ID);

  constructor(private visitorService: VisitorService) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // 🧠 Hitung kunjungan unik
      await this.visitorService.countUniqueVisit();
      const count = await this.visitorService.getVisitorCount();
      this.visitorCount.set(count);

      // ⚡️ Web Vitals untuk Vercel Analytics
      reportWebVitals.injectSpeedInsights();
    }
  }

  // 🔼 Tombol Scroll Top
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      this.showScrollTop = window.pageYOffset > 300;
    }
  }

  scrollToTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // 🤖 Toggle chatbot pop-up
  toggleChat() {
    this.showChat.update((s) => !s);
  }
}
