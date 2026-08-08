"use client";

import { useState } from "react";
import {TenMonHoc} from "../../../variables/variables"
type StudentScores = Record<string, string | null>;

export default function SearchScores(){
  const [scores, setScores] = useState<StudentScores | null>(null);

  const handleSubmit=()=>{
        const InputField=document.querySelector<HTMLInputElement>(".body__section input")?.value;

        if (!InputField) {
          return;
        }

        fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/search-scores/${InputField}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => response.json()).then((data) => {
            setScores(data);
            console.log(data);
        }) ;
      };
    const renderScores = () => {
      if (!scores) {
        return null;
      }

      return Object.entries(scores)
        .filter(([key,value]) => key !== "SoBaoDanh"&&value!=null)
        .map(([subject, score]) => (
          <tr key={subject}>
            <td>{TenMonHoc[subject as keyof typeof TenMonHoc]}</td>
            <td>{score ?? "-"}</td>
          </tr>
        ));
    };

    return(
        <>
        <div className="body w-full h-full bg-[white] mx-auto my-auto"> 
    <div className="body__container w-[90%] h-[90%]  ">
      <div className="body__section">
        <div className="body__section1__label font-[600] text-[24px] mb-[10px]">User Registration</div>
        <div className="body__section1__label--input text-[15px]">Registration Number:</div>
          <input type="text" placeholder="Enter registration number" className="body__section1__label--input__name px-4 py-2 rounded-[5px] border-1 border-[gray]"/>
          <button  className="bg-[black] text-[white] ml-3 py-2 px-4 rounded-[4px]" onClick={handleSubmit}>Submit</button>
      </div>
      <div className="body__section">
        <div className="body__section2__label font-[600] text-[24px] mb-[10px]">Detailed Scores</div>
        <div className="body__section2__label--input">Detailed view of search score here!</div>
        <table className="body__section2__table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {renderScores()}
          </tbody>
        </table>
      </div>
    </div>
 </div>

        </>
    )
}
