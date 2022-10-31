

function getParam(link) {
    let url = link;
    let arr = url.split('/')
    return arr[arr.length-1]
}

