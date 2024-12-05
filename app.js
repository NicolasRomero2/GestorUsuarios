const { menu, pausa } = require('./helpers/inquirer');
const Usuarios = require('./models/usuarios');
const usuarios = new Usuarios();

const principal = async () => {
    let opcion = '';
    do {
        opcion = await menu();

        switch (opcion) {
            case '1': // Crear usuario
                await usuarios.crearUsuario();
                break;

            case '2': // Editar usuario
                await usuarios.editarUsuario();
                break;

            case '3': // Eliminar usuario
                await usuarios.eliminarUsuario();
                break;

            case '4': // Mostrar usuarios completos
                usuarios.mostrarUsuarios('completos');
                break;

            case '5': // Mostrar usuarios incompletos
                usuarios.mostrarUsuarios('incompletos');
                break;

            case '6': // Mostrar todos los usuarios
                usuarios.mostrarUsuarios('todos');
                break;
        }

        if (opcion !== '0') await pausa();
    } while (opcion !== '0');
};

principal();
