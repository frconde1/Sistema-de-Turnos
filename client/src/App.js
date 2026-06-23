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
import { AuthProvider } from './context/auth/AuthContext';
import { NotificationProvider } from './context/auth/NotificationContext';

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Landing/>} />
            
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />

            <Route path='home' element={<Home />} />

            <Route path='paciente'>
              <Route index element={<PacienteDashboard />} />
              <Route path='busqueda' element={<BusquedaTurnos />} />
              <Route path='preseleccion' element={<PreseleccionTurnos />} />
            </Route>

            <Route path='medico'>
              <Route index element={<MedicoDashboard />} />
            </Route>
          </Route>
        </Routes>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;
