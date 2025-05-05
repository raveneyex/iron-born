import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Spinner } from '@/components/ui/spinner';

export function RotatingQuotesSkeleton() {
  return (
    <Carousel>
      <CarouselContent>
        <CarouselItem>
          <QuoteSkeleton />
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function QuoteSkeleton() {
  return (
    <Card
      data-testid="skeleton-quote-card"
      className="max-w-sm w-full h-[250px] justify-between bg-[url('/dark-gym.png')] bg-cover bg-center bg-opacity-50"
    >
      <CardContent className="flex items-center justify-center h-full w-full">
        <Spinner show={true} size="large" />
      </CardContent>
    </Card>
  );
}
