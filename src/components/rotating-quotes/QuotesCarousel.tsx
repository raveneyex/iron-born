import Autoplay from 'embla-carousel-autoplay';

import { Quote } from './Quote';

import type { IQuote } from '@/types/quote';

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

const CAROUSEL_OPTS = {
  loop: true,
} as const;

const AUTOPLAY_OPTS = {
  delay: 5000,
} as const;

interface QuotesCarouselProps {
  quotes: IQuote[];
}

export function QuotesCarousel(props: QuotesCarouselProps) {
  const { quotes } = props;

  return (
    <Carousel opts={CAROUSEL_OPTS} plugins={[Autoplay({ ...AUTOPLAY_OPTS })]}>
      <CarouselContent>
        {quotes.map((quote, index) => (
          <CarouselItem key={`quote-${index}`}>
            <Quote {...quote} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
