<template>
  <div class="UserAuthority">
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
        <div class="mech">菜单组名称</div>
        <el-select
          v-model="menuGroupValue"
          clearable
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="menuGroupMethod"
        >
          <el-option
            v-for="item in menuGroupList"
            :key="item.menuGroupCode"
            :label="item.menuGroupName"
            :value="item.menuGroupCode"
          >
          </el-option>
        </el-select>
      </div>

      <el-button type="primary" @click="getUserAuthorList(1)">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="userAuthList"
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
          prop="organ03name"
          label="所属分公司"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organname"
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
          prop="menuGroupName"
          label="菜单组名称"
          width="160"
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
            <el-button type="danger" size="small" @click="handleDel(scope.row)"
              >删除</el-button
            >
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
              <div class="mech">菜单组名称</div>
              <el-select
                v-model="editMenuGroupValue"
                clearable
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="menuGroupMethod"
              >
                <el-option
                  v-for="item in menuGroupList"
                  :key="item.menuGroupCode"
                  :label="item.menuGroupName"
                  :value="item.menuGroupCode"
                >
                </el-option>
              </el-select>
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
import FilterItem from "../../components/filterItem.vue";
import { disComBox, getMenuGrpList, getUserAuthorList } from "../../api/api";
export default {
  components: {
    FilterItem,
  },
  data() {
    return {
      getsonDatas: {},
      selectItem: [true, true, true, false, false, false],
      userName: "",
      menuGroupValue: "",
      menuGroupList: [],
      userAuthList: [],
      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,
      editMenuGroupValue: "",

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
      disComBox({ comboxType: "organgrade" }).then((res) => {
        this.organGradeList = res;
      });
    },

    // 获取表单
    getUserAuthorList(page) {
      var that = this;
      var getsonDatas = this.$children[0].selectValue;
      this.pageNum = page;

      var reporParams = {
        userName: this.userName,
        menuGroupCode: this.menuGroupValue,
        q02org: getsonDatas.get02OrgValue,
        q03org: getsonDatas.get03OrgValue,
        q04org: getsonDatas.get04OrgValue,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getUserAuthorList(reporParams).then((res) => {
        console.log(res);
        this.userAuthList = res.rows;
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

    // 获取菜单组名称
    menuGroupMethod(query) {
      if (query !== "") {
        var params = {
          menuGroupName: query,
        };
        getMenuGrpList(params).then((res) => {
          console.log(res);
          this.menuGroupList = res.rows;
        });
      }
    },

    // 确认新增或修改
    sureAdd() {
      var that = this;
    },

    handleEdit(item) {
      console.log(item);
      this.editMenuGroupValue=item.menuGroupCode
      this.menuGroupMethod(item.menuGroupName)
      this.dialogFormVisible = true;
      // this.isinsert = false; //以此判断是添加还是编辑
      this.dig_title = "编辑";
    },

    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      }).then(() => {
        var reporParams = {
          userToken: sessionStorage.getItem("token"),
          userid: item.userserialno,
        };
        // deleteUser(reporParams).then((res) => {
        //   if (res.code == "0") {
        //     that.$message({
        //       type: "success",
        //       duration: 3000,
        //       message: "删除成功",
        //     });
        //     that.getUserList(1);
        //   } else {
        //     that.$message({
        //       type: "error",
        //       duration: 3000,
        //       message: "删除失败",
        //     });
        //   }
        // });
      });
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getUserAuthorList(page);
    },
    // 打开新增
    addUser() {
      this.dialogFormVisible = true;
      this.isinsert = true;
      this.dig_title = "新增";
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
      this.editMenuGroupValue=''
    },
  },
};
</script>

<style scoped>
.UserAuthority {
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
