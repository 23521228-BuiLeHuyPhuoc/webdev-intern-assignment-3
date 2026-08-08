"use client";
import { GroupAStudent } from "../../interfaces/GroupAStudent.interface";
import { toast } from "sonner";
import {useEffect,useState} from "react";
const scoreFormatter = new Intl.NumberFormat("vi-VN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});
export default  function Dashboard() {

const [students, setStudentsData] = useState<GroupAStudent[]>([]);

useEffect(() => {
const fetchData = async () => {
  try{
const dataFetch=await fetch(`${process.env.NEXT_PUBLIC_URL_BACKEND}/top-scores`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  }
});
dataFetch.json().then((data)=>{
  if (data.message === "success") {
    setStudentsData(data.data);
  }
  else{
    toast.error("Failed to fetch top students.");
  }
})

}
catch (error) {
  toast.error("An error occurred while fetching top students.");
}
}

void fetchData();
})

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <header className="dashboard__header">
          <div>
            <p>Dashboard</p>
            <h1>Top 10 A00 Candidates by Total Score (Mathematics, Physics, and Chemistry)</h1>
          </div>
        </header>

        <section className="dashboard__card">
          <div className="dashboard__table-wrapper">
            <table className="dashboard__table">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Candidate ID</th>
                  <th>Mathematics</th>
                  <th>Physics</th>
                  <th>Chemistry</th>
                  <th>Total Score</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, index) => {
                  const total = student.DiemToan + student.VatLi + student.HoaHoc;

                  return (
                    <tr key={student.SoBaoDanh}>
                      <td><span className={`dashboard__rank dashboard__rank--${index + 1}`}>{index + 1}</span></td>
                      <td>{student.SoBaoDanh}</td>
                      <td>{scoreFormatter.format(student.DiemToan)}</td>
                      <td>{scoreFormatter.format(student.VatLi)}</td>
                      <td>{scoreFormatter.format(student.HoaHoc)}</td>
                      <td><strong>{scoreFormatter.format(total)}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
