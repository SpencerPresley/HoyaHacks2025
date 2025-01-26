"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Upload, FileText, AlertCircle, CheckCircle2, Terminal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);
  const [rawLogs, setRawLogs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const logsEndRef = useRef(null);
  const rawLogsEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    rawLogsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const validateFile = (file) => {
    if (!file) return false;
    if (file.type !== "application/pdf") {
      setError("Please select a PDF file");
      return false;
    }
    return true;
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (validateFile(selectedFile)) {
      setFile(selectedFile);
      setError(null);
    } else {
      setFile(null);
    }
  };

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

    const droppedFile = e.dataTransfer.files[0];
    if (validateFile(droppedFile)) {
      setFile(droppedFile);
      setError(null);
    }
  };

  const handleCardClick = () => {
    if (!isProcessing) {
      fileInputRef.current?.click();
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsProcessing(true);
    setError(null);
    setLogs([]);
    setRawLogs([]);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/api/upload/stream", {
        method: "POST",
        body: formData,
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const text = decoder.decode(value);
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const data = JSON.parse(line.slice(6));
              console.log("Received data:", data);
              
              if (data.error) {
                setError(data.error);
              } else if (data.status) {
                setRawLogs(prev => [...prev, data.status]);
                
                const isProcessingHeader = data.status.includes("=== ") || 
                                         data.status.includes("Processing ") ||
                                         data.status.includes("Tool Name:") ||
                                         data.status.includes("Tool Input:") ||
                                         data.status.includes("Executing tool:");
                
                if (!isProcessingHeader) {
                  setLogs(prev => [...prev, data.status]);
                }
                scrollToBottom();
              }
            } catch (e) {
              console.error("Error parsing SSE data:", e, line);
            }
          }
        }
      }
    } catch (err) {
      console.error("Upload error:", err);
      setError("Failed to process resume. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              Upload Your Resume
            </h1>
            <p className="text-xl text-muted-foreground">
              Let AI analyze your resume and add it to our talent pool
            </p>
          </div>

          <Card 
            className={`border-2 border-dashed transition-colors cursor-pointer
              ${isDragging ? 'border-primary bg-primary/5' : 'hover:border-primary'}
            `}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={handleCardClick}
          >
            <CardContent className="p-8">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-primary/10 rounded-full">
                  <FileText className="w-8 h-8 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-medium">
                    {file ? file.name : "Drop your resume here or click to browse"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    PDF format only
                  </p>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                  id="resume-upload"
                  disabled={isProcessing}
                />
                {file && (
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload();
                    }}
                    disabled={isProcessing}
                    className="w-full"
                  >
                    {isProcessing ? "Processing..." : "Process Resume"}
                  </Button>
                )}
                {error && (
                  <div className="flex items-center text-destructive gap-2">
                    <AlertCircle className="w-4 h-4" />
                    <span>{error}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <AnimatePresence>
            {logs.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium flex items-center gap-2">
                          <span>Processing Status</span>
                          {isProcessing ? (
                            <div className="animate-pulse text-primary">●</div>
                          ) : (
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                          )}
                        </h3>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                              <Terminal className="w-4 h-4 mr-2" />
                              View Raw Logs
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
                            <DialogHeader>
                              <DialogTitle>Raw Processing Logs</DialogTitle>
                            </DialogHeader>
                            <div className="bg-muted p-4 rounded-lg overflow-y-auto max-h-[calc(80vh-8rem)] font-mono text-sm whitespace-pre-wrap">
                              {rawLogs.map((log, index) => (
                                <div key={index}>{log}</div>
                              ))}
                              <div ref={rawLogsEndRef} />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div className="bg-muted p-4 rounded-lg max-h-[500px] overflow-y-auto font-mono text-sm whitespace-pre-wrap">
                        {logs.map((log, index) => (
                          <div key={index}>{log}</div>
                        ))}
                        <div ref={logsEndRef} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
} 