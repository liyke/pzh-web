import service from "../utils/request";

export function getWarehouse(data) {
	return service({
		url: '/warehouse/get',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

export function addWarehouse(data) {
	return service({
		url: '/warehouse/add',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

export function updateWarehouse(data) {
	return service({
		url: '/warehouse/update',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}

export function deleteWarehouse(data) {
	return service({
		url: '/warehouse/delete?id=' + data,//请求接口
		method: 'get',//请求方式
	})
}