import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { provideHttpClient } from '@angular/common/http'; // ⬅️ WAJIB

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(), // ⬅️ Tambahkan ini agar HttpClient tersedia
  ],
}).catch((err) => console.error(err));
