import { useState, useEffect } from 'react'
import Header from './components/Header'
import Filtros from './components/Filtros'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'

import { generarId } from './helpers'

import IconoNuevoGasto from './img/nuevo-gasto.svg'

function App() {

  const [gastos, setGastos] = useState(
    localStorage.getItem('gastos') ? JSON.parse(localStorage.getItem('gastos')) : []
  )

  const [presupuesto, setPresupuesto] = useState(

    Number(localStorage.getItem('presupuesto')) ?? 0

  )

  const [isValidPresupuesto, setIsvalidPresupuesto] = useState(false) // Con este State, vamos a gestionar el render 
  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)
  const [gastoEditar, setGastoEditar] = useState({})  // state para crear objeto que se llena con los datos de un objeto existente, para poder editarlo

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])


  useEffect(() => {
    // si el objeto de gastoEditar tiene algun cambio, ejecuta esto
    if (Object.keys(gastoEditar).length > 0) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 300);
    }
  }, [gastoEditar])


  // Use Effect para guardar el presupuesto Local Storage
  useEffect(() => {

    localStorage.setItem('presupuesto', presupuesto ?? 0)

  }, [presupuesto])

  //Use effect para verificar si hay presupuesto, mostrar pantalla siguiente
  useEffect(() => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0

    if (presupuestoLS > 0) {

      setIsvalidPresupuesto(true)

    }

  }, [])

  // useEffect para guardar gastos en local storage
  useEffect(() => {

    localStorage.setItem('gastos', JSON.stringify(gastos) ?? [])

  }, [gastos])

  // useEffect para filtroo
  useEffect ( () => {
    if (filtro) {
      const filtrados = gastos.filter( gasto => gasto.categoria === filtro)
      setGastosFiltrados(filtrados)
    }


  }, [filtro])

console.log( gastosFiltrados)

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 300);


  }

  const guardarGasto = gasto => {
    console.log(gasto)
    if (gasto.id) {
      // Actualizar
      const gastosActualizados = gastos.map(gastoState => gastoState.id === gasto.id ? gasto : gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({}) //Limpiar state

    } else {
      // Nuevo Gasto
      gasto.id = generarId()
      gasto.fecha = Date.now();
      setGastos([...gastos, gasto])
    }

    setAnimarModal(false)

    setTimeout(() => {
      setModal(false)

    }, 300);

  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)

    setGastos(gastosActualizados)
  }

  return (

    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        setGastos={setGastos}
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsvalidPresupuesto={setIsvalidPresupuesto}

      />

      { /* Boton para agregar nuevo gasto, se habilita cuando tenemos un presupuesto válido */
        isValidPresupuesto &&
        (
          <>
            <main>
              <Filtros
                filtro={filtro}
                setFiltro={setFiltro}

              />
              <ListadoGastos
                gastos={gastos}
                setGastoEditar={setGastoEditar}
                eliminarGasto={eliminarGasto}
                filtro={filtro}
                gastosFiltrados={gastosFiltrados}
              />
            </main>
            <div className='nuevo-gasto'>
              <img
                src={IconoNuevoGasto}
                alt="Nuevo Gasto"
                onClick={handleNuevoGasto} />

            </div>
          </>
        )
      }

      { /* Ventana modal que se habilita cuando hacemos click en el icono de nuevo gasto */
        modal && (
          <Modal
            setModal={setModal}
            animarModal={animarModal}
            setAnimarModal={setAnimarModal}
            guardarGasto={guardarGasto}
            gastoEditar={gastoEditar}
            setGastoEditar={setGastoEditar}
          />
        )

      }


    </div>






  )
}

export default App
