import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Stations from './components/Stations/Stations';
import Journeys from './components/Journeys/Journeys';
import AddJourney from './components/AddJourney/AddJourney';
import AddStation from './components/AddStation/AddStation';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="stations" element={<Stations />} />
          <Route path="journeys" element={<Journeys />} />
          <Route path="jouney/new" element={<AddJourney />} />
          <Route path="station/new" element={<AddStation />} />
          <Route path="*" element={<div>404</div>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
