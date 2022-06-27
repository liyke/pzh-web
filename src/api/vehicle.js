import service from "../utils/request";

export function FindVehicle(data){
    return service({
        url: '/car/get',
        method: 'post',
		data:data
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
        url: '/car/delete?id='+id,
        method: 'get',
		
    })
}