import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { NAV_ITEMS } from '@/constants/navItems.constant';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b bg-white p-4 shadow-sm">
      <div className="flex gap-4">
        {NAV_ITEMS.map(({ path, label }) => (
          <Button
            key={path}
            asChild
            variant={location.pathname === path ? 'default' : 'outline'}
          >
            <Link to={path}>{label}</Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
