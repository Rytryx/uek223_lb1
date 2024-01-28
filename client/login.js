document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM vollständig geladen und analysiert");

    const loginForm = document.getElementById("loginForm");
    if (!loginForm) {
        console.log("Login-Formular nicht gefunden");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        console.log("Formular-Submit-Event ausgelöst");
        event.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        console.log("Username:", username);
        console.log("Password:", password);

        const loginData = {
            username: username,
            password: password
        };

        try {
            console.log("Sende Login-Anfrage...");
            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(loginData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Login erfolgreich. Token:", data.token);
                localStorage.setItem('token', data.token);
                window.location.href = 'homepage.html';
            } else {
                console.log("Login-Anfrage fehlgeschlagen, Antwort erhalten");
                const errorData = await response.json();
                console.error("Login fehlgeschlagen:", errorData.message);
            }
        } catch (error) {
            console.error("Fehler bei der Anmeldung:", error);
        }
    });

    function openTab(event, tabName) {
        var tabcontent = document.getElementsByClassName("tabcontent");
        for (var i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
    
        var tablinks = document.getElementsByClassName("tablinks");
        for (var i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
    
        document.getElementById(tabName).style.display = "block";
        event.currentTarget.className += " active";
    }
});
