import './globals.css'

export const metadata = {
  title: 'AXE - Canada\'s AI Assistant',
  description: 'Local AI with Claude-quality responses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
