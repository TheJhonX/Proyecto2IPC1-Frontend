$(document).ready(function() {
    function Editar(btn) {
        sessionStorage.setItem('buscar', this.getAttribute('value'));
        location.href = 'editar_cancion.html';
    }

    function Eliminar(btn) {
        sessionStorage.setItem('buscar', this.getAttribute('value'));
        fetch(`https://proyecto-2201900831.herokuapp.com//Canciones/Eliminar/${sessionStorage.buscar}`, {
            method: 'DELETE'
        }).then(res => res.json()).catch(err => {
            console.log('ERROR', err);
            alert("Algo salió mal, checa la consola mi rey");
        }).then(response => {
            alert(response.message);
            location.href = 'inicio_admin.html';
        })
    }

    function verComentarios(btn) {
        sessionStorage.setItem('comentario', this.getAttribute('value'));
        location.href = 'Comentarios.html';
    }

    function Crear_btns(caja, id) {
        var cont_btns = document.createElement('div');
        var modificar = document.createElement('div');
        var eliminar = document.createElement('div');
        var comentarios = document.createElement('div');

        comentarios.className = 'btn comentarios';
        comentarios.innerHTML = 'Comentarios';
        comentarios.setAttribute('value', id);
        comentarios.addEventListener('click', verComentarios);
        cont_btns.appendChild(modificar);
        eliminar.className = 'btn eliminar';
        eliminar.innerHTML = 'Eliminar';
        eliminar.setAttribute('value', id);
        eliminar.addEventListener('click', Eliminar);
        cont_btns.appendChild(eliminar);
        modificar.className = 'btn modificar';
        modificar.innerHTML = 'Modificar';
        modificar.setAttribute('value', id);
        modificar.addEventListener('click', Editar);
        cont_btns.appendChild(comentarios);
        cont_btns.className = 'cont-btns';
        caja.appendChild(cont_btns);

    }

    function Crear_Caja(nombre, imagenP, id) {
        var elemento = document.getElementById('padre');
        var caja = document.createElement('div');
        var cont_info = document.createElement('div');
        var portada = document.createElement('div');
        var imagen = document.createElement('img');
        var titulo = document.createElement('div');

        imagen.src = imagenP;
        portada.className = 'portada';
        portada.appendChild(imagen);
        cont_info.appendChild(portada);
        titulo.className = 'titulo-cancion';
        titulo.innerHTML = nombre;
        cont_info.className = 'cont-info';
        cont_info.appendChild(titulo);
        caja.className = 'caja';
        caja.id = 'caja';
        caja.appendChild(cont_info);
        Crear_btns(caja, id);
        elemento.appendChild(caja);

    }

    function Canciones() {
        fetch(`https://proyecto-2201900831.herokuapp.com//Canciones`).then(res => res.json()).catch(err => {
            console.log('ERROR', err);
            alert("Algo salió mal, checa la consola mi rey");
        }).then(response => {
            console.log(response);
            // console.log(response[0].imagen);
            // console.log('------------');
            for (var i = 0; i < response.length; i++) {
                Crear_Caja(response[i].nombre, response[i].imagen, response[i].id);
            }

        })
    }

    function ObtenerCSV(text) {
        let lines = text.replace(/\r/g, '').split('\n');
        return lines.map(line => {
            let values = line.split(';');
            // console.log('------');
            return values;
        });
    }

    function Com(vacio) {
        if (vacio != '') {
            return true;
        }
        return false;
    }

    function Crear_cancion(nombre, artista, album, fecha, imagen, spotify, youtube) {
        if (Com(nombre) && Com(artista) && Com(album) && Com(fecha) && Com(imagen) && Com(spotify) && Com(youtube)) {
            console.log('todo bien');

            var objeto = {
                'nombre': nombre,
                'artista': artista,
                'album': album,
                'imagen': imagen,
                'fecha': fecha,
                'spotify': spotify,
                'youtube': youtube
            }

            fetch('https://proyecto-2201900831.herokuapp.com//Canciones/Nueva', {
                method: 'POST',
                body: JSON.stringify(objeto),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).catch(err => {
                console.log('ERROR', err);
                alert("Algo salió mal, checa la consola mi rey");
            }).then(response => {
                // console.log(response);
                // console.log(response.message);
                if (response.message == 'failed') {
                    console.log('Algo salió mal');
                }
            })
        } else {
            console.log('todo mal');
        }

    }

    function obtenerArray(lines, Canciones) {
        for (var i = 0; i < lines.length; i++) {
            Crear_cancion(lines[i][0], lines[i][1], lines[i][2], lines[i][3], lines[i][4], lines[i][5], lines[i][6]);
        }
        alert('Cargado Correctamente');
        Canciones();
    }

    function readFile(evt) {
        let file = evt.target.files[0];
        let reader = new FileReader();
        reader.onload = (e) => {
            let lines = ObtenerCSV(e.target.result);
            // console.log(lines);
            //console.log(lines);
            obtenerArray(lines, Canciones);
        };
        reader.readAsBinaryString(file);
    }

    $('#logo').click(function() {
        location.href = "index.html";
    });

    /*$('.btn.modificar').click(function(){
    	console.log(this.value);
    });*/

    function generarPDF() {
        var doc = new jsPDF();

        fetch(`https://proyecto-2201900831.herokuapp.com//Canciones`).then(res => res.json()).catch(err => {
            console.log('ERROR', err);
            alert("Algo salió mal, checa la consola mi rey");
        }).then(response => {
            var tam = 40;
            var cont = 0;
            pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(20);
            doc.text(20, 20, 'Canciones')
            for (var i = 0; i < response.length; i++) {
                doc.setFontSize(12);
                doc.text(20, tam, `${cont}. ${response[i].nombre}, ${response[i].artista}, ${response[i].album}, ${response[i].fecha}\n`);
                tam += 15;
                cont++;
                if (tam >= pageHeight) {
                    doc.addPage();
                    tam = 20;
                }
            }
            doc.save('Canciones.pdf');
        })
    }

    document.getElementById('fichero').addEventListener('change', readFile, false);
    Canciones();

    $('#pdf').click(function() {
        generarPDF();
    });
});