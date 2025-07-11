// import {
//   Inject,
//   inject,
//   runInInjectionContext,
//   effect,
//   Component,
//   ElementRef,
//   ViewChild,
//   signal,
//   AfterViewInit,
// } from '@angular/core';
import {
  Injector,
  inject,
  runInInjectionContext,
  effect,
  Component,
  ElementRef,
  ViewChild,
  signal,
  AfterViewInit
} from '@angular/core';

import { ChatbotService } from '../../core/services/chatbot.service';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent implements AfterViewInit {
  input = '';
  showChat = signal(false);
  conversation = signal<{ user: string; bot: string }[]>([]);

  @ViewChild('chatMessages')
  private chatMessagesRef!: ElementRef<HTMLDivElement>;

  private readonly chatbot = inject(ChatbotService);

  constructor() {
    const injector = inject(Injector);

    runInInjectionContext(injector, () => {
      effect(() => {
        this.conversation(); // observe perubahan
        setTimeout(() => this.scrollToBottom(), 100);
      });

      effect(() => {
        this.showChat(); // observe toggle chat
        setTimeout(() => this.scrollToBottom(), 100);
      });
    });
  }

  ngAfterViewInit(): void {
    // kosongkan, karena effect sudah aman di constructor injection context
  }

  toggleChat() {
    this.showChat.update((s) => !s);
  }

  async send() {
    const userMessage = this.input.trim();
    if (!userMessage) return;

    this.input = '';
    this.conversation.update((c) => [...c, { user: userMessage, bot: '...' }]);

    try {
      const res = await this.chatbot.askGemini(userMessage).toPromise();
      this.conversation.update((c) => {
        const updated = [...c];
        updated[updated.length - 1].bot = res?.reply || '(no response)';
        return updated;
      });
    } catch {
      this.conversation.update((c) => {
        const updated = [...c];
        updated[updated.length - 1].bot = '⚠️ Failed to fetch response.';
        return updated;
      });
    }
  }

  private scrollToBottom() {
    const container = this.chatMessagesRef?.nativeElement;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
