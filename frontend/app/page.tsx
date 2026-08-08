"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { GroupAStudent } from "./interfaces/GroupAStudent.interface";

const scoreFormatter = new Intl.NumberFormat("vi-VN", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function Home() {
  const [students, setStudents] = useState<GroupAStudent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTopStudents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_BACKEND}/top-scores`,
          {
            signal: controller.signal,
            cache: "no-store",
          },
        );

        const result = await response.json();

        if (
          !response.ok ||
          result.message !== "success" ||
          !Array.isArray(result.data)
        ) {
          throw new Error(result.message || "Failed to fetch top students.");
        }

        setStudents(result.data);
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") {
          return;
        }

        setStudents([]);
        toast.error("An error occurred while fetching top students.", {
          id: "top-students-fetch-error",
        });
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    void fetchTopStudents();

    return () => controller.abort();
  }, []);

  return (
    <div className="dashboard">
      <div className="dashboard__container">
        <header className="dashboard__header">
          <div>
            <p>Dashboard</p>
            <h1>
              Top 10 A00 Candidates by Total Score (Mathematics, Physics, and
              Chemistry)
            </h1>
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
                {isLoading &&
                  Array.from({ length: 5 }).map((_, row) => (
                    <tr key={row}>
                      <td>
                        <span className="block h-[30px] w-[30px] animate-pulse rounded-full bg-gray-200" />
                      </td>
                      {Array.from({ length: 5 }).map((_, cell) => (
                        <td key={cell}>
                          <span className="block h-4 w-20 animate-pulse rounded bg-gray-200" />
                        </td>
                      ))}
                    </tr>
                  ))}

                {!isLoading && students.map((student, index) => {
                  const total =
                    student.DiemToan + student.VatLi + student.HoaHoc;

                  return (
                    <tr key={student.SoBaoDanh}>
                      <td>
                        <span
                          className={`dashboard__rank dashboard__rank--${index + 1}`}
                        >
                          {index + 1}
                        </span>
                      </td>
                      <td>{student.SoBaoDanh}</td>
                      <td>{scoreFormatter.format(student.DiemToan)}</td>
                      <td>{scoreFormatter.format(student.VatLi)}</td>
                      <td>{scoreFormatter.format(student.HoaHoc)}</td>
                      <td>
                        <strong>{scoreFormatter.format(total)}</strong>
                      </td>
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
