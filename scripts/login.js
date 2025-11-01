document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');

    console.log('Script cargado - elementos encontrados:', {
        loginForm: !!loginForm,
        registerForm: !!registerForm,
        showRegisterBtn: !!showRegisterBtn,
        showLoginBtn: !!showLoginBtn
    });

    initializeAdmin();

    showRegisterBtn.addEventListener('click', function() {
        console.log('Mostrar registro');
        loginForm.classList.add('d-none');
        registerForm.classList.remove('d-none');
    });

    showLoginBtn.addEventListener('click', function() {
        console.log('Mostrar login');
        registerForm.classList.add('d-none');
        loginForm.classList.remove('d-none');
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Login form submitted');
        handleLogin();
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Register form submitted');
        handleRegister();
    });

    function initializeAdmin() {
        if (!localStorage.getItem('users')) {
            const adminUser = {
                id: 1,
                email: 'admin@medicalidw.com',
                password: 'admin123',
                name: 'Administrador',
                role: 'admin'
            };
            localStorage.setItem('users', JSON.stringify([adminUser]));
            console.log('Usuario admin creado:', adminUser);
        } else {
            console.log('Usuarios existentes:', JSON.parse(localStorage.getItem('users')));
        }
    }

    function handleLogin() {
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log('Intentando login con:', { email, password });

        if (!email || !password) {
            alert('Por favor, complete todos los campos');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Usuarios en localStorage:', users);

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            console.log('Usuario encontrado:', user);

            sessionStorage.setItem('currentUser', JSON.stringify(user));

            if (user.role === 'admin') {
                console.log('Redirigiendo a admin_dashboard.html');
                window.location.href = '../../pages/admin/admin_dashboard.html';
            } else {
                console.log('Redirigiendo a client_dashboard.html');
                window.location.href = '../../pages/admin/client_dashboard.html';
            }
        } else {
            console.log('Credenciales incorrectas');
            alert('Email o contraseña incorrectos');
        }
    }

    function handleRegister() {
        const name = document.getElementById('regName').value;
        const email = document.getElementById('regEmail').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        const documentId = document.getElementById('regDocument').value;
        const phone = document.getElementById('regPhone').value;
        const acceptTerms = document.getElementById('acceptTerms').checked;

        console.log('Datos de registro:', { 
            name, email, password, confirmPassword, documentId, phone, acceptTerms 
        });

        if (!name || !email || !password || !confirmPassword || !documentId || !phone) {
            alert('Por favor, complete todos los campos');
            return false;
        }

        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return false;
        }

        if (!acceptTerms) {
            alert('Debe aceptar los términos y condiciones');
            return false;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        console.log('Usuarios antes del registro:', users);

        if (users.some(user => user.email === email)) {
            alert('Este email ya se encuentra registrado');
            return false;
        }

        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password,
            document: documentId,
            phone: phone,
            role: 'client'
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Nuevo usuario guardado:', newUser);
        console.log('Todos los usuarios después del registro:', users);

        sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        console.log('Sesión guardada, redirigiendo a client_dashboard.html');
        
        alert('¡Registro exitoso! Redirigiendo...');
        window.location.href = '../../pages/admin/client_dashboard.html';
        
        return true;
    }
});