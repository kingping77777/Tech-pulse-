import { AppLayout } from '@/components/layout/AppLayout';
import { Footer } from '@/components/layout/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppLayout>
      <div className="flex flex-col flex-1">
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
    </AppLayout>
  );
}
