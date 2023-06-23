import { Metadata } from 'next';
import TopBar from '../components/topBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <TopBar />
        {children}
        </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: 'My Animal Crossing Island',
  description: 'An app to show the history of my Animal Crossing island',
}