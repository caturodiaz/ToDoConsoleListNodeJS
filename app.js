require('colors');

const { guardarInfo, leerDB } = require('./helpers/guardarArchivo');
const { inquirerMenu, pausa, leerInput, listadoBorrarTareas, confirmar, mostrarCheckList } = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDB = leerDB();

    if (tareasDB) {
        //Establecer las tareas
        tareas.cargarTareasFromArray(tareasDB);
    }
    do {
       opt = await inquirerMenu();

        switch (opt) {
            case '1':
                //Crear opción
                const desc = await leerInput('Descripción:');
                tareas.crearTarea( desc );
            break;
            
            case '2':
                tareas.listadoCompleto();
            break;

            case '3': //Listar completadas
                tareas.listarPendientesCompletadas();
            break;

            case '4': //Listar pendientes
                tareas.listarPendientesCompletadas(false);
            break;

            case '5': //Completar tareas
               const ids = await mostrarCheckList(tareas.listadoArr);
                tareas.toggleCompletadas(ids);
            break;

            case '6':
                const id = await listadoBorrarTareas(tareas.listadoArr);
                if (id !== '0'){
                    const ok = await confirmar('¿Estás seguro?');

                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada');
                    }
                }
                
            break;
        }

        guardarInfo( tareas.listadoArr );

        await pausa();


    } while (opt !== '0');

}

main();