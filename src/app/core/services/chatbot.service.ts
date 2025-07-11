import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environtments/environments';

@Injectable({ providedIn: 'root' })
export class ChatbotService {
  constructor(private http: HttpClient) {}

  askGemini(message: string) {
    return this.http.post<{ reply: string }>(
      environment.apiChatbot,
      { prompt: message } // ✅ KEY-NYA HARUS `prompt` agar backend ngerti
    );
  }
}
