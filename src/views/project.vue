<template>
  <div>
    <div class="top-row">
      <el-row> <el-button @click="handleOpenAddVie">创建项目</el-button></el-row>
    </div>
    <div class="project-list" v-loading="loading">
      <div class="card-wrap">
        <div
          class="card"
          v-for="(item, index) in list"
          :key="item.id"
          :style="{'background': getBackGround(index)}"
          @click="handleOpenDetail(item)"
        >
          <div class="title-wrap">
            <div class="logo"><img src="../assets/logo.png" alt=""></div>
            <div class="title">{{ item.app_name }}</div>
          </div>
          <div class="user-wrap">
            <div class="item">
              <span>活跃用户: </span>
              <span>199962</span>
            </div>
            <div class="item">
              <span>总访问量: </span>
              <span>199962</span>
            </div>
          </div>
          <i class="delete el-icon-circle-close" @click.stop="handleDeleteProject(item.id)"></i>
        </div>
      </div>
    </div>

    <el-dialog title="创建项目" :visible.sync="dialogTableVisible">
      <el-form
        ref="form"
        :model="form"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item label="项目名称"  prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="项目id" prop="appKey">
          <el-input v-model="form.appKey"></el-input>
          <span class="tip">上传map文件和日志的时候需要携带</span>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="项目详情" :visible.sync="dialogDetailVisible">
      <div class="project-detail">
        <div class="item">
          <span>创建者:</span>
          <span>纳西</span>
        </div>
        <div class="item">
          <span>项目名称:</span>
          <span>{{ projectDetail.app_name }}</span>
        </div>
        <div class="item">
          <span>appKey:</span>
          <span>{{ projectDetail.app_key }}</span>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogDetailVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getProjectList, deleteProject, createProject } from '../api/api'
const config = [
  'linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)',
  'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
  'linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%)'
]
export default {
  name: 'project',
  data () {
    return {
      config,
      list: [],
      loading: true,
      dialogTableVisible: false,
      dialogDetailVisible: false,
      form: {
        name: '',
        appKey: ''
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入项目名称',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ],
        appKey: [
          {
            required: true,
            message: '请填写',
            trigger: 'change'
          }
        ]
      },
      projectDetail: {}
    }
  },
  methods: {
    handleOpenDetail (item) {
      this.projectDetail = item
      this.dialogDetailVisible = true
    },
    getBackGround (index) {
      return config[index]
    },
    async getList () {
      this.loading = true
      const list = await getProjectList()
      this.list = list
      this.$store.commit('project/saveProjectList', list || [])
      this.loading = false
    },
    handleDeleteProject (id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteProject(id)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    async deleteProject (id) {
      this.loading = true
      const res = await deleteProject(id)
        .finally(() => {
          this.loading = false
        })
      if (res) {
        this.$message.success('删除成功')
        await this.getList()
      }
    },
    handleOpenAddVie () {
      this.dialogTableVisible = true
    },
    async onSubmit () {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          const res = await createProject({
            app_name: this.form.name,
            app_key: this.form.appKey
          })

          if (res) {
            this.$message.success('创建成功')
            this.dialogTableVisible = false
            await this.getList()
          }
        }
      })
    }
  },
  mounted () {
    this.getList()
  }
}
</script>

<style lang="less" scoped>

.top-row {
  display: flex;
  justify-content: flex-end;
}

.project-list {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;
  margin-top: 20px;
  .box-card {
    width:  300px;
    height: 500px;
    margin-bottom: 10px;
    .item {
      width: 100%;
      height: 100%;
    }
  }

  .card-wrap {
    display: flex;
    flex-wrap: wrap;

    .card {
      width: 300px;
      height: 200px;
      background: pink;
      border-radius: 3px;
      margin-left: 10px;
      margin-bottom: 10px;
      padding: 20px;
      box-shadow:  4px 5px 6px 0 rgb(0 0 0 / 11%);
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        box-shadow:  4px 5px 6px 0 rgb(0 0 0 / 20%);
      }

      .title-wrap {
        display: flex;
        align-items: center;
        .logo {
          width: 40px;
          height: 40px;
          background: #fff;
          padding: 3px;
          border-radius: 5px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            width: 80%;
            //height: 05%;
          }
        }
        .title {
          margin-left: 15px;
          color: #fff;
          font-size: 22px;
          font-weight: bold;
          text-shadow: 1px 1px 1px rgba(0,0,0, 0.3);
        }
      }

      .user-wrap {
        font-size: 14px;
        color: #333;

        .item {
          margin-top: 10px;
        }
      }

      .content {
        font-size: 14px;
        color: #fff;
        margin-top: 20px;
      }

      .delete {
        position: absolute;
        top: 10px;
        right: 10px;
        color: #fff;
        cursor: pointer;
        transition: all 0.3s;
        &:hover {
          color: red;
          transform: scale(1.2);
        }
      }
    }
  }
}

.project-detail {

  .item {
    margin-top: 10px;
    color: #333;
    font-size: 14px;
    & > span:first-child {
      margin-right: 10px;
    }
  }

}

.button {
  float: right!important;
  padding: 3px 0
}

.tip {
  color: #fc5a5a;
  font-size: 12px;
}
</style>
