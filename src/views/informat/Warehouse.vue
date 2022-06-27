<template>
	<div>
		<!-- 显示仓库信息 -->
		<a-spin size="large" :spinning="spinning">
			<a-row :gutter="20">
				<a-col :span="8" class="item">
					<a-card hoverable class="add-item" @click="visible = true">
						<a-icon type="plus" />
						添加仓库
					</a-card>
				</a-col>
				<a-col :span="8" v-for="(item, index) in this.data" :key="index" class="item">
					<a-card hoverable>
						<template slot="actions" class="ant-card-actions">
							<span @click="editWarehouse = true,opWarehousId = item.id">
								<i class="el-icon-edit-outline"></i>修改
							</span>
							<span>
								<router-link :to="'/warehouse/' + item.id">
									<a-icon type="bar-chart" /> 库存管理
								</router-link>
							</span>
							<!-- 删除仓库弹框 -->
							<span @click="confirmDelete(item.id)">
								<el-popover placement="top" width="160" :v-model="delVisible">
									<p>确定要删除这辆车吗？</p>
									<div style="text-align: right; margin: 0">
										<el-button size="mini" type="text" @click="delVisible = false">取消</el-button>
										<el-button type="primary" size="mini" @click="delWarehouse(item.id)">确定</el-button>
									</div>
									<a slot="reference">删除</a>
								</el-popover>
							</span>
						</template>
						<a-card-meta :title="'仓库编号: '+item.id"
							:description="'仓库容量: ' + item.hold+'\n仓库地址: '+item.address" style="white-space: pre">
							<img class="image" slot="avatar" :src="imgList[Number(item.id) %Math.floor(3)]" alt="" />
						</a-card-meta>
					</a-card>
				</a-col>
			</a-row>
		</a-spin>
		<!-- 显示仓库信息结束 -->

		<!-- 添加仓库 -->
		<a-modal title="新增仓库" :visible="visible" @ok="submit" @cancel="visible = false">
			<a-input v-model="form.firm_id" addon-before="公司编号" style="width: 300px;margin-bottom: 20px" placeholder="1" disabled></a-input>
			<a-input v-model="form.hold" addon-before="仓库容量" style="width: 300px;margin-bottom: 20px"></a-input>
			<a-input v-model="form.address" addon-before="仓库地址" style="width: 300px"></a-input>
		</a-modal>
		<!-- 添加仓库结束 -->

		<!-- 修改仓库信息 -->
		<el-dialog title="修改仓库信息" :visible.sync="editWarehouse">
			<el-form :model="form">
				<el-form-item label="仓库容量" label-width="120px">
					<el-input v-model="form.hold" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="仓库地址" label-width="120px">
					<el-input v-model="form.address" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editWarehouse = false">取 消</el-button>
				<el-button type="primary" @click="editInfo(opWarehousId)">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 修改仓库信息结束 -->


		
	</div>
</template>

<script>
	import {getWarehouse,addWarehouse,updateWarehouse,deleteWarehouse} from "@/api/warehouse"
	export default {
		name: "WareHouse",
		data() {
			return {
				visible: false,
				delVisible: false,
				editWarehouse: false, // 编辑仓库弹窗标志
				opWarehousId: '',	// 要操作的仓库ID
				form: {
					firm_id: '',
					hold: '',
					address: ''
				},
				spinning: false,
				data: [{
					id: '1',
					firm_id: '1',
					hold: '300',
					address: 'csdx'
				}, ],
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

			loadData() {
				this.spinning = true
				getWarehouse({}).then((res)=>{
					this.data = res.data;
				})
				this.spinning = false
			},

			submit() {
				this.form.firm_id = "1"
				addWarehouse(this.form).then((res)=>{
					this.loadData();
					this.$message.success("添加成功");
				})
				this.visible = false
			},

			editInfo(opWarehousId) {
				this.form.id = opWarehousId;
				updateWarehouse(this.form).then((res)=>{
					this.loadData();
					this.$message.success("修改成功");
				})
				this.editWarehouse = false
				this.form={}
			},
			
			
			
			delWarehouse(opWarehousId) {
				// 删除仓库
				let temp_id = Number(opWarehousId)
				console.log(temp_id);
				deleteWarehouse(temp_id).then((res)=>{
					this.loadData();
					this.$message.success("删除成功");
				})
				this.delVisible = false;
			},
			
			confirmDelete(id){
				// 要删除的仓库id
				this.opWarehousId = id;
				this.delVisible = true;
			}
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
	}
</style>
