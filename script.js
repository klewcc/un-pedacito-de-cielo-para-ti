
/* ========================================
   ELEMENTOS DE LA PÁGINA
======================================== */

const escenaInicio = document.getElementById("inicio");
const escenaEstrellas = document.getElementById("estrellas");
const contenidoEstrellas = document.querySelector(".contenido-estrellas");

const botonDescubrir = document.getElementById("boton-descubrir");
const botonesEstrellas = document.querySelectorAll(".estrella-interactiva");

const numeroEstrella = document.getElementById("numero-estrella");
const textoEstrella = document.getElementById("texto-estrella");
const progresoEstrellas = document.getElementById("progreso-estrellas");

const encabezadoEstrellas = document.getElementById("encabezado-estrellas");
const tituloEstrellas = document.getElementById("titulo-estrellas");
const descripcionEstrellas = document.getElementById("descripcion-estrellas");

/* ========================================
   MODAL DE LAS SEIS ESTRELLAS
======================================== */

const modalEstrella = document.getElementById("modal-estrella");
const numeroModalEstrella = document.getElementById("numero-modal-estrella");
const tituloModalEstrella = document.getElementById("titulo-modal-estrella");
const mensajeModalEstrella = document.getElementById("mensaje-modal-estrella");
const cerrarModalEstrella = document.getElementById("cerrar-modal-estrella");

/* ========================================
   MODAL DE LA DEDICATORIA FINAL
======================================== */

const modalDedicatoria = document.getElementById("modal-dedicatoria");
const cerrarModalDedicatoria = document.getElementById("cerrar-modal-dedicatoria");
const botonRepetirModal = document.getElementById("boton-repetir-modal");

/* ========================================
   CONSTELACIÓN Y CORAZÓN
======================================== */

const constelacion = document.getElementById("constelacion");
const lineasCorazon = document.getElementById("lineas-corazon");

/* ========================================
   MENSAJES ROMÁNTICOS
======================================== */

const mensajesEstrellas = [
    "A veces la vida nos sorprende con personas que no estábamos esperando conocer. Llegan de manera sencilla, pero poco a poco se vuelven alguien que nos alegra los días. Y entre esas bonitas coincidencias, me alegra mucho haberte encontrado.",
    "Hay conversaciones que parecen tan sencillas, pero que sin darnos cuenta terminan alegrándonos el día. Me pasa contigo, porque a veces basta con hablar un ratito, compartir cualquier cosa o simplemente saber de ti para que mi día se sienta un poquito más bonito.",
    "No sé si te lo han dicho antes, pero hay algo muy bonito en tu forma de ser. Me gustan tus ideas, tus ocurrencias y esos pequeños detalles que quizás ni notas, pero para mí tienen un encanto especial y hacen que quiera seguir conociéndote más.",
    "Hay momentos sencillos que con el tiempo se convierten en recuerdos muy bonitos. Me gusta pensar en esos pequeños instantes que hemos compartido, porque para mí tienen algo especial. A veces, lo bonito no es tanto lo que sucede, sino con quién lo compartimos.",
    "Ojalá nunca te falten motivos para sonreír, incluso en esos días en los que todo parece un poquito más difícil. Me gustaría que siempre encuentres algo bonito que te anime y, si alguna vez puedo sacarte una sonrisa, sería algo muy especial para mí.",
    "Hay algo que me gusta de todo esto: saber que todavía quedan historias por contar, canciones por compartir y pequeños recuerdos por crear. No sé cómo serán los días que vienen, pero me ilusiona pensar que quizás en algunos de ellos también estés tú."
];

/* ========================================
   ESTADO DE LA EXPERIENCIA
======================================== */

const estrellasDescubiertas = new Set();

let sorpresaIniciada = false;
let botonFinalDesbloqueado = false;

let temporizadorMensaje;
let temporizadorTransicion;
let temporizadorInvitacion;

/* ========================================
   TRANSICIÓN HACIA LAS ESTRELLAS
======================================== */

botonDescubrir.addEventListener("click", function () {
    if (botonDescubrir.disabled) {
        return;
    }

    botonDescubrir.disabled = true;
    escenaInicio.classList.add("saliendo");

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const duracion = movimientoReducido ? 0 : 550;

    window.setTimeout(function () {
        escenaInicio.hidden = true;
        escenaEstrellas.hidden = false;
        window.scrollTo(0, 0);
    }, duracion);
});

/* ========================================
   DESCUBRIR LOS MENSAJES
======================================== */

botonesEstrellas.forEach(function (boton) {
    boton.addEventListener("click", function () {
        const numero = Number(boton.dataset.estrella);
        const indice = numero - 1;

        // Actualizar el número de la estrella.
        numeroModalEstrella.textContent = String(numero).padStart(2, "0");

        // Mostrar el título correspondiente.
        if (numero === 1) {
            tituloModalEstrella.textContent = "Una bonita coincidencia";
        } else if (numero === 2) {
            tituloModalEstrella.textContent = "Pequeñas conversaciones";
        } else if (numero === 3) {
            tituloModalEstrella.textContent = "Tu forma de ser";
        } else if (numero === 4) {
            tituloModalEstrella.textContent = "Momentos especiales";
        } else if (numero === 5) {
            tituloModalEstrella.textContent = "Motivos para sonreír";
        } else if (numero === 6) {
            tituloModalEstrella.textContent = "Una pequeña ilusión";
        } else {
            tituloModalEstrella.textContent = `Estrella ${numero}`;
        }

        mensajeModalEstrella.textContent = mensajesEstrellas[indice];

        if (!modalEstrella.open) {
            modalEstrella.showModal();
        }

        // Resaltar solo la estrella seleccionada.
        botonesEstrellas.forEach(function (estrella) {
            estrella.classList.remove("activa");
        });
        boton.classList.add("activa");

        // Registrar cada estrella una sola vez.
        if (!estrellasDescubiertas.has(numero)) {
            estrellasDescubiertas.add(numero);
            boton.classList.add("descubierta");
        }

        const cantidad = estrellasDescubiertas.size;
        progresoEstrellas.textContent =
            `${cantidad} de ${mensajesEstrellas.length} secretos descubiertos`;

        if (cantidad === mensajesEstrellas.length) {
            progresoEstrellas.textContent =
                "Has descubierto todos los secretos";
        }
    });
});

/* ========================================
   DESBLOQUEAR LA SORPRESA FINAL
======================================== */

modalEstrella.addEventListener("close", function () {
    if (
        estrellasDescubiertas.size !== mensajesEstrellas.length ||
        sorpresaIniciada ||
        botonFinalDesbloqueado
    ) {
        return;
    }

    botonFinalDesbloqueado = true;

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const espera = movimientoReducido ? 0 : 1500;
    const duracion = movimientoReducido ? 0 : 500;

    temporizadorMensaje = window.setTimeout(function () {
        // Desvanecer la frase inferior y los tres textos superiores.
        progresoEstrellas.classList.add("desvaneciendo");
        contenidoEstrellas.classList.add("textos-desvaneciendo");

        temporizadorTransicion = window.setTimeout(function () {
            iniciarFormacionCorazon();
        }, duracion);
    }, espera);
});

/* ========================================
   FORMAR EL CORAZÓN LUMINOSO
======================================== */

function iniciarFormacionCorazon() {
    if (sorpresaIniciada) {
        return;
    }

    sorpresaIniciada = true;

    botonesEstrellas.forEach(function (estrella) {
        estrella.classList.remove("activa");
        estrella.disabled = true;
    });

    constelacion.classList.add("formando-corazon");


    // Esperar a que las estrellas terminen de moverse.
    window.requestAnimationFrame(function () {
        const animaciones = Array.from(botonesEstrellas).flatMap(
            function (estrella) {
                return estrella.getAnimations();
            }
        );

        Promise.allSettled(
            animaciones.map(function (animacion) {
                return animacion.finished;
            })
        ).then(function () {
            window.requestAnimationFrame(function () {
                if (!sorpresaIniciada) {
                    return;
                }

                dibujarLineasCorazon();
            });
        });
    });
}

/* ========================================
   DIBUJAR LAS LÍNEAS DEL CORAZÓN
======================================== */

function dibujarLineasCorazon() {
    const trazo = document.getElementById("trazo-corazon");
    const cajaConstelacion = constelacion.getBoundingClientRect();

    const ancho = cajaConstelacion.width;
    const alto = cajaConstelacion.height;

    lineasCorazon.setAttribute("viewBox", `0 0 ${ancho} ${alto}`);

    function obtenerPunto(numero) {
        const estrella = document.querySelector(`.estrella-${numero}`);
        const caja = estrella.getBoundingClientRect();

        return {
            x: caja.left - cajaConstelacion.left + caja.width / 2,
            y: caja.top - cajaConstelacion.top + caja.height / 2
        };
    }

    const [a, b, c, d, e, f] = [1, 2, 3, 4, 5, 6].map(obtenerPunto);
    const escala = (e.x - c.x) / 2;

    // Mantener las mismas curvas y proporciones del corazón original.
    const recorrido = [
        `M ${a.x} ${a.y}`,

        `C ${a.x - escala * 0.18} ${a.y - escala * 0.26}
           ${b.x + escala * 0.24} ${b.y}
           ${b.x} ${b.y}`,

        `C ${b.x - escala * 0.31} ${b.y}
           ${c.x - escala * 0.27} ${c.y - escala * 0.22}
           ${c.x} ${c.y}`,

        `Q ${(c.x + d.x) / 2 - escala * 0.12} ${(c.y + d.y) / 2}
           ${d.x} ${d.y}`,

        `Q ${(d.x + e.x) / 2 + escala * 0.12} ${(d.y + e.y) / 2}
           ${e.x} ${e.y}`,

        `C ${e.x + escala * 0.27} ${e.y - escala * 0.22}
           ${f.x + escala * 0.31} ${f.y}
           ${f.x} ${f.y}`,

        `C ${f.x - escala * 0.24} ${f.y}
           ${a.x + escala * 0.18} ${a.y - escala * 0.26}
           ${a.x} ${a.y}`,

        "Z"
    ].join(" ");

    trazo.setAttribute("d", recorrido);

    const longitud = trazo.getTotalLength();
    trazo.style.setProperty("--longitud-corazon", `${longitud}px`);

    lineasCorazon.removeAttribute("hidden");

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    temporizadorInvitacion = window.setTimeout(function () {
        if (!sorpresaIniciada) {
            return;
        }

        // Sustituir y mostrar los textos superiores.
        encabezadoEstrellas.textContent = "Una sorpresa entre estrellas";
        tituloEstrellas.textContent = "Y juntas formaron algo especial";
        descripcionEstrellas.textContent =
            "Una pequeña forma de decirte lo mucho que me importas.";

        contenidoEstrellas.classList.remove("textos-desvaneciendo");
        contenidoEstrellas.classList.add("textos-corazon");

        // Mostrar la invitación inferior.
        progresoEstrellas.textContent =
            "Y todavía hay algo que quisiera decirte...";
        progresoEstrellas.classList.remove("desvaneciendo");
        progresoEstrellas.classList.add("invitacion-final");
        progresoEstrellas.disabled = false;
    }, movimientoReducido ? 0 : 3000);
}

/* ========================================
   VOLVER A MIRAR LAS ESTRELLAS
======================================== */

function reiniciarEstrellas() {
    sorpresaIniciada = false;

    window.clearTimeout(temporizadorMensaje);
    window.clearTimeout(temporizadorTransicion);
    window.clearTimeout(temporizadorInvitacion);

    contenidoEstrellas.classList.remove(
        "textos-corazon",
        "textos-desvaneciendo"
    );

    encabezadoEstrellas.textContent = "Un cielo lleno de pequeños secretos";
    tituloEstrellas.textContent = "Cada estrella guarda algo para ti";
    descripcionEstrellas.textContent =
        "Toca las estrellas que más brillan y descubre lo que esconden.";

    progresoEstrellas.classList.remove("invitacion-final", "desvaneciendo");
    progresoEstrellas.disabled = true;
    progresoEstrellas.hidden = false;

    botonFinalDesbloqueado = false;

    constelacion.classList.remove("formando-corazon");
    lineasCorazon.setAttribute("hidden", "");

    estrellasDescubiertas.clear();

    botonesEstrellas.forEach(function (estrella) {
        estrella.classList.remove("descubierta", "activa");
        estrella.disabled = false;
    });

    numeroEstrella.textContent = "Un pequeño secreto";
    textoEstrella.textContent =
        "Hay palabras que brillan más cuando son para alguien especial.";
    progresoEstrellas.textContent =
        "Hay 6 pequeños secretos esperando por ti";

    escenaInicio.hidden = true;
    escenaEstrellas.hidden = false;
    window.scrollTo(0, 0);
}

/* ========================================
   CERRAR EL MODAL DE LAS ESTRELLAS
======================================== */

cerrarModalEstrella.addEventListener("click", function () {
    modalEstrella.close();
});

modalEstrella.addEventListener("click", function (evento) {
    if (evento.target === modalEstrella) {
        modalEstrella.close();
    }
});

/* ========================================
   ABRIR Y CERRAR LA DEDICATORIA FINAL
======================================== */

progresoEstrellas.addEventListener("click", function () {
    if (
        !sorpresaIniciada ||
        progresoEstrellas.disabled ||
        modalDedicatoria.open
    ) {
        return;
    }

    modalDedicatoria.showModal();
});

cerrarModalDedicatoria.addEventListener("click", function () {
    modalDedicatoria.close();
});

botonRepetirModal.addEventListener("click", function () {
    modalDedicatoria.close();
    reiniciarEstrellas();
});
