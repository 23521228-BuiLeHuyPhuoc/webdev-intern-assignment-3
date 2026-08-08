"use client";

import { useState, type FormEvent } from "react";
import {TenMonHoc} from "../../../variables/variables";
import { toast } from "sonner";
type StudentScores = Record<string, string | null>;

export default function SearchScores(){
  const [scores, setScores] = useState<StudentScores | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const inputField = formData.get("registrationNumber");

    if (typeof inputField !== "string") {
      toast.error("Invalid registration number.");
      return;
    }

    const registrationNumber = inputField.trim();

    if (!/^\d{8}$/.test(registrationNumber)) {
      toast.error("Registration number must contain exactly 8 digits.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_BACKEND}/search-scores/${encodeURIComponent(registrationNumber)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setScores(null);
        toast.error(data.message || "Unable to search for student scores.");
        return;
      }

      if (data.message !== "success") {
        setScores(null);
        toast.error("Registration number not found.");
        return;
      }

      setScores(data.data);
    } catch {
      setScores(null);
      toast.error("Unable to connect to the backend.");
    }
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
        <div className="body w-full min-h-full">
    <div className="body__container w-[90%] max-w-[1100px] mx-auto py-8">
      <div className="body__section">
        <div className="body__section1__label font-[600] text-[24px] mb-[10px]">User Registration</div>
        <div className="body__section1__label--input text-[15px] mb-2">Registration Number:</div>
        <form onSubmit={handleSubmit} className="body__search-form">
          <input
            name="registrationNumber"
            type="text"
            inputMode="numeric"
            maxLength={8}
            placeholder="Enter 8-digit registration number"
            className="body__section1__label--input__name px-4 py-2 rounded-[5px] border border-[gray]"
          />
          <button type="submit" className="cursor-pointer bg-[black] text-[white] py-2 px-4 rounded-[4px]">Submit</button>
        </form>
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
