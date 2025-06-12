let inputNombre = document.querySelector('#InputNombre')
let inputEdad = document.querySelector('#InputEdad')
let inputSintoma = document.querySelector('#TextTareaSintomaPrincipal')
let btnAgragar = document.querySelector('#btnAgregar')
let tbody = document.querySelector('#tbody')
let btnSiguiente = document.querySelector('#btnSiguiente')
let PacienteActual = document.querySelector('#PacienteActual')
let Descripcion = document.querySelector('#Descripcion')
let InputSiguiente = document.querySelector('#InputSiguiente')

// InputSiguiente.value='Hola'


const tiempo = () => {
    const date = new Date();
    const [hour, minutes, seconds] = [
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
    ];

    return `${hour}: ${minutes}: ${seconds}`
}


class Node {
    constructor(Nombre, Edad, Sintoma) {
        this.Nombre = Nombre
        this.Edad = Edad
        this.Sintoma = Sintoma
        this.hora = tiempo()
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }

    enqueue(Nombre, Edad, Sintoma) {//agrega un elemento al final
        const newNode = new Node(Nombre, Edad, Sintoma);

        if (this.length === 0) {
            this.first = newNode;
            this.last = newNode;
        } else {
            this.last.next = newNode;
            this.last = newNode;
        }
        this.length++;

        return this;
    }

    dequeue() {
        if (!this.first) {//Si esta vacio retornamos null
            return;
        }

        if (this.first === this.last) {//Si solo hay un elemento en el nodo, tenemos que cambiar el valor del ultimo que llego 
            this.last = null;
        }
        this.first = this.first.next;
        this.length--;
        console.log(this.length, 'soy el largo')
        if (this.length == 1) {
            console.log(this.length, 'soy el largo2')
            InputSiguiente.value = ''
        } else {
            InputSiguiente.value = `Proximo turno: ${this.first.next.Nombre}`
        }

        myQueue.peek()//Pinto lo de el div (TurnoActual)
        myQueue.printQueue()

    }

    peek() {

        speak(this.first.Nombre)

        PacienteActual.textContent = this.first.Nombre
        Descripcion.textContent = `${this.first.Edad} años-${this.first.Sintoma}`

        return this.first;

    }

    isEmpty() {
        if (this.length == 0) {
            return true
        } else {
            return false
        }
    }

    printQueue() {//Historial completo
        let actualNodo = this.first.next
        let index = 1
        let html = ''

        while (actualNodo != null) {

            html +=
                `<tr>
                    <td>${index}</th>
                    <td>${actualNodo.Nombre}</td>
                    <td>${actualNodo.Sintoma}</td>
                    <td>${actualNodo.hora}</td>
                </tr>`

            actualNodo = actualNodo.next
            index++

        }

        PacienteActual.textContent = this.first.Nombre
        Descripcion.textContent = `${this.first.Edad} años-${this.first.Sintoma}`
        if (this.length > 1) {
            InputSiguiente.value = `Proximo turno: ${this.first.next.Nombre}`
        }
        tbody.innerHTML = ''
        tbody.innerHTML = html

    }
}

const myQueue = new Queue();

btnAgragar.addEventListener('click', (event) => {
    event.preventDefault()
    if (inputNombre.value == '' || inputEdad.value == '' || inputSintoma.value == '') {
        alert('Tienes que llenar todos los campos')
    } else {
        myQueue.enqueue(inputNombre.value, inputEdad.value, inputSintoma.value)
        inputNombre.value=''
        inputEdad.value=''
        inputSintoma.value=''
    }

    myQueue.printQueue()

})

btnSiguiente.addEventListener('click', () => {
    myQueue.dequeue()
})

function speak(nombre) {
    const utterance = new SpeechSynthesisUtterance(`Es turno de ${nombre}`);
    const voices = speechSynthesis.getVoices();
    utterance.voice = voices[0];
    speechSynthesis.speak(utterance);
}

