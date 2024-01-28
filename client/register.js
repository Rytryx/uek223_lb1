document.addEventListener("DOMContentLoaded", function () {
    const registerButton = document.getElementById("registerButton");

    registerButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        console.log("Username:", username);
        console.log("Email:", email);
        console.log("Password:", password);

        const registrationData = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Registrierung erfolgreich:", data);
            } else {
                const errorData = await response.json();
                console.error("Registrierung fehlgeschlagen:", errorData);
            }
        } catch (error) {
            console.error("Fehler bei der Registrierung:", error);
        }
    });
});
