function createProduct(){

    let product={};

    product.id=document.getElementById("id").value;
    product.title=document.getElementById("name").value;
    product.description=document.getElementById("description").value;
    product.price=document.getElementById("price").value;
    product.rating=document.getElementById("rating").value;
    product.type=document.getElementById("type").value;

    console.log(product);

    fetch("http://localhost:3000/product",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product),
        
      
    })
    .then((response)=>response.json())
    .then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })    




}