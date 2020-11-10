function Iniciar_Sesion(username, password) {
    var objeto = {
        'usuario': username,
        'password': password
    }

    console.log(objeto);

    fetch('https://proyecto-2201900831.herokuapp.com//Login', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch(err => {
        console.log('ERROR', err);
        alert('Ocurrió un error, ver la consola');
    }).then(response => {
        console.log(response);
        console.log('-------------');
        console.log(response.message);
        if (response.message == 'failed') {
            alert('Usuario no encontrado');
        } else {
            alert(`Bienvenido ${username}`);
            if (response.tipo == "administrador") {
                sessionStorage.setItem("usuario", username);
                sessionStorage.setItem("tipo", "administrador");
                location.href = "inicio_admin.html";
            } else {
                sessionStorage.setItem("usuario", username);
                location.href = "inicio_usuario.html";
                sessionStorage.setItem("tipo", "usuario");
            }

        }
    })
}


function Crear_cuenta(nombre, apellido, username, password, password2) {
    var objeto = {
        'nombre': nombre,
        'apellido': apellido,
        'usuario': username,
        'password': password,
        'password2': password2
    }

    fetch('https://proyecto-2201900831.herokuapp.com//Personas', {
        method: 'POST',
        body: JSON.stringify(objeto),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json()).catch(err => {
        console.log('ERROR', err);
        alert("Algo salió mal, checa la consola mi rey");
    }).then(response => {
        console.log(response);
        //console.log('-------------');
        console.log(response.message);
        if (response.message == 'failed') {
            alert(response.reason);
        } else {
            alert(response.reason);
            location.href = "iniciar_sesion.html";
        }
    })
}

function Recuperar_Password(username) {
    //console.log(username);
    fetch(`https://proyecto-2201900831.herokuapp.com//Personas/Recuperar/${username}`).then(res => res.json()).catch(err => {
        console.log('ERROR', err);
        alert("Algo salió mal, checa la consola mi rey");
    }).then(response => {
        console.log(response);
        console.log('------------');
        if (response.message == 'failed') {
            alert(response.reason);
        } else {
            console.log(response.password);
            alert(`Esta es tu contraseña mi rey: ${response.password}`);
        }
    })
}

function val_input(input) {
    if (input != '') {
        return true;
    }
    return false;
}

function ValidarCrearCuenta(nombre, apellido, username, password, password2) {
    if (val_input(nombre) && val_input(apellido) && val_input(username)) {
        if (password == password2) {
            return true;
        } else {
            alert('Las contraseñas no coinciden :(');
        }
    } else {
        alert('Por favor rellene todos los campos');
    }
    return false;
}


$('#iniciar_sesion').click(function() {
    var username = $('#usuario').val();
    var password = $('#password').val();
    if (val_input(username) && val_input(password)) {
        Iniciar_Sesion(username, password);
    } else {
        alert('Por favor rellene todos los campos');
    }

});

$('#registrar').click(function() {
    var nombre = $('#nombre').val();
    var apellido = $('#apellido').val();
    var username = $('#usuario').val();
    var password = $('#password').val();
    var password2 = $('#password2').val();
    if (ValidarCrearCuenta(nombre, apellido, username, password, password2)) {
        Crear_cuenta(nombre, apellido, username, password, password2);
    }
});

$('#recuperar_c').click(function() {
    var username = $('#usuario').val();
    if (val_input(username)) {
        Recuperar_Password(username);
    } else {
        alert('Ingresa un nombre de usuario');
    }

});

$('#logo').click(function() {
    location.href = "index.html";
});