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
import { Search, Upload, FileText } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

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
      <div className="container flex h-16 items-center px-6">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-10 flex items-center space-x-2">
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">ResumeAI</span>
          </Link>
          <nav className="flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/search"
              className={`flex items-center space-x-2 transition-colors hover:text-foreground/80 ${
                pathname === "/search" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              <Search className="h-4 w-4" />
              <span>Search</span>
            </Link>
            <Link
              href="/upload"
              className={`flex items-center space-x-2 transition-colors hover:text-foreground/80 ${
                pathname === "/upload" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Link>
            <Link
              href="/tailor"
              className={`flex items-center space-x-2 transition-colors hover:text-foreground/80 ${
                pathname === "/tailor" ? "text-foreground" : "text-foreground/60"
              }`}
            >
              <FileText className="h-4 w-4" />
              <span>Tailor Resume</span>
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <ThemeToggle />
          <nav className="flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-9 w-9 rounded-full">
                    <Avatar className="h-9 w-9 border-2 border-primary/10">
                      <AvatarFallback className="bg-primary/5 text-sm font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth">Sign in</Link>
                </Button>
                <Button size="sm" className="bg-gradient-to-r from-blue-600 to-indigo-600" asChild>
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