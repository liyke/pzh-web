<template>

	<div class="login-bg">
		<div class="login-box">
			<div>
				<div class="box-header">
					<img class="logo" src="../assets/logo.svg" alt="" />
					<div class="box-header-t">Management</div>
				</div>
				<div class="title">Logistics Management 物流管理系统 - 登录</div>
				<div>
					<a-input v-model="form.email" size="large" style="margin-top: 10px" class="input" placeholder="账号">
						<a-icon slot="prefix" type="mail" />
					</a-input>
					<a-input-password v-model="form.password" size="large" class="input" placeholder="密码">
						<a-icon slot="prefix" type="lock" />
					</a-input-password>
				</div>
				<div style="margin-bottom: 20px">
					<a-checkbox v-model="form.remember">自动登录</a-checkbox>
					<a-button type="link" style="margin-left: 158px">
						忘记密码 ?
					</a-button>
				</div>
				<a-button :loading="submitLoading" class="submit-btn" type="primary" @click="submitLogin">
					确认登陆
				</a-button>
				<a-button :loading="submitLoading" class="register-btn" @click="toRegister">
					注册账号
				</a-button>
				<div class="des">物流管理系统</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				sendLoading: false,
				// submitType: '1', //1账号登录 2邮箱登录
				submitLoading: false,
				form: {
					password: '',
					email: '',
					code: '',
					remember: false,
				},
			}
		},

		mounted() {},

		methods: {
			submitLogin() {
				this.$router.push("/commodity")
				this.submitLoading = false
				this.$message.success("登陆成功")
			},

			toRegister() {
				this.$router.push("/register")
			}
		}

	}
</script>

<style scoped>
	body {
		background: #000000 !important;
	}

	>>>.ant-tabs-bar {
		border-bottom: none !important;
	}

	>>>.ant-btn-primary {
		border-color: #5a84fd;
	}

	.login-box {
		width: 420px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		padding: 25px 30px;
		background-color: white;
		box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);

	}

	.login-bg {
		padding: auto;
		overflow: hidden !important;
		position: relative;
		box-sizing: border-box;
		background-image: url('../assets/bg-login.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		min-height: 100vh;
	}

	.login-bg:before {
		content: '';
		background-color: rgba(0, 0, 0, 0.2);
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}

	.box-header {
		display: flex;
	}

	.box-header-t {
		font-weight: bolder;
		font-size: 30px;
	}

	.logo {
		width: 44px;
		height: 44px;
		margin-right: 20px;
		margin-left: 43px;
	}

	>>>.ant-tabs-nav {
		width: 350px;

	}

	>>>.ant-tabs-ink-bar {
		left: 52px;
		background-color: transparent;
	}

	>>>.ant-input-affix-wrapper .ant-input {
		font-size: 12px !important;
	}

	.title {
		color: #91949c;
		padding-top: 15px;
		padding-bottom: 35px;
		font-size: 13px;
		text-align: center;
	}

	.input {
		margin-bottom: 25px;
		font-size: 10px;
	}

	.code-btn {
		height: 40px;
		margin-left: 30px;
	}

	.submit-btn {
		letter-spacing: 2px;
		background: #5a84fd;
		width: 100%;
		height: 45px;
		margin-bottom: 15px;
	}

	.register-btn {
		letter-spacing: 2px;
		background: #00d061;
		color: white;
		width: 100%;
		height: 45px;
	}

	.des {
		padding-top: 25px;
		font-size: 13px;
		text-align: center;
		color: #91949c;
		letter-spacing: 2px;
	}
</style>
