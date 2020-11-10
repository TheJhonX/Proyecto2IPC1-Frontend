$(document).ready(function(){
	var playing = false;
	var audio = document.getElementById('aud');
	var iconplay = "fa fa-play";
	var iconpause = "fa fa-pause";

	function togglePlay(){
		if (playing){
			audio.pause();
		}else{
			audio.play();
		}
	}

	audio.onplaying = function(){
		playing = true;
		$('#icon').attr('class', iconpause);
	}

	audio.onpause = function(){
		playing = false;
		$('#icon').attr('class', iconplay);
	}

	$('#play').click(function(){
		togglePlay();
		audio.volume = 0.6;
	});

	$('#logo').click(function(){
		location.href = "index.html";
	});

	$('#inicio').click(function(){
		if (sessionStorage.tipo == "administrador"){
			location.href = 'inicio_admin.html';
		}else if (sessionStorage.tipo == "usuario"){
			location.href = 'inicio_usuario.html';
		}else{
			location.href = 'iniciar_sesion.html';
		}
	});
});
