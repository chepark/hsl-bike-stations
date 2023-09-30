// example api:
// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchJourneys,
  selectAllJourneys,
  selectJourneysStatus,
  selectJourneysTotalPages,
  selectJourneysDistanceRange,
  selectJourneysDurationRange,
} from '../store/reducers/journeysSlice';
import Pagination from './Pagination';
import Table from './Table';
import { journeyColumns } from '../utils/tableUtils';
import SearchFilter, { SearchFilterProps } from './SearchFilter';
import SliderFilter, { SliderFilterProps } from './SliderFilter';
import { stringifiedRange } from '../utils/filterUtils';

function Journeys() {
  // update table when user changes search query, filter, sort, page
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [departureQuery, setDepartureQuery] = useState('');
  const [returnQuery, setReturnQuery] = useState('');
  const [distanceQuery, setDistanceQuery] = useState<[number, number]>([0, 0]);
  const [durationQuery, setDurationQuery] = useState<[number, number]>([0, 0]);
  const [fetchWithFilter, setFetchWithFilter] = useState(false);

  const journeys = useAppSelector(selectAllJourneys);
  const journeysStatus = useAppSelector(selectJourneysStatus);
  const totalPages = useAppSelector(selectJourneysTotalPages);
  const distanceRange = useAppSelector(selectJourneysDistanceRange);
  const durationRange = useAppSelector(selectJourneysDurationRange);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      fetchJourneys({
        pageQuery: currentPage,
        departureQuery,
        returnQuery,
        distanceQuery: stringifiedRange(distanceQuery),
        durationQuery: stringifiedRange(durationQuery),
      })
    );
  }, [currentPage, dispatch]);

  useEffect(() => {
    if (fetchWithFilter) {
      dispatch(
        fetchJourneys({
          pageQuery: currentPage,
          departureQuery,
          returnQuery,
          distanceQuery: stringifiedRange(distanceQuery),
          durationQuery: stringifiedRange(durationQuery),
        })
      );
      setFetchWithFilter(false);
    }
  }, [fetchWithFilter]);

  useEffect(() => {
    setDistanceQuery([distanceRange.min, distanceRange.max]);
    setDurationQuery([durationRange.min, durationRange.max]);
  }, [durationRange, distanceRange]);

  const filters = [
    {
      type: 'search',
      label: 'Starting station',
      placeholder: 'Enter station name',
      validation: '[sS]*',
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDepartureQuery(e.target.value),
    },
    {
      type: 'search',
      label: 'Ending station',
      placeholder: 'Enter station name',
      validation: '[sS]*',
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setReturnQuery(e.target.value),
    },
    {
      type: 'slider',
      label: 'Distance(m)',
      range: [distanceRange.min, distanceRange.max],
      step: 1000,
      rangeQuery: distanceQuery,
      setRangeQuery: (val: [number, number]) => setDistanceQuery(val),
    },
    {
      type: 'slider',
      label: 'Duration(s)',
      range: [durationRange.min, durationRange.max],
      step: 1000,
      rangeQuery: durationQuery,
      setRangeQuery: (val: [number, number]) => setDurationQuery(val),
    },
  ];

  return (
    <>
      <h1 className="w-full mt-8 mb-4 text-left">Journeys</h1>
      <div className="flex flex-row items-center self-start w-full gap-8 p-4 bg-light-blue">
        {filters.map((filter, i) => {
          const { type, ...rest } = filter;
          if (type === 'search') {
            return <SearchFilter key={i} {...(rest as SearchFilterProps)} />;
          } else if (filter.type === 'slider') {
            return <SliderFilter key={i} {...(rest as SliderFilterProps)} />;
          }
        })}
        <button
          className="px-4 py-2 text-white rounded cursor-pointer bg-blue h-fit"
          onClick={() => setFetchWithFilter(true)}
        >
          Filter
        </button>
      </div>
      {journeysStatus === 'loading' ? (
        <div>Loading...</div>
      ) : (
        <Table columns={journeyColumns} data={journeys} />
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
