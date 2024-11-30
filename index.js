var data = {
    chatinit: {
        title: [
            "Hola <span class='emoji'> &#128075;</span>",
            "Soy Sigmoid, el asistente conversacional de la empresa",
            "¿Cómo puedo ayudarte?"
        ],
        options: [
            { label: "Horarios de atención <span class='emoji'> &#128250;</span>", key: "horarios" },
            { label: "Métodos de pago", key: "metodos_pago" },
            { label: "Direcciones <span class='emoji'> &#128090;</span>", key: "direcciones" },
            { label: "Problemas técnicos <span class='emoji'> &#127925;</span>", key: "problemas" }
        ]
    },
    horarios: {
        title: ["Aquí están nuestros horarios de atención:"],
        options: ["Lunes a Viernes: 8:30 - 12:30 y de 16:00 a 19:30hs ", "Sábados: 9:00 - 13:00hs", "Domingos: Cerrado"],
        url: {}
    },
    metodos_pago: {
        title: ["Estos son nuestros métodos de pago aceptados:"],
        options: ["Tarjetas de crédito y débito", "Transferencia bancaria", "Pagos en efectivo"],
        url: {}
    },
    direcciones: {
        title: ["Encuéntranos en las siguientes ubicaciones:"],
        options: ["Juan Antonio Lavalleja 2455 - Alta Córdoba", "Av. Colón 2660 - Alto Alberdi"],
        url: {
            link: ["https://maps.app.goo.gl/5ZJeojBRLpcZQAse8", "https://maps.app.goo.gl/xe2jfqbJ29LYgYjM7"]
        }
    },
    problemas: {
        title: ["Selecciona un tipo de problema técnico:"],
        options: ["No recibí el comprobante de mi compra por email", "No sé cómo comprar por la web", "Necesito hablar con un operador humano"],
        url: {
            link: [
                "https://api.whatsapp.com/send?phone=543515301676&text=Hola,%20no%20recibí%20el%20comprobante%20de%20mi%20compra",
                "https://api.whatsapp.com/send?phone=543515301676&text=Hola,%20necesito%20ayuda%20para%20comprar%20por%20la%20web",
                "https://api.whatsapp.com/send?phone=543515301676&text=Hola,%20quiero%20hablar%20con%20un%20operador"
            ]
        }
    }
};

document.getElementById("init").addEventListener("click", showChatBot);
var cbot = document.getElementById("chat-box");
var len1 = data.chatinit.title.length;

function showChatBot() {
    console.log(this.innerText);
    if (this.innerText === "Iniciar conversación") {
        document.getElementById("test").style.display = "block";
        document.getElementById("init").innerText = "Terminar conversación";
        initChat();
    } else {
        location.reload();
    }
}

function initChat() {
    let j = 0; // Declaramos j dentro de la función
    cbot.innerHTML = "";
    for (var i = 0; i < len1; i++) {
        setTimeout(() => handleChat(j++), i * 500); // Incrementamos j directamente
    }
    setTimeout(function () {
        showOptions(data.chatinit.options);
    }, (len1 + 1) * 500);
}


function handleChat(j) {
    var elm = document.createElement("p");
    elm.innerHTML = data.chatinit.title[j];
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
    handleScroll();
}


function showOptions(options) {
    options.forEach(option => {
        var opt = document.createElement("span");
        var inp = `<div data-key="${option.key}">${option.label}</div>`;
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        opt.addEventListener("click", handleOpt);
        cbot.appendChild(opt);
        handleScroll();
    });
}

function handleOpt() {
    var key = this.querySelector("div").getAttribute("data-key");
    document.querySelectorAll(".opt").forEach(el => {
        el.remove();
    });

    var elm = document.createElement("p");
    elm.setAttribute("class", "test");
    var sp = `<span class="rep">${this.innerText}</span>`;
    elm.innerHTML = sp;
    cbot.appendChild(elm);

    var tempObj = data[key];
    if (tempObj) {
        handleResults(tempObj.title, tempObj.options, tempObj.url);
    } else {
        console.error("No data found for key:", key);
    }
}

function handleDelay(title) {
    var elm = document.createElement("p");
    elm.innerHTML = title;
    elm.setAttribute("class", "msg");
    cbot.appendChild(elm);
}

function handleResults(title, options, url) {
    title.forEach((line, i) => {
        setTimeout(() => handleDelay(line), i * 500);
    });

    const isObjectEmpty = obj => JSON.stringify(obj) === "{}";

    setTimeout(() => {
        if (isObjectEmpty(url)) {
            showOptions(options.map(opt => ({ label: opt, key: null })));
        } else {
            handleLinks(options, url);
        }
    }, title.length * 500);
}

function handleLinks(options, url) {
    options.forEach((option, i) => {
        var opt = document.createElement("span");
        var inp = `<a class="m-link" href="${url.link[i]}" target="_blank">${option}</a>`;
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt");
        cbot.appendChild(opt);
    });

    if (url.more) {
        var opt = document.createElement("span");
        var inp = `<a class="m-link" href="${url.more}" target="_blank">Ver más</a>`;
        opt.innerHTML = inp;
        opt.setAttribute("class", "opt link");
        cbot.appendChild(opt);
    }
    handleScroll();
}

function handleScroll() {
    var elem = document.getElementById("chat-box");
    elem.scrollTop = elem.scrollHeight;
}
