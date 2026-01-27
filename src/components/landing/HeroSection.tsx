import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Smartphone } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background-subtle to-background -z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6 md:mb-8 animate-fade-in">
            <Smartphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">{t('hero.comingSoon')}</span>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6 animate-fade-in animation-delay-100">
            {t('hero.title')}
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-10 animate-fade-in animation-delay-200">
            {t('hero.subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in animation-delay-300">
            <Button variant="hero" size="xl">
              {t('hero.cta')}
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <a href="mailto:info@citi.top">
                {t('cta.contact')}
              </a>
            </Button>
          </div>
        </div>

        {/* Phone mockup */}
        <div className="mt-12 md:mt-16 max-w-sm mx-auto animate-fade-in-up animation-delay-400">
          <div className="relative">
            {/* Phone frame */}
            <div className="relative mx-auto w-64 md:w-72 bg-foreground rounded-[3rem] p-3 shadow-2xl animate-float">
              <div className="bg-background rounded-[2.5rem] overflow-hidden aspect-[9/19]">
                {/* Screen content mockup */}
                <div className="h-full bg-gradient-to-b from-background-subtle to-background p-4">
                  {/* Status bar */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs text-muted-foreground">9:41</span>
                    <div className="flex gap-1">
                      <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                      <div className="w-4 h-2 bg-muted-foreground/50 rounded-sm" />
                      <div className="w-6 h-3 bg-primary rounded-sm" />
                    </div>
                  </div>
                  
                  {/* App header */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center overflow-hidden">
                      <img src="/favicon.svg" alt="citi.app logo" className="w-full h-full object-contain p-1" />
                    </div>
                    <span className="font-semibold text-foreground">citi.app</span>
                  </div>
                  
                  {/* Quick actions grid */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-feature-transport/10 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-feature-transport/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-feature-transport" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{t('mockup.transport')}</span>
                    </div>
                    <div className="bg-feature-utilities/10 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-feature-utilities/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-feature-utilities" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{t('mockup.utilities')}</span>
                    </div>
                    <div className="bg-feature-services/10 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-feature-services/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-feature-services" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{t('mockup.services')}</span>
                    </div>
                    <div className="bg-feature-events/10 rounded-xl p-3 text-center">
                      <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-feature-events/20 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-feature-events" />
                      </div>
                      <span className="text-xs font-medium text-foreground">{t('mockup.events')}</span>
                    </div>
                  </div>

                  {/* Notification card */}
                  <div className="bg-card rounded-xl p-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" />
                      <span className="text-xs text-muted-foreground">{t('mockup.notification')}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Notch */}
              <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-6 bg-foreground rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
