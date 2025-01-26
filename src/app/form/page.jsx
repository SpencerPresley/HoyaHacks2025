"use client";

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Form() {
  const [formData, setFormData] = useState({
    fullName: "",
    linkedin: "",
    github: "",
    projects: "",
    phone: "",
    email: "",
    education: "",
    experience: "",
  });
  const [uploadedPDF, setUploadedPDF] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePDFUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setUploadedPDF(file);
    } else {
      alert("Please upload a valid PDF file.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!uploadedPDF) {
      alert("Please upload a PDF before submitting.");
      return;
    }

    const dataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      dataToSend.append(key, formData[key]);
    });
    dataToSend.append("resume", uploadedPDF);

    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        body: dataToSend,
      });

      if (response.ok) {
        const result = await response.json();
        alert("Form submitted successfully!");
        console.log(result);
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Registration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    placeholder="Enter your name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input
                    id="linkedin"
                    name="linkedin"
                    placeholder="Enter your LinkedIn"
                    value={formData.linkedin}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub</Label>
                  <Input
                    id="github"
                    name="github"
                    placeholder="Enter your GitHub"
                    value={formData.github}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="projects">Projects</Label>
                  <Input
                    id="projects"
                    name="projects"
                    placeholder="Enter your projects"
                    value={formData.projects}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="Enter your phone #"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="education">Education</Label>
                  <Input
                    id="education"
                    name="education"
                    placeholder="Enter your education"
                    value={formData.education}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    placeholder="Enter your experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="resume">Resume Attachment</Label>
                  <input
                    type="file"
                    accept=".pdf"
                    id="resume"
                    name="resume"
                    onChange={handlePDFUpload}
                    className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-primary file:text-primary-foreground
                      hover:file:bg-primary/90"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" size="lg" className="px-8">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
