import React, { FormEvent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { StationType } from '../../models/stationsInterface';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchStations,
  selectAllStations,
} from '../../store/reducers/stationSlice';
import { pagenatedData } from '../../utils/listUtils';
import InteractiveMap from '../InteractiveMap';
import Pagination from '../Pagination';
import SearchFilter from '../SearchFilter';
import Form from '../Form';

function StationListItem({ station }: { station: StationType }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <li
      className={`py-3 border-b cursor-pointer ${
        isHover ? 'bg-light-blue' : null
      }`}
    >
      <Link
        to={`/station/${station.station_id}`}
        onMouseEnter={() => setIsHover(true)}
        onMouseOut={() => {
          setIsHover(false);
        }}
      >
        <span className="mr-4 cursor-pointer"> {station.station_id}</span>
        <span>{station.station_name}</span>
      </Link>
    </li>
  );
}

function Stations() {
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectAllStations);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [listedStations, setListedStations] = useState<StationType[]>([]);

  useEffect(() => {
    dispatch(fetchStations({ pageQuery: 0 }));
  }, []);

  useEffect(() => {
    setListedStations(pagenatedData(currentPage, stations));
    setTotalPages(stations.length / 15);
  }, [currentPage, stations]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();

    const filteredStations = stations.filter(
      (station) =>
        station.station_name.toLowerCase().includes(query) ||
        station.station_id === Number(query)
    );

    // Change list of pagination
    setTotalPages(
      filteredStations.length < 15 ? 1 : Math.ceil(filteredStations.length / 15)
    );

    setListedStations(pagenatedData(currentPage, filteredStations));
  };

  return (
    <div className="flex flex-wrap-reverse w-full align-center flex-column md:flex-nowrap">
      <div className="h-screen mx-8 overflow-hidden md:basis-1/4 basis-full">
        <h1 className="w-full mt-8 mb-4 text-left">Stations</h1>
        <Form
          handleSubmit={(e: FormEvent) => {
            e.preventDefault();
          }}
          classNames="flex flex-row space-between h-fit w-full gap-4 mt-8"
        >
          <SearchFilter
            classNames="w-full"
            placeholder="Search by station name or ID"
            validation="^(?:[A-Za-z]+|\d+)$"
            handleChange={handleSearchInputChange}
          />
        </Form>
        <ul className="my-8">
          {listedStations &&
            listedStations.map((station, i) => (
              <StationListItem key={i} station={station} />
            ))}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          changeCurrentPage={(val: number) => {
            setCurrentPage(val);
          }}
        />
      </div>
      <div id="map" className="md:basis-3/4 basis-full h-96 md:h-screen">
        <InteractiveMap data={stations} />
      </div>
    </div>
  );
}

export default Stations;
