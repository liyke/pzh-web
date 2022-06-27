import service from "../utils/request";

export function FindCompany(data) {
    return service({
        url: '/firm/get',
        method: 'post',
		data: data
    })
}

export function UpdateCompany(data) {
    return service({
        url: '/firm/update',
        method: 'post',
		data: data
    })
}
