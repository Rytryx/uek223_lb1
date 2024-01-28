document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");

    registerButton.addEventListener("click", async function (event) {
        event.preventDefault();
        console.log("Registrierungsversuch...");

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const registrationData = {
            username: username,
            email: email,
            password: password,
        };

        try {
            console.log("Sende Registrierungsdaten...");
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                console.log("Registrierung erfolgreich!");
                alert("Registrierung erfolgreich!");
                document.getElementById("username").value = '';
                document.getElementById("email").value = '';
                document.getElementById("password").value = '';
            } else {
                const errorData = await response.json();
                console.error("Registrierung fehlgeschlagen:", errorData.message);
                alert("Registrierung fehlgeschlagen: " + errorData.message);
            }
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
            alert("Fehler bei der Registrierung: " + error.message);
        }
    });
});
