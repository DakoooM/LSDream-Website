const randomChoice = [
    "Rejoignez-nous dans un monde qui est le votre.", 
    "Vivez dans un monde parallèle.",
    "Devenez qui vous souhaitez être."
]

setInterval(() => {
    const textChange = document.getElementById("changeTextHome");
    if (textChange == null || textChange == undefined) 
        return

    var random = randomChoice[Math.floor(Math.random() * randomChoice.length)];
    textChange.innerHTML = random;
}, 5000)

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();e.stopPropagation();
});

document.addEventListener('copy', (e) => {
    e.preventDefault();e.stopPropagation()
});
    
document.addEventListener('cut', (e) => {
    e.preventDefault();e.stopPropagation();
});


// Thx >> https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
const checkMail = (mail) => {
    return String(mail).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const sendWebhook = (discordLink, content) => {
    var http = new XMLHttpRequest();
    http.open('POST', discordLink, true);
    http.setRequestHeader('Content-type', 'application/json');

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText + "Veuillez contactez un administrateur en lui envoyez une image de cette notification");
        }
    }
    http.send(JSON.stringify(content));
}

const getTime = () => {
    let today = new Date();
    let date = `${today.getDate()}/${(today.getMonth()+1)}${(() => (today.getMonth()+1) < 10 ? "0" : "")()}/${today.getFullYear()}`;
    let time = today.getHours() + " heures " + today.getMinutes() + " minutes";
    return '・ ' +date+' - '+time+ ' ・';
}

const forms = {
    discord: null, 
    email: null, 
    dob: null, 
    year: null, 
    disponibility: null,
    hourgame: null,
    servergame: null,
    nameRP: null,
    dobRP:null,
    typeRP: null,
    RPBackground: null
}

const webStorage = (Object) => {
    if (Object.type == "get") {
        return localStorage.getItem(Object.name)
    } else if (Object.type == "set") {
        localStorage.setItem(Object.name, Object.value)
    }
}

firstStepVerification = () => {
    const discord = document.getElementById("discord-result").value || "no";
    const email = document.getElementById("email-result").value || "no";
    const dob = document.getElementById("dob-result").value || "no";
    const year = document.getElementById("year-result").value || "no";
    const disponibility = document.getElementById("disponibility-result").value || "no";

    console.log(discord, email, dob, year, disponibility)

    if (discord == "no")
        return alert("LSDream\nVeuillez renseigner votre pseudo discord");

    if (!checkMail(email))
        return alert("LSDream\nVeuillez renseigner une adresse mail dans le bon format")

    if (dob == "no" || dob == "2002-09-02")
        return alert("LSDream\nVeuillez renseigner votre Date de Naissance");

    if (year == "no")
        return alert("LSDream\nVeuillez renseigner votre Age");

    if (disponibility == "no" || disponibility == "Disponibilité") {
        return alert("LSDream\nVeuillez renseigner vos Disponibilité");
    }

    // forms.discord = discord;
    // forms.email = email;
    // forms.dob = dob;
    // forms.year = year;
    // forms.disponibility = disponibility;

    webStorage({type: "set", name: "discord", value: discord})
    webStorage({type: "set", name: "email", value: email})
    webStorage({type: "set", name: "dob", value: dob})
    webStorage({type: "set", name: "year", value: year})
    webStorage({type: "set", name: "disponibility", value: disponibility})

    alert("LSDream\nVous avez réussi.\nVous allez être redirigé vers la dernière étape de la douane");
    window.location.replace("twoStepForms.html");
}

twoStepVerification = () => {
    const hourgame = document.getElementById("hourgame-result").value || "no";
    const servergame = document.getElementById("servergame-result").value || "no";
    const nameRP = document.getElementById("nameLast-result").value || "no";
    const dobRP = document.getElementById("dobrp-result").value || "no";
    const typeRP = document.getElementById("rpWant-result").value || "no";
    const RPBackground = document.getElementById("backgroundRP").value || "no";

    if (hourgame == "no")
        return alert("LSDream\nVeuillez renseigner vos Heure de Jeu sur FiveM");

    if (servergame == "no")
        return alert("LSDream\nVeuillez renseigner les serveur sur lesquels vous avez joué")

    if (nameRP == "no")
        return alert("LSDream\nVeuillez renseigner votre Prénom et Nom RP");

    if (dobRP == "no")
        return alert("LSDream\nVeuillez renseigner votre date de naissance RP");

    if (typeRP == "no") {
        return alert("LSDream\nVeuillez renseigner le type de RP que vous souhaitez faire");
    }

    if (RPBackground == "no")
        return alert("LSDream\nVeuillez renseigner le lien de de votre background (Histoire de votre personnage)");
    
    forms.hourgame = hourgame;
    forms.servergame = servergame;
    forms.nameRP = nameRP;
    forms.dobRP = dobRP;
    forms.typeRP = typeRP;
    forms.RPBackground = RPBackground;
    forms.discord = webStorage({type: "get", name: "discord"});
    forms.email = webStorage({type: "get", name: "email"});
    forms.dob = webStorage({type: "get", name: "dob"});
    forms.year = webStorage({type: "get", name: "year"});
    forms.disponibility = webStorage({type: "get", name: "disponibility"});

    setTimeout(() => {
        sendWebhook("https://discord.com/api/webhooks/905957351637536850/_w4XQqfOh5wZ06nJZGq_AmQ0DGRZbebeMhlZEX_UXVbHvZVxEabgEgO9LkeQ-j_swZw6", {
            "content": `@everyone Nouvelle candidature de ${forms.discord}`,
            "embeds": [
              {
                "title": "Nouvelle Candidature WL",
                "description": `**__Informations IRL__**\n\n**Discord:** ${forms.discord}\n**Email:** ${forms.email}\n**Date de Naissance:** ${forms.dob}\n**Age:** ${forms.year}\n**Disponibilité:** ${forms.disponibility}\n\n**__Informatons RolePlay__**\n\n**Heures de Jeu (FiveM):** ${forms.hourgame}\n**Serveur sur lesquels il a joué:** ${forms.servergame}\n**Nom & Prénom RP:** ${forms.nameRP}\n**Date de naissance RP:** ${forms.dobRP}\n**Type de RP qu'il souhaite faire:** ${forms.typeRP}\n**Background de sont personnage:** ${forms.RPBackground}`,
                "color": 16546565,
                "author": {
                    "name": "LSDream",
                    "url": "https://lsdream.fr",
                    "icon_url": "https://cdn.discordapp.com/attachments/822135702573154324/915461372005986325/Logo_Los_Santos_Dream_v1.png"
                  },
                  "footer": {
                    "text": getTime(),
                    "icon_url": null
                },
                "thumbnail": {
                    "url": "https://media.discordapp.net/attachments/822135702573154324/915461372005986325/Logo_Los_Santos_Dream_v1.png"
                }
              }
            ]
        })
        alert("LSDream\nVous avez envoyé le formulaire a la douane de LSDream.\nUne réponse vous sera apportez par un douanier sur l'application discord");
        window.location.replace("../main.html");
    }, 500)
}