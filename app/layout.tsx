// import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import './globals.css'

import React from 'react';

// const inter = Inter({ subsets: ['latin'] })

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <html>
    <head>
    </head>
    <body>
      <main>{children}</main>
    </body>
  </html>
);

export default Layout;