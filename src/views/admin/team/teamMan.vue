<template>
  <div class="teamMan">
    <div class="search">
      <FilterItem
        :getsonDatas="getsonDatas"
        :selectItem="selectItem"
      ></FilterItem>
      <div class="common_hang">
        <div class="mech">团队名称</div>

        <el-input
          v-model="teamName"
          placeholder="请输入机构名称"
          clearable
        ></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">团队级别</div>
        <el-select v-model="teamgradeValue" clearable placeholder="请选择">
          <el-option
            v-for="item in teamgradeList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <div class="common_hang">
        <div class="mech">是否停止</div>
        <el-select v-model="isstop" clearable placeholder="请选择">
          <el-option
            v-for="item in isstopList"
            :key="item.dd_key"
            :label="item.dd_value"
            :value="item.dd_key"
          >
          </el-option>
        </el-select>
      </div>
      <el-button type="primary" @click="getTeamList(1)">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>
    <div class="table_list">
      <el-table
        :data="teamList"
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
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organ03name"
          label="所属分公司"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organname"
          label="所属营业部"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="teamname"
          label="团队名称"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="teamleadername"
          label="团队长"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="ordernum"
          label="排序"
          width="60"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="teamgradename"
          label="团队级别"
          width="90"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="upteamname"
          label="上级团队"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="isstopname"
          label="是否停止"
          width="90"
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
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">团队名称</div>
              <el-input
                v-model="editTeamName"
                placeholder="请输入机构名称"
                clearable
              ></el-input>
            </div>

            <div class="common_hang">
              <div class="mech">团队长</div>
              <el-select
                v-model="editUserValue"
                clearable
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="userMethod"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.userid"
                  :label="item.userName"
                  :value="item.userid"
                >
                </el-option>
              </el-select>
            </div>
            <div class="common_hang">
              <div class="mech">排序</div>
              <el-input
                v-model="editOrderNum"
                placeholder="请输入机构名称"
                clearable
              ></el-input>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">团队级别</div>
              <el-select
                v-model="editGradeValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in teamgradeList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>
            <div class="common_hang">
              <div class="mech">上级团队</div>
              <el-select
                v-model="editUpteam"
                clearable
                filterable
                remote
                reserve-keyword
                placeholder="请输入关键词"
                :remote-method="upteamMethod"
              >
                <el-option
                  v-for="item in upteamList"
                  :key="item.teamid"
                  :label="item.teamname"
                  :value="item.teamid"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang">
              <div class="mech">所属机构</div>
              <el-select
                v-model="editOrganValue"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in organList"
                  :key="item.organCode"
                  :label="item.organName"
                  :value="item.organCode"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">是否停止</div>
              <el-select v-model="editisstop" clearable placeholder="请选择">
                <el-option
                  v-for="item in isstopList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
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
import FilterItem from "../../../components/filterItem.vue";
import {
  disComBox,
  getTeamList,
  getUserList,
  organdlgquery,
} from "../../../api/api";
export default {
  components: {
    FilterItem,
  },
  data() {
    return {
      teamName: "",
      isstop: "01",
      isstopList: [],
      teamgradeValue: "",
      teamgradeList: [],
      getsonDatas: {},
      selectItem: [true, true, true, false, false, false],
      teamList: [],
      userList: [],
      upteamList: [],
      organList: [],
      //添加 修改
      dig_title: "新增",
      dialogFormVisible: false,
      editTeamName: "",
      editUserValue: "",
      editOrderNum: "",
      editGradeValue: "",
      editUpteam: "",
      editOrganValue: "",
      editisstop: "",
      // 分页
      pageTotal: 0,
      pageSize: 20,
      pageNum: 1,

      tableHeight: 0,
    };
  },
  created() {
    // 100是表格外其它布局占的高度，这个数值根据自己实际情况修改
    this.tableHeight = window.innerHeight - 330;
    this.init();
  },

  mounted() {
    // 设置表格高度
    this.tableHeight = window.innerHeight - 330;
    // / 监听浏览器窗口变化，动态计算表格高度，
    window.onresize = () => {
      return (() => {
        this.tableHeight = window.innerHeight - 330;
      })();
    };
  },

  methods: {
    init() {
      // 获取团队级别
      disComBox({ comboxType: "teamgrade" }).then((res) => {
        this.teamgradeList = res;
      });
      // 获取是否启用机构
      disComBox({ comboxType: "isstop" }).then((res) => {
        this.isstopList = res;
      });
      this.organdlgquery();
    },
    // 获取机构信息
    organdlgquery() {
      var params = {
        isstop: "01",
        organCode: "",
        organName: "",
        organGrade: "05",
      };
      organdlgquery(params).then((res) => {
        console.log(res);
        this.organList = res.rows;
      });
    },
    // 获取员工信息
    userMethod(query) {
      if (query !== "") {
        var params = {
          userCode: "",
          userName: query,
          usertype: "02", //在职人员
        };
        getUserList(params).then((res) => {
          console.log(res);
          this.userList = res.rows;
        });
      }
    },
    //获取上级团队
    upteamMethod(query) {
      var reporParams = {
        teamname: query,
        state: "01",
      };
      getTeamList(reporParams).then((res) => {
        console.log(res);
        this.upteamList = res.rows;
        // this.pageTotal = res.total;
      });
    },

    getTeamList(page) {
      var that = this;
      var getsonDatas = this.$children[0].selectValue;
      console.log(getsonDatas);
      var reporParams = {
        teamname: this.teamName,
        teamgrade: this.teamgradeValue,
        isstop: this.isstop,
        state: "01",
        q02org: getsonDatas.get02OrgValue,
        q03org: getsonDatas.get03OrgValue,
        q04org: getsonDatas.get04OrgValue,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      getTeamList(reporParams).then((res) => {
        console.log(res);
        this.teamList = res.rows;
        this.pageTotal = res.total;
      });
    },

    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getTeamList(page);
    },
    addUser() {
      this.dig_title = "新增";
      this.dialogFormVisible = true;
    },
    handleEdit(item) {
      console.log(item);
      this.editTeamName = item.teamname;
      this.editUserValue = item.teamleader;
      // this.editUserValue = item.teamleadername;
      this.userMethod(item.teamleadername);
      this.editOrderNum = item.ordernum;
      this.editGradeValue = item.teamgrade;
      this.editUpteam = item.upteamid;
      // this.editUpteam = item.upteamname;
      this.upteamMethod(item.upteamname);
      this.editOrganValue = item.organcode;
      this.editisstop = item.isstop;

      this.dig_title = "修改";
      this.dialogFormVisible = true;
    },

    handleDel(item) {
      console.log(item);
    },
    handleClose() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
    },
    sureAdd() {
      // console.log( typeof this.editUpteam);
      // console.log(typeof this.editUserValue);
      console.log(this.editTeamName);
      console.log(this.editUserValue);
      console.log(this.editOrderNum);
      console.log(this.editGradeValue);
      console.log(this.editUpteam);
      console.log(this.editOrganValue);
      console.log(this.editisstop);
    },
    clearINput() {
      this.editTeamName = "";
      this.editUserValue = "";
      this.editOrderNum = "";
      this.editGradeValue = "";
      this.editUpteam = "";
      this.editOrganValue = "";
      this.editisstop = "";
    },
  },
};
</script>

<style scoped>
.teamMan {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  flex-flow: row wrap;
  padding: 0px;
}
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
.common_hang .el-input,
.common_hang .el-select {
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

.indexPage {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;
}
.dig {
  text-align: center;
}
.dig_box {
  display: flex;
  align-content: center;
  margin-bottom: 25px;
}

.el-button--primary {
  height: 35px !important;
  /* line-height: 35px!important;
  text-align: center!important; */
}
</style>
