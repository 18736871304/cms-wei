<template>
  <div class="PasswordManage">
    <div class="search">
      <FilterItem
        :getsonDatas="getsonDatas"
        :selectItem="selectItem"
      ></FilterItem>
      <div class="common_hang">
        <div class="mech">用户姓名</div>
        <el-input v-model="userName" placeholder="请输入" clearable></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">用户编码</div>
        <el-input v-model="userCode" placeholder="请输入" clearable></el-input>
      </div>

      <el-button type="primary" @click="getUserList20(1)">查询</el-button>
      <!-- <el-button type="primary" @click="addUser">新增</el-button> -->
    </div>

    <div class="table_list">
      <el-table
        :data="getUserList"
        :stripe="true"
        border
        :height="tableHeight"
        :row-style="{ height: '50px' }"
        :header-cell-style="{
          background: '#f3f6fd',
          color: '#555',
          height: '50px',
        }"
        highlight-current-row
        style="width: 100%;"
      >
        <el-table-column type="index" width="50"> </el-table-column>
        <el-table-column
          prop="organ02name"
          label="所属省公司"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organcode03name"
          label="所属分公司"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organCodeName"
          label="所属营业部"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userCode"
          label="用户编码"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="userName"
          label="用户姓名"
          width="90"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="operator"
          label="创建人"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="modifyDate"
          label="最后一次操作时间"
          width="160"
          align="center"
        ></el-table-column>

        <el-table-column label="操作" align="center" width="auto">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="primary"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <!-- <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
            > -->
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        background
        @current-change="pageClick"
        :page-size="pageSize"
        :current-page="pageNum"
        layout="total, prev, pager, next"
        :total="pageTotal"
        class="indexPage"
      >
      </el-pagination>
      <el-dialog
        :title="dig_title"
        :visible.sync="dialogFormVisible"
        :before-close="handleClose"
        :close-on-click-modal="false"
        width="56%"
        style="text-align: left;"
      >
        <div class="dig">
          <div class="dig_box" style="margin-bottom: 0;">
            <div class="common_hang">
              <div class="mech">新密码</div>
              <el-input
                v-model="editPassWord"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>
            <div class="common_hang">
              <div class="mech">新密码确认</div>
              <el-input
                v-model="surePassWord"
                placeholder="请输入"
                clearable
              ></el-input>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="sureAdd">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import md5 from "js-md5";
import FilterItem from "../../components/filterItem.vue";
import { disComBox, getUserList20, psdUpdate } from "../../api/api";
export default {
  components: {
    FilterItem,
  },
  data() {
    return {
      getsonDatas: {},
      selectItem: [true, true, true, false, false, false],
      userName: "",
      userCode: "",
      getUserList: [],
      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,
      editUserCode: "",
      editPassWord: "",
      surePassWord: "",
      // editMenuGroupValue: "",

      // 分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,
      tableHeight: 0,
    };
  },
  created() {
    // 100是表格外其它布局占的高度，这个数值根据自己实际情况修改   多一行筛选就多加35
    this.tableHeight = window.innerHeight - 295;
    this.init();
  },
  mounted() {
    // 设置表格高度
    this.tableHeight = window.innerHeight - 295;
    // / 监听浏览器窗口变化，动态计算表格高度，
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - 295;
      })();
    };
  },
  methods: {
    // 初始化
    init() {
      // disComBox({ comboxType: "organgrade" }).then((res) => {
      //   this.organGradeList = res;
      // });
    },
    // 获取表单
    getUserList20(page) {
      this.pageNum = page;
      var that = this;
      var getsonDatas = this.$children[0].selectValue;
      var reporParams = {
        userCode: this.userCode,
        userName: this.userName,
        usertype: "02",
        q02org: getsonDatas.get02OrgValue,
        q03org: getsonDatas.get03OrgValue,
        q04org: getsonDatas.get04OrgValue,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getUserList20(reporParams).then((res) => {
        console.log(res);
        this.getUserList = res.rows;
        this.pageTotal = res.total;
        // if (res.code == "1") {
        //   that.$message({
        //     type: "error",
        //     duration: 3000,
        //     message: res.msg,
        //   });
        // } else {
        // this.organList = res.rows;
        // this.pageTotal = res.total;
        // }
      });
    },

    // 确认修改
    sureAdd() {
      var that = this;
      if (this.editPassWord != this.surePassWord) {
        return;
      }
      var reporParams = {
        userCode: this.edituserCode,
        passWord: md5(this.editPassWord).toUpperCase(),
      };
      psdUpdate(reporParams).then((res) => {
        console.log(res)
        // this.organGradeList = res;
      });
    },

    handleEdit(item) {
      console.log(item);
      this.edituserCode = item.userCode;
      this.dialogFormVisible = true;
      this.dig_title = "编辑";
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getUserList20(page);
    },

    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    clearINput() {
      this.editMenuGroupValue = "";
    },
  },
};
</script>

<style scoped>
.PasswordManage {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  flex-flow: row wrap;
  padding: 0px;
}
/* 这是筛选项的内容 */
.common_hang {
  display: flex;
  width: 270px;
  margin-bottom: 10px;
}
.common_hang .mech {
  width: 100px;
  height: 35px;
  line-height: 35px;
  border: 1px solid #dcdfe6;
  box-sizing: border-box;
  color: #909399;
}
.common_hang .el-input {
  width: 150px;
}
.common_hang .el-input .el-input__inner {
  width: 150px;
  border-radius: 0;
  height: 35px;
}
.common_hang .el-select .el-input {
  width: 150px;
}

/* 筛选项结束 */
.dig {
  text-align: center;
}
.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.dig_box {
  display: flex;
  align-content: center;
  margin-bottom: 25px;
}

.common_hang .el-select {
  width: 150px;
}

.el-button--primary {
  height: 35px !important;
  /* line-height: 35px!important;
  text-align: center!important; */
}
</style>
