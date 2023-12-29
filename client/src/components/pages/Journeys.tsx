// example api:
// http://localhost:8000/api/journeys?page=0&sort=journey.id,-distance_meter&departure=Opera&return=Diakoniapuisto&duration=1000-2000&distance=1500-2000
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchJourneys,
  selectAllJourneys,
  selectJourneysStatus,
  selectJourneysTotalPages,
  selectJourneysDistanceRange,
  selectJourneysDurationRange,
} from '../../store/reducers/journeysSlice';
import Pagination from '../Pagination';
import Table from '../Table';
import { journeyColumns } from '../../utils/tableUtils';
import SearchFilter, { SearchFilterProps } from '../SearchFilter';
import SliderFilter, { SliderFilterProps } from '../SliderFilter';
import { stringifiedRange } from '../../utils/filterUtils';
import Form from '../Form';

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
    console.log('test github actions');
  }, [fetchWithFilter]);

  useEffect(() => {
    if (distanceQuery[0] !== 0 || distanceQuery[1] !== 0) {
      setDistanceQuery([distanceQuery[0], distanceQuery[1]]);
    } else if (distanceQuery[0] === 0 && distanceQuery[1] === 0) {
      setDistanceQuery([distanceRange.min, distanceRange.max]);
    }

    if (durationQuery[0] !== 0 || durationQuery[1] !== 0) {
      setDurationQuery([durationQuery[0], durationQuery[1]]);
    } else if (durationQuery[0] === 0 && durationQuery[1] === 0) {
      setDurationQuery([durationRange.min, durationRange.max]);
    }
    // setDistanceQuery([distanceRange.min, distanceRange.max]);
    // setDurationQuery([durationRange.min, durationRange.max]);
  }, [durationRange, distanceRange]);

  const filters = [
    {
      type: 'search',
      label: 'Starting station',
      placeholder: 'Enter station name',
      pattern: '^(?:[A-Za-z]+)$',
      handleChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setDepartureQuery(e.target.value),
    },
    {
      type: 'search',
      label: 'Ending station',
      placeholder: 'Enter station name',
      pattern: '^(?:[A-Za-z]+)$',
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
        <Form
          classNames="flex flex-row items-center self-start w-full gap-8 p-4 bg-light-blue"
          buttonLabel="Filter"
          handleSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            setFetchWithFilter(true);
          }}
        >
          {filters.map((filter, i) => {
            const { type, ...rest } = filter;
            if (type === 'search') {
              return <SearchFilter key={i} {...(rest as SearchFilterProps)} />;
            } else if (filter.type === 'slider') {
              return <SliderFilter key={i} {...(rest as SliderFilterProps)} />;
            }
          })}
        </Form>
      </div>
      {journeysStatus === 'loading' && <div>Loading...</div>}
      {journeys.length > 0 && (
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
