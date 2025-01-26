'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Search, Upload, FileText } from "lucide-react";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-24 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Find Your Perfect Match with AI-Powered Resume Search
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your intelligent resume companion. Search through resumes, upload your own, or tailor your resume to specific job descriptions.
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600">
              <Link href="/search" className="flex items-center space-x-2">
                <Search className="h-5 w-5" />
                <span>Search Resumes</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/upload" className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Resume</span>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/tailor" className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Tailor Resume</span>
              </Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>AI-Powered Matching</CardTitle>
                <CardDescription>
                  Advanced algorithms to find the perfect candidates
                </CardDescription>
              </CardHeader>
              <CardContent>
                Our AI technology analyzes job descriptions and resumes to find the most relevant matches based on skills, experience, and qualifications.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Smart Resume Builder</CardTitle>
                <CardDescription>
                  Create professional resumes easily
                </CardDescription>
              </CardHeader>
              <CardContent>
                Use our intuitive resume builder to create professional, ATS-friendly resumes that stand out to employers.
              </CardContent>
            </Card>

            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Instant Results</CardTitle>
                <CardDescription>
                  Find candidates in seconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                Get instant access to a pool of qualified candidates matching your job requirements, saving time and resources.
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}
