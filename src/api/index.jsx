import { API } from './api'

export const postRequest = (data , cat , subcategory , id) => {
    return API.post(JSON.stringify(data) , cat , subcategory , id)
}

export const getRequest = (category , subcategory) => {
    return API.get(category , subcategory)
}

export const deleteRequest = (cat , clothes , id) => {
    return API.delete(cat, clothes , id)
}

export const changeRequest = (data , cat , clothes , id) => {
    return API.patch(JSON.stringify(data) , cat , clothes , id)
}