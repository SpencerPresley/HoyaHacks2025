import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";

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
            Our platform uses advanced AI to match job descriptions with the most relevant resumes, 
            making hiring easier and more efficient than ever.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/search">
              <Button size="lg" className="h-11 px-8">Start Searching</Button>
            </Link>
            <Link href="/form">
              <Button size="lg" variant="outline" className="h-11 px-8">Create Resume</Button>
            </Link>
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
