import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Stations from './components/pages/Stations';
import Journeys from './components/pages/Journeys';
import AddJourney from './components/pages/AddJourney';
import AddStation from './components/pages/AddStation';
import StationDetail from './components/pages/StationDetail';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Stations />} />
          <Route path="stations" element={<Stations />} />
          <Route path="station/:id" element={<StationDetail />} />
          <Route path="journeys" element={<Journeys />} />
          <Route path="journey/add" element={<AddJourney />} />
          <Route path="station/add" element={<AddStation />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
