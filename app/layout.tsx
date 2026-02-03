import './globals.css'

export const metadata = {
  title: 'AXE - Canada\'s AI Assistant',
  description: 'Advanced local AI with extended reasoning, built for Canadians. PIPEDA compliant, bilingual, privacy-first.',
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
