import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login    from './pages/sesiones/Login';
import Register from './pages/sesiones/Register';
import Layout from './features/Layout';
import Landing from './pages/Landing';
import BusquedaTurnos from './pages/pacientes/BusquedaTurnos';
import PacienteDashboard from './pages/pacientes/PacienteDashboard';
import PreseleccionTurnos from './pages/pacientes/PreseleccionTurnos';
import MedicoDashboard from './pages/medicos/MedicoDashboard';
import Home from './pages/home/Home';
import { useState } from 'react';

function App() {

  const [userId, setUserId] = useState("");

  return (
    <Routes>
      <Route path='/' element={<Layout id={userId} setId={setUserId}/>}>
        <Route index element={<Landing/>} />
        
        <Route path='login'    element={<Login setId={setUserId} />} />
        <Route path='register' element={<Register setId={setUserId} />} />

        <Route path='home' element={<Home />} />

        <Route path='paciente'>
          <Route index element={<PacienteDashboard userId={userId}/>} />
          <Route path='busqueda' element={<BusquedaTurnos userId={userId}/>} />
          <Route path='preseleccion' element={<PreseleccionTurnos userId={userId}/>} />
        </Route>

        <Route path='medico'>
          <Route index element={<MedicoDashboard userId={userId}/>} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
