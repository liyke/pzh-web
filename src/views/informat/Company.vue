<template>
	<div class="main">
		<a-spin size="large" :spinning="spinning">
		<div v-if="current === 0" class="page-content">
			<el-descriptions class="margin-top" title="公司信息" :column="2" border size="big">
				<template slot="extra">
					<el-button type="primary" size="small" @click="toModify">操作</el-button>
				</template>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-s-home"></i>
						公司名称
					</template>
					{{data.name}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-date"></i>
						创办日期
					</template>
					{{data.date}}
				</el-descriptions-item>
				<el-descriptions-item :span="2">
					<template slot="label">
						<i class="el-icon-location"></i>
						公司地址
					</template>
					{{data.address}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-user-solid"></i>
						负责人
					</template>
					{{data.leader}}
				</el-descriptions-item>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-phone"></i>
						联系电话
					</template>
					{{data.phone}}
				</el-descriptions-item>
			</el-descriptions>
			<el-descriptions direction="vertical" class="margin-top" :column="2" border>
				<el-descriptions-item>
					<template slot="label">
						<i class="el-icon-s-order"></i>
						公司简介
					</template>
					{{data.introduce}}
				</el-descriptions-item>
			</el-descriptions>
		</div>
		<div v-if="current === 1" class="page-content">
			<a-form-model labelAlign="left" :model="data" :label-col="labelCol" :wrapper-col="wrapperCol">
				<a-form-model-item label="公司名称" required>
					<a-input v-model="data.name" allowClear />
				</a-form-model-item>
				<a-form-model-item label="公司地址" required>
					<a-input v-model="data.address" allowClear />
				</a-form-model-item>
				<a-form-model-item label="创办日期" required>
					<a-date-picker v-model="data.date" type="date" placeholder="选择日期" style="width: 100%;" valueFormat="YYYY-MM-DD"/>
				</a-form-model-item>
				<a-form-model-item label="公司负责人" required>
					<a-input v-model="data.leader" allowClear />
				</a-form-model-item>
				<a-form-model-item label="联系电话" required>
					<a-input v-model="data.phone" allowClear />
				</a-form-model-item>
				<a-form-model-item label="公司简介" required>
					<a-input v-model="data.introduce" type="textarea" :rows="4" allowClear />
				</a-form-model-item>
				<a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
					<a-button type="primary" @click="toSubmit" style="min-width: 150px;" :loading="loading">
						提交修改
					</a-button>
					<a-button type="default" @click="resetForm" style="margin-left: 20px; min-width: 150px;">
						重置
					</a-button>
				</a-form-model-item>
			</a-form-model>
		</div>
		</a-spin>
	</div>
</template>

<script>
	import {
		FindCompany,
		UpdateCompany
	} from "@/api/company";

	export default {
		data() {
			return {
				// 表单格式
				labelCol: {
					span: 3,
					offset: 4,
				},
				wrapperCol: {
					span: 12
				},
				// 表单/表格
				current: 0,
				// 表单数据
				form: {},
				// 描述列表展示数据
				data: {},
				loading: false,
				spinning: false,
			};
		},
		mounted() {
			this.initForm();
		},
		methods: {
			initForm() {
				spinning: true,
				// 初始化提交表单内容为数据库中内容
				// 切换到表单时自动触发
				FindCompany({}).then((res) => {
					if (res.flag) {
						setTimeout(() => {
							this.data = res.data[0]
							this.spinning = false
						}, 400)
					}else{
						this.$message.error("网络故障");
					}
				})
			},

			toSubmit() {
				// 提交表单 跳转到公司简介
				this.loading = true;
				// 1. 读取表单数据
				console.log(this.data);
				// 2. 调用后端更新数据库数据
				UpdateCompany(this.data);
				// 3. 调用初始化表单方法更新修改后的数据

				setTimeout(() => {
					this.loading = false;
					this.current = 0;
					this.$message.success("修改成功");
					this.initForm();
				}, 600)
			},

			toModify() {
				// 提交表单 跳转到公司简介
				this.current = 1;
			},

			resetForm() {
				FindCompany({}).then((res) => {
					// console.log(res)
					if (res.flag) {
						this.data = res.data[0];
					}
				})
				setTimeout(() => {
					// 将表单重置为数据库中数据
					this.$message.success("重置成功");
				}, 300)
			}


		}
	}
</script>

<style>
	.page-content {
		margin-top: 60px;
		margin-bottom: 80px;
	}

	.main {
		padding: 50px 180px;
		background: #ffffff;
	}
</style>
