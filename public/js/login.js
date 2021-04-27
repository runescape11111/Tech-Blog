const login = async event => {
    event.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if (email && password) {
        const response = await fetch("/api/users/login", {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password})
        });

        if (response.ok) {
            alert("Login successful");
            document.location.replace("/");
        } else {
            alert(response.statusText);
        };
    }
};

document
    .getElementById("login-form")
    .addEventListener("submit",login);
