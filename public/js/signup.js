const signup = async event => {
    event.preventDefault();

    const name = document.getElementById("login-user").value.trim();
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (name && email && password) {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, email, password})
        });

        if (response.ok) {
            alert("Signup successful");
            document.location.replace("/");
        } else {
            alert(response.statusText);
        };
    }
};

document
    .getElementById("signup-form")
    .addEventListener("submit",signup);
