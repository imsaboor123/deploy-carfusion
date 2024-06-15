const filter_form = document.getElementById('filter_form');


filter_form.addEventListener('submit', async event => {
    event.preventDefault();
    const { type, year, brand, model, accidented } = event.target;
    const response = await api.get(`/api/v1/product?type=${type.value}&year=${year.value}&brand=${brand.value}&model=${model.value}&accidented=${accidented.value}`);

    let filter_result = "";
    if (response.products.length > 0) {
        response.products.map(product => {
            filter_result += `<div class="row align-items-stretch mb-5">`;
            filter_result += `<div class="col-md-2">`;
            filter_result += `<img src="product/${product.images[0]}" style="width: 100%; height: 100%; min-height: 150px; object-fit: cover; object-position: center;" alt="" />`;
            filter_result += `</div>`;
            filter_result += `<div class="col-md-10">`;
            filter_result += `<h2>${product.title} - ${product.model}</h2>`;
            filter_result += `<p style="width: 60%">${truncateDescription(product.description, 150)}</p>`;
            filter_result += `<a href="/shop/${product.id}" class="btn">See More</a>`;
            filter_result += `</div>`;
            filter_result += `</div>`
        })
    }else{
        filter_result += "<h1 class='text-center'>No Result Found</h1>";
    }

    document.querySelector('#filter_result').innerHTML = filter_result;
})
