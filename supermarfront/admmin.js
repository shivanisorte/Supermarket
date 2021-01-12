//to fetch all products

fetch("http://localhost:3000/products")
.then((response)=>response.json())
.then((products)=>{
    

    

    let productsString="";

    products.forEach((product,index) => {

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
        <tr>
            <td>${index+1}</td>
             <td>${product.title}</td>
             <td>${product.description}</td>
             <td>${product.price}</td>
             <td>${product.type}</td>
             <td>${product.rating}</td>
             <td>
                <button class= "btn btn-success" onclick="fillformwdetails(this, ${product.id})">Update</button>
                <button class= "btn btn-danger" onclick="deleteProduct(${product.id},this)">Delete</button>
             </td>
         </tr>`;

    });


    document.getElementById('product_container').innerHTML=productsString;


})


function deleteProduct(id,ele){
    (ele.parentNode.parentNode).style.display="none";

    fetch("http://localhost:3000/product?id="+id,{
        method:"DELETE"
    })
    .then((response)=>response.json())
    .then((data)=>{
        
        document.getElementById("message").innerHTML=
        `<p class="alert alert-success">Product Deleted Successfully</p>`;

    })
}

let children;

function fillformwdetails(ele,id){

    //displaying model
    document.getElementById("parent_popup").style.display="block";

    //getting the data ready
    children=ele.parentNode.parentNode.children;
    document.getElementById("id").value=id;
    document.getElementById("name").value=children[1].innerText;
    document.getElementById("description").value=children[2].innerText;
    document.getElementById("price").value=children[3].innerText;
    document.getElementById("type").value=children[4].innerText;

}

function closeModal(ev)
{
    if(ev.target.className=="parent_popup")
    {
    document.getElementById("parent_popup").style.display="none";
    }
}


function updateProduct(){

    let product={};

    let id = document.getElementById("id").value;
    product.title=document.getElementById("name").value;
    product.description=document.getElementById("description").value;
    product.price=document.getElementById("price").value;
    product.type=document.getElementById("type").value;

    console.log(product);

    fetch("http://localhost:3000/product?id="+id,{
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product),
        
      
    })
    .then((response)=>response.json())
    .then((product)=>{
        document.getElementById("parent_popup").style.display="none";

    children[1].innerText=product.title;
    children[2].innerText=product.description;
    children[3].innerText=product.price;
    children[4].innerText=product.type;

    document.getElementById("message").innerHTML=
    `<p class="alert alert-success">Product Updated Successfully</p>`;

        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })    
}