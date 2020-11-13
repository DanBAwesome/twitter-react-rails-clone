import { post } from "jquery";

const csrf = document.querySelector("meta[name='csrf-token']").getAttribute("content");

const Requests = {
    get(url) {
        return fetch(url, { method: "GET" }).then((response) => {
            if(response.status === 200) {
                return response.json(); 
            }   
            console.log(response);
        }, (error) => {
            console.log(error);
        })
    },
    post(url, data) {
        console.log(data);
        return fetch(url, {
            method: "POST",
            body: data,
            headers: {
                'X-CSRF-Token': csrf,
            }
        }).then((response) => {
            if(response.status === 200) {
                return response.json();
            }
            console.log(response);
        },
        (error) => {
            return error;
        })
    },
    delete(url, data = null) {
        return fetch(url, {
            method: "DELETE",
            body: data,
            headers: {
                'X-CSRF-Token': csrf
            }
        }).then((response) => {
            if(response.status === 200) {
                return response.json();
            }
            console.log(response);
        },
        (error) => {
            return error;
        })
    }

}

export default Requests;