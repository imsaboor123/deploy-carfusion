const profile_form = document.getElementById('profile_form');
const addcar_form = document.getElementById('addcar_form');
const addblog_form = document.getElementById('addblog_form');
const delete_product_btn = document.getElementById('delete_product');
const delete_post_btn = document.getElementById('delete_post');


profile_form.addEventListener('submit', async event => {
    event.preventDefault();

    const data = {
        first_name: event.target.first_name.value,
        last_name: event.target.last_name.value,
        email: event.target.email.value,
        phone: event.target.phone.value,
        password: event.target.password.value
    }

    const options = {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    const response = await api.put(`http://localhost:3000/auth/update/${event.target.userId.value}`, options);

    if (response.message) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
            hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
        }).then(() => {
            location.reload();
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
});


if (delete_product_btn) {
    delete_product_btn.addEventListener('click', async () => {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
    
        const productId = delete_product_btn.getAttribute('data-id');
        const response = await api.delete(`http://localhost:3000/api/v1/product/${productId}`, options);
    
        if (response.message) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: response.message,
                showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
                hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
            }).then(() => {
                location.reload();
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
}


if (delete_post_btn) {
    delete_post_btn.addEventListener('click', async () => {
        const options = {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        };
    
        const postId = delete_post_btn.getAttribute('data-id');
        const response = await api.delete(`http://localhost:3000/api/v1/blog/${postId}`, options);
    
        if (response.message) {
            Swal.fire({
                icon: "success",
                title: "Success",
                text: response.message,
                showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
                hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
            }).then(() => {
                location.reload();
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
}



addcar_form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(addcar_form);
    const options = { method: 'POST', body: data };
    const response = await api.post('/api/v1/product', options);
    if (response.message) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
            hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
        }).then(() => {
            location.reload();
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
});



addblog_form.addEventListener('submit', async event => {
    event.preventDefault();
    const data = new FormData(addblog_form);
    const options = { method: 'POST', body: data };
    const response = await api.post('/api/v1/blog', options);
    if (response.message) {
        Swal.fire({
            icon: "success",
            title: "Success",
            text: response.message,
            showClass: { popup: `animate__animated animate__fadeInUp animate__faster` },
            hideClass: { popup: `animate__animated animate__fadeOutDown animate__faster` }
        }).then(() => {
            location.reload();
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
});