import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

export default function MainLayout() {
  return (
    <div className='bg-amber-100'>
      <div className="min-h-screen flex flex-col max-w-6xl mx-auto px-4">
        <Navbar />
        <h1 className="text-5xl font-extrabold text-center text-amber-800 drop-shadow-sm py-6">
          Library<span className="text-amber-600">Hub</span> 📚
        </h1>
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