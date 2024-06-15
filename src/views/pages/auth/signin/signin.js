const form = document.getElementById('signin_form');

form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = {
        email: event.target.email.value,
        password: event.target.password.value
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    const response = await api.post('/auth/signin', options);
    if (response.message) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
            hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
        }).then(() => {
            location.assign('/');
        });        
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.error,
            showClass: {popup: `animate__animated animate__fadeInUp animate__faster`},
            hideClass: {popup: `animate__animated animate__fadeOutDown animate__faster`}
        });
    }
})