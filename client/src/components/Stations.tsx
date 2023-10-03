import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchStations,
  selectAllStations,
} from '../store/reducers/stationSlice';
import InteractiveMap from './InteractiveMap';
import { sortData, stationColumns } from '../utils/tableUtils';
import Pagination from './Pagination';
import { current } from '@reduxjs/toolkit';
import SearchFilter from './SearchFilter';
import { pagenatedData } from '../utils/listUtils';
import { StationType } from '../models/stationsInterface';

function Stations() {
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectAllStations);
  const [currentPage, setCurrentPage] = useState(1);
  const [listedStations, setListedStations] = useState<StationType[]>([]);

  useEffect(() => {
    dispatch(fetchStations({ pageQuery: 0 }));
  }, []);

  useEffect(() => {
    setListedStations(pagenatedData(currentPage, stations));
  }, [currentPage]);

  return (
    <div className="flex w-full flew-column">
      <div className="w-full h-screen overflow-scroll">
        <ul>
          {listedStations.map((station, i) => {
            return (
              <li className="py-3 border-b cursor-pointer">
                <Link to={`/station/${station.station_id}`}>
                  <span className="mr-4"> {station.station_id}</span>
                  <span>{station.station_name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
        <Pagination
          currentPage={currentPage}
          totalPages={stations.length / 15}
          changeCurrentPage={(val: number) => {
            setCurrentPage(val);
          }}
        />
      </div>
      <div id="map">
        <InteractiveMap data={stations} />
      </div>
    </div>
  );
}

export default Stations;
