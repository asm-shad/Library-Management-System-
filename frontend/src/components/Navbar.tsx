import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { pathname } = useLocation()
  const routes = [
    { path: '/', name: 'Books' },
    { path: '/create-book', name: 'Add Book' },
    { path: '/borrow-summary', name: 'Borrow Summary' },
  ]

  return (
    <header className="border-b flex justify-between items-center">
      <nav className="container flex items-center gap-4 py-3">
        {routes.map((route) => (
          <Button
            className='bg-amber-200 hover:bg-amber-300 cursor-pointer'
            key={route.path}
            asChild
            variant={pathname === route.path ? 'secondary' : 'ghost'}
          >
            <Link to={route.path}>{route.name}</Link>
          </Button>
        ))}
      </nav>
      <Link to="/" className="flex items-center gap-2 text-xl font-bold text-amber-900">
        <img src="../../public/library.png" alt="Logo" className="w-6 h-6" />
        LMS
      </Link>
    </header>
  )
}