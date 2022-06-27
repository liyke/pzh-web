<template>
	<div>
		<a-spin size="large" :spinning="spinning">
			<a-row :gutter="20">
				<a-col :span="8" class="item">
					<a-card hoverable class="add-item" @click="visible = true">
						<a-icon type="plus" />
						添加车辆
					</a-card>
				</a-col>
				<a-col :span="8" v-for="(item, index) in this.data" :key="index" class="item">
					<a-card hoverable>
						<template slot="actions" class="ant-card-actions">
							<span @click="editVehicle = true, selectVehicle = item.id">
								<i class="el-icon-edit-outline"></i>修改
							</span>
							
							<!-- 跳转货运记录 -->
							<span @click="checkRecordByCar()">
								<i class="el-icon-tickets"></i>运货记录
							</span>

							<!-- 删除弹框 -->
							<span @click="visibleDel = true">
								<el-popover placement="top" width="160" v-model="visibleDel">
									<p>确定要删除这辆车吗？</p>
									<div style="text-align: right; margin: 0">
										<el-button size="mini" type="text" @click="visibleDel = false">取消</el-button>
										<el-button type="primary" size="mini"
											@click="visibleDel = false, delData(item.id)">确定</el-button>
									</div>
									<a slot="reference" class="el-icon-delete">删除</a>
								</el-popover>
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
		<a-modal title="新增车辆" :visible="visible" @ok="submit" @cancel="visible = false">
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
	import { FindVehicle, AddVehicle, UpdateVehicle, DeleteVehicleById} from "@/api/vehicle"
	
	export default {
		data() {
			return {
				visible: false, // 新增车辆
				visibleDel: false, // 删除气泡
				spinning: false, // 加载等待
				editVehicle: false, // 编辑载具
				selectVehicle: '', // 选中载具ID
				form: {
					id: '1',
					number: '京A0000',
					type: '货车',
					capacity: '500',
					card: 'C1',
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
			checkRecordByCar(){
				
			},

			loadData() {
				this.spinning = true;
				FindVehicle({}).then((res) => {
					console.log(res)
					this.data = res.data;
				})
				setTimeout(() => {
					this.spinning = false
				}, 600)
			},

			submit() {

			},

			editData(id) {
				console.log(id);
				this.editVehicle = false;
			},

			delData(id) {
				console.log(id);
				console.log(this.visibleDel);
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
