const api = {
    get: async (url) => {
        const response = await fetch(url);
        if (!response.ok) return { error: "Error While Fetching API" };
        return await response.json();
    },
    post: async (url, options) => {
        const response = await fetch(url, options);
        if (!response.ok) return { error: "Error While Fetching API" };
        return await response.json();
    },
    put: async (url, options) => {
        const response = await fetch(url, options);
        if (!response.ok) return { error: "Error While Fetching API" };
        return await response.json();
    },
    delete: async (url, options) => {
        const response = await fetch(url, options);
        if (!response.ok) return { error: "Error While Fetching API" };
        return await response.json();
    }
}


function truncateDescription(description, maxLength) {
    if (description.length > maxLength) return description.slice(0, maxLength)+'...';
    return description;
}


// document.addEventListener('DOMContentLoaded', async () => {
//     await filter_car();
//     await get_blogs();
//     await get_products();

//     setTimeout(async () => {
//         await total_vehicles();
//     }, 3000);
// })


// // ==================== Before Car Filter ====================
// async function filter_car() {
//     if (document.querySelector('.year_wrapper')) {
//         const response = await api.get('/api/v1/product');

//         let year = "";
//         let brand = "";
//         let model = "";

//         year += `<option disabled selected>Year</option>`;
//         brand += `<option disabled selected>Brand</option>`;
//         model += `<option disabled selected>Model</option>`;

//         response.products.map(product => {
//             year += `<option value="${product.year}">${product.year}</option>`;
//             brand += `<option value="${product.brand}">${product.brand}</option>`;
//             model += `<option value="${product.model}">${product.model}</option>`;
//         })

//         const year_wrapper = document.querySelectorAll('.year_wrapper');
//         const brand_wrapper = document.querySelectorAll('.brand_wrapper');
//         const model_wrapper = document.querySelectorAll('.model_wrapper');

//         if (year_wrapper.length > 0) {
//             year_wrapper.forEach(years => {
//                 years.innerHTML = year
//             })
//         }

//         if (brand_wrapper.length > 0) {
//             brand_wrapper.forEach(brands => {
//                 brands.innerHTML = brand
//             })
//         }

//         if (model_wrapper.length > 0) {
//             model_wrapper.forEach(models => {
//                 models.innerHTML = model
//             })
//         }
//     }
// }


// // ==================== Get Total Number of Vehicles ====================
// async function total_vehicles() {
//     if (document.querySelector('#total_vehicles')) {
//         const response = await api.get('/api/v1/product');
//         document.querySelector('#total_vehicles').setAttribute("data-to", response.products.length);
//         document.querySelector('#total_vehicles').innerHTML = response.products.length;
//     }
// }


// // ==================== Get Blogs ====================
// async function get_blogs() {
//     if (document.querySelector('#blog_wrapper')) {
//         const response = await api.get('/api/v1/blog');
//         let blogs = "";
//         const monthNames = ["Jan", "Feb", "March", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        
//         response.posts.map(post => {
            // blogs += `<div>
            //     <a href="/blog/${post.id}" class="tt-media">
            //         <div class="tt-img">
            //             <img src="/blogpost/${post.thumbnail}" alt="" />
            //         </div>
            //         <div class="tt-layot">
            //             <div class="tt-time">
            //                 <span>${new Date(post.createdAt).getDate()}</span>
            //                 ${monthNames[new Date(post.createdAt).getMonth()]}
            //             </div>
            //             <h3 class="title">${post.title}</h3>
            //             <p>${truncateDescription(post.description, 80)}</p>
            //             <span class="tt-link">read more</span>
            //         </div>
            //     </a>
            // </div>`;
//         })

//         document.querySelector('#blog_wrapper').innerHTML = blogs;
//     }
// }


// // ==================== Get Blogs ====================
// async function get_products() {
//     if (document.querySelector('#tt-product-listing')) {
//         const response = await api.get('/api/v1/product');
//         let products = "";

//         response.products.map(product => {
//             products += `<div class="col-6 col-md-4 tt-col-item">
//                 <div class="tt-product-02">
//                     <div class="tt-image-box">
//                         <a href="/shop/${product.id}" class="tt-img">
//                             <img src="/product/${product.images[0]}" alt="" />
//                             <span class="tt-label-location">
//                                 <span class="tt-label-promo">
//                                     Great Deal!
//                                 </span>
//                             </span>
//                             <span class="tt-data">118,000 miles</span>
//                         </a>
//                         <ul class="tt-icon">
//                             <li><a href="javascript:void(0)" data-toggle="modal" data-target="#modalAddTestDrive" title="TEST-DRIVE" class="tooltip"><i class="icon-testdrive"></i></a></li>
//                             <li><a href="images/product_02/product_02_img_01.jpg" title="GALLERY" class="tooltip tt-btn-zomm"><i class="icon-photo-camera"></i></a></li>
//                         </ul>
//                     </div>
//                     <div class="tt-wrapper-description">
//                         <div class="tt-row-01">
//                             <div class="tt-box-title">
//                                 <h2 class="tt-title"><a href="/shop/abc">2016 Hunday Elentra </a></h2>
//                                 <div class="tt-description">
//                                     SE 4dr Sedan (1.8L 4cyl 6A)
//                                 </div>
//                             </div>
//                             <div class="tt-box-price">
//                                 <span class="tt-text">List:</span>
//                                 <span class="tt-price">$10,295</span>
//                                 <span class="tt-info">Estimated Loan Payment: <span>$192/mo</span></span>
//                             </div>
//                         </div>
//                         <ul class="tt-icon">
//                             <li><a href="javascript:void(0)" data-toggle="modal" data-target="#modalAddTestDrive"><i class="icon-testdrive"></i></a></li>
//                             <li><a href="images/product_02/product_02_img_01.jpg" class="tt-btn-zomm"><i class="icon-photo-camera"></i></a></li>
//                         </ul>
//                         <div class="tt-row-02">
//                             <ul class="tt-add-info">
//                                 <li>
//                                     <span class="col-title">FUEL TYPE:</span>
//                                     <span class="col-designation">Gas</span>
//                                 </li>
//                                 <li>
//                                     <span class="col-title">TRANSMission:</span>
//                                     <span class="col-designation">Automatic</span>
//                                 </li>
//                                 <li>
//                                     <span class="col-title">Color:</span>
//                                     <span class="col-designation">Black</span>
//                                 </li>
//                                 <li>
//                                     <span class="col-title">Drive Type:</span>
//                                     <span class="col-designation">Front Wheel Drive</span>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div class="tt-btn">
//                             <a href="/shop/abc" class="tt-btn-moreinfo">more info</a>
//                         </div>
//                     </div>
//                 </div>
//             </div>`;
//         })

//         document.querySelector('#tt-product-listing').innerHTML = products;
//     }
// }


// // ==================== Add Car ====================
// if (addcar_form) {
//     addcar_form.addEventListener('submit', async event => {
//         event.preventDefault();
//         const data = new FormData(addcar_form);
//         const options = { method: 'POST', body: data };
//         const response = await api.post('/api/v1/product', options);
//         alert(response.message);
//         $('#modalAddYourItem').modal('hide');
//         addcar_form.reset();
//         await filter_car();
//     });
// }


// // ==================== Filter Car ====================
// if (filter_form) {
//     filter_form.addEventListener('submit', async event => {
//         event.preventDefault();
//         const { type, year, brand, model } = event.target;
//         const response = await api.get(`/api/v1/product?type=${type.value}&year=${year.value}&brand=${brand.value}&model=${model.value}`);
    
//         let filter_result = "";
    
//         if (response.products.length > 0) {
//             response.products.map(product => {
//                 filter_result += `<div class="d-flex">`;
//                 filter_result += `<img src="/product/${product.images[0]}" style="width: 100px; height: 100px; object-fit: cover; margin-right: 20px" />`;
//                 filter_result += `<h2><a href="/shop/${product.id}">${product.title}</a></h2>`;
//                 filter_result += `</div>`;
//             })
//         }
    
//         document.querySelector('#filter_result').innerHTML = filter_result;
//     })
// }