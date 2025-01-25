
import "./search.css"


export default function SearchPage() {
  return (
    <div>
      <div className="SearchRegion">
        <center>
          <div>
          <div className="SearchBarHeader">Job Description:</div>
            <div className="SearchBarDiv">
              <input type="text" className="search-bar" placeholder="Search for Resumes..."></input>
              <button className="search-button">Search</button>
            </div>
          </div>
        </center>
      </div>
    </div>
  );
}
