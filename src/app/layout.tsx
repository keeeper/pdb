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
      <body style={{backgroundColor:'#edf2f7'}}>
        <main style={{marginTop: 30, marginBottom: 30}}>
          {children}
        </main>
      </body>
    </html>
  )
}
