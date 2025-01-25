"use client";

import "./search.css"

import { useState } from "react";
import Link from "next/link"



export default function SearchPage() {
  const [applicants, setApplicants] = useState([]);

  

  const handleClick = () => {
    let newApplicants = [
      {
        id: 1,
        username: "Omniladder",
        university: "Salisbury University",
        location: "DC Metro Area",
      },
      {
        id: 2,
        username: "cscx1",
        university: "Georgetown University",
        location: "New York Metro Area",
      },
      {
        id: 3,
        username: "Piggs24",
        university: "University of Maryland",
        location: "Salisbury University",
        location: "Los Angeles Metro Area",
      },
      {
        id: 4,
        username: "Spenny",
        university: "University of Maryland Baltimore County",
        location: "Salisbury University",
        location: "New York Metro Area",
      }
    ]
    setApplicants(newApplicants);
  };
  

  return (
    <div>
      <div className="SearchRegion">
        
      <center>
          <div className="SearchBarHeader">Job Description:</div>
        
        
        <div className="SearchBarDiv">
            <input type="text" className="search-bar" placeholder="Search for Resumes..."></input>
            <button className="search-button" onClick={handleClick}>Search</button>
        </div>
        </center>
      </div>

      <div>

        <div className="applicantCards">
          {applicants.map((applicant) => (
            <div className="applicantCard" key={applicant.id}>
              <div className="cardLeft" >
                <div className="applicantName">{applicant.username}</div>
                <div className="applicantInfo">{applicant.university}</div>
                <div className="applicantInfo">{applicant.location}</div>
              </div>
              
              <Link className="readmore" href={{ pathname: "/search", query: { data: JSON.stringify(applicant) }}}>
                  Read More
              </Link>
            </div>
          ))}
          </div>

      </div>
    </div>
  );
}
