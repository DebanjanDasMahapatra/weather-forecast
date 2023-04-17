import axios from "axios"

axios.interceptors.request.use(req => {
    req.validateStatus = (status: number) => status >= 200
    return req
})