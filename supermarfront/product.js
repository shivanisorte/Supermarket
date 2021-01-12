let url=location.href;
let id=url.split("?")[1].split("=")[1];

fetch("http://localhost:3000/product?id="+id)
.then((response)=>response.json())
.then((product)=>{

    console.log(product);
    let myRating="";

    for(i=0; i<5;i++)
    {
        myRating+=`<i class="fa fa-star myrate notrated" style="font-size: 25px" aria-hidden="true" onmouseover="makeRated(${i})" onclick="submitRating(${product.id})" onmouseout="makeUnrated()"></i>`;
    }

    let ratingString="";
    
    let avgRating=Math.round(product.rating/product.rating_count);

    for(let i=0;i<=4;i++)
    {
        if(i<avgRating){
            ratingString+=`<i class="fa fa-star" style="font-size: 25px; color:gold" aria-hidden="true"></i>`;
        }
        else{
            ratingString+=`<i class="fa fa-star" style="font-size: 25px; color:grey" aria-hidden="true"></i>`;
        }
    }
    
    document.getElementById("productname").innerText=product.title;

    let productString=`
        <div class="card-body">
        <h5 class="card-title" style="font-size:50px; text-align:center">${product.emoji}${product.emoji}${product.emoji}</h5>
        </div>
        <div class="card-body">
            <h5 class="card-title">${product.title}</h5>
            <p class="card-text">${product.description}</p>
        </div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Price : &#8377; ${product.price}</li>
            <li class="list-group-item" id="rating>${ratingString} (${product.rating_count} ratings)</li>
            <li class="list-group-item" id="myrating">${myRating} (My rating)</li>
            <li class="list-group-item">Type : ${product.type}</li>
        </ul>
        <div class="card-body">
        <a href="#" class="card-link btn btn-success">Buy Now</a>
        </div>
    `;

    // removed from productString
    // <div class="card-body">
    //     <a href="#" class="card-link btn btn-success">Update</a>
    //     <a href="#" class="card-link btn btn-danger" onclick="deleteProduct()">Delete</a>
    //     </div>

    document.getElementById("product").innerHTML=productString;




})



// function deleteProduct(){
//     fetch("http://localhost:3000/product?id="+id,{
//         method:"DELETE"
//     })
//     .then((response)=>response.json())
//     .then((data)=>{
        
//         document.getElementById("message").innerHTML=
//         `<p class="alert alert-success">${data.message}</p>`;

//         document.getElementById("productname").style.display="none";
//         document.getElementById("product").style.display="none";


//         setTimeout(()=>{
//             location="index.html";
//         },3000)



//     })
// }

function makeRated(index)
{
    var stars=document.getElementById("myrating").children;

    for(let i=0;i<stars.length;i++)
    {
        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
    }


    for(let i=0;i<=index;i++)
    {
        stars[i].classList.remove("notrated");
        stars[i].classList.add("rated");
    }

    // console.log(ev.target.className);

    // if(ev.target.classList.contains("notrated")){
    //     ev.target.classList.remove("notrated");
    //     ev.target.classList.add("rated");
    // }
    // else{
    //     ev.target.classList.remove("rated");
    //     ev.target.classList.add("notrated");
    // }
}

function makeUnrated(){
    var stars=document.getElementById("myrating").children;
    for(let i=0;i<stars.length;i++)
    {
        stars[i].classList.remove("rated");
        stars[i].classList.add("notrated");
    }
}


function submitRating(id)
{
    console.log("called");
    let rating=document.getElementById("myrating").getElementsByClassName("rated").length;
    console.log(rating);
    fetch("http://localhost:3000/updateRating?id="+id,{
        method:"PUT",
        body:JSON.stringify({rating:rating}),
        headers:{
            "Content-Type":"application/json"
        }
    })
    .then((response)=>response.json())
    .then((product)=>{
        let ratingString="";
    
        let avgRating=Math.round(product.rating/product.rating_count);
    
        for(let i=0;i<=4;i++)
        {
            if(i<avgRating){
                ratingString+=`<i class="fa fa-star" style="font-size: 25px; color:gold" aria-hidden="true"></i>`;
            }
            else{
                ratingString+=`<i class="fa fa-star" style="font-size: 25px; color:grey" aria-hidden="true"></i>`;
            }
        }
        document.getElementById("rating").innerHTML=`${ratingString} (${product.rating_count} rating)`
        console.log(product);
    })
    .catch((err)=>{
        console.log(err);
    })
}


