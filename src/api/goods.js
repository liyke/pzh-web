import service from "../utils/request";

//获得所有数据
export function getGoods(data) {
	return service({
		url: '/goods/get',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//新增数据
export function addGoods(data) {
	return service({
		url: '/goods/add',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}
//修改数据
export function updateGoods(data) {
	return service({
		url: '/goods/update',//请求接口
		method: 'post',//请求方式
		data//请求参数
	})
}