import Autoplay from 'embla-carousel-autoplay';
import quotes from '../../assets/quotes.json';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { Quote } from './Quote';

const CAROUSEL_OPTS = {
  loop: true,
} as const;

const AUTOPLAY_OPTS = {
  delay: 5000,
} as const;

export function RotatingQuotes() {
  return (
    <div className="w-full md:max-w-sm">
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
    </div>
  );
}
