import React from "react";
import NuevoPresupuesto from "./NuevoPresupuesto";
import ControlPresupuesto from "./ControlPresupuesto";

const Header = ({
    gastos,
    setGastos,
    presupuesto,
    setPresupuesto,
    isValidPresupuesto,
    setIsvalidPresupuesto }) => {

    return (
        <header>
            <h1>Control de Presupuesto</h1>

            {isValidPresupuesto ?

                <ControlPresupuesto
                    gastos={gastos}
                    setGastos={setGastos}
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    isValidPresupuesto={isValidPresupuesto}
                    setIsvalidPresupuesto={setIsvalidPresupuesto} />

                :

                <NuevoPresupuesto
                    presupuesto={presupuesto}
                    setPresupuesto={setPresupuesto}
                    setIsvalidPresupuesto={setIsvalidPresupuesto}
                />

            }


        </header >
    )
}

export default Header