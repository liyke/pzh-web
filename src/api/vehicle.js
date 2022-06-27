import service from "../utils/request";

export function FindVehicle(){
    return service({
        url: '/car/get',
        method: 'post'
    })
}



export function AddVehicle(data) {
    return service({
        url: '/car/add',
        method: 'post',
        data: data
    })
}

export function UpdateVehicle(data) {
    return service({
        url: '/car/update',
        method: 'post',
        data: data
    })
}

export function DeleteVehicleById(id){
    return service({
        url: '/car/delete',
        method: 'get'
    })
}