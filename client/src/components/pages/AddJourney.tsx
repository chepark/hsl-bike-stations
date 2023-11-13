import React, { useState } from 'react';
import Form from '../Form';
import SelectInput from '../SelectInput';
import { useAppSelector } from '../../store/hooks';

import { selectAllStations } from '../../store/reducers/stationSlice';
import DateTimeInput from '../DateTimeInput';
import { StationType } from '../../models/stationsInterface';
import { distanceBetweenCoordinates } from '../../utils/distanceUtil';

function AddJourney() {
  const [inputValues, setInputValues] = useState({
    startingTime: '',
    endingTime: '',
    startingStation: '',
    endingStation: '',
  });

  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false);
  const [error] = useState<boolean>(false);

  const stations = useAppSelector(selectAllStations);
  const stationOptions = stations
    .map((station: StationType) => station.station_name)
    .sort();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(inputValues).some((val) => val === '')) return;

    setIsFormSubmit(true);

    // calculate duration

    // calculate distance
    const { startingStation, endingStation } = inputValues;
    const distance = distanceBetweenCoordinates(
      startingStation,
      endingStation,
      stations
    );
    console.log('dddd', distance);
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
    keyName: string
  ) => {
    setInputValues((prev) => ({ ...prev, [keyName]: e.target.value }));
  };

  return (
    <div className="w-full mx-8">
      <h1 className="w-full mt-8 mb-4 text-left">Add bike station</h1>
      {!isFormSubmit && (
        <Form
          buttonLabel="Add"
          handleSubmit={handleFormSubmit}
          classNames="flex flex-col"
        >
          <DateTimeInput
            field="started at"
            handleChange={(e) => {
              handleChange(e, 'startingTime');
            }}
            required={true}
          />
          <DateTimeInput
            field="ended at"
            handleChange={(e) => {
              handleChange(e, 'endingTime');
            }}
            required={true}
          />
          <SelectInput
            field="starting station"
            options={stationOptions}
            handleChange={(e) => {
              handleChange(e, 'startingStation');
            }}
            required={true}
          />
          <SelectInput
            field="ending station"
            options={stationOptions}
            handleChange={(e) => {
              handleChange(e, 'endingStation');
            }}
            required={true}
          />
        </Form>
      )}
      {/* form submit and no error ? show success message */}

      {/* form submit and error ? show error message */}
      {error && <div>Failed to add a new station ...</div>}
    </div>
  );
}

export default AddJourney;
