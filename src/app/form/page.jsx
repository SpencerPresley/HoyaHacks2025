"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";

export default function TailorResumePage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length) {
      validateAndSetFile(files[0]);
    }
  };

  const validateAndSetFile = (file) => {
    if (file.type !== "application/pdf") {
      setError("Please upload a PDF file");
      return;
    }
    setFile(file);
    setError(null);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription.trim()) {
      setError("Please provide both a resume and job description");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // TODO: Implement the API call to tailor the resume
      // const formData = new FormData();
      // formData.append('resume', file);
      // formData.append('jobDescription', jobDescription);
      // const response = await fetch('/api/tailor-resume', ...);
      
      console.log("Will implement resume tailoring endpoint");
    } catch (err) {
      setError("Failed to process your request. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Tailor Your Resume</CardTitle>
            <CardDescription>
              Upload your resume and provide a job description to get a tailored version of your resume and a matching cover letter.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Resume Upload Section */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? "border-primary bg-primary/10" : "border-muted"
                } transition-colors duration-200 cursor-pointer`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <Upload className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground mb-2">
                  {file ? file.name : "Drop your resume here or click to browse"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports PDF files only
                </p>
              </div>

              {/* Job Description Input */}
              <div className="space-y-2">
                <label htmlFor="jobDescription" className="text-sm font-medium">
                  Job Description
                </label>
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the job description here..."
                  className="min-h-[200px]"
                />
              </div>

              {error && (
                <p className="text-destructive text-sm">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Tailor Resume"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
