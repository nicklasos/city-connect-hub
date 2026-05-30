import { useLanguage } from '@/contexts/LanguageContext';
import { Zap, Shield, Clock, Sparkles } from 'lucide-react';

const BenefitsSection = () => {
  const { t } = useLanguage();

  const benefits = [
    {
      icon: Sparkles,
      titleKey: 'benefits.convenience.title',
      descKey: 'benefits.convenience.desc',
    },
    {
      icon: Zap,
      titleKey: 'benefits.speed.title',
      descKey: 'benefits.speed.desc',
    },
    {
      icon: Clock,
      titleKey: 'benefits.reliability.title',
      descKey: 'benefits.reliability.desc',
    },
    {
      icon: Shield,
      titleKey: 'benefits.security.title',
      descKey: 'benefits.security.desc',
    },
  ];

  return (
    <section className="pt-10 md:pt-12 pb-16 md:pb-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('benefits.title')}
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.titleKey}
              className="group p-6 md:p-8 rounded-2xl bg-card border border-border hover:border-primary/20 hover:shadow-card-hover transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <benefit.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {t(benefit.titleKey)}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t(benefit.descKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
