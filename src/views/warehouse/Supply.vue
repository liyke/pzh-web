<template>
	<div>
		<!-- 显示物资信息以及编辑和删除 -->
		<el-table v-loading="loading" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading"
			:data="data" border style="width: 100%">
			<el-table-column prop="mId" label="物资编号">
			</el-table-column>
			<el-table-column prop="wId" label="仓库编号">
			</el-table-column>
			<el-table-column prop="mName" label="物资名称">
			</el-table-column>
			<el-table-column prop="gType" label="物资数量">
			</el-table-column>
			<el-table-column prop="gNum" label="货物数量">
			</el-table-column>
			<el-table-column prop="gDescribe" label="货物描述" width="400px">
			</el-table-column>
			<el-table-column prop="gStatus" label="状态">
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button @click="" type="text" size="medium">编辑</el-button>
					<el-button type="text" size="medium">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 显示物资信息以及编辑和删除。。。结束 -->
	</div>
</template>

<script>
	const data = [];

	export default {

		data() {
			return {
				commodity: {
					gId: '',
					oId: '',
					wId: '',
					gType: '',
					gNum: '',
					gDescribe: '',
					gStatus: '',
				},
				loading: false,
				modalLoading: false,
				commodityVisible: false,
				commodityLoading: false,
				data: [{
					gId: '1',
					oId: '1',
					wId: '1',
					gType: 'a',
					gNum: '3',
					gDescribe: 'bbbasdhsajkdhaskjhdask',
					gStatus: 'c',
				}, ],
			};
		},

		mounted() {
			this.loadTableData()
		},

		methods: {

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

			loadTableData() {
				this.loading = true
				// FindAllCommodity().then((res) => {
				//   setTimeout(() => {
				//     this.loading = false
				//     this.data = res.data
				//   }, 600)
				// })
				setTimeout(() => {
						this.loading = false
					},
					600)
			},

			submitCommodity() {
				this.modalLoading = true
				// SaveCommodity(this.commodity).then((res) => {
				//   if (res.status) {
				//     setTimeout(() => {
				//       this.modalLoading = false
				//       this.commodityVisible = false
				//       this.$message.success('商品信息提交成功');
				//       this.loadTableData()
				//     }, 600)
				//   } else {
				//     setTimeout(() => {
				//       this.modalLoading = false
				//     }, 600)
				//   }
				// })
				setTimeout(() => {
					this.modalLoading = false
				}, 600)
				this.commodityVisible = false
			},

			handleDelete(r, index) {
				// DeleteCommodityById(r.id).then((res) => {
				//   if (res.status) this.$message.success('商品信息删除成功');
				//   this.loadTableData()
				// })
				// console.log(index)
			},

			handleUpdate(r) {
				this.commodity = r
				this.commodityVisible = true
			},

		},

	};
</script>

<style scoped>
	.editable-add-btn {
		margin-bottom: 15px;
	}
</style>
