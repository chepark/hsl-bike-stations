// example api:
// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchJourneys,
  selectAllJourneys,
  selectJourneysStatus,
  selectJourneysTotalPages,
} from '../store/reducers/journeysSlice';
import Pagination from './Pagination';
import Table from './Table';

function Journeys() {
  // update table when user changes search query, filter, sort, page
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('');
  const [sort, setSort] = useState('');
  const [currentPage, setCurrentPage] = useState<number>(0);

  const journeys = useAppSelector(selectAllJourneys);
  const journeysStatus = useAppSelector(selectJourneysStatus);
  const totalPages = useAppSelector(selectJourneysTotalPages);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (journeysStatus === 'loading') {
      dispatch(fetchJourneys({ currentPage }));
    }
  }, [journeysStatus, currentPage, dispatch]);

  const columns = [
    'ID',
    'Starting Station',
    'Ending Station',
    'Distance',
    'Duration',
  ];

  return (
    <>
      {journeysStatus === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <Table columns={columns} data={journeys} />
      )}
      <h1>Journeys</h1>
    </>
  );
}

export default Journeys;
