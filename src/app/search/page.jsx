"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Badge } from "@/components/ui/badge";
import { MapPin, School, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function SearchPage() {
  const [applicants, setApplicants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:8000/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: searchQuery,
          max_results: 100,
          score_threshold: 0.5
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const results = await response.json();
      
      // Group results by source file
      const resultsBySource = results.reduce((acc, result) => {
        const source = result.source;
        if (!acc[source]) {
          acc[source] = {
            sections: [],
            score: result.score // We'll use the highest score from any section
          };
        }
        if (result.score > acc[source].score) {
          acc[source].score = result.score;
        }
        acc[source].sections.push(result);
        return acc;
      }, {});

      // Convert to applicant profiles
      const processedApplicants = Object.entries(resultsBySource).map(([source, data], index) => {
        const profile = {
          id: index + 1,
          username: source.split('/').pop().replace('.pdf', ''),
          resumeDirectory: source,
          relevanceScore: data.score
        };

        // Map sections to profile fields
        data.sections.forEach(section => {
          switch(section.section.toLowerCase()) {
            case 'education':
              profile.university = section.content.split('\n')[0]; // Take first line of education
              break;
            case 'location':
              profile.location = section.content;
              break;
            case 'projects':
              profile.projectQuestion = section.content;
              break;
            case 'experience':
              profile.overcomeQuestion = section.content;
              break;
            case 'interests':
            case 'activities':
              profile.hobbiesQuestion = section.content;
              break;
          }
        });

        return profile;
      });

      // Sort by relevance score
      processedApplicants.sort((a, b) => b.relevanceScore - a.relevanceScore);

      setApplicants(processedApplicants);
      setHasSearched(true);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to search candidates. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <motion.div 
        className="relative bg-primary overflow-hidden"
        initial={{ height: "calc(100vh - 56px)" }}
        animate={{ 
          height: hasSearched ? "400px" : "calc(100vh - 56px)",
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-grid-white/10" />
        <motion.div 
          className="relative h-full flex items-center"
          animate={{ 
            paddingTop: hasSearched ? "2rem" : "0",
            paddingBottom: hasSearched ? "2rem" : "0",
          }}
        >
          <div className="container mx-auto px-4">
            <motion.div 
              className="text-center space-y-8"
              animate={{ 
                scale: hasSearched ? 0.8 : 1,
                y: hasSearched ? -20 : 0
              }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary-foreground">
                Find Your Perfect{" "}
                <span className="text-primary text-white">Candidate</span>
              </h1>
              <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
                Search through our pool of talented candidates and find the perfect match for your team.
              </p>
              
              {/* Search Box */}
              <div className="max-w-2xl mx-auto mt-8">
                <div className="flex gap-4 bg-background rounded-lg p-2 shadow-xl">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                    <Input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Enter job description or keywords..." 
                      className="pl-10 h-12 text-lg border-none focus-visible:ring-0"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleSearch();
                        }
                      }}
                    />
                  </div>
                  <Button 
                    onClick={handleSearch}
                    size="lg"
                    className="h-12 px-8 text-lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Searching..." : "Search"}
                  </Button>
                </div>
                {error && (
                  <p className="text-destructive mt-2 text-sm">{error}</p>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Results Section */}
      <AnimatePresence>
        {hasSearched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3 }}
            className="container mx-auto px-4 py-12"
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">
                <span className="dark:bg-gradient-to-r dark:from-blue-600 dark:to-indigo-600 dark:bg-clip-text dark:text-transparent">
                  Candidates
                </span>
              </h1>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {applicants.length} Candidates Found
              </h2>
              <p className="text-muted-foreground">
                Browse through the profiles and click to learn more
              </p>
            </div>
            
            <motion.div 
              className="grid gap-6 md:grid-cols-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {applicants.map((applicant) => (
                <motion.div
                  key={applicant.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  <Card className="group hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                              {applicant.username}
                            </h3>
                            {applicant.university && (
                            <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                              <School className="h-4 w-4" />
                              <span>{applicant.university}</span>
                            </div>
                            )}
                            {applicant.location && (
                            <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                              <MapPin className="h-4 w-4" />
                              <span>{applicant.location}</span>
                            </div>
                            )}
                          </div>
                          <Link 
                            href={{ 
                              pathname: `/search/${applicant.id}`, 
                              query: { data: JSON.stringify(applicant) }
                            }}
                          >
                            <Button variant="secondary" className="h-10">
                              View Profile
                            </Button>
                          </Link>
                        </div>
                        
                        {applicant.projectQuestion && (
                        <div className="pt-4 border-t">
                          <p className="text-muted-foreground line-clamp-3">
                            {applicant.projectQuestion}
                          </p>
                        </div>
                        )}

                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">Project Experience</Badge>
                          <Badge variant="secondary">Problem Solver</Badge>
                          <Badge variant="secondary">Team Player</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
