const inquirer = require('inquirer');
require('colors');

const menuOpts = [
    {
        type: 'list',
        name: 'opt',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: '1. Crear tarea'
            },
            {
                value: '2',
                name: '2. Listar tareas'
            },
            {
                value: '3',
                name: '3. Listar tareas completadas'
            },
            {
                value: '4',
                name: '4. Listar tareas pendientes'
            },
            {
                value: '5',
                name: '5. Completar tareas(s)'
            },
            {
                value: '6',
                name: '6. Borrar tarea'
            },
            {
                value: '0',
                name: '0. Salir'
            }
        ]
    }
];

const inquirerMenu = async() => {
    console.clear();
    console.log('============================='.green);
    console.log('    Seleccione una opción    ');
    console.log('=============================\n'.green);

    const {opt} = await inquirer.prompt(menuOpts);
    
    return opt;
    
}

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            menssage: `Presione ${ 'enter'.green } para continuar`
        }
    ];
    
    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor, ingrese un valor'
                }
                return true;
            }
        }
    ];

    const { desc } = await inquirer.prompt(question)
    return desc;
}

const listadoBorrarTareas = async( tareas = [] ) => {
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }

    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(questions);
    return id;
}

const confirmar = async (msg) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: msg
        }
    ]
    const {ok} = await inquirer.prompt(question);
    return ok;

}

const mostrarCheckList = async( tareas = [] ) => {
    const choices = tareas.map((tarea, i) => {

        const idx = `${i + 1}`.green;
        return{
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }

    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoBorrarTareas,
    confirmar,
    mostrarCheckList
}