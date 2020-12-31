let url=location.href;
let id=url.split("?")[1].split("=")[1];

fetch("http://localhost:3000/product?id="+id)
.then((response)=>response.json())
.then((product)=>{

    console.log(product);
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
    
    document.getElementById("productname").innerText=product.title;

    let productString=`
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Price : &#8377; ${product.price}</li>
            <li class="list-group-item">${ratingString}</li>
            <li class="list-group-item">Type : ${product.type}</li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link btn btn-success">Update</a>
        <a href="#" class="card-link btn btn-danger" onclick="deleteProduct()">Delete</a>
        </div>
    `;

    document.getElementById("product").innerHTML=productString;




})



function deleteProduct(){
    fetch("http://localhost:3000/product?id="+id,{
        method:"DELETE"
    })
    .then((response)=>response.json())
    .then((data)=>{
        
        document.getElementById("message").innerHTML=
        `<p class="alert alert-success">${data.message}</p>`;

        document.getElementById("productname").style.display="none";
        document.getElementById("product").style.display="none";


        setTimeout(()=>{
            location="index.html";
        },3000)



    })
}

