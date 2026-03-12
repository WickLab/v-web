export const metadata = {
  title: 'Portfolio',
  description: 'Vidula Wickramasinghe',
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
