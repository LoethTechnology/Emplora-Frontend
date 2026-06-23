'use client';

// Importing the necessary modules
import { Fragment, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Imported to detect the current page path
import RegisterBtn from '@/components/buttons/registerBtn';
import SignInBtn from '@/components/buttons/signInBtn';
import { useUserStore } from '@/store/user.store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import LogoutModal from '../LogoutModal';
import { ChevronDown, HelpCircle, Heart, LogOut, User2, PenLine, Search, Bell } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { useRouter } from 'next/navigation';

// Creating the navbar component
const Navbar = ({ variant = 'default' }) => {
  // Setting the states
  const [isOpen, setIsOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const [loading, setLoading] = useState(false);
  const authStore = useAuthStore();

  // Hook to get the current URL pathname
  const pathname = usePathname();
  const router = useRouter();

  const [lastScrollTop, setLastScrollTop] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll === 0) {
        setAtTop(true);
        setIsVisible(true);
        setLastScrollTop(0);
      } else {
        setAtTop(false);
        // use functional updater to read latest prev value and compare reliably
        setLastScrollTop(prev => {
          if (currentScroll > prev) {
            setIsVisible(false);
          } else {
            setIsVisible(true);
          }
          return currentScroll <= 0 ? 0 : currentScroll;
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Creating a function to handle the menu
  const toggleMenu = () => setIsOpen(!isOpen);
  const headerIsvisible = !isVisible ? 'top-[-200px]' : 'top-0';

  // Helper function to build dynamic class names for desktop links based on active state
  const getDesktopLinkClass = (path: string) => {
    const isActive = pathname === path;
    const baseClasses = 'transition-colors text-sm';

    if (isActive) {
      return `${baseClasses} text-[#334EAC] font-semibold`;
    }

    return variant === 'overlay'
      ? `${baseClasses} text-white hover:text-blue-200`
      : `${baseClasses} text-black hover:text-[#334EAC]`;
  };

  const user = useUserStore(state => state.user);

  const handleLogoutConfirm = async () => {
    setLoading(true);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      authStore.clearAuth();
      router.replace('/signin');
    } catch (error) {
      console.error('errorlogging out:', error);
    } finally {
      setLoading(false);
      setLogoutOpen(false);
    }
  };

  // Helper function to build dynamic class names for mobile drawer links based on active state
  const getMobileLinkClass = (path: string) => {
    const isActive = pathname === path;
    return isActive ? 'text-[#334EAC] font-semibold' : 'hover:text-[#334EAC]';
  };

  const getInitials = (firstName: string, lastName: string, email?: string) => {
    const first = firstName?.trim()?.[0] || '';
    const last = lastName?.trim()?.[0] || '';
    const initials = `${first}${last}`.trim();
    if (initials.length > 0) {
      return initials.toUpperCase();
    }
    return email?.trim()?.[0]?.toUpperCase() ?? 'U';
  };
  const userName = user?.first_name + ' ' + user?.last_name;

  // Rendering the navbar component
  return (
    <Fragment>
      <nav
        className={`w-full z-50 transition-all duration-300 
  ${
    variant === 'overlay'
      ? 'top-0 bg-white border-none text-white sticky'
      : 'top-0 bg-white border-none text-black sticky'
  } ${!atTop && variant !== 'overlay' ? `bg-white/60 backdrop-blur-xs shadow-md ${headerIsvisible}` : ''}`}
      >
        <div className="mx-auto px-6 py-4 flex items-center justify-between">
          {/* 1. Logo Section */}
          <div className="shrink-0">
            <Link
              href="/"
              className={`text-[24px] md:text-[30px] ${
                variant === 'overlay' ? 'text-white' : 'text-[#000000bd]'
              }`}
            >
              Emplora
            </Link>
          </div>

          {/* 2. Desktop Links (Now features working active states matching design specs) */}
          <div className="hidden min-[854px]:flex items-center justify-center gap-8 flex-1">
            <Link href="/" className={getDesktopLinkClass('/')}>
              Home
            </Link>
            <Link href="/about" className={getDesktopLinkClass('/about')}>
              About Us
            </Link>
            <Link href="/search-company" className={getDesktopLinkClass('/search-company')}>
              Search Company
            </Link>
            <Link href="/contact" className={getDesktopLinkClass('/contact')}>
              Contact Us
            </Link>
          </div>

          {/* 3. Desktop Buttons */}
          <div className="hidden min-[854px]:flex items-center gap-3">
            {user ? (
              // <div className="h-10 w-10 rounded-full bg-[#334EAC] text-white text-sm flex items-center justify-center font-semibold uppercase">
              //   {getInitials(user.first_name, user.last_name, user.email)}
              // </div>
              <>
                <Button variant={'outline'}>
                  <Search color="#727272 " className="size-5" />
                </Button>
                <Button variant={'outline'}>
                  <Bell color="#727272" className="size-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex gap-3 border-none py-6">
                      <div className="bg-[#F2F2F2] p-3 rounded-full">
                        <User2 className="size-6" color="#727272" />
                      </div>
                      <p className="text-lg text-text-secondary"> {userName}</p>
                      <ChevronDown />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem className="flex gap-3 rounded-md px-3 py-3 text-secondary border-b pb-4">
                      <div className="bg-[#F2F2F2] p-3 rounded-full">
                        <User2 className="size-6" color="#727272" />
                      </div>
                      <div>
                        <p className="text-lg text-text-primary"> {userName}</p>
                        <p className="text-text-secondary">user</p>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-3 rounded-md px-3 py-3 text-secondary">
                      <User2 className="size-5" color="#727272" />

                      <span className="text-text-secondary">My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-3 rounded-md px-3 py-3 text-secondary">
                      <PenLine className="size-5" color="#727272" />

                      <span className="text-text-secondary">My Reviews</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-3 rounded-md px-3 py-3 text-text-secondary">
                      <Heart className="size-5" color="#727272" />

                      <span className="text-text-secondary">Saved Company</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex gap-3 rounded-md px-3 py-3 text-text-secondary">
                      <HelpCircle className="size-5" color="#727272" />

                      <span className="text-text-secondary">Help</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="flex gap-3 rounded-md px-3 py-3 border-t border-border text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onSelect={() => setLogoutOpen(true)}
                    >
                      <LogOut className="size-5" color="#D42620" />
                      <span className="text-destructive">Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <div>
                  <RegisterBtn />
                </div>
                <div className="ml-1.5">
                  <SignInBtn />
                </div>
              </>
            )}
          </div>

          {/* 4. Mobile Menu Toggle */}
          <div className="min-[845px]:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 text-[#334EAC] focus:outline-none"
              aria-label="Toggle Menu"
            >
              {/* Standard Hamburger SVG Icon */}
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <LogoutModal
        open={logoutOpen}
        onOpenChange={setLogoutOpen}
        onConfirm={handleLogoutConfirm}
        loading={loading}
      />

      {/* --- MOBILE SIDEBAR DRAWER --- */}
      {/* Overlay background */}
      <div
        className={`fixed inset-0 bg-black/60 z-60 transition-opacity duration-300 min-[605px]:hidden ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={toggleMenu}
      />

      {/* The Actual Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[65%] bg-white z-70 shadow-2xl transform transition-transform duration-300 ease-in-out min-[854px]:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-10">
            <span className="text-2xl text-[#334EAC]">Emplora</span>
            <button onClick={toggleMenu} className="text-3xl text-gray-500">
              &times;
            </button>
          </div>

          {/* Mobile navigation links with active state context */}
          <nav className="flex flex-col gap-6 text-lg font-medium text-gray-700">
            <Link href="/" onClick={toggleMenu} className={getMobileLinkClass('/')}>
              Home
            </Link>
            <Link href="/about" onClick={toggleMenu} className={getMobileLinkClass('/about')}>
              About Us
            </Link>
            <Link
              href="/search-company"
              onClick={toggleMenu}
              className={getMobileLinkClass('/search-company')}
            >
              Search Company
            </Link>
            <Link href="/contact" onClick={toggleMenu} className={getMobileLinkClass('/contact')}>
              Contact Us
            </Link>
          </nav>

          <div className="mt-auto pb-10 flex flex-col gap-4 text-lg font-medium text-gray-700">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#334EAC] text-white flex items-center justify-center font-semibold uppercase">
                  {getInitials(user.first_name, user.last_name)}
                </div>
                <span>Hi, {user.first_name}</span>
              </div>
            ) : (
              <>
                <div>
                  <Link href="/signin" className="hover:text-[#334EAC]">
                    Sign In
                  </Link>
                </div>
                <div>
                  <Link href="/register" className="hover:text-[#334EAC]">
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

// Exporting the Navbar
export default Navbar;
