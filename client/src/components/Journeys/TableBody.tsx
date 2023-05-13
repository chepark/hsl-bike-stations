import React from "react";
import { JourneyType } from "../../models/journeysInterface";

const TableBody = ({ journeys }: { journeys: JourneyType[] }) => {
  return (
    <tbody>
      {journeys?.map((journey) => {
        return (
          <tr key={journey.journey_id}>
            <td>{journey.journey_id}</td>
            <td>{journey.startingStation_name}</td>
            <td>{journey.endingStation_name}</td>
            <td>{journey.route_distance_meter}</td>
            <td>{journey.journey_duration_sec}</td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
