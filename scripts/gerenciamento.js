document.addEventListener("DOMContentLoaded", async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        window.location.href = "login.html";
    }

    welcomeMessage(user);
    await getAllDocuments();

    document
        .querySelector("#input-file")
        .addEventListener("change", handleFileSelect);
});

function welcomeMessage(user) {
    const p = document.createElement("p");
    p.classList.add("header-username");
    p.textContent = `Bem-vindo, ${user.name}`;
    document.querySelector(".header__container").appendChild(p);
}

function handleFileSelect(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;

    const fileType = selectedFile.type;
    if (!fileType.startsWith("image/")) {
        notfie.alert("Por favor, selecione um arquivo de imagem.");
        return;
    }

    uploadImage(selectedFile);

    const cardContainer = document.querySelector(".cards__container");

    const card = documentCard(selectedFile);
    cardContainer.appendChild(card);
}

function uploadImage(selectedFile) {
    if (!selectedFile) return;

    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("http://localhost:3000/upload-doc", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: formData,
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error("token not found");
            }
            response.json();
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.error(error);
            if (
                error.message === "token not found" ||
                error.message === "invalid token"
            ) {
                window.location.href = "login.html";
            }
        });
}

async function getAllDocuments() {
    const token = localStorage.getItem("token");
    if (!token) {
        window.location.href = "login.html";
        return;
    }

    fetch("http://localhost:3000/get-docs", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => response.json())
        .then((data) => {
            console.log("get docs");
            renderDocuments(data.docs);
        })
        .catch((error) => {
            console.error(error);
            if (
                error.message === "token not found" ||
                error.message === "invalid token"
            ) {
                window.location.href = "login.html";
            }
        });
}

function renderDocuments(documents) {
    if (!documents) return;

    const cardContainer = document.querySelector(".cards__container");

    documents.forEach((document) => {
        const card = documentCard(document);
        cardContainer.appendChild(card);
    });
}

function documentCard(document) {
    const img = window.document.createElement("img");
    img.src = document.image || URL.createObjectURL(document);
    img.classList.add("image_preview");

    const card = window.document.createElement("div");
    const title = window.document.createElement("h3");
    const p = window.document.createElement("p");

    title.textContent = document.name;
    // p.textContent = formartDate(document.createdAt);
    card.classList.add("card");

    card.appendChild(img);
    card.appendChild(title);
    // card.appendChild(p);

    return card;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "login.html";
}

// function formartDate(date) {
//     if (!date) {
//         date = new Date();
//     }

//     date = new Date(date);

//     return Intl.DateTimeFormat("PT-BR", {
//         dateStyle: "short",
//     }).format(date);
// }
