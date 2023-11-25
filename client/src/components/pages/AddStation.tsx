import React, { useState } from 'react';
import { getNewStationCoordinates } from '../../api/StationAPI';
import Form from '../Form';
import SelectInput from '../SelectInput';
import TextInput from '../TextInput';
import { useAppDispatch } from '../../store/hooks';
import { addNewStation } from '../../store/reducers/stationSlice';

function AddStation() {
  const [inputValues, setInputValues] = useState({
    name: '',
    street: '',
    city: '',
  });
  const [isFormSubmit, setIsFormSubmit] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsFormSubmit(true);

    const coordinates = await getNewStationCoordinates(
      inputValues.city,
      inputValues.street
    );

    if (!coordinates) return setError(true);

    const { latitude, longitude } = coordinates as {
      latitude: number;
      longitude: number;
    };

    dispatch(
      addNewStation({
        name: inputValues.name,
        address: inputValues.street,
        latitude,
        longitude,
      })
    );
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
          <TextInput
            label="name"
            handleChange={(e) => {
              handleChange(e, 'name');
            }}
          />
          <fieldset className="flex flex-col">
            <TextInput
              label="street"
              handleChange={(e) => {
                handleChange(e, 'street');
              }}
            />
            <SelectInput
              field="city"
              options={['espoo', 'helsinki']}
              handleChange={(e) => {
                handleChange(e, 'city');
              }}
            />
          </fieldset>
        </Form>
      )}
      {/* form submit and no error ? show success message */}
      {isFormSubmit && <div>successfully added</div>}
      {/* form submit and error ? show error message */}
      {error && <div>Failed to add a new station ...</div>}
    </div>
  );
}

export default AddStation;
