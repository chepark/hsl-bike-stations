import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchStations,
  selectAllStations,
} from '../store/reducers/stationSlice';
import InteractiveMap from './InteractiveMap';
import { sortData, stationColumns } from '../utils/tableUtils';
import { Routes, Route, useParams } from 'react-router-dom';

function StationDetail() {
  const { id } = useParams();
  return <div>StationDetail id : {id}</div>;
}

export default StationDetail;
