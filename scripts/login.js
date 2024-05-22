const submitButton = document.querySelector('#submit_btn');
const inputUser = document.querySelector('#input_username');
const inputPassword = document.querySelector('#input_password');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const username = inputUser.value;
    const password = inputPassword.value;
    if (username === '' || password === '') {
        notie.alert({ text: 'Por favor, preencha todos os campos primeiro'});
        return;
    }

    const account = {
        username,
        password
    };

    const res = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    })

    const data = await res.json();

    if (res.status !== 200) {
        notie.alert({
            text: 'Credenciais inválidas',
            type: 3
        })
        return;
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    window.location.href = 'gerenciamento.html';
})