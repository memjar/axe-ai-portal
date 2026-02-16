import './globals.css'

export const metadata = {
  title: 'Cortana — Personal AI That Runs on Your Hardware',
  description: 'Open-source personal AI assistant. Runs locally on your Mac, PC, or server. No cloud fees, no data leaving your machine. 55+ skills, multi-channel, fully private.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  )
}
