// example api:
// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchJourneys,
  selectAllJourneys,
  selectJourneysStatus,
  selectJourneysTotalPages,
} from "./journeysSlice";
import Pagination from "../Pagination/Pagination";

const Journeys: React.FC = () => {
  // update table when user changes search query, filter, sort, page
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const journeys = useAppSelector(selectAllJourneys);
  const journeysStatus = useAppSelector(selectJourneysStatus);
  const totalPages = useAppSelector(selectJourneysTotalPages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log("journey", journeysStatus);
    if (journeysStatus === "loading") {
      dispatch(fetchJourneys({ currentPage }));
    }
  }, [journeysStatus, currentPage, dispatch]);

  const columns = [
    "ID",
    "Starting Station",
    "Ending Station",
    "Distance",
    "Duration",
  ];

  let content: JSX.Element | null = null;
  if (journeysStatus === "loading") {
    content = <div>Loading...</div>;
  } else if (journeysStatus === "succeeded") {
    content = (
      <>
        <table className="border-2 border-gray-500 divide-y rounded table-auto">
          <TableHeader columns={columns} />
          <TableBody journeys={journeys} />
        </table>
        <Pagination
          currentPage={currentPage}
          changeCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </>
    );
  } else if (journeysStatus === "failed") {
    content = <div>Error</div>;
  }

  return (
    <>
      <h1>Journeys</h1>
      {content}
    </>
  );
};

export default Journeys;
