import { useLanguage } from '@/contexts/LanguageContext';

const Footer = () => {
  const { language, setLanguage, t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 md:py-16 bg-foreground text-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & description */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-3">
              <div className="w-8 h-8 rounded-xl bg-black flex items-center justify-center overflow-hidden">
                <img src="/favicon.svg" alt="citi.app logo" className="w-full h-full object-contain p-1" />
              </div>
              <span className="font-bold text-xl text-background">citi.app</span>
            </div>
            <p className="text-background/60 text-sm max-w-xs">
              {t('footer.description')}
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <a
              href="/privacy.html"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              {t('footer.privacy')}
            </a>
            <a
              href="/tos.html"
              className="text-sm text-background/60 hover:text-background transition-colors"
            >
              {t('footer.terms')}
            </a>
          </div>

          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-background/10 rounded-lg p-1">
              <button
                onClick={() => setLanguage('uk')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === 'uk'
                    ? 'bg-background text-foreground'
                    : 'text-background/60 hover:text-background'
                }`}
              >
                UA
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
                  language === 'en'
                    ? 'bg-background text-foreground'
                    : 'text-background/60 hover:text-background'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-background/10 text-center">
          <p className="text-sm text-background/40">
            © {currentYear} citi.app. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
