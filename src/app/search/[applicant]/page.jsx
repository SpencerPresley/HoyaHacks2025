"use client";
import { useSearchParams } from "next/navigation"; 

import "./applicant.css"


export default function ApplicantPage() {

    const searchParams = useSearchParams();
    
    // Extract the query parameter 'data' from the URL
    const data = searchParams.get("data");

    const applicant = data ? JSON.parse(decodeURIComponent(data)) : null;
    
    return (
        <div>
            <div className="backgroundDiv"></div>
            <center>
            <div className="appCard">
                    <div className="applicantTitleDiv">
                        <div className="applicantUser">{applicant.username}</div>
                        <div className="applicantInfo">{applicant.university}</div>
                        <div className="applicantInfo">{applicant.location}</div>
                    </div>
                    <div className="buttonContainer">
                        <button className="buttonClass">Download Resume</button>
                        <button className="buttonClass">Contact Applicant</button>
                    </div>
                    <div className="questionDivs">

                        <div className="questionContainer">
                            <div className="questionTitle">What is your favorite project you completed?</div>
                            <div className="questionCard">
                                <div className="questionDiv">{applicant.projectQuestion}</div>
                            </div>
                        </div>
                        <div className="questionContainer">
                            <div className="questionTitle">What is the most diffcult challenge you've overcome?</div>
                            <div className="questionCard">
                                
                                <div className="questionDiv">{applicant.overcomeQuestion}</div>
                            </div>
                        </div>
                        <div className="questionContainer">
                            <div className="questionTitle">What are your Hobbies and how have the changed you as a person?</div>
                            <div className="questionCard">
                                
                                <div className="questionDiv">{applicant.hobbiesQuestion}</div>
                            </div>
                        </div>
                    </div>
            </div>
                
                
            </center>
        </div>
    );
}