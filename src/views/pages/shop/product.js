const bidding_form = document.getElementById('bidding_form');

bidding_form.addEventListener('submit', async event => {
    event.preventDefault();
    
    const data = {
        full_name: event.target.full_name.value,
        email: event.target.email.value,
        productId: event.target.productId.value,
        price: event.target.price.value,
        message: event.target.message.value
    }

    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    };

    const response = await api.post(`http://localhost:3000/api/v1/product/bid`, options);
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