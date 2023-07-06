export const metadata = {
  title: 'PDB - Products database',
  description: 'Scan - find - update your propducts info',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        {children}
      </body>
    </html>
  )
}
