
const formulaire = document.getElementById("clientForm");
const liste = document.getElementById("clients");
const message = document.getElementById("message");

const API = "/api/clients";

async function chargerClients() {
    try {
        const reponse = await fetch(API);

        if (!reponse.ok) {
            throw new Error("Erreur de chargement");
        }

        const clients = await reponse.json();
        liste.innerHTML = "";

        if (clients.length === 0) {
            liste.textContent = "Aucun client enregistré.";
            return;
        }

        clients.forEach(client => {
            const bloc = document.createElement("div");
            bloc.className = "client";

            const nom = document.createElement("h3");
            nom.textContent = client.nom;

            const email = document.createElement("p");
            email.textContent = client.email;

            const telephone = document.createElement("p");
            telephone.textContent = client.telephone || "-";

            const supprimer = document.createElement("button");
            supprimer.textContent = "Supprimer";
            supprimer.className = "supprimer";

            supprimer.addEventListener("click", async () => {
                if (!confirm("Supprimer ce client ?")) return;

                const resultat = await fetch(API + "/" + client._id, {
                    method: "DELETE"
                });

                if (resultat.ok) {
                    chargerClients();
                } else {
                    message.textContent = "Erreur de suppression.";
                }
            });

            bloc.append(nom, email, telephone, supprimer);
            liste.appendChild(bloc);
        });
    } catch (erreur) {
        liste.textContent = "Impossible de charger les clients.";
    }
}

formulaire.addEventListener("submit", async event => {
    event.preventDefault();

    const nom = document.getElementById("nom").value.trim();
    const email = document.getElementById("email").value.trim();
    const telephone = document.getElementById("telephone").value.trim();

    try {
        const reponse = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nom, email, telephone })
        });

        const resultat = await reponse.json();

        if (!reponse.ok) {
            throw new Error(resultat.message);
        }

        message.textContent = "Client ajouté !";
        formulaire.reset();
        chargerClients();
    } catch (erreur) {
        message.textContent = erreur.message;
    }
});

chargerClients();
