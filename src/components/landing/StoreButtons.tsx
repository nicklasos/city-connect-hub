import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/constants/storeLinks';
import { cn } from '@/lib/utils';

type StoreButtonsProps = {
  className?: string;
  variant?: 'hero' | 'cta';
};

const StoreButtons = ({ className, variant = 'hero' }: StoreButtonsProps) => {
  const { t } = useLanguage();
  const isCta = variant === 'cta';

  return (
    <div className={cn('flex flex-col sm:flex-row items-center justify-center gap-4', className)}>
      <Button
        asChild
        variant={isCta ? 'secondary' : 'hero'}
        size="xl"
        className={isCta ? 'w-full sm:w-auto' : undefined}
      >
        <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
          {t('hero.appStore')}
        </a>
      </Button>
      <Button
        asChild
        variant={isCta ? 'secondary' : 'hero-outline'}
        size="xl"
        className={isCta ? 'w-full sm:w-auto' : undefined}
      >
        <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer">
          {t('hero.googlePlay')}
        </a>
      </Button>
    </div>
  );
};

export default StoreButtons;
