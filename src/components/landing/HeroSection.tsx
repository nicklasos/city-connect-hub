import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';
import StoreButtons from '@/components/landing/StoreButtons';
import AppGallery from '@/components/landing/AppGallery';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-8 md:pt-32 md:pb-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background-subtle to-background -z-10" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 md:mb-8 animate-fade-in">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('hero.available')}</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in animation-delay-100">
            {t('hero.title')}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-in animation-delay-200">
            {t('hero.subtitle')}
          </p>

          <div className="animate-fade-in animation-delay-300">
            <StoreButtons className="mb-4" />
            <Button asChild variant="ghost" size="lg">
              <a href="mailto:info@citi.top">{t('cta.contact')}</a>
            </Button>
          </div>
        </div>

        <AppGallery />
      </div>
    </section>
  );
};

export default HeroSection;
