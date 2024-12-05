const fs = require('fs');
const inquirer = require('inquirer');

class Usuarios {
    constructor() {
        this.path = './db/usuarios.json';
        this.cargarUsuarios();
    }

    cargarUsuarios() {
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
        this.usuarios = JSON.parse(fs.readFileSync(this.path, { encoding: 'utf-8' }));
    }

    guardarUsuarios() {
        fs.writeFileSync(this.path, JSON.stringify(this.usuarios, null, 2));
    }

    async crearUsuario() {
        const nuevoUsuario = await inquirer.prompt([
            { type: 'input', name: 'nombre', message: 'Nombre:' },
            { type: 'input', name: 'email', message: 'Email (opcional):' },
            { type: 'input', name: 'telefono', message: 'Teléfono (opcional):' },
            { type: 'input', name: 'direccion', message: 'Dirección (opcional):' },
            { type: 'input', name: 'edad', message: 'Edad (opcional):' },
        ]);
        nuevoUsuario.id = this.usuarios.length ? this.usuarios[this.usuarios.length - 1].id + 1 : 1;
        this.usuarios.push(nuevoUsuario);
        this.guardarUsuarios();
    }

    async editarUsuario() {
        const { id } = await inquirer.prompt([
            {
                type: 'input',
                name: 'id',
                message: 'ID del usuario a editar:',
            },
        ]);
        const usuario = this.usuarios.find((u) => u.id === parseInt(id));

        if (!usuario) {
            console.log('Usuario no encontrado.');
            return;
        }

        const campos = await inquirer.prompt([
            { type: 'input', name: 'nombre', message: `Nombre (${usuario.nombre}):`, default: usuario.nombre },
            { type: 'input', name: 'email', message: `Email (${usuario.email || 'N/A'}):`, default: usuario.email },
            { type: 'input', name: 'telefono', message: `Teléfono (${usuario.telefono || 'N/A'}):`, default: usuario.telefono },
            { type: 'input', name: 'direccion', message: `Dirección (${usuario.direccion || 'N/A'}):`, default: usuario.direccion },
            { type: 'input', name: 'edad', message: `Edad (${usuario.edad || 'N/A'}):`, default: usuario.edad },
        ]);

        Object.assign(usuario, campos);
        this.guardarUsuarios();
    }

    async eliminarUsuario() {
        const { id } = await inquirer.prompt([
            { type: 'input', name: 'id', message: 'ID del usuario a eliminar:' },
        ]);
        this.usuarios = this.usuarios.filter((u) => u.id !== parseInt(id));
        this.guardarUsuarios();
    }

    mostrarUsuarios(tipo) {
        if (tipo === 'completos') {
            console.log(this.usuarios.filter((u) => u.email && u.telefono));
        } else if (tipo === 'incompletos') {
            console.log(this.usuarios.filter((u) => !u.email || !u.telefono));
        } else {
            console.log(this.usuarios);
        }
    }
}

module.exports = Usuarios;
