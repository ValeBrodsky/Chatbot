var data = {
    chatinit: {
        title: [
            "Hello <span class='emoji'> &#128075;</span>",
            "I'm Sigmoid, the company's conversational assistant",
            "How can I help you?"
        ],
        options: [
            { label: "Opening hours <span class='emoji'> &#128250;</span>", key: "horarios" },
            { label: "Payment methods", key: "metodos_pago" },
            { label: "Addresses <span class='emoji'> &#128090;</span>", key: "direcciones" },
            { label: "Technical issues <span class='emoji'> &#127925;</span>", key: "problemas" }
        ]
    },
    horarios: {
        title: ["Here are our opening hours:"],
        options: ["Monday to Friday: 8:30 AM - 12:30 PM and 4:00 PM - 7:30 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Closed"],
        url: {}
    },
    metodos_pago: {
        title: ["These are our accepted payment methods:"],
        options: ["Credit and debit cards", "Bank transfer", "Cash payments"],
        url: {}
    },
    direcciones: {
        title: ["Find us at the following locations:"],
        options: ["My address1 - Neighborhood", "My address2 - Neighborhood"],
        url: {
            link: ["https://maps.app.goo.gl/CvBvnYPuE436MaCR9", "https://maps.app.goo.gl/CvBvnYPuE436MaCR9"]
        }
    },
    problemas: {
        title: ["Select a type of technical issue:"],
        options: ["I didn't receive my purchase receipt by email", "I don't know how to shop on the website", "I need to speak with a human operator"],
        url: {
            link: [
                "https://api.whatsapp.com/send?phone=543515156523&text=Hello,%20I%20didn't%20receive%20my%20purchase%20receipt",
                "https://api.whatsapp.com/send?phone=543515156523&text=Hello,%20I%20need%20help%20shopping%20on%20the%20website",
                "https://api.whatsapp.com/send?phone=543515156523&text=Hello,%20I%20want%20to%20speak%20with%20an%20operator"
            ]
        }
    }
};


document.getElementById("init").addEventListener("click", showChatBot);
var cbot = document.getElementById("chat-box");
var len1 = data.chatinit.title.length;

function showChatBot() {
    console.log(this.innerText);
    if (this.innerText === "Start conversation") {
        document.getElementById("test").style.display = "block";
        document.getElementById("init").innerText = "End conversation";
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
