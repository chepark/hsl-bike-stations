import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchStations,
  selectAllStations,
} from '../store/reducers/stationSlice';
import InteractiveMap from './InteractiveMap';
import Table from './Table';

function Stations() {
  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectAllStations);

  useEffect(() => {
    dispatch(fetchStations({ pageQuery: 0 }));
  }, []);

  return (
    <div className="flex flew-row">
      <div className="">{/* <Table columns={} data={stations} > */}</div>
      <div id="map" style={{ height: '400px', width: '100%' }}>
        <InteractiveMap data={stations} />
      </div>
    </div>
  );
}

export default Stations;
