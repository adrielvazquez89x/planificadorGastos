import React from 'react'

const Mensaje = ({ children, tipo }) => {
    return (

        <div className={`alerta ${tipo}`}>  {/* Usamos los backtips porque la clase tipo puede variar entre error y success */}

            {/* Aca el mensaje va por parámetro, para poder tener un componente dinánmico */}
            {children}

        </div>
    )
}

export default Mensaje