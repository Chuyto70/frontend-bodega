const form = document.getElementById('formulario')
const item = document.getElementById('item')
const proveedor = document.getElementById('proveedor')
const lote = document.getElementById('lote')
const retest = document.getElementById('retest')
const unidad = document.getElementById('unidad')
const stock = document.getElementById('stock')
const editar = document.getElementById('editar')
const borrar = document.getElementById('borrar')
const prueba = document.getElementById('prueba')
const tabla = document.getElementById('tabla')
const modificar = document.getElementById('modificar')
const agregar = document.getElementById('agregar')
const limpiar = document.getElementById('limpiar')

//Limpiar
limpiar.addEventListener('click', function() {
        form.reset()
        agregar.style.display = 'inline'
        modificar.style.display = 'none'
    })
    //EDITAR MATERIA PRIMA

function editarMateria(objeto) {

    axios.get(`https://servidor-bodega.herokuapp.com/listado/${objeto}`).then(result => {

            if (item.value) {
                alert('El formulario debe estar vacio')
                return
            }
            let info = result.data.materia

            item.value = info.nombre,
                proveedor.value = info.proveedor,
                lote.value = info.lote,
                retest.value = info.retest,
                unidad.value = info.unidad,
                stock.value = info.stock



            agregar.style.display = "none"

        })
        .catch(err => {
            console.log(err);
        })
    modificar.style.display = "inline"

    modificar.addEventListener('click', function() {
        axios.put(`https://servidor-bodega.herokuapp.com/${objeto}`, {
            nombre: item.value,
            proveedor: proveedor.value,
            lote: lote.value,
            retest: retest.value,
            unidad: unidad.value,
            stock: stock.value,

        }, { 'Content-Type': 'application/json' }).then(resp => {
            alert('Item modificado')
            form.reset()
            window.location.reload()
        }).catch(err => {
            console.log(err);
        })
    })
}
//MODIFICAR MATERIA PRIMA


//BORRAR MATERIA PRIMA
function borrarMateria(id) {
    console.log(id);
    if (confirm('¿Estas seguro que deseas eliminar la materia prima?')) {
        axios.delete(`https://servidor-bodega.herokuapp.com/${id}`)
            .then(res => {

                alert(res.data.mensaje)
                window.location.reload()

            })
            .catch(err => console.log(err))
    }

}


//OBTENER LISTA DE MATERIAS
function getUserts() {

    axios.get('https://servidor-bodega.herokuapp.com/listado')
        .then((result) => {

            let data = result.data


            data.forEach(elemento => {


                let d = new Date(elemento.retest)
                console.log(moment(elemento.retest).format('YYYY-MM-DD'));
                tabla.innerHTML += `<tbody>
            <th id = "paraEditar">${elemento.nombre  } 
            <a onclick="editarMateria('${elemento._id}')"  id="editar" class="btn btn-light" ><svg  width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                          </svg> </a>
                        <a onclick="borrarMateria('${elemento._id} ')"  class="btn btn-danger" id="borrar"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-archive-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" d="M12.643 15C13.979 15 15 13.845 15 12.5V5H1v7.5C1 13.845 2.021 15 3.357 15h9.286zM5.5 7a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zM.8 1a.8.8 0 0 0-.8.8V3a.8.8 0 0 0 .8.8h14.4A.8.8 0 0 0 16 3V1.8a.8.8 0 0 0-.8-.8H.8z"/>
                          </svg></a></th>
            <th>${elemento.proveedor}</th>
            <th>${elemento.lote}</th>
            <th>${moment(elemento.retest).format('DD-MM-YYYY')}</th>
            <th>${elemento.unidad}</th>
            <th>${elemento.stock}</th>

           </tbody>`



            })


        }).catch((err) => {
            console.log(err);
        });
}
//Obtener listado de Materias primas
getUserts()

//AGREGAR MATERIA PRIMA
form.addEventListener('submit', function(e) {
    e.preventDefault()
    if (!item.value || item.value === undefined || item.value === null) {
        return alert('DEBER INGRESAR NOMBRE OBLIGATORIAMENTE')
    }
    axios.post('https://servidor-bodega.herokuapp.com/nuevaMateria', {
            nombre: item.value,
            proveedor: proveedor.value,
            lote: lote.value,
            retest: retest.value,
            unidad: unidad.value,
            stock: stock.value
        })
        .then((result) => {

            console.log(result);

            Swal.fire(
                'The Internet?',
                'That thing is still around?',
                'question'
            )
            form.reset()
            window.location.reload()


        }).catch((err) => {
            console.log(err);
        });
})




//BORRAR MATERIA PRIMA