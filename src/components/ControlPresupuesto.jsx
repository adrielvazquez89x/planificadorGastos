import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const ControlPresupuesto = ({ gastos, setGastos, presupuesto, setPresupuesto, setIsvalidPresupuesto}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        //Primero definimos el gastado
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        //Segundo Francia, calculamos el disponible
        const totalDisponible = presupuesto - totalGastado

        // Calcular porcentaje

        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2)

        setTimeout(() => {

            setPorcentaje(nuevoPorcentaje)


        }, 1000);


        setDisponible(totalDisponible)
        setGastado(totalGastado)

    }
        , [gastos])



    // Le damos formato de moneda al numero presupuesto
    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('es-AR', {
            style: 'currency',
            currency: 'ARS'
        })
    }

    const handleResetApp = () => {
        const resultado = confirm('Estás seguro que querés reiniciar tus gastos?')

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsvalidPresupuesto(false)
        }
    }

    return (

        <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
            <div>
                <CircularProgressbar
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6'
                    }
                    )}
                    value={porcentaje}
                    text={`${porcentaje}% gastado`} />
            </div>
            <div className='contenido-presupuesto'>
                <button className='reset-app'
                    type='button'
                    onClick={handleResetApp}>
                    Resetear App
                </button>
                <p>
                    <span>Presupuesto:</span> {formatearCantidad(presupuesto)}
                </p>
                <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                    <span>Disponible:</span> {formatearCantidad(disponible)}
                </p>
                <p>
                    <span>Gastado:</span> {formatearCantidad(gastado)}
                </p>
            </div>

        </div>
    )
}

export default ControlPresupuesto