import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Stations from './components/Stations';
import Journeys from './components/Journeys';
import AddJourney from './components/AddJourney';
import AddStation from './components/AddStation';

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
