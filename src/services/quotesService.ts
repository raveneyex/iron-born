import type { IQuote } from '@/types/quote';

import quotes from '@/assets/quotes.json';

export class QuotesService {
  private static instance: QuotesService;

  private constructor() {}

  public static getInstance(): QuotesService {
    if (!QuotesService.instance) {
      QuotesService.instance = new QuotesService();
    }
    return QuotesService.instance;
  }

  public async getQuotes(): Promise<IQuote[]> {
    // Mocking an API call with 1 second delay
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(quotes as IQuote[]);
      }, 2000);
    });
  }
}
