import React, { useEffect, useState } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/auth/AuthContext'
import axios from 'axios'
import {
    Container, Row, Col, Card, Badge, Button, Modal,
    Form, Spinner, Alert, ListGroup
} from 'react-bootstrap'
import PracticaModal from '../../features/modals/PracticaModal'
import PracticasPanel from '../../features/panels/PracticasPanel'
import SedesPanel from '../../features/panels/SedePanel'
import EspecialidadesPanel from '../../features/panels/EspecialidadesPanel'
import DisponibilidadesPanel from '../../features/panels/DisponibilidadesPanel'
import SedeModal from '../../features/modals/SedeModal'
import DisponibilidadModal from '../../features/modals/DisponibilidadesModal'
 
const DIAS = ['LUNES','MARTES','MIERCOLES','JUEVES','VIERNES','SABADO','DOMINGO']


  
export default function MedicoDashboard() {
    const { usuario } = useAuth()
    const [medico, setMedico]   = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError]     = useState(null)
 
    const [modalDisp,     setModalDisp]     = useState(false)
    const [modalPractica, setModalPractica] = useState(false)
 
    const [nuevaDisp,      setNuevaDisp]      = useState({ diaSemana: 'LUNES', horaDesde: '', horaHasta: '' })
    const [nuevaPractica,  setNuevaPractica]  = useState({ nombre: '', duracionEnMins: '', costo: '' })

    const [modalSede, setModalSede] = useState(false)
    const [modalEspecialidad, setModalEspecialidad] = useState(false)

    const [selectedSedeId, setSelectedSedeId] = useState('')
    const [selectedEspecialidadId, setSelectedEspecialidadId] = useState('')

const [todasLasSedes, setTodasLasSedes] = useState([])
const [todasLasEspecialidades, setTodasLasEspecialidades] = useState([])
const [todasLasPracticas, setTodasLasPracticas] = useState([])
 
  useEffect(() => {
    if (!usuario) return  

    const fetchMedico = async () => {
        try {
            const res = await axios.get(`/medicos/${usuario.username}`)
            setMedico(res.data)
            const resSedes = await axios.get('/sedes')
            setTodasLasSedes(resSedes.data)
            const resEspecialidades = await axios.get('/especialidades')
            setTodasLasEspecialidades(resEspecialidades.data)
            const resPracticasGlobales = await axios.get('/practicas') // O el endpoint que tengan para el catálogo general
            setTodasLasPracticas(resPracticasGlobales.data)
        } catch (error) {
            setError('No se pudo cargar la información del médico.')
        } finally {
            setLoading(false)
        }
    }
    fetchMedico()
}, [usuario])
 
    const agregarDisponibilidad = async (nuevaDisp) => {
        try {
        await axios.post(`/medicos/${medico.id}/disponibilidades`, {
            disponibilidad: nuevaDisp
        })

        setMedico(m => ({ 
            ...m, 
            disponibilidades: [...m.disponibilidades, nuevaDisp] 
        }))
        
        setModalDisp(false)
    } catch {
            setError('No se pudo agregar la disponibilidad.')
        }
    }
 
    const eliminarDisponibilidad = async (id) => {
        try {
            // TODO: await axios.delete(`/medicos/${medico.id}/disponibilidades/${id}`)
            setMedico(m => ({ ...m, disponibilidades: m.disponibilidades.filter(d => d.id !== id) }))
        } catch {
            setError('No se pudo eliminar la disponibilidad.')
        }
    }
 
const agregarPractica = async (practicaId) => {
    try {
        const practicaAsignada = todasLasPracticas.find(p => p._id === practicaId || p.id === practicaId)
        await axios.post(`/medicos/${medico.id || medico._id}/practicas`, { practica: practicaId })
        
        setMedico(m => ({ 
            ...m, 
            practicas: [...m.practicas, practicaAsignada] 
        }))
        setModalPractica(false)
    } catch (error) {
        console.error("Error al asignar práctica:", error.response?.data)
        setError('No se pudo asignar la práctica.')
    }
}

  const asignarSede = async (sedeId) => {
    try {
        const sedeAsignada = todasLasSedes.find(s => s.id === sedeId)
        if (!sedeAsignada) return

        await axios.post(`/medicos/${medico.id || medico._id}/sedes`, { 
          sede: 
          {
            id: sedeId 
          }
        }
        )

        setMedico(m => ({ ...m, sedes: [...m.sedes, sedeAsignada] }))
        setModalSede(false)
    } catch {
        setError('No se pudo asignar la sede.')
    }
}
 
    if (loading) return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <Spinner animation="border" variant="primary" />
        </Container>
    )
 
    if (error) return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    )
 
    if (!medico) return null
 
    return (
      <Container className="py-4">
        {/* Header */}
        <div className="mb-4 pb-3 border-bottom">
            <h1 className="h3 fw-bold mb-0">{medico.nombre}</h1>
            <small className="text-muted">Matrícula: {medico.matricula}</small>
        </div>

        {/* Paneles Informativos del Dashboard */}
        <Row className="g-4">
            <Col xs={12} md={6}>
                <SedesPanel 
                    sedesActuales={medico.sedes} 
                    onAsignarClick={() => setModalSede(true)} 
                />
            </Col>
            
            <Col xs={12} md={6}>
                <EspecialidadesPanel 
                    especialidadesActuales={medico.especialidades} 
                    onAsignarClick={() => setModalEspecialidad(true)} 
                />
            </Col>

            <Col xs={12} md={6}>
                <PracticasPanel 
                    practicasActuales={medico.practicas} 
                    onAgregarClick={() => setModalPractica(true)} 
                />
            </Col>

            <Col xs={12} md={6}>
                <DisponibilidadesPanel 
                    disponibilidadesActuales={medico.disponibilidades} 
                    onAgregarClick={() => setModalDisp(true)} 
                    onEliminar={eliminarDisponibilidad}
                />
            </Col>
        </Row> 
      
 
            {/* Modal disponibilidad */}
         <DisponibilidadModal 
          show={modalDisp} 
          onHide={() => setModalDisp(false)}
          onAgregar={agregarDisponibilidad} 
      />

            {/* Modal práctica */}
            <PracticaModal 
            show={modalPractica}
            todasLasPracticas={todasLasPracticas}
            onHide={() => setModalPractica(false)}
            practicasActuales={medico.practicas}
            onAsignar={agregarPractica}
            />

            <SedeModal 
            show = {modalSede} 
            onHide = { () => setModalSede(false)}
            sedesActuales = {medico.sedes}
            todasLasSedes = {todasLasSedes}
            onAsignar = {asignarSede}
                        
            />

         </Container>
    )
}


