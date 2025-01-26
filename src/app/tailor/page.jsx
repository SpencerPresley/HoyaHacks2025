"use client";

import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export default function TailorPage() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [logs, setLogs] = useState([]);
  const [rawLogs, setRawLogs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const logsEndRef = useRef(null);
  const rawLogsEndRef = useRef(null);

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

  const scrollToBottom = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (logsEndRef.current) {
      scrollToBottom(logsEndRef);
    }
  }, [logs]);

  useEffect(() => {
    if (rawLogsEndRef.current) {
      scrollToBottom(rawLogsEndRef);
    }
  }, [rawLogs]);

  const startTailoring = async () => {
    if (!file || !jobDescription.trim()) {
      setError("Please provide both a resume and job description");
      return;
    }

    setIsProcessing(true);
    setLogs([]);
    setRawLogs([]);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('job_description', jobDescription);

      const response = await fetch('http://localhost:8000/api/tailor/stream', {
        method: 'POST',
        body: formData
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split('\n').filter(line => line.trim());

        setLogs(prev => [...prev, ...lines.map(line => {
          if (line.includes("error") || line.includes("Error")) {
            return { type: 'error', content: line };
          }
          if (line.includes("success") || line.includes("Success")) {
            return { type: 'success', content: line };
          }
          return { type: 'info', content: line };
        })]);

        setRawLogs(prev => [...prev, ...lines]);
      }

      // After processing completes, trigger the download
      const downloadResponse = await fetch('http://localhost:8000/api/tailor/download');
      if (!downloadResponse.ok) {
        throw new Error('Failed to download PDF');
      }

      // Create a download link
      const blob = await downloadResponse.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'tailored_resume.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setError(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-black">
      <Navbar />
      <div className="container mx-auto p-8">
        <Card>
          <CardHeader>
            <CardTitle>Resume Tailoring</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
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

              <Button 
                onClick={startTailoring} 
                disabled={isProcessing}
                className="w-full"
              >
                {isProcessing ? 'Processing...' : 'Start Tailoring'}
              </Button>

              {error && (
                <div className="text-red-500 p-4 rounded bg-red-50">
                  {error}
                </div>
              )}

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg h-64 overflow-auto">
                {logs.map((log, i) => (
                  <div 
                    key={i} 
                    className={`mb-2 ${
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'success' ? 'text-green-400' :
                      'text-gray-300'
                    }`}
                  >
                    {log.content}
                  </div>
                ))}
                <div ref={logsEndRef} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">View Raw Logs</Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle>Raw Processing Logs</DialogTitle>
                </DialogHeader>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg max-h-[60vh] overflow-auto">
                  {rawLogs.map((log, i) => (
                    <div key={i} className="mb-2 font-mono text-sm">
                      {log}
                    </div>
                  ))}
                  <div ref={rawLogsEndRef} />
                </div>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
