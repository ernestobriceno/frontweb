import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import './App.css'
import Login from './pages/Login/login'
import Home from './pages/Inicio/ini'
import Ini2 from './pages/Inicio2/ini2'
import Signup from './pages/Login/signup'
import Loginps from './pages/Login/loginps'
import Cal from './pages/Calendario/cal'
import Doc from './pages/Documento/doc'
import Loca from './pages/Localidades/loca'
import Perfil from './components/Perfil/perfil'
import Pacientes from './pages/Pacientes/pacientes'
import { useCheckAuth } from './hooks/useCheckAuth'
import { Toaster } from 'react-hot-toast'

const PrivateRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/" />
};

const HealthRoutes = ({ user }) => {
  return user?.isHealthPersonnel ? <Outlet /> : <Navigate to="/home" />
};
const PublicRoutes = ({ user }) => {
  return !user ? <Outlet /> : <Navigate to="/home" />
};


function App() {
  const { user, loading } = useCheckAuth()

  return (
    loading
      ? <p>...Loading</p>
      :
      <div>
        <Toaster/>
        <BrowserRouter>
          <Routes>
            <Route element={<PrivateRoutes user={user} />} >
              <Route path="/cal" element={<Cal />} />
              <Route path="/doc" element={<Doc />} />
              <Route path="/loca" element={<Loca />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/home" element={<Home />} />
              <Route path="/ini2" element={<Ini2 />} />

              <Route element={<HealthRoutes user={user} />} >
                <Route path="/pacientes" element={<Pacientes />} />
              </Route>
            </Route>

            <Route element={<PublicRoutes user={user} />} >
              <Route path="/" element={<Login />} />

              <Route path="/signup" element={<Signup />} />
              <Route path="/loginps" element={<Loginps />} />
            </Route>

            <Route path="/navbar" element={<navbar />} />
          </Routes>
        </BrowserRouter>
        <navbar />
      </div>
  )
}

export default App
