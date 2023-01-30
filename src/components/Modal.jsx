import { useState, useEffect } from 'react'
import Mensaje from './Mensaje'
import CerrarBtn from '../img/cerrar.svg'

const Modal = ({ setModal, animarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar }) => {

    const [nombre, setNombre] = useState('')
    // A pesar de ser un state relacionado con numeros, lo ponemos como un string vacio para que el placeholder muestre lo que esta escrito. Al ponerlo en 0, no se muestra.
    const [cantidad, setcantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [fecha, setFecha] = useState('')
    const [id, setId] = useState('') 

    const [mensaje, setMensaje] = useState('')

    useEffect(() => {

        if (Object.keys(gastoEditar).length > 0) {
            setNombre(gastoEditar.nombre)
            setcantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
        }


    }, [])


    const ocultarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})//limpiar state

        setTimeout(() => {
            setModal(false)

        }, 300);
    }

    const handleSubmit = e => {
        e.preventDefault()

        if ([nombre, cantidad, categoria].includes('')) {

            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 2000);
            return
        }
        guardarGasto({ nombre, cantidad, categoria, id, fecha })

    }

    return (

        <div className='modal'>
            <div className='cerrar-modal'>
                <img
                    src={CerrarBtn}
                    alt="Cerrar"
                    onClick={ocultarModal}
                />

            </div>

            <form
                onSubmit={handleSubmit}
                className={`formulario ${animarModal ? 'animar' : 'cerrar'}`} >

                <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo Gasto'}</legend>
                {/* Nuevamente, usamos este condicional de &&: "Si mensaje existe entonces mostrar el componente"*/}
                {mensaje && <Mensaje tipo={'error'}>{mensaje}</Mensaje>}

                {/* Nombre del gasto */}
                <div className='campo'>
                    <label htmlFor="nombre">Nombre Gasto</label>

                    <input
                        id='nombre'
                        type="text"
                        placeholder='Añade el nombre del gasto'
                        value={nombre}
                        onChange={e => setNombre(e.target.value)} />
                </div>

                {/* Cantidad del gasto */}
                <div className='campo'>
                    <label htmlFor="cantidad"> Cantidad </label>

                    <input
                        id='cantidad'
                        type="number"
                        placeholder='Añade la cantidad del gasto. Ej: 300'
                        value={cantidad}
                        onChange={e => setcantidad(Number(e.target.value))} />
                </div>

                {/* Seleccion de la categoria del gasto */}
                <div className='campo'>
                    <label htmlFor="cantidad"> Categoría </label>

                    <select
                        name=""
                        id="categoria"
                        value={categoria}
                        onChange={e => setCategoria(e.target.value)}

                    >
                        <option value="">-- Seleccione --</option>
                        <option value="tarjetas">Tarjetas</option>
                        <option value="comida"> Comida </option>
                        <option value="casa"> Casa </option>
                        <option value="gastos"> Gastos varios </option>
                        <option value="ocio"> Ocio </option>
                        <option value="salud"> Salud </option>
                        <option value="impuestos"> Impuestos </option>
                    </select>
                </div>

                <input
                    type="submit"
                    value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir Gasto'} />

            </form>
        </div>
    )
}

export default Modal