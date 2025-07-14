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
    <header className="border-b">
      <nav className="container flex items-center gap-4 py-3">
        {routes.map((route) => (
          <Button
            key={route.path}
            asChild
            variant={pathname === route.path ? 'secondary' : 'ghost'}
          >
            <Link to={route.path}>{route.name}</Link>
          </Button>
        ))}
      </nav>
    </header>
  )
}