import { useCallback, useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel';
import { SCREENSHOT_PATHS } from '@/constants/storeLinks';
import { cn } from '@/lib/utils';

const AUTOPLAY_INTERVAL_MS = 4000;

const AppGallery = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (!api) return;
    onSelect();
    api.on('select', onSelect);
    return () => {
      api.off('select', onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [api]);

  return (
    <div className="mt-10 md:mt-12 mx-auto animate-fade-in-up animation-delay-400">
      <Carousel setApi={setApi} opts={{ loop: true }} className="w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] mx-auto">
        <CarouselContent className="-ml-0">
          {SCREENSHOT_PATHS.map((src, index) => (
            <CarouselItem key={src} className="pl-0 basis-full flex justify-center">
              <img
                src={src}
                alt={`citi.app screenshot ${index + 1}`}
                className="w-auto max-w-full max-h-[min(58vh,400px)] sm:max-h-[min(60vh,440px)] md:max-h-[520px] object-contain"
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 mt-4">
        {SCREENSHOT_PATHS.map((src, index) => (
          <button
            key={src}
            type="button"
            aria-label={`Screenshot ${index + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              selectedIndex === index ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30',
            )}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default AppGallery;
