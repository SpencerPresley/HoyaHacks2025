'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const data = await response.json();
        setUser(data.user);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchUser();
  }, []);

  const handleSignOut = async () => {
    try {
      // Call the sign-out endpoint
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to sign out');
      }

      // Clear all auth-related cookies with all possible paths and domains
      const cookies = ['token'];
      const paths = ['/', '/auth', '/api'];
      
      cookies.forEach(cookie => {
        // Clear for each path
        paths.forEach(path => {
          document.cookie = `${cookie}=; path=${path}; expires=Thu, 01 Jan 1970 00:00:01 GMT; max-age=0`;
        });
        // Also clear without path
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; max-age=0`;
      });

      // Force reload to clear any in-memory state
      window.location.href = '/auth';
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold inline-block">ResumeAI</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/search"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/search" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Search
            </Link>
            <Link
              href="/form"
              className={`transition-colors hover:text-foreground/80 ${
                pathname === "/form" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              Create Resume
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-2">
          <nav className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/auth">Sign in</Link>
                </Button>
                <Button asChild>
                  <Link href="/auth/signup">Sign up</Link>
                </Button>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
} 