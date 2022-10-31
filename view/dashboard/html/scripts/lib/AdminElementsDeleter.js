function AdminElementsDeleter() {
    let elements= document.getElementsByClassName("admin_element");
    
    for(let element of elements){
        console.log("Element ",element);
        setTimeout(()=>element.remove(),800)
    }  
}

