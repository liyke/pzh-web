<template>
	<div>
		<div style="display: flex">
			<a-button size="large" class="editable-add-btn" @click="commodityVisible = true">
				<a-icon type="plus" />
				新增货物
			</a-button>
		</div>
		<!-- 显示货物信息以及编辑和删除 -->
		<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
			:data="data" border style="width: 100%" stripe>
			<el-table-column prop="id" label="货物编号" align="center">
			</el-table-column>
			<el-table-column prop="warehouse_id" label="仓库编号" align="center">
			</el-table-column>
			<el-table-column prop="type" label="货物类型" align="center">
			</el-table-column>
			<el-table-column prop="num" label="货物数量" align="center">
			</el-table-column>
			<el-table-column prop="description" label="货物描述" width="400px" align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" align="center">
			</el-table-column>
			<el-table-column label="操作" align="center">
				<template slot-scope="scope">
					<el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 显示货物信息以及编辑和删除。。。结束 -->
		<!-- 新增货物信息 -->
		<el-dialog title="新增货物" :visible.sync="commodityVisible">
			<el-form :model="commodity">
				<el-form-item label="仓库编号" label-width="120px">
					<el-input v-model="commodity.warehouse_id" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="货物类型" label-width="120px">
					<el-input v-model="commodity.type" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="货物数量" label-width="120px">
					<el-input v-model="commodity.num" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="货物描述" label-width="120px">
					<el-input v-model="commodity.description" autocomplete="off" type="textarea"></el-input>
				</el-form-item>
				<el-form-item label="状态" label-width="120px">
					<el-input v-model="commodity.status" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="commodityVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitCommodity()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 新增货物信息结束 -->

		<!-- 修改货物信息 -->
		<el-dialog title="修改货物信息" :visible.sync="editVisible">
			<el-form :model="commodity">
				<el-form-item label="仓库编号" label-width="120px">
					<el-input v-model="commodity.warehouse_id" autocomplete="off" ></el-input>
				</el-form-item>
				<el-form-item label="货物类型" label-width="120px">
					<el-input v-model="commodity.type" autocomplete="off" </el-input>
				</el-form-item>
				<el-form-item label="货物数量" label-width="120px">
					<el-input v-model="commodity.num" autocomplete="off" ></el-input>
				</el-form-item>
				<el-form-item label="货物描述" label-width="120px">
					<el-input v-model="commodity.description" autocomplete="off" type="textarea" ></el-input>
				</el-form-item>
				<el-form-item label="状态" label-width="120px">
					<el-input v-model="commodity.status" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="editVisible = false">取 消</el-button>
				<el-button type="primary" @click="submitEdit()">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 修改货物信息结束 -->
	</div>
</template>

<script>
	import {
		getGoods,addGoods,updateGoods
	} from "@/api/goods"
	const data = [];

	export default {

		data() {
			return {
				commodity: {
					id: '',
					warehouse_id: '',
					type: '',
					num: '',
					description: '',
					status: '',
				},
				loading: false,
				commodityVisible: false,
				editVisible: false,
				data: [{
					id: '1',
					warehouse_id: '1',
					type: 'a',
					num: '3',
					description: 'bbbasdhsajkdhaskjhdask',
					status: 'c',
				}, ],
			};
		},

		mounted() {
			this.loadTableData()
		},

		methods: {
			//查询，用不到
			onSearch(value) {
				if (value) {
					this.loading = true
					// SearchCommodity(value).then((res) => {
					//   console.log(res)
					//   if (res.data.length === 0) {
					//     this.$message.warn("未搜索到任何数据")
					//     setTimeout(() => {
					//       this.loading = false
					//       this.data = res.data
					//     }, 600)
					//   } else {
					//     setTimeout(() => {
					//       this.$message.success("搜索到" + res.data.length + "个商品")
					//       this.loading = false
					//       this.data = res.data
					//     }, 600)
					//   }
					// })
					setTimeout(() => {
						this.loading = false
					}, 600)
				} else {
					this.$message.warn("请输入搜索内容")
				}
			},
			
			//加载所有数据
			loadTableData() {
				this.loading = true
				getGoods({}).then((res) => {
					setTimeout(() => {
						this.loading = false
						this.data = res.data
					}, 600)
				})
			},
			
			//新增
			submitCommodity() {
				addGoods(this.commodity).then((res) => {
				    setTimeout(() => {
				      this.commodityVisible = false
				      this.$message.success('货物信息新增成功');
				      this.loadTableData()
					  this.commodity={}
				    }, 600)
				})
			},

			//删除
			handleDelete(index,r) {
				// DeleteCommodityById(r.id).then((res) => {
				//   if (res.status) this.$message.success('商品信息删除成功');
				//   this.loadTableData()
				// })
				// console.log(index)
			},

			//编辑
			handleEdit(index,r) {
				this.commodity.id = index
				this.editVisible = true
			},
			//提交编辑信息
			submitEdit(){
				updateGoods(this.commodity).then((res) => {
				    setTimeout(() => {
				      this.editVisible = false
				      this.$message.success('货物信息修改成功');
				      this.loadTableData()
					  this.commodity={}
				    }, 600)
				})
			}
		},

	};
</script>

<style scoped>
	.editable-add-btn {
		margin-bottom: 15px;
	}
</style>
