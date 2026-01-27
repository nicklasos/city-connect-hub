import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'uk' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  uk: {
    // Navigation
    'nav.features': 'Можливості',
    'nav.howItWorks': 'Як це працює',
    'nav.cities': 'Міста',
    'nav.contact': 'Контакти',
    
    // Hero
    'hero.title': 'Усі міські сервіси в одному застосунку',
    'hero.subtitle': 'Транспорт, комунальні послуги, міські сервіси та події — все під рукою. Зручно, швидко, надійно.',
    'hero.cta': 'Приєднатися до списку очікування',
    'hero.comingSoon': 'Скоро на iOS та Android',
    
    // Benefits
    'benefits.title': 'Чому обирають citi.app',
    'benefits.convenience.title': 'Зручність',
    'benefits.convenience.desc': 'Всі сервіси вашого міста зібрані в одному місці. Більше не потрібно шукати різні застосунки.',
    'benefits.speed.title': 'Швидкість',
    'benefits.speed.desc': 'Миттєвий доступ до інформації про транспорт, паркування та міські послуги.',
    'benefits.reliability.title': 'Надійність',
    'benefits.reliability.desc': 'Офіційні дані напряму від міських служб. Актуальна інформація в реальному часі.',
    'benefits.security.title': 'Безпека',
    'benefits.security.desc': 'Захищене з\'єднання та дотримання найвищих стандартів конфіденційності даних.',
    
    // Features
    'features.title': 'Можливості застосунку',
    'features.transport.title': 'Транспорт',
    'features.transport.routes': 'Маршрути громадського транспорту',
    'features.transport.realtime': 'Відстеження в реальному часі',
    'features.transport.parking': 'Паркування та оплата',
    'features.transport.schedule': 'Розклад руху',
    
    'features.utilities.title': 'Комунальні послуги',
    'features.utilities.payments': 'Оплата комунальних послуг',
    'features.utilities.meters': 'Передача показників лічильників',
    'features.utilities.history': 'Історія платежів',
    'features.utilities.notifications': 'Сповіщення про заборгованість',
    
    'features.services.title': 'Міські сервіси',
    'features.services.petitions': 'Петиції та звернення',
    'features.services.documents': 'Замовлення довідок',
    'features.services.appointments': 'Запис на прийом',
    'features.services.feedback': 'Зворотний зв\'язок',
    
    'features.events.title': 'Події та новини',
    'features.events.calendar': 'Календар подій міста',
    'features.events.news': 'Новини та оголошення',
    'features.events.alerts': 'Важливі сповіщення',
    'features.events.updates': 'Оновлення від адміністрації',
    
    // How it works
    'howItWorks.title': 'Як це працює',
    'howItWorks.step1.title': 'Завантажте застосунок',
    'howItWorks.step1.desc': 'Встановіть citi.app з App Store або Google Play на ваш смартфон.',
    'howItWorks.step2.title': 'Оберіть своє місто',
    'howItWorks.step2.desc': 'Виберіть своє місто зі списку підключених міст та налаштуйте потрібні сервіси.',
    'howItWorks.step3.title': 'Користуйтеся сервісами',
    'howItWorks.step3.desc': 'Отримайте доступ до всіх міських послуг в одному зручному застосунку.',
    
    // Multi-city
    'multiCity.title': 'Працює у багатьох містах',
    'multiCity.subtitle': 'Модульна архітектура дозволяє кожному місту обирати та налаштовувати потрібні функції.',
    'multiCity.feature1': 'Гнучке підключення нових міст',
    'multiCity.feature2': 'Індивідуальне налаштування функцій',
    'multiCity.feature3': 'Єдина платформа для всіх',
    'multiCity.feature4': 'Швидке впровадження',
    
    // CTA
    'cta.title': 'Готові до розумного міста?',
    'cta.subtitle': 'Приєднуйтесь до списку очікування та будьте першими, хто отримає доступ до застосунку.',
    'cta.button': 'Приєднатися до списку очікування',
    'cta.contact': 'Зв\'язатися з командою',
    
    // Phone mockup
    'mockup.transport': 'Транспорт',
    'mockup.utilities': 'Комунальні послуги',
    'mockup.services': 'Міські сервіси',
    'mockup.events': 'Події та новини',
    'mockup.notification': 'Автобус 24 прибуде через 3 хв',
    
    // Footer
    'footer.description': 'Усі міські сервіси в одному застосунку.',
    'footer.privacy': 'Політика конфіденційності',
    'footer.terms': 'Умови використання',
    'footer.rights': 'Усі права захищені.',
    
    // Legal pages
    'privacy.title': 'Політика конфіденційності',
    'terms.title': 'Умови використання',
    'legal.lastUpdated': 'Останнє оновлення',
    'legal.backHome': 'На головну',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.howItWorks': 'How It Works',
    'nav.cities': 'Cities',
    'nav.contact': 'Contact',
    
    // Hero
    'hero.title': 'All city services in one app',
    'hero.subtitle': 'Transport, utilities, city services, and events — all at your fingertips. Convenient, fast, reliable.',
    'hero.cta': 'Join the waitlist',
    'hero.comingSoon': 'Coming soon on iOS & Android',
    
    // Benefits
    'benefits.title': 'Why choose citi.app',
    'benefits.convenience.title': 'Convenience',
    'benefits.convenience.desc': 'All your city services gathered in one place. No more searching for different apps.',
    'benefits.speed.title': 'Speed',
    'benefits.speed.desc': 'Instant access to transport information, parking, and city services.',
    'benefits.reliability.title': 'Reliability',
    'benefits.reliability.desc': 'Official data directly from city services. Real-time up-to-date information.',
    'benefits.security.title': 'Security',
    'benefits.security.desc': 'Secure connection and adherence to the highest data privacy standards.',
    
    // Features
    'features.title': 'App Features',
    'features.transport.title': 'Transport',
    'features.transport.routes': 'Public transport routes',
    'features.transport.realtime': 'Real-time tracking',
    'features.transport.parking': 'Parking and payment',
    'features.transport.schedule': 'Transit schedules',
    
    'features.utilities.title': 'Utilities',
    'features.utilities.payments': 'Utility bill payments',
    'features.utilities.meters': 'Meter readings submission',
    'features.utilities.history': 'Payment history',
    'features.utilities.notifications': 'Debt notifications',
    
    'features.services.title': 'City Services',
    'features.services.petitions': 'Petitions and requests',
    'features.services.documents': 'Document ordering',
    'features.services.appointments': 'Appointment booking',
    'features.services.feedback': 'Feedback',
    
    'features.events.title': 'Events & News',
    'features.events.calendar': 'City events calendar',
    'features.events.news': 'News and announcements',
    'features.events.alerts': 'Important alerts',
    'features.events.updates': 'Administration updates',
    
    // How it works
    'howItWorks.title': 'How It Works',
    'howItWorks.step1.title': 'Download the app',
    'howItWorks.step1.desc': 'Install citi.app from App Store or Google Play on your smartphone.',
    'howItWorks.step2.title': 'Choose your city',
    'howItWorks.step2.desc': 'Select your city from the list of connected cities and configure the services you need.',
    'howItWorks.step3.title': 'Use the services',
    'howItWorks.step3.desc': 'Get access to all city services in one convenient app.',
    
    // Multi-city
    'multiCity.title': 'Works in multiple cities',
    'multiCity.subtitle': 'Modular architecture allows each city to choose and configure the features they need.',
    'multiCity.feature1': 'Flexible onboarding of new cities',
    'multiCity.feature2': 'Individual feature customization',
    'multiCity.feature3': 'Unified platform for all',
    'multiCity.feature4': 'Fast implementation',
    
    // CTA
    'cta.title': 'Ready for a smart city?',
    'cta.subtitle': 'Join the waitlist and be among the first to get access to the app.',
    'cta.button': 'Join the waitlist',
    'cta.contact': 'Contact the team',
    
    // Phone mockup
    'mockup.transport': 'Transport',
    'mockup.utilities': 'Utilities',
    'mockup.services': 'Services',
    'mockup.events': 'Events',
    'mockup.notification': 'Bus 24 arrives in 3 min',
    
    // Footer
    'footer.description': 'All city services in one app.',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Use',
    'footer.rights': 'All rights reserved.',
    
    // Legal pages
    'privacy.title': 'Privacy Policy',
    'terms.title': 'Terms of Use',
    'legal.lastUpdated': 'Last updated',
    'legal.backHome': 'Back to home',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('uk');

  useEffect(() => {
    const savedLang = localStorage.getItem('citi-app-lang') as Language;
    if (savedLang && (savedLang === 'uk' || savedLang === 'en')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('citi-app-lang', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
