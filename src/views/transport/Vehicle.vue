<template>
	<div>
		<a-spin size="large" :spinning="spinning">
			<a-row :gutter="20">
				<a-col :span="8" class="item">
					<a-card hoverable class="add-item" @click="createForm()">
						<a-icon type="plus" />
						添加车辆
					</a-card>
				</a-col>
				<a-col :span="8" v-for="(item, index) in this.data" :key="index" class="item">
					<a-card hoverable>
						<template slot="actions" class="ant-card-actions">
							<!-- 点击弹出修改汽车信息表单 -->
							<span @click="editForm(item.id)">
								<i class="el-icon-edit-outline"></i>修改
							</span>

							<!-- 跳转汽车货运记录 -->
							<span @click="checkRecordByCar()">
								<i class="el-icon-tickets"></i>运货记录
							</span>
							
							<!-- 确定删除的询问弹框 -->
							<span>
								<el-popconfirm confirm-button-text='确定' cancel-button-text='取消' icon="el-icon-info"
									icon-color="red" title="确定要删除这辆车吗？" @confirm="delData(item.id)" >
									<a slot="reference">
										<i class="el-icon-delete"></i>删除
									</a>
								</el-popconfirm>
							</span>

						</template>
						<a-card-meta :title="'车牌号：' + item.number"
							:description="'最大容量:\t'+item.capacity+'kg' +'\n车辆证件:\t'+item.card "
							style="white-space: pre">
							<a-badge :number-style="{ backgroundColor: '#52c41a' }" slot="avatar" :count="item.type"
								:offset="[-80,10]">
								<img class="image" :src="require('../../assets/' +item.type+'.svg')" alt="" />
							</a-badge>
						</a-card-meta>
					</a-card>
				</a-col>
			</a-row>
		</a-spin>

		<!-- 新增车辆 -->
		<a-modal title="新增车辆" :visible="visible" @ok="submitCreate()" @cancel="visible = false">
			<a-form-model :model="form">
				<a-form-model-item label="车牌号码">
					<a-input v-model="form.number" />
				</a-form-model-item>
				<a-form-model-item label="车辆类型">
					<a-select v-model="form.type">
						<a-select-option value="小型汽车">小型汽车</a-select-option>
						<a-select-option value="货车">货车</a-select-option>
						<a-select-option value="卡车">卡车</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="最大容量（单位:kg）">
					<a-input v-model="form.capacity" />
				</a-form-model-item>
				<a-form-model-item label="车辆证件">
					<a-input v-model="form.card" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>

		<!-- 修改车辆 -->
		<a-modal title="修改车辆信息" :visible="editVehicle" @ok="editData(selectVehicle)" @cancel="editVehicle = false">
			<a-form-model :model="form">
				<a-form-model-item label="车牌号码">
					<a-input v-model="form.number" />
				</a-form-model-item>
				<a-form-model-item label="车辆类型">
					<a-select v-model="form.type">
						<a-select-option value="小型汽车">小型汽车</a-select-option>
						<a-select-option value="货车">货车</a-select-option>
						<a-select-option value="卡车">卡车</a-select-option>
					</a-select>
				</a-form-model-item>
				<a-form-model-item label="最大容量（单位:kg）">
					<a-input v-model="form.capacity" />
				</a-form-model-item>
				<a-form-model-item label="车辆证件">
					<a-input v-model="form.card" />
				</a-form-model-item>
			</a-form-model>
		</a-modal>



	</div>
</template>

<script>
	import {
		FindVehicle,
		AddVehicle,
		UpdateVehicle,
		DeleteVehicleById
	} from "@/api/vehicle"

	export default {
		data() {
			return {
				visible: false, // 新增车辆
				spinning: false, // 加载等待
				editVehicle: false, // 编辑载具
				selectVehicle: '', // 选中载具ID
				form: {
					id: '',
					number: '',
					type: '',
					capacity: '',
					card: '',
				},
				data: [],
				imgList: [
					require('../../assets/warehouse0.svg'),
					require('../../assets/warehouse1.svg'),
					require('../../assets/warehouse2.svg'),
				]
			}
		},

		mounted() {
			this.loadData()
		},

		methods: {

			// 查询该货车的货运记录
			checkRecordByCar() {

			},

			loadData() {
				this.spinning = true;
				FindVehicle({}).then((res) => {
					this.data = res.data;
				})
				setTimeout(() => {
					this.spinning = false
				}, 600)
			},
			
			// 弹出创建表单 √
			createForm(){
				this.form = {};
				this.visible = true;
			},
			
			// 提交创建申请
			submitCreate() {
				console.log(this.form);
				// 创建新汽车
				AddVehicle(this.form).then(res => {
					if(res.flag){
						this.$message.success("创建成功");
					}else{
						this.$message.error("网络故障，创建失败");
					}
				})
				// 重新载入数据
				this.loadData()
				this.visible = false;
			},
			
			// 弹出修改信息表单 √
			editForm(carId){
				this.editVehicle = true, 
				this.selectVehicle = carId,
				// 初始化填充
				FindVehicle({id:carId}).then((res) => {
					this.form=res.data[0];
				})
			},
			
			// 提交修改申请 √
			editData(carId) {
				this.form.id = carId;
				UpdateVehicle(this.form).then(res=>{
					if(res.flag){
						this.$message.success("修改成功");
					}else{
						this.$message.error("网络故障，修改失败");
					}
				})
				this.editVehicle = false;
			},
			
			// 删除汽车 √
			delData(id) {
				DeleteVehicleById(id).then(res => {
					if(res.flag){
						this.$message.success("删除成功");
						this.loadData();
					}else{
						this.$message.error("网络故障，删除失败");
					}
				})
			},

		},

	}
</script>

<style scoped>
	.add-item {
		text-align: center;
		line-height: 120px;
		min-height: 120px;
		border: 1px dashed #91949c;
	}

	.add-item:hover {
		border: 1px dashed #5a84fd;
		color: #5a84fd;
	}

	.item {
		margin-bottom: 20px;
	}

	.image {
		width: 80px;
		height: 80px;
		margin-left: 20px;
	}
</style>
