//to fetch all products

fetch("http://localhost:3000/products")
.then((response)=>response.json())
.then((products)=>{
    

    

    let productsString="";

    products.forEach((product) => {

        let ratingString="";
        let avgRating=product.rating/product.rating_count;
        for(let i=1;i<=5;i++)
        {
            if(i<avgRating){
                ratingString+=`<img src="images/activestar.png" width="20px"/>`;
            }
            else{
                ratingString+=`<img src="images/graystar.png" width="20px"/>`;
            }
        }

        productsString+=`
        <div class="card productcard" style="width: 18rem;" >
        <div class="card-body">
        <div style="margin-bottom:30px">
        <h5 class="card-title" style="font-size:50px; text-align:center">${product.emoji}${product.emoji}${product.emoji}</h5>
        </div>
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price : ${product.price}</li>
          <li class="list-group-item">${ratingString}</li>
          
        </ul>
        <div class="card-body">
        <a href="product.html?id=${product.id}" class="card-link btn btn-success">View</a>
         
        </div>
      </div>`;

    });

    // deleted <li class="list-group-item">Type : ${product.type}</li> from productstring


    document.getElementById('product_container').innerHTML=productsString;


})


function getSingleProduct(id){

    fetch("http://localhost:3000/product?id="+id)
    .then((response)=>response.json())
    .then((product)=>{
        console.log(product);
    })

}




