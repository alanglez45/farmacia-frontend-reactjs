export function generarFecha() {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const fecha = new Date();

    const fechaCompleta = diasSemana[fecha.getDay()] + ", " + fecha.getDate() + " de " + meses[fecha.getMonth()] + " de " + fecha.getFullYear();
    return fechaCompleta;
}

export const validarEmail = (email) => {
    const regexpEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regexpEmail.test(email)) {
        return true;
    } else {
        return false;
    }

}

export const validarPassword = (password) => {
    const regexpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    if (regexpPassword.test(password)) {
        return true;
    } else {
        return false;
    }
}

export function validarNombre(cadena) {
    const regexpNombre = /^([A-ZÑÁÉÍÓÚ]{1}[a-zñáéíóú]+[\s]*)+$/;
    let correcto = true;

    const campo = cadena.trim();
    if (!regexpNombre.test(campo)) {
        correcto = false;
    }
    return correcto;
}

export function parseJwt(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
};

export function getRole(code) {
    let rol = ''
    switch (code) {
        case import.meta.env.VITE_ADMIN:
            rol = 'Administrador';
            break;
        case import.meta.env.VITE_USER:
            rol = 'Usuario';
            break;
        case import.meta.env.VITE_VISITOR:
            rol = 'Visitante';
            break;

        default:
            break;
    }
    return rol;
}

export function getKindOfRole(code) {
    const rol = getRole(code);
    let tipo = '';
    switch (rol) {
        case 'Administrador':
            tipo = 'ADMIN_ROLE';
            break;
        case 'Visitante':
            tipo = 'VISITOR_ROLE';
            break;
        case 'Usuario':
            tipo = 'USER_ROLE';
            break;
        default:
            break;
    }
    return tipo;
}



/*
const { token } = useAuth();
const { exp } = parseJwt(token);
const [minutos, setMinutos] = useState(0);
const [segundos, setSegundos] = useState(0)
// console.log(exp)

// token en milisegundos
const exp1000 = exp * 1000;
// token en formato fecha
const fechaToken = new Date(exp1000);
// const fechaActual = Date.now();
// console.log('fecha token', fechaToken)


function subtractMinutes(numOfMinutes, date = new Date()) {
    date.setMinutes(date.getMinutes() - numOfMinutes);
    // console.log(expiracionToken - 300000);

    return date;
}
// console.log(subtractMinutes(5, fechaToken))
// console.log(subtractMinutes(5, fechaToken).getTime());

if (Date.now() >= (exp1000 - 300000)) {
    let intervalo = setInterval(function () {

        // Get today's date and time
        let now = Date.now();

        // Find the distance between now and the count down date
        let distance = fechaToken - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result 
        if (Date.now() <= fechaToken) {

            console.log('dias', days, 'horas', hours, 'minutos', minutes, 'segundos', seconds)
        }
        // setMinutos(minutes);
        // setSegundos(segundos);



        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(intervalo);
            console.log('EXPIRED')
        }
    }, 1000);
}
*/