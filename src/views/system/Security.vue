<template>
  <div class="main">
    <div class="title">安全设置</div>
    <a-spin size="large" :spinning="spinning">
      <div>
        <a class="item-title" type="link">账号密码</a>
        <a-button class="btn" @click="passwordVisible = true" type="link">修改</a-button>
        <p class="des">账号密码： {{ show ? "123456" : '********' }}
<!-- 		<p class="des">账号密码： {{ show ? this.$store.state.user.details.password : '********' }} -->
          <a @click="show = !show" style="padding-left: 10px">
            <a-icon :type="!show ? 'eye' : 'eye-invisible' "/>
          </a>
        </p>
        <a-divider/>
      </div>
      <div>
        <a class="item-title" type="link">绑定邮箱</a>
        <a-button class="btn" @click="emailVisible = true" type="link">修改</a-button>
        <!-- <p class="des">已绑定邮箱： {{ this.$store.state.user.details.email }}</p> -->
		<p class="des">已绑定邮箱： "乔俊是🐖"</p>
        <a-divider/>
      </div>
    </a-spin>

    <a-modal
        title="密码修改"
        :visible="passwordVisible"
        @ok="submit"
        @cancel="passwordVisible = false"
    >
      <a-form-model :model="admin">
        <a-form-model-item label="密码">
          <a-input v-model="admin.password"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="邮箱修改"
        :visible="emailVisible"
        @ok="submit"
        @cancel="emailVisible = false"
    >
      <a-form-model :model="admin">
        <a-form-model-item label="绑定邮箱">
          <a-input v-model="admin.email"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
//import {SaveAdmin} from "@/api/admin";

export default {
  name: "Me",

  data() {
    return {
      //admin: this.$store.state.user.details,
	  admin :{email:"乔俊是猪",password:"乔俊你好"},
      show: false,
      emailVisible: false,
      passwordVisible: false,
      spinning: false,
    }
  },

  mounted() {
    this.load()
  },


  methods: {

    load() {
      this.spinning = true
      setTimeout(() => {
        this.spinning = false
      }, 500)
    },

    submit() {
      // SaveAdmin(this.admin).then((res) => {
      //   if (res.status) {
      //     this.$message.success("账号信息修改成功")
      //     this.$store.commit('user/saveLoginUser', res.data)
      //   }
      // })
      this.emailVisible = false
      this.passwordVisible = false
      this.load()
    },

  }

}
</script>

<style scoped>
.main {
  background: #ffffff;
  padding: 50px 70px;
}

.title {
  letter-spacing: 1px;
  font-size: 20px;
  font-weight: bolder;
  color: #000000;
  margin-bottom: 30px;
}

.btn {
  float: right;
}

.item-title {
  color: rgba(0, 0, 0, .8);
  line-height: 35px;
}

.item-title:hover {
  color: #5a84fd;
}

.des {
  color: rgba(0, 0, 0, .5);
}
</style>