
import "./search.css"


const applicants = [
  {
    id: 1,
    username: "Connor McDavid",
    university: "Salisbury University",
    location: "DC Metro Area",
  },
  {
    id: 2,
    username: "Nathan MacKinnon",
    university: "Georgetown University",
    location: "New York Metro Area",
  },
  {
    id: 3,
    username: "Auston Matthews",
    university: "University of Maryland",
    location: "Salisbury University",
    location: "Los Angeles Metro Area",
  },
  {
    id: 4,
    username: "Alexander Ovechkin",
    university: "University of Maryland Baltimore County",
    location: "Salisbury University",
    location: "New York Metro Area",
  }
]

export default function SearchPage() {
  return (
    <div>
      <div className="SearchRegion">
        
      <center>
          <div className="SearchBarHeader">Job Description:</div>
        
        
        <div className="SearchBarDiv">
            <input type="text" className="search-bar" placeholder="Search for Resumes..."></input>
            <button className="search-button">Search</button>
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
              
                <button className="readmore">Read More</button>
            </div>
          ))}
          </div>

      </div>
    </div>
  );
}
