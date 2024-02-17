import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Vitality App',
  description: 'A comprehensive mental well-being app providing features such as a conversational chatbot, personalized recommendations, mood tracking, and a secure user experience.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
