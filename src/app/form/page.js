"use client";

import './pages.css'; 
import Head from "next/head";
import { useState } from "react";

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
        console.log(result); // Log response for debugging
      } else {
        alert("Failed to submit the form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while submitting the form.");
    }
  };

  return (
    <>
      <Head>
        <title>Responsive Registration</title>
      </Head>

      <div className="container">
        <div className="title">Registration</div>
        <form onSubmit={handleSubmit}>
          <div className="user-details">
            <div className="input-box">
              <span className="details">Full Name</span>
              <input
                type="text"
                name="fullName"
                placeholder="Enter your name"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Linkedin</span>
              <input
                type="text"
                name="linkedin"
                placeholder="Enter your Linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Github</span>
              <input
                type="text"
                name="github"
                placeholder="Enter your Github"
                value={formData.github}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Projects</span>
              <input
                type="text"
                name="projects"
                placeholder="Enter your projects"
                value={formData.projects}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Phone</span>
              <input
                type="text"
                name="phone"
                placeholder="Enter your phone #"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Education</span>
              <input
                type="text"
                name="education"
                placeholder="Enter your education"
                value={formData.education}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Experience</span>
              <input
                type="text"
                name="experience"
                placeholder="Enter your experience"
                value={formData.experience}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="input-box">
              <span className="details">Resume Attachment</span>
              <input
                type="file"
                accept="application/pdf"
                id="resume"
                name="resume"
                onChange={handlePDFUpload}
                style={{ display: "none" }}
                required
              />
              <label htmlFor="resume" className="upload-btn">Upload PDF</label>
            </div>
          </div>

          <div className="button">
            <input type="submit" value="Register" />
          </div>
        </form>
      </div>
    </>
  );
}
