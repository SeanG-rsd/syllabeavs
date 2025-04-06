import './globals.css';
import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/authContexts/index'; // update path if needed

export const metadata = {
  title: 'Your App',
  description: 'Some description',
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
