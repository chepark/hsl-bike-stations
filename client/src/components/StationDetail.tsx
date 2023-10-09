import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import {
  fetchStations,
  selectAllStations,
} from '../store/reducers/stationSlice';
import InteractiveMap from './InteractiveMap';

import { useParams, useNavigate } from 'react-router-dom';
import { StationType } from '../models/stationsInterface';
import { getStationDetail } from '../api/StationAPI';
import { LeftArrowIcon } from '../assets';
import { getCenterValue } from '../utils/mapUtils';

type StationDetailType = {
  startingJouneysCount: number;
  endingJourneysCount: number;
  startingJourneysAvgDistance: number;
  endingJourneysAvgDistance: number;
  top5startingStations: { name: string; count: number }[];
  top5endingStations: { name: string; count: number }[];
};

function StatioinDetailItem({
  text,
  value,
}: {
  text: string;
  value: number | string;
}) {
  return (
    <div className="w-full py-3 border-b">
      {text}: {value}
    </div>
  );
}

function StationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const stations = useAppSelector(selectAllStations);

  const [selectedStation, setSelectedStation] = useState<StationType>();
  const [stationDetail, setStationDetail] = useState<StationDetailType>();

  useEffect(() => {
    if (stations.length === 0) {
      dispatch(fetchStations({ pageQuery: 0 }));
    }

    const station = stations.filter(
      (station) => station.station_id === Number(id)
    );
    setSelectedStation(station[0]);

    async function fetchStationDetail() {
      const { data } = await getStationDetail(Number(id));
      setStationDetail(data);
    }

    fetchStationDetail();
  }, [stations]);

  return (
    <div className="flex flex-wrap-reverse flex-column md:flex-nowrap">
      <div className="flex flex-col h-screen mx-8">
        <div>
          <h1 className="w-full mt-8 mb-4 text-left">
            {selectedStation && selectedStation?.station_name}
          </h1>
          <div>{selectedStation?.station_address}</div>
        </div>
        <div className="flex flex-col mt-8">
          {stationDetail && (
            <>
              <StatioinDetailItem
                text="Total number of journeys starting from the station"
                value={stationDetail?.startingJouneysCount}
              />
              <StatioinDetailItem
                text="Total number of jouneys ending at this station"
                value={stationDetail?.endingJourneysCount}
              />
              <StatioinDetailItem
                text="The average duration of a journey starting from the station"
                value={stationDetail.startingJourneysAvgDistance.toFixed(2)}
              />
              <StatioinDetailItem
                text="The average duration of a journey ending at the station"
                value={stationDetail.endingJourneysAvgDistance.toFixed(2)}
              />

              <StatioinDetailItem
                text="Top 5 return stations starting from the station"
                value={stationDetail.top5startingStations
                  .map((station) => station.name)
                  .join(', ')}
              />
              <StatioinDetailItem
                text=" Top 5 departure stations ending at the station"
                value={stationDetail.top5endingStations
                  .map((station) => station.name)
                  .join(', ')}
              />
            </>
          )}
        </div>
        <button
          className="self-center px-4 py-2 mt-8 text-white rounded bg-blue w-fit"
          onClick={() => navigate(-1)}
          type="button"
        >
          Go back
        </button>
      </div>
      <div id="map">
        {selectedStation && (
          <InteractiveMap
            data={stations}
            center={getCenterValue(selectedStation)}
            zoom={18}
          />
        )}
      </div>
    </div>
  );
}

export default StationDetail;
