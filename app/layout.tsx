import type { Metadata } from 'next';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  title: 'Hexagon JD Agent',
  description: 'AI-Powered Job Description Studio for Hexagon HR',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex h-screen overflow-hidden print:block print:h-auto print:overflow-visible">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden print:block print:overflow-visible">
            <Navbar />
            <main className="flex-1 overflow-y-auto p-6 print:overflow-visible print:p-0">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
