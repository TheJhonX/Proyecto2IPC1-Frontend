$('#name').html(sessionStorage.usuario);
$('.thumb img, #perfil').click(function() {
    sessionStorage.setItem('buscado', sessionStorage.usuario);
    if (sessionStorage.tipo == "administrador") {
        location.href = "editar_perfil.html";
    } else {
        location.href = "editar_perfil_u.html";
    }
});
$('#inicio').click(function() {
    if (sessionStorage.tipo == "administrador") {
        location.href = 'inicio_admin.html';
    } else {
        location.href = 'inicio_usuario.html';
    }

});
$('.logo').click(function() {
    location.href = 'index.html'
});
$('#p_usuario').click(function() {
    location.href = 'usuarios.html';
});
$('#n_admin').click(function() {
    location.href = 'nuevo_admin.html';
});

$('#solicitud').click(function() {
    location.href = 'solicitar.html';
});

$('#solicitudes').click(function() {
    location.href = 'solicitudes.html';
});

function al_iniciar() {
    var fila = document.createElement('tr');
    var elemento = document.getElementById('table_banner');
    fila.className = 'opcion';
    fila.addEventListener('click', function() {
        sessionStorage.removeItem('usuario');
        sessionStorage.removeItem('tipo');
        alert('Cerraste sesión');
        location.href = 'iniciar_sesion.html';
    });
    fila.innerHTML = '<td><i class="fas fa-key"></i></td><td><p id="playlist">Cerrar sesión</p></td>';
    elemento.appendChild(fila);
}

function Comprobar() {
    if (sessionStorage.usuario == undefined) {
        location.href = "iniciar_sesion.html";
    }
}

function Playlist(btn) {
    console.log('entré');
    objeto = {
        'id': btn.id
    }

    fetch('https://proyecto-2201900831.herokuapp.com//Canciones/playlist', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch(err => {
        console.log('ERROR', err);
        alert("Algo salió mal, checa la consola mi rey");
    }).then(response => {
        alert(response.message);
    })
}

function info_Cancion(btn) {
    // console.log(btn.id);
    sessionStorage.setItem('buscar', btn.id);
    location.href = 'info_cancion.html';
}

function quitar_myplaylist(btn) {
    fetch(`https://proyecto-2201900831.herokuapp.com//Canciones/playlist/Borrar/${btn.id}`, {
        method: 'DELETE'
    }).then(res => res.json()).catch(err => {
        console.log('ERROR', err);
        alert("Algo salió mal, checa la consola mi rey");
    }).then(response => {
        alert(response.message);
        location.href = 'mi_playlist.html';
    })
}

$('#playlist').click(function() {
    location.href = 'mi_playlist.html';
});

Comprobar();
al_iniciar();