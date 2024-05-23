const submitButton = document.querySelector('#submit_btn');
const inputName = document.querySelector('#input_name');
const inputUsername = document.querySelector('#input_username');
const inputPassword = document.querySelector('#input_password');
const inputConfirmPassword = document.querySelector('#confirm-password');


submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = inputName.value;
    const username = inputUsername.value;
    const password = inputPassword.value;
    const confirmPassword = inputConfirmPassword.value;
    if (name === '' || username === '' || password === '' || confirmPassword === '') {
        notie.alert('Por favor, preencha todos os campos primeiro');
        return;
    }
    if (password !== confirmPassword) {
        notie.alert("As senhas devem ser iguais");
        return;
    }

    const account = {
        name,
        username,
        password
    };

    const res = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(account)
    })
        
    const data = await res.json();
    console.log(data)


    if (res.status !== 200) {
        notie.alert('Erro ao criar conta');
        return;
    }

    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('token', data.token);

    notie.alert('Conta criada com sucesso');
    window.location.href = 'gerenciamento.html';


})