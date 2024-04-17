import axios from "axios"

export function getKeys() {
    return axios
        .get("/keys.json")
        .then(res => res.data)
}