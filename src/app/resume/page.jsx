"use client";

import "./resume.css"

import {Radio , FormControlLabel} from '@mui/material';

import { useState } from 'react';


export default function Resume() {
    const [selectedValue, setSelectedValue] = useState('a');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };
    return (
        <div className="resume-page">
            <div className="blueHeader">
                <div className="logoDiv">Logo</div>
            </div>

                <div className="radio-container"> 
                    <center>
                        <FormControlLabel
                        control={
                            <Radio
                            checked={selectedValue === 'a'}
                            onChange={handleChange}
                            value="a"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            className="radio-button"
                            />
                        }    
                        label="Tailor Resume" // Label for the first radio button
                        />
                        

                        <FormControlLabel
                        control={
                            <Radio
                                checked={selectedValue === 'b'}
                                onChange={handleChange}
                                value="b"
                                name="radio-buttons"
                                inputProps={{ 'aria-label': 'B' }}
                                className="radio-button"
                            />
                        }
                        label="Compress Resume" // Label for the second radio button
                    />
                    
                    
                    </center>
            </div>

            <form>
                <div className="job-description-div">
                    <div className="description-div">Job Description:</div>
                    <textarea className="large-textbox" placeholder={selectedValue === 'b' ? ":Locked:" : "Enter your text here..."}  disabled={selectedValue === 'b'}></textarea>
                </div>
                
                <div className="finalDiv">
                    <div>
                        <div className="resume-header">Upload Current Resume</div>
                        <input type="file" id="file-upload" className="file-input" accept=".pdf"/>
                    </div>
                    <button className="submit-button">Submit</button>
                </div>
            </form>

            
    </div>)
}