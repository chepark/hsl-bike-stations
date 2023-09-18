// example api:
// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchJourneys,
  selectAllJourneys,
  selectJourneysStatus,
  selectJourneysTotalPages,
} from '../store/reducers/journeysSlice';
import Pagination from './Pagination';
import Table from './Table';
import { journeyColumns } from '../utils/tableUtils';

function Journeys() {
  // update table when user changes search query, filter, sort, page
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [sortBy, setSortBy] = useState({ column: 0, order: 'ascending' });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const journeys = useAppSelector(selectAllJourneys);
  const journeysStatus = useAppSelector(selectJourneysStatus);
  const totalPages = useAppSelector(selectJourneysTotalPages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const pageQuery = currentPage;
    dispatch(fetchJourneys({ pageQuery }));
  }, [currentPage, dispatch]);

  return (
    <>
      <h1 className="w-full mt-8 text-left">Journeys</h1>
      {journeysStatus === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <Table columns={journeyColumns} data={journeys} onSort={setSortBy} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        changeCurrentPage={(page) => setCurrentPage(page)}
      />
    </>
  );
}

export default Journeys;
