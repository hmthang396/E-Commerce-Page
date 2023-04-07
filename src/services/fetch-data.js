
const API_HOST = process.env.REACT_APP_API_HOST;
export const postFetch= async(url,body)=>{
    let dataFetch = await fetch(`${API_HOST}${url}`,{
        method : 'POST',
        headers: {
            "Content-type": "application/json;charset=utf-8",
        },
        body:JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
}

export const getFetch= async(url)=>{
    let dataFetch = await fetch(`${API_HOST}${url}`,{
        method : "GET",
        headers: {
            "Content-type": "application/json;charset=utf-8",
        },
    });
    let data = await dataFetch.json();
    return data;
}

export const putFetch= async(url,body)=>{
    let dataFetch = await fetch(`${API_HOST}${url}`,{
        method : 'PUT',
        headers: {
            "Content-type": "application/json;charset=utf-8",
        },
        body:JSON.stringify(body)
    });
    let data = await dataFetch.json();
    return data;
}
