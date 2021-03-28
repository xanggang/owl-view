<template>
  <div>
    <div class="top-row">
      <el-row> <el-button @click="handleOpenAddVie">创建项目</el-button></el-row>
    </div>
    <div class="project-list" v-loading="loading">
      <el-row>
        <el-col :span="6" v-for="item in list" :key="item.id">
          <el-card class="box-card">
            <div slot="header" class="clearfix">
              <span>{{ item.app_name }}</span>
              <el-button
                class="button"
                @click="handleDeleteProject(item.id)"
                type="text"
              >
                删除项目
              </el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
  </div>
</template>

<script>
import { getProjectList, deleteProject, createProject } from '../api/api'
export default {
  name: 'project',
  data () {
    return {
      list: [],
      loading: true,
      dialogTableVisible: false,
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
      }
    }
  },
  methods: {
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
