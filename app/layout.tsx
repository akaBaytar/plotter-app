import localFont from 'next/font/local';
import type { Metadata } from 'next';

import '../styles/globals.css';

const geistSans = localFont({
  src: '../fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Plotter - Your Ultimate Workspace for Notes, Tasks and Projects',
  keywords:
    'note-taking, task management, project management, productivity tool, organization, collaboration, workspace, personal planner, task planner',
  description:
    'Plotter is your all-in-one workspace for note-taking, task management, and project organization. Collaborate, plan and stay productive with ease using Plotter’s intuitive interface and powerful tools.',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable}  antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
