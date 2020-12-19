
fetch("http://localhost:3000/products")
.then((response)=>response.json())
.then((products)=>{
    

    

    let productsString="";

    products.forEach((product) => {

        let ratingString="";
        for(let i=1;i<=5;i++)
        {
            if(i<=product.rating){
                ratingString+=`<img src="images/activestar.png" width="20px"/>`;
            }
            else{
                ratingString+=`<img src="images/graystar.png" width="20px"/>`;
            }
        }

        productsString+=`
        <div class="card productcard" style="width: 18rem;" >
        <div class="card-body">
          <h5 class="card-title">${product.title}</h5>
          <p class="card-text">${product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Price : ${product.price}</li>
          <li class="list-group-item">${ratingString}</li>
          <li class="list-group-item">Type : ${product.type}</li>
        </ul>
        <div class="card-body">
          <a href="#" class="card-link" onclick="getSingleProduct(${product.id})">View</a>
         
        </div>
      </div>`;

    });


    document.getElementById('product_container').innerHTML=productsString;


})


function getSingleProduct(id){

    fetch("http://localhost:3000/product?id="+id)
    .then((response)=>response.json())
    .then((product)=>{
        console.log(product);
    })

}




