import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const MAILTO_EMAIL = 'info@citi.top';
const MAILTO_SUBJECT = 'Видалення облікового запису';
const MAILTO_BODY = `Доброго дня!

Прошу видалити мій обліковий запис у додатку «CITІ».

Номер телефону: 

Дякую.`;

const AccountDeletion = () => {
  const { setLanguage } = useLanguage();
  setLanguage('uk');

  const mailtoHref = `mailto:${encodeURIComponent(MAILTO_EMAIL)}?subject=${encodeURIComponent(MAILTO_SUBJECT)}&body=${encodeURIComponent(MAILTO_BODY)}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-16 max-w-3xl">
        <Link to="/">
          <Button variant="ghost" className="mb-8 -ml-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            На головну
          </Button>
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
          Видалення облікового запису в додатку «CITІ»
        </h1>

        <div className="prose prose-lg max-w-none text-foreground">
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Інструкція для видалення облікового запису:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>Надішліть email на адресу: <code className="bg-muted px-1.5 py-0.5 rounded">info@citi.top</code></li>
              <li>У темі листа вкажіть: «Видалення облікового запису»</li>
              <li>У тексті листа вкажіть номер телефону, який використовувався для входу в додаток</li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Які дані буде видалено:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>обліковий запис користувача</li>
              <li>персональні дані (номер телефону)</li>
              <li>дані профілю</li>
              <li>інші дані, повʼязані з використанням додатку</li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Строки видалення:</h2>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 ml-4">
              <li>запит обробляється протягом до 30 календарних днів</li>
              <li>окремі дані можуть зберігатися довше, якщо цього вимагає законодавство (наприклад, фінансові транзакції)</li>
            </ul>
          </section>

          <hr className="my-8 border-border" />

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Контакти</h2>
            <p className="text-muted-foreground mb-2">Для додаткових питань:</p>
            <p><code className="bg-muted px-1.5 py-0.5 rounded">info@citi.top</code></p>
          </section>

          <hr className="my-8 border-border" />

          <a
            href={mailtoHref}
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Написати листа на видалення облікового запису
          </a>
        </div>
      </div>
    </div>
  );
};

export default AccountDeletion;
