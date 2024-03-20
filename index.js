// Función para crear el contenido del modal
function createModalContent() {
    // Creamos el contenido del modal
    var modalContent = document.createElement('div');
    modalContent.className = 'modal-content';

    // Añadimos el botón para cerrar el modal
    var closeButton = document.createElement('span');
    closeButton.className = 'close';
    closeButton.id = 'closeButton'; // Identificador único para el botón de cerrar
    closeButton.innerHTML = '&times;';
    closeButton.onclick = closeModal;
    modalContent.appendChild(closeButton);

    // Creamos el formulario
    var form = document.createElement('form');
    form.onsubmit = submitForm;

    // Agregamos campos al formulario
    var fields = ['ID', 'Nombre', 'Carrera', 'Laboratorio', 'Fecha'];
    fields.forEach(function(field) {
        var label = document.createElement('label');
        label.innerHTML = field + ':';
        form.appendChild(label);

        if (field === 'Fecha') {
            // Campo de entrada para la fecha y la hora
            var input = document.createElement('input');
            input.type = 'datetime-local';
            input.name = field.toLowerCase();

            // Establecer la fecha y hora mínima como la actual
            var currentDate = new Date().toISOString().slice(0,16);
            input.min = currentDate;

            form.appendChild(input);
        } else {
            // Campo de entrada normal
            var input = document.createElement('input');
            input.type = 'text';
            input.name = field.toLowerCase();
            form.appendChild(input);
        }

        form.appendChild(document.createElement('br'));
        form.appendChild(document.createElement('br'));
    });

    // Agregamos botón para enviar formulario
    var submitButton = document.createElement('input');
    submitButton.type = 'submit';
    submitButton.value = 'Agregar';
    form.appendChild(submitButton);

    modalContent.appendChild(form);

    return modalContent;
}

// Función para abrir el modal
function openModal() {
    // Creamos el elemento modal si no existe
    var modal = document.getElementById('modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal';
        document.body.appendChild(modal);
    }

    // Mostramos el modal y el fondo oscurecido
    modal.style.display = 'block';
    overlay.style.display = 'block';

    // Creamos el contenido del modal
    var modalContent = createModalContent();

    // Vaciamos el contenido actual del modal y añadimos el nuevo contenido
    modal.innerHTML = '';
    modal.appendChild(modalContent);
}

// Función para cerrar el modal
function closeModal() {
    var modal = document.getElementById('modal');
    modal.style.display = 'none';
    overlay.style.display = 'none';
}

// Event listener para el botón "Agregar Reserva"
document.querySelector('main .btn-agregar').addEventListener('click', openModal);

// Obtener el fondo oscurecido
var overlay = document.querySelector('.overlay');

// Evitar la propagación del clic dentro del modal y cerrar el modal solo al hacer clic en el botón de cerrar
document.getElementById('modal').addEventListener('click', function(event) {
    if (event.target === this) { // Verifica si el clic se realizó en el área sombreada
        closeModal();
    }
});

// Evitar la propagación del clic dentro del modal
document.querySelector('.modal-content').addEventListener('click', function(event) {
    event.stopPropagation(); // Evita que el clic dentro del modal se propague al fondo sombreado
});

// Función para enviar el formulario
function submitForm(event) {
    event.preventDefault(); // Evita que se envíe el formulario por defecto
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
}
