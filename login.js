document.addEventListener('DOMContentLoaded', function () {
    const username = getCookie('username');

    if (!username && window.location.pathname !== "/login.html") {
        window.location.href = "login.html";
    } else if (username && window.location.pathname === "/login.html") {
        //window.location.href = "index.html";
    }
});

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : null;
}

document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = loginForm.elements.username.value;
        const password = loginForm.elements.password.value;

        if (username === "diogo" && password === "atec123") {
            document.cookie = `username=${username}; max-age=${60*60*8}; path=/`;

            window.location.href = "index.html";
        } else {
            alert("Credenciais inválidas. Por favor, tente novamente.");
        }
    });

    

});
