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
        projectQuestion: "Having a constant interest in the coding of graphics and visuals alongside a love of math and geometric logic, a library like Manim has always been a keen interest. Therefore while taking my Numerical Methods class, one whose prime concept and tool is the Taylor series I wanted to try testing my understanding of the subject while learning a library I have found deeply interesting. This program simulates a taylor approximation on any function you give at it and uses maximization and minimizations to also calculate error with the Taylor’s Theorem remainder section. This visual was then created in a short weekend and gives a smooth demonstration of how taylors series works from a geometric standpoint.",
        overcomeQuestion: "Taken in by the Computer Science department I was given a job as a specialized tutoring that included upper level Computer Science classes not covered by my other tutoring positions for this job I tutored classes that included Operating Systems, Data Structures and Algorithms, Data Visualization and much more",
        hobbiesQuestion: "I love exploring nature through hiking and photography. Being outdoors allows me to appreciate the beauty of the natural world while capturing moments that tell a story through images. This hobby has taught me perseverance during long trails and attention to detail when framing the perfect shot—qualities that reflect in my ability to stay focused and approach work with creativity and precision.",
        resumeDirectory: "/public/downloads/resume/Omniladder.pdf"
      },
      {
        id: 2,
        username: "cscx1",
        university: "Georgetown University",
        location: "New York Metro Area",
        projectQuestion: "As part of my Data Science major, I took a class focused on the fundamentals of the data science process and conducting research. For my project, I chose to explore the impact of Pakistani women on elections, driven by their growing voter base and my interest in elections and foreign politics. My research analyzed outlier data points, statistical distributions, variable correlations, and the geographical relevance of women voters. Additionally, I created visually appealing data visualizations to provide a baseline understanding of the findings.",
        overcomeQuestion: "Prompted by local Salisbury Students I attended University of Delawares HenHacks Hackathon where in a 24 hour period we were tasked with creating a program of our choosing. Our program was aimed at accomplishing Bank of America's Finacial Hack which we created Lambda check a CLI security detection. This program managed to win the category and awarded us with XBOXes",
        hobbiesQuestion: "I have a strong passion for problem-solving, particularly through logic puzzles and strategy games. I enjoy breaking down complex challenges into manageable parts and finding creative solutions, whether it's solving a difficult Sudoku or planning moves in a chess match. This hobby has sharpened my analytical thinking, patience, and decision-making, which I bring into my professional life when tackling intricate tasks or projects.",
        resumeDirectory: "/public/downloads/resume/cscx1.pdf"
      },
      {
        id: 3,
        username: "Piggs24",
        university: "University of Maryland",
        location: "Los Angeles Metro Area",
        projectQuestion: "Created for HackUMBC 2024 Testif.Ai is a test generation program built on the back of ChatGPT. The site works by setting up an API backend which sends users a form in regards to test structure and the content to generate the test off of. This information is parsed in the backend and data is sent to OpenAI to create questions and answers off of this information is then inputted into a Jinja template which sends its information back to the user in the form of a test. These tests are easily modifiable and downloadable with the answer key. This project won both UMBC’s Best Educational Hack Category alongside Second best Overall Hack.",
        overcomeQuestion: "Given enjoyment of UD's Henhacks I teamed up with another group of Salisbury Students to attend UMBC's HackUMBC for this hackathon we worked on a project oriented towards the University's Education Hack and ML/AI Hack and created Testif.AI a test creation API built using modern LLM technology. The project won both Best Education Hack as well as Second Best Overall Hack being the only team too win two major Categories.",
        hobbiesQuestion: "I am a deep lover of history as I enjoy the stories of individual people and how society has developed over time. History allows me to understand the roots of our present and provides valuable lessons for the future. I particularly enjoy analyzing historical events and their ripple effects on culture, politics, and technology. This passion also fuels my curiosity, attention to detail, and ability to see the bigger picture—skills I bring to my work by connecting patterns and understanding how small actions can lead to significant outcomes.",
        resumeDirectory: "/public/downloads/resume/Piggs24.pdf"
      },
      {
        id: 4,
        username: "Spenny",
        university: "University of Maryland Baltimore County",
        location: "New York Metro Area",
        projectQuestion: "Celite is a website developed over 12 months, designed to provide a user-friendly experience for mathematicians and enthusiasts to explore elementary cellular automata. It has been used to create visuals for new textbooks and courses, supporting undergraduate research projects. Built by a team of three, including myself, during two advanced computer science courses, the project was guided by university professors. Celite is set to be presented at Salisbury University's SUSRC Research Conference, showcasing its impact on education and research.",
        overcomeQuestion: "With a great interest in Mathematics & Computer Science and a love of explaining fascinating and abstract topics I went to inqury about becoming a tutor as the schools tutoring center and fell in love with the position",
        hobbiesQuestion: "I'm deeply interested in Mathematics and logical thinking in my free time I pretake in recreational mathematics and deriving complex formulas",
        resumeDirectory: "/public/downloads/resume/spenny.pdf"
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
              
              <Link className="readmore" href={{ pathname: "/search/${applicant.id}", query: { data: JSON.stringify(applicant) }}}>
                  Read More
              </Link>
            </div>
          ))}
          </div>

      </div>
    </div>
  );
}
