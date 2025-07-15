import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='bg-amber-100'>
      <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4">
        <Navbar />
        <main className="flex-1 container py-4 bg-amber-50 rounded-xl">
          <Outlet />
        </main>
        <footer className="py-4 border-t">
          <div className="container text-center text-sm text-muted-foreground">
            Library Management System © {new Date().getFullYear()}
          </div>
        </footer>
      </div>
    </div>
  )
}