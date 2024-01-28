document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("loginButton");

    loginButton.addEventListener("click", async function (event) {
        event.preventDefault();

        const username = document.getElementById("loginUsername").value;
        const password = document.getElementById("loginPassword").value;

        const loginData = {
            username: username,
            password: password
        };

        try {
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
            } else {
                const errorData = await response.json();
                console.error("Login fehlgeschlagen:", errorData.message);
            }
        } catch (error) {
            console.error("Fehler bei der Anmeldung:", error);
        }
    });
});