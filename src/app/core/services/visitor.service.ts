// src/app/core/services/visitor.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Database, ref, get, set } from '@angular/fire/database';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VisitorService {
  private http = inject(HttpClient);
  private db = inject(Database);

  async countUniqueVisit(): Promise<void> {
    try {
      const ip = await this.getPublicIP();
      const safeIP = ip.replace(/\./g, '_'); // ← fix di sini
      const visitRef = ref(this.db, `visitors/ips/${safeIP}`);

      const snapshot = await get(visitRef);

      if (!snapshot.exists()) {
        await set(visitRef, true);

        const countRef = ref(this.db, 'visitors/count');
        const countSnap = await get(countRef);
        const currentCount = countSnap.exists() ? countSnap.val() : 0;
        await set(countRef, currentCount + 1);
      }
    } catch (err) {
      console.error('Failed to count unique visit:', err);
    }
  }

  async getVisitorCount(): Promise<number> {
    try {
      const countSnap = await get(ref(this.db, 'visitors/count'));
      return countSnap.exists() ? countSnap.val() : 0;
    } catch {
      return 0;
    }
  }

  private async getPublicIP(): Promise<string> {
    const res: any = await firstValueFrom(
      this.http.get('https://api.ipify.org?format=json')
    );
    return res.ip;
  }
}
