import {
  Injector,
  inject,
  runInInjectionContext,
  effect,
  Component,
  ElementRef,
  ViewChild,
  signal,
  AfterViewInit,
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
  /* ------------ UI & state signals ------------ */
  input = '';
  showChat = signal(false);
  conversation = signal<{ user: string; bot: string }[]>([]);
  typingBuffer = signal(''); // teks yang sedang “diketik”
  isTyping = signal(false); // flag “AI is typing …”

  @ViewChild('chatMessages')
  private chatMessagesRef!: ElementRef<HTMLDivElement>;
  private readonly chatbot = inject(ChatbotService);

  /* ------------ Constructor: scroll observers ------------ */
  constructor() {
    const injector = inject(Injector);
    runInInjectionContext(injector, () => {
      effect(() => {
        this.conversation(); // scroll ketika pesan baru
        setTimeout(() => this.scrollToBottom(), 80);
      });
      effect(() => {
        this.showChat(); // scroll ketika jendela dibuka
        setTimeout(() => this.scrollToBottom(), 80);
      });
    });
  }

  ngAfterViewInit() {} /* semua effect di‑handle di constructor */

  /* ------------ Public methods ------------ */
  toggleChat() {
    this.showChat.update((v) => !v);
  }

  async send() {
    const userMessage = this.input.trim();
    if (!userMessage) return;

    /* tampilkan pesan user dulu */
    this.conversation.update((c) => [...c, { user: userMessage, bot: '...' }]);
    this.input = '';

    /* panggil backend */
    try {
      this.isTyping.set(true);
      const res = await this.chatbot.askGemini(userMessage).toPromise();
      const fullReply = res?.reply || '(no response)';

      /* animasi ketik karakter per karakter */
      await this.typeReply(fullReply);

      /* ganti ‘…’ dengan hasil final */
      this.conversation.update((c) => {
        const updated = [...c];
        updated[updated.length - 1].bot = fullReply;
        return updated;
      });
    } catch (err) {
      this.conversation.update((c) => {
        const updated = [...c];
        updated[updated.length - 1].bot = '⚠️ Failed to fetch response.';
        return updated;
      });
    } finally {
      this.isTyping.set(false);
      this.typingBuffer.set('');
    }
  }

  /* ------------ Helpers ------------ */
  /** animasi mengetik; resolve ketika selesai */
  private typeReply(text: string, speed = 30): Promise<void> {
    return new Promise((resolve) => {
      let i = 0;
      const timer = setInterval(() => {
        this.typingBuffer.set(text.slice(0, ++i));
        if (i >= text.length) {
          clearInterval(timer);
          resolve();
        }
      }, speed);
    });
  }

  private scrollToBottom() {
    const el = this.chatMessagesRef?.nativeElement;
    if (el) el.scrollTop = el.scrollHeight;
  }
}
