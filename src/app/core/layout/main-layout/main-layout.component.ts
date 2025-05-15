import { Component, OnInit, signal, HostListener, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { VisitorService } from '../../services/visitor.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  visitorCount = signal(0);
  showScrollTop = false;

  private platformId = inject(PLATFORM_ID);

  constructor(private visitorService: VisitorService) {}

  async ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      await this.visitorService.countUniqueVisit();
      const count = await this.visitorService.getVisitorCount();
      this.visitorCount.set(count);
    }
  }

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
}
