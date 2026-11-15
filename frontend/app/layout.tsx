import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from './contexts/authContext';

export const metadata = {
  icons: {
    icon: '/logo.png', // This path refers to /public/icon.png
  },
  title: 'Syllabeavs',
  description: 'The AI Syllabus Parser',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
