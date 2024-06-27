import { apiBaseUrl } from "@/config";

export const apiProducts = async () => {

    let success=true
    try {
       
            const data = await fetch("https://dummyjson.com/products?limit=1000");
            const response = await data.json();
            return response
       
   
    } catch (error) {
        return success=false
    }
    
}

export const apiProductsCategory = async (category) => {
    let success=true
    try {
    const datas = await fetch('https://dummyjson.com/products/category/'+`${category}`)
    const responses = await datas.json();
    return responses
    } catch (error) {
        return success=false
    }
    
}

export const apiProductsfreeLimit = async (id) => {
    
    try {
        const data = await fetch("https://dummyjson.com/products/"+`${id}`);
        const response = await data.json();
        if (response.message) {

            return undefined
        }
        return response
    } catch (error) {
        // console.log("network issue ")
    }
   
}

export const signUpData = async (values) => {
    const datasendapi = await fetch(`${apiBaseUrl}/api/signup`, {
        method: "Post",
        body: JSON.stringify(values)
    })
    return datasendapi
}

export const logindata = async (values) => {
    const logindetails = await fetch(`${apiBaseUrl}/api/login`, {
        method: "Post",
        body:JSON.stringify(values)
    })
    return logindetails
}

export const cartapidata = async (data) => {
    const users = await data.userid.then((response) => {
        return response
    })
    const myid = users
    // console.log("myid",data.image)
    const restro = { userid:myid,title: data.title,productsUniqueId:data.productsUniqueId, price: data.price,category:data.category, description: data.description,numberOfInputs:data.numberOfInputs,image:data.image, reviews: data.reviews }
    

    const cartapidatas = await fetch(`${apiBaseUrl}/api/cart`, {
        method: "Post",
        body:JSON.stringify(restro)
    })
    // console.log("yes",restro)
    return cartapidatas
}


export const cartDatApi = async(data) => {
    // console.log("dhup",data)
    const users = await data.userid.then((response) => {
        return response
    })
    const userId = users
    const cartData = await fetch(`${apiBaseUrl}/api/cart/` + `${userId}`, {
        method:"GET"
    })
    return cartData
}

export const secondCartDataApi = async(data) => {
    // console.log("dhup",data)
   
    const cartData = await fetch(`${apiBaseUrl}/api/cart/` + `${data.userid}`, {
        method:"GET"
    })
    return cartData
}

export const counterUpdaterApi = async (data) => {
   try {
    const users = await data.userid.then((response) => {
        return response
    })
    const userId = users
    // console.log("put",userId)
    const counterUpdated = await fetch(`${apiBaseUrl}/api/cart/` + `${userId}`, {
        method: "PUT",
        body:JSON.stringify({productid:data.productid,counter:data.counter})
    }) 
    return counterUpdated
   } catch (error) {
        error.message="something went wrong"
   }
}

export const deleteItemsCart = async (productMainId) => {
    try {
        // console.log("finalpoint",productMainId)
        const deletedUserItems = await fetch(`${apiBaseUrl}/api/cart/deleteApi/` + `${productMainId}`, {
            method:"Delete"
        })
        return deletedUserItems
    } catch (error) {
        error.message="something went wrong"
    }
   

}

export const populateFieldsApi = async (profileId) => {
    const populateFields = await fetch(`${apiBaseUrl}/api/editProfile`, {
        method: "Post",
        body: JSON.stringify({profileId })
    })
    return populateFields
}