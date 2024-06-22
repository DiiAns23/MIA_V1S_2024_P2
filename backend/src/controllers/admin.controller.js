const { insertData } = require('../config/db.mongo');
// const { bcrypt } = require('bcryptjs');

const ciclo_for = async (req, res) =>  {
    
    // Recibir el parametro numero desde la URL
    const { numero } = req.params; // Obtenemos el valor desde la ruta URL
    
    // Manipulacion de datos
    let respuesta = '';
    for (let i = 0; i < numero; i++) {
        respuesta += `Iteracion ${i + 1} `;
    };

    //console.log('Respuesta a enviar', respuesta);

    // Respuesta
    res.status(200).json(
        {
            msg: respuesta
        });
};


const registro = async (req, res) => {
    // Recibir los datos enviados desde el cliente
    const { nombre, apellido, usuario, correo, password } = req.body;

    // Manipulacion de datos
    // Insertar datos a la base de datos
    console.log('Datos recibidos', nombre, apellido, usuario, correo, password);

    // const p_2 = await bcrypt.hash(password, 10);

    const result = await insertData('Usuarios', {
        nombre,
        apellido,
        usuario,
        correo,
        password //: p_2
    });


    if(result instanceof Error) {
        return res.status(500).json(
            {
                status: false,
                msg: 'Error al registrar usuario',
                data: result
            });
    };

    // Respuesta
    return res.status(200).json(
    {
        status: true,
        msg: 'Registro exitoso',
        data: result
    });
};



module.exports = {
    ciclo_for,
    registro
};