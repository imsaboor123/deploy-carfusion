const form = document.getElementById('signup_form');

form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        password: event.target.password.value
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    const response = await api.post('/auth/signup', options);
    if (response.message) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
            hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
        }).then(() => {
            location.assign('/sign-in');
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