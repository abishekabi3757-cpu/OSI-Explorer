// ===============================
// OSI LAYER DATA
// ===============================

const layers = [
    {
        number: 7,
        name: "Application",
        icon: "🌐",
        color: "#ef4444",
        function: "Provides network services directly to users and applications.",
        protocols: "HTTP, HTTPS, FTP, SMTP, DNS",
        devices: "Gateway",
        pdu: "Data"
    },

    {
        number: 6,
        name: "Presentation",
        icon: "🔐",
        color: "#f97316",
        function: "Handles data translation, encryption and compression.",
        protocols: "SSL/TLS, JPEG, MPEG, ASCII",
        devices: "Gateway",
        pdu: "Data"
    },

    {
        number: 5,
        name: "Session",
        icon: "🔄",
        color: "#eab308",
        function: "Establishes, manages and terminates communication sessions.",
        protocols: "NetBIOS, RPC, PPTP",
        devices: "Gateway",
        pdu: "Data"
    },

    {
        number: 4,
        name: "Transport",
        icon: "🚚",
        color: "#22c55e",
        function: "Provides end-to-end communication and reliable delivery.",
        protocols: "TCP, UDP",
        devices: "Firewall",
        pdu: "Segment / Datagram"
    },

    {
        number: 3,
        name: "Network",
        icon: "🗺️",
        color: "#06b6d4",
        function: "Handles logical addressing and routing of packets.",
        protocols: "IP, ICMP, OSPF",
        devices: "Router",
        pdu: "Packet"
    },

    {
        number: 2,
        name: "Data Link",
        icon: "🔗",
        color: "#3b82f6",
        function: "Provides node-to-node delivery using MAC addresses.",
        protocols: "Ethernet, Wi-Fi, PPP",
        devices: "Switch, Bridge",
        pdu: "Frame"
    },

    {
        number: 1,
        name: "Physical",
        icon: "⚡",
        color: "#8b5cf6",
        function: "Transmits raw binary bits through physical media.",
        protocols: "Ethernet Physical, USB",
        devices: "Hub, Repeater, Cable",
        pdu: "Bits"
    }
];


// ===============================
// DISPLAY LAYERS
// ===============================

const layerList = document.getElementById("layerList");
const layerInfo = document.getElementById("layerInfo");

layers.forEach(layer => {

    const div = document.createElement("div");

    div.className = "layer";

    div.style.background = layer.color;

    div.innerHTML = `
        <span class="layer-number">${layer.number}</span>
        <span class="layer-name">${layer.name}</span>
        <span>${layer.icon}</span>
    `;

    div.onclick = () => showLayer(layer, div);

    layerList.appendChild(div);
});


function showLayer(layer, element) {

    document.querySelectorAll(".layer")
        .forEach(x => x.classList.remove("active"));

    element.classList.add("active");

    layerInfo.innerHTML = `
        <div class="info-icon">${layer.icon}</div>

        <h2>Layer ${layer.number}: ${layer.name}</h2>

        <p>${layer.function}</p>

        <div class="info-item">
            <strong>📡 Protocols</strong>
            ${layer.protocols}
        </div>

        <div class="info-item">
            <strong>🖥️ Devices</strong>
            ${layer.devices}
        </div>

        <div class="info-item">
            <strong>📦 PDU</strong>
            ${layer.pdu}
        </div>
    `;
}


// ===============================
// SCROLL
// ===============================

function scrollToSection(id) {

    document.getElementById(id)
        .scrollIntoView({
            behavior: "smooth"
        });
}


// ===============================
// DARK MODE
// ===============================

const themeBtn = document.getElementById("themeBtn");

themeBtn.onclick = () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
};


// ===============================
// ENCAPSULATION
// ===============================

function startEncapsulation() {

    const packet = document.getElementById("packet");
    const status = document.getElementById("animationStatus");

    packet.style.left = "-100px";

    status.textContent =
        "📦 Encapsulation: Application → Physical";

    let position = 0;

    const animation = setInterval(() => {

        position += 100;

        packet.style.left = position + "px";

        if (position >= 600) {

            clearInterval(animation);

            status.textContent =
                "✅ Data successfully reached Physical Layer.";
        }

    }, 500);
}


// ===============================
// DECAPSULATION
// ===============================

function startDecapsulation() {

    const packet = document.getElementById("packet");
    const status = document.getElementById("animationStatus");

    packet.style.left = "600px";

    status.textContent =
        "🔄 Decapsulation: Physical → Application";

    let position = 600;

    const animation = setInterval(() => {

        position -= 100;

        packet.style.left = position + "px";

        if (position <= 0) {

            clearInterval(animation);

            status.textContent =
                "✅ Data successfully reached Application Layer.";
        }

    }, 500);
}


// ===============================
// QUIZ
// ===============================

const quiz = [

    {
        question: "Which layer is responsible for routing?",
        options: [
            "Application",
            "Transport",
            "Network",
            "Physical"
        ],
        answer: 2
    },

    {
        question: "Which protocol belongs to Transport Layer?",
        options: [
            "HTTP",
            "TCP",
            "IP",
            "Ethernet"
        ],
        answer: 1
    },

    {
        question: "What is the PDU of Data Link Layer?",
        options: [
            "Packet",
            "Segment",
            "Frame",
            "Bits"
        ],
        answer: 2
    },

    {
        question: "Which device mainly works at Network Layer?",
        options: [
            "Hub",
            "Switch",
            "Router",
            "Repeater"
        ],
        answer: 2
    },

    {
        question: "Which is Layer 7 of OSI?",
        options: [
            "Application",
            "Session",
            "Network",
            "Physical"
        ],
        answer: 0
    }

];

let currentQuestion = 0;
let score = 0;

const questionElement =
    document.getElementById("question");

const optionsElement =
    document.getElementById("options");

const nextButton =
    document.getElementById("nextBtn");


function loadQuestion() {

    const q = quiz[currentQuestion];

    document.getElementById("questionNumber")
        .textContent =
        `Question ${currentQuestion + 1}`;

    questionElement.textContent =
        q.question;

    optionsElement.innerHTML = "";

    q.options.forEach((option, index) => {

        const button =
            document.createElement("button");

        button.className = "option";

        button.textContent = option;

        button.onclick = () =>
            selectAnswer(index, button);

        optionsElement.appendChild(button);

    });

    document.getElementById("progressBar")
        .style.width =
        ((currentQuestion) / quiz.length * 100) + "%";
}


function selectAnswer(index, button) {

    const q = quiz[currentQuestion];

    document.querySelectorAll(".option")
        .forEach(btn => btn.disabled = true);

    if (index === q.answer) {

        button.classList.add("correct");

        score++;

        document.getElementById("score")
            .textContent =
            `Score: ${score}`;

    } else {

        button.classList.add("wrong");

        document.querySelectorAll(".option")
            [q.answer].classList.add("correct");
    }
}


function nextQuestion() {

    currentQuestion++;

    if (currentQuestion >= quiz.length) {

        questionElement.textContent =
            `🎉 Quiz Completed!`;

        optionsElement.innerHTML =
            `<h2>Your Score: ${score}/${quiz.length}</h2>`;

        nextButton.style.display = "none";

        document.getElementById("progressBar")
            .style.width = "100%";

        return;
    }

    loadQuestion();
}


loadQuestion();


// ===============================
// MATCH GAME
// ===============================

function checkGame(answer) {

    const result =
        document.getElementById("gameResult");

    if (answer === 3) {

        result.textContent =
            "🎉 Correct! Network Layer uses IP addressing.";

        result.style.color = "green";

    } else {

        result.textContent =
            "❌ Try again! Think about IP addressing.";

        result.style.color = "red";
    }
}