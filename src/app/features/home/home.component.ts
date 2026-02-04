import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';

interface ContributionCell {
  date: string;
  count: number;
  level: number;
  tooltip: string;
}

interface AchievementBadge {
  name: string;
  slug: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule],
})
export class HomeComponent implements OnInit {
  private readonly platformId = inject(PLATFORM_ID);

  readonly githubUsername = 'niceProg';
  isLoading = true;
  hasError = false;
  totalContributions = 0;
  weeks: Array<Array<ContributionCell | null>> = [];
  monthLabels: string[] = [];
  achievementBadges: AchievementBadge[] = [];

  async ngOnInit(): Promise<void> {
    this.buildCalendar(new Map<string, number>());
    this.achievementBadges = this.getAchievementBadges(this.githubUsername);

    if (!isPlatformBrowser(this.platformId)) {
      this.isLoading = false;
      return;
    }

    await this.loadContributions();
  }

  private async loadContributions(): Promise<void> {
    const endpoints = [
      `https://github-contributions-api.jogruber.de/v4/${this.githubUsername}?y=last`,
      `https://github-contributions-api.deno.dev/${this.githubUsername}.json`,
      `https://github-contributions.vercel.app/api/v1/${this.githubUsername}`,
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
          continue;
        }

        const payload: unknown = await response.json();
        const contributionMap = this.extractContributionMap(payload);

        if (contributionMap.size > 0) {
          this.buildCalendar(contributionMap);
          this.hasError = false;
          this.isLoading = false;
          return;
        }
      } catch {
        // Try next endpoint.
      }
    }

    this.hasError = true;
    this.isLoading = false;
  }

  private extractContributionMap(payload: unknown): Map<string, number> {
    const map = new Map<string, number>();
    const contributions = this.findContributionArray(payload);

    for (const item of contributions) {
      if (!item || typeof item !== 'object') {
        continue;
      }

      const record = item as Record<string, unknown>;
      const rawDate =
        this.toStringValue(record['date']) ??
        this.toStringValue(record['occurredAt']) ??
        this.toStringValue(record['day']);

      if (!rawDate) {
        continue;
      }

      const dateKey = this.toDateKey(rawDate);

      if (!dateKey) {
        continue;
      }

      const count = this.toNumberValue(
        record['count'] ??
          record['contributionCount'] ??
          record['value'] ??
          record['total']
      );

      if (count === null) {
        continue;
      }

      map.set(dateKey, Math.max(0, Math.floor(count)));
    }

    return map;
  }

  private findContributionArray(payload: unknown): unknown[] {
    if (!payload || typeof payload !== 'object') {
      return [];
    }

    const objectPayload = payload as Record<string, unknown>;
    const direct = objectPayload['contributions'];
    if (Array.isArray(direct)) {
      return direct;
    }

    const data = objectPayload['data'];
    if (data && typeof data === 'object') {
      const nested = (data as Record<string, unknown>)['contributions'];
      if (Array.isArray(nested)) {
        return nested;
      }
    }

    return [];
  }

  private buildCalendar(contributionMap: Map<string, number>): void {
    const endDate = this.startOfDay(new Date());
    const startDate = new Date(endDate);
    startDate.setDate(startDate.getDate() - 364);

    const calendarStart = new Date(startDate);
    calendarStart.setDate(calendarStart.getDate() - calendarStart.getDay());

    const calendarEnd = new Date(endDate);
    calendarEnd.setDate(calendarEnd.getDate() + (6 - calendarEnd.getDay()));

    const maxCount = Math.max(...contributionMap.values(), 0);
    const weeks: Array<Array<ContributionCell | null>> = [];
    const monthLabels: string[] = [];

    let cursor = new Date(calendarStart);
    let previousMonth = -1;

    while (cursor <= calendarEnd) {
      const weekStart = new Date(cursor);
      const weekMonth = weekStart.getMonth();
      monthLabels.push(
        weekMonth !== previousMonth
          ? weekStart.toLocaleString('en-US', { month: 'short' })
          : ''
      );
      previousMonth = weekMonth;

      const week: Array<ContributionCell | null> = [];
      for (let day = 0; day < 7; day += 1) {
        const current = new Date(cursor);
        current.setDate(cursor.getDate() + day);

        if (current < startDate || current > endDate) {
          week.push(null);
          continue;
        }

        const dateKey = this.toDateKey(current);
        if (!dateKey) {
          week.push(null);
          continue;
        }

        const count = contributionMap.get(dateKey) ?? 0;
        const level = this.levelFromCount(count, maxCount);
        week.push({
          date: dateKey,
          count,
          level,
          tooltip: `${count} contribution${count === 1 ? '' : 's'} on ${current.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        });
      }

      weeks.push(week);
      cursor.setDate(cursor.getDate() + 7);
    }

    this.totalContributions = [...contributionMap.values()].reduce(
      (sum, count) => sum + count,
      0
    );
    this.weeks = weeks;
    this.monthLabels = monthLabels;
  }

  private levelFromCount(count: number, maxCount: number): number {
    if (count <= 0 || maxCount <= 0) {
      return 0;
    }

    const ratio = count / maxCount;
    if (ratio <= 0.25) {
      return 1;
    }
    if (ratio <= 0.5) {
      return 2;
    }
    if (ratio <= 0.75) {
      return 3;
    }
    return 4;
  }

  private startOfDay(date: Date): Date {
    const normalized = new Date(date);
    normalized.setHours(0, 0, 0, 0);
    return normalized;
  }

  private toDateKey(input: string | Date): string | null {
    if (typeof input === 'string') {
      const dateOnlyMatch = input.match(/^(\d{4})-(\d{2})-(\d{2})/);
      if (dateOnlyMatch) {
        return `${dateOnlyMatch[1]}-${dateOnlyMatch[2]}-${dateOnlyMatch[3]}`;
      }
    }

    const date = input instanceof Date ? new Date(input) : new Date(input);
    if (Number.isNaN(date.getTime())) {
      return null;
    }

    return this.formatLocalDate(date);
  }

  private formatLocalDate(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private toStringValue(value: unknown): string | null {
    return typeof value === 'string' && value.length > 0 ? value : null;
  }

  private toNumberValue(value: unknown): number | null {
    if (typeof value === 'number' && Number.isFinite(value)) {
      return value;
    }

    if (typeof value === 'string' && value.trim().length > 0) {
      const parsed = Number(value);
      return Number.isFinite(parsed) ? parsed : null;
    }

    return null;
  }

  private getAchievementBadges(username: string): AchievementBadge[] {
    const badgeSets: Record<string, AchievementBadge[]> = {
      niceprog: [
        {
          name: 'YOLO',
          slug: 'yolo',
          imageUrl:
            'https://github.com/Schweinepriester/github-profile-achievements/raw/main/images/yolo-default.png',
        },
        {
          name: 'Pull Shark',
          slug: 'pull-shark',
          imageUrl:
            'https://github.com/Schweinepriester/github-profile-achievements/raw/main/images/pull-shark-default.png',
        },
        {
          name: 'Quickdraw',
          slug: 'quickdraw',
          imageUrl:
            'https://github.com/Schweinepriester/github-profile-achievements/raw/main/images/quickdraw-default.png',
        },
        {
          name: 'Arctic Code Vault Contributor',
          slug: 'arctic-code-vault-contributor',
          imageUrl:
            'https://github.com/Schweinepriester/github-profile-achievements/raw/main/images/arctic-code-vault-contributor-default.png',
        },
      ],
    };

    return badgeSets[username.toLowerCase()] ?? [];
  }
}
