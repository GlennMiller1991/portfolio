export const requests = {
    postRequest<T>(url: string, body: T) {
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(body),
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then(checkResponse)
    },
    getRequest<T>(url: string) {
        return fetch(url, {
            method: 'GET',
            credentials: 'include',
            mode: 'cors',
        })
            .then(checkResponse)
    }
}

export const checkResponse = (res: Response) => {
    if (res.ok) {
        return res.json()
    } else {
        throw new Error(`${res.url}, ${res.status}`)
    }
}