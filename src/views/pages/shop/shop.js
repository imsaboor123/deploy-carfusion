const filter_form = document.getElementById('filter_form');

filter_form.addEventListener('submit', async event => {
    event.preventDefault();
    const { type, year, brand, model, accidented } = event.target;
    const response = await api.get(`/api/v1/product?type=${type.value}&year=${year.value}&brand=${brand.value}&model=${model.value}&accidented=${accidented.value}`);

    let filter_result = "";
    if (response.products.length > 0) {
        response.products.map(product => {
            filter_result += `<div class="col-6 col-md-4 tt-col-item">`;
            filter_result += `<div class="tt-product-02">`;
            filter_result += `<div class="tt-image-box">`;
            filter_result += `<a href="/shop/${product.id}" class="tt-img">`;
            filter_result += `<img src="/product/${product.images[0]}" alt="">`;
            filter_result += `<span class="tt-label-location">`;

            if (product.type === "New") {
                filter_result += `<span class="tt-label-new">`;
                filter_result += `${product.type}`;
                filter_result += `</span>`;
            }

            filter_result += `</span>`;
            filter_result += `<span class="tt-data">Mileage: ${product.mileage}</span>`;
            filter_result += `</a>`;
            filter_result += `</div>`;
            filter_result += `<div class="tt-wrapper-description">`;
            filter_result += `<div class="tt-row-01">`;
            filter_result += `<div class="tt-box-title">`;
            filter_result += `<h2 class="tt-title"><a href="/shop/${product.id}">${product.title}</a></h2>`;
            filter_result += `<div class="tt-description">${product.model} - ${product.year}</div>`;
            filter_result += `</div>`;
            filter_result += `<div class="tt-box-price">`;
            filter_result += `<span class="tt-text">Price:</span>`;
            filter_result += `<span class="tt-price">Rs. ${product.price}</span>`;
            filter_result += `</div>`;
            filter_result += `</div>`;
            filter_result += `<div class="tt-btn">`;
            filter_result += `<a href="/shop/${product.id}" class="tt-btn-moreinfo">more info</a>`;
            filter_result += `</div>`;
            filter_result += `</div>`;
            filter_result += `</div>`;
            filter_result += `</div>`;
        })
    }else{
        filter_result += "<h1 class='text-center'>No Result Found</h1>";
    }

    document.querySelector('#tt-product-listing').innerHTML = filter_result;
})