import { useState } from "react";
import Mensaje from "./Mensaje";


const NuevoPresupuesto = ({ presupuesto,
    setPresupuesto,
    setIsvalidPresupuesto }) => {

    const [mensaje, setMensaje] = useState('')

    // Se muestra mensaje de error o se continua con la ejecución
    const handlePresupuesto = (e) => {
        e.preventDefault();

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto válido')

            //con este return, cortamos la ejecución del código si la condición no se cumpla. Si la condicioón se cumple continua
            return
        }
        setMensaje('')
        setIsvalidPresupuesto(true)

    }

    return (

        <div className="contenedor-presupuest contenedor sombra">
            <form onSubmit={handlePresupuesto} className="formulario">
                <div className="campo">
                    <label htmlFor="">Definir Presupuesto</label>
                    <input
                        className="nuevo-presupuesto"
                        type="number"
                        placeholder="Añade tu presupuesto"
                        value={presupuesto}
                        onChange={e => setPresupuesto(Number(e.target.value))} />

                </div>
                <input type="submit" value="Añadir" />

                {/* Pasamos los parámetros por props, la clase error, y el mensaje que seteamos con setMensaje */}
                {mensaje && <Mensaje tipo={"error"}> {mensaje}</Mensaje>}

            </form>
        </div>
    )
}

export default NuevoPresupuesto