import { Poppins } from 'next/font/google';

import type { Metadata } from 'next';

import '../styles/globals.css';

const poppins = Poppins({
  subsets: ['latin-ext'],
  fallback: ['Segoe UI', 'Open Sans', 'Helvetica Neue'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
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
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  );
};

export default RootLayout;
