import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';

const CTASection = () => {
  const { t, language } = useLanguage();
  const isUkrainian = language === 'uk';

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main CTA card */}
          <div className="relative p-8 md:p-12 rounded-3xl bg-primary overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                {t('cta.title')}
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                {t('cta.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-4 sm:mx-6">
                <Button
                  variant="secondary"
                  size="xl"
                  className={`w-full sm:w-auto group ${isUkrainian ? 'text-xs sm:text-sm px-4 sm:px-10' : ''}`}
                >
                  {t('cta.button')}
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="xl"
                  className={`w-full sm:w-auto text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground ${isUkrainian ? 'text-sm sm:text-base px-4 sm:px-10' : ''}`}
                >
                  <a href="mailto:info@citi.top">
                    <Mail className="w-5 h-5 mr-2" />
                    {t('cta.contact')}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
