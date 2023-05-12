// example api:
// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
import React, { useEffect, useState } from "react";
import TableHeader from "./TableHeader";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { fetchJourneys } from "./journeysSlice";

const Journeys = () => {
  // update table when user changes search query, filter, sort, page
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(0);

  const journeys = useAppSelector((state) => state.journeys.journeys);
  const dispatch = useAppDispatch();

  console.log(journeys);

  useEffect(() => {
    dispatch(fetchJourneys());
  }, [searchQuery, filter, sort, page]);

  return (
    <>
      <h1>Journeys</h1>
      <table className="table-auto">
        <TableHeader />
      </table>
    </>
  );
};

export default Journeys;
