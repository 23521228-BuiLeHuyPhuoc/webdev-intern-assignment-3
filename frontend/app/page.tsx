"use client"
export default function Home() {
  
  return (
    <> 
    <div className="body w-full h-full bg-[white] mx-auto my-auto"> 
    <div className="body__container w-[90%] h-[90%]  ">
      <div className="body__section">
        <div className="body__section1__label">User Registration</div>
        <div className="body__section1__label--input">Registration Number:</div>
          <input type="text" placeholder="Enter registration number" className="body__section1__label--input__name"/>
          <button >Submit</button>
      </div>
      <div className="body__section">
        <div className="body__section2__label">Detailed Scores</div>
        <div className="body__section2__label--input">Detailed view of search score here!</div>
        <table className="body__section2__table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
           
          </tbody>
        </table>
      </div>
    </div>
 </div>

    </>
  );

}
