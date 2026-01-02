import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from './contexts/authContext';

export const metadata = {
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
