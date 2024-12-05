const inquirer = require('inquirer');

const menu = async () => {
    console.clear();
    console.log('||||||||||||||||||||||||||||||||||||||||||||||');
    console.log('|          Bienvenido al Gestor de Usuarios         |');
    console.log('||||||||||||||||||||||||||||||||||||||||||||||\n');

    const opciones = [
        { value: '1', name: '1. Crear usuario' },
        { value: '2', name: '2. Editar usuario' },
        { value: '3', name: '3. Eliminar usuario' },
        { value: '4', name: '4. Mostrar usuarios completos' },
        { value: '5', name: '5. Mostrar usuarios incompletos' },
        { value: '6', name: '6. Mostrar todos los usuarios' },
        { value: '0', name: '0. Salir' },
    ];

    const { opcion } = await inquirer.prompt([
        {
            type: 'list',
            name: 'opcion',
            message: 'Escoje la acción a realizar',
            choices: opciones,
        },
    ]);

    return opcion;
};

const pausa = async () => {
    console.log('\n');
    await inquirer.prompt([{ type: 'input', name: 'enter', message: `Presiona ENTER para continuar` }]);
};

module.exports = { menu, pausa };
