<template>
  <div class="manage">
    <!-- 弹窗 -->
    <el-dialog
      :title="modeType === 0 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose"
    >
      <!-- 新增表单 -->
      <el-form
        :inline="true"
        :rules="rules"
        ref="form"
        :model="form"
        class="demo-form-inline"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            v-model.number="form.age"
            placeholder="请输入年龄"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex" placeholder="请选择">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="选择日期时间"
            value-format="yyyy-MM-DD"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" placeholder="请输入地址"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">{{ $t("user.cancle") }}</el-button>
        <el-button type="primary" @click="submit">{{ $t("user.confirm") }}</el-button>
      </span>
    </el-dialog>
		<!-- 表格上面 -->
    <div class="manage-header">
      <el-button type="primary" :disabled="!getPerms[0]" @click="dialogVisible = true">{{ $t("user.add") }}</el-button>
			<el-form :inline='true' :model='userForm'>
				<el-form-item>
					<el-input
						v-model="userForm.name"
						placeholder="请输入姓名"
					></el-input>
				</el-form-item>
				<el-form-item>
      		<el-button type="primary" @click="getList">{{ $t("user.search") }}</el-button>
				</el-form-item>
			</el-form>
    </div>
		<div class="common-table">
		<!-- table组件 -->
			<el-table :data="tableData" stripe height="90%">
				<el-table-column prop="name" label="姓名"> </el-table-column>
				<el-table-column prop="age" label="年龄"></el-table-column>
				<el-table-column prop="sex" label="性别">
					<!-- 由于性别数据需要额外处理，使用自定义列插槽 -->
					<template slot-scope="scope">
						<!-- scope.row可以获取当前行的数据 -->
						<span>{{ scope.row.sex === 1 ? "男" : "女" }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="birth" label="出生日期"> </el-table-column>
				<el-table-column prop="addr" label="地址"> </el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button size="mini" :disabled="!getPerms[1]" @click="handleEdit(scope.row)">{{ $t("user.edit") }}</el-button>
						<el-button size="mini" :disabled="!getPerms[2]" type="danger" @click="handleDelete(scope.row)">{{ $t("user.delete") }}</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页组件 -->
			<div class="pager">
				<el-pagination
				layout="prev, pager, next"
				:total="total"
				:page-size="20"
				@current-change='checkPage'>
				</el-pagination>
			</div>
		</div>
  </div>
</template>

<script>
import { getUser, addUser, editUser, delUser } from "../api";
import { mapState } from "vuex";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        name: "",
        age: "",
        sex: "",
        birth: "",
        addr: "",
      },
      // 配置表单域的内容验证
      rules: {
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        age: [
          { required: true, message: "年龄不能为空", trigger: "blur" },
          { type: "number", message: "年龄必须为数字" },
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        birth: [{ required: true, message: "请选择日期", trigger: "change" }],
        addr: [{ required: true, message: "请输入地址", trigger: "blur" }],
      },
      tableData: [],
      // 判断是新增还是编辑,0为新增
      modeType: 0,
			// 表格数据的总条数
			total:0,
			// 获取具体分页的数据
			pageData: {
				page: 1,
				limit: 20
			},
			userForm:{
				name:''
			}
    };
  },
  computed: {
    ...mapState({
      perms: state => state.user.perms
    }),
    // 获取权限
    getPerms() {
      let permsList = this.perms || JSON.parse(sessionStorage.getItem("perms"))
      return permsList
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 验证通过，提交表单
          // 判断是新增还是编辑
          if (this.modeType === 0) {
            addUser(this.form).then(({ data }) => {
              console.log(data.data.message);
              // 更新列表
              this.getList();
            });
          } else {
            editUser(this.form).then(({ data }) => {
              console.log(data.data.message);
              // 更新列表
              this.getList();
            });
          }
          this.handleClose();
        }
      });
    },
    // 关闭弹窗
    handleClose() {
      // 重置form数值
      this.$refs.form.resetFields();
      // 关闭dialog
      this.dialogVisible = false;
    },
    // 新增用户
    handleAdd() {
      this.modeType = 0;
      this.dialogVisible = true;
    },
    // 修改用户
    handleEdit(row) {
      this.modeType = 1;
      this.dialogVisible = true;
      // 需要注意的是，不能直接赋值给form，会导致对象共用，需深拷贝
      this.form = JSON.parse(JSON.stringify(row));
    },
    // 删除用户
    handleDelete(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
					console.log(row.id);
          delUser({ id:row.id }).then(({ data }) => {
						console.log(data.message);
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
		checkPage(val) {
			this.pageData.page = val
			this.getList()
		},
    // 获取列表
    getList() {
      getUser({ params:{...this.userForm, ...this.pageData}}).then((res) => {
        this.tableData = res.data.list;
				this.total = res.data.count || 0
				// 搜索完成重置数据
				// this.pageData.page = 1
				// this.userForm.name = ''
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
	height: 90%;
	.manage-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.common-table {
		padding: 5px;
		position: relative;
		height: calc(100% - 40px);
		.pager {
			position: absolute;
			bottom: 0;
			right: 20px;
		}
	}
}
</style>