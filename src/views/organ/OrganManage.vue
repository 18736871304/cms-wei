<template>
  <div class="OrganManage">
    <div class="search">
      <div class="common_hang">
        <div class="mech">机构名称</div>

        <el-input
          v-model="organName"
          placeholder="请输入机构名称"
          clearable
        ></el-input>
      </div>
      <div class="common_hang">
        <div class="mech">机构级别</div>
        <el-select v-model="organGrade" clearable placeholder="请选择">
          <el-option
            v-for="item in organGradeList"
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
      <el-button type="primary" @click="getorganList(1)">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="organList"
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
          prop="organCode"
          label="机构编码"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organName"
          label="机构名称"
          width="180"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="organGradeName"
          label="机构级别"
          width="130"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="upOrganCodeName"
          label="上级机构"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="provinceName"
          label="所在省"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="cityName"
          label="所在市"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="countyName"
          label="所在区"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="isstopname"
          label="是否停止"
          width="110"
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
              <div class="mech">机构编码</div>
              <el-input
                v-model="editOrganCode"
                placeholder="请输入机构编码"
                clearable
              ></el-input>
            </div>
            <div class="common_hang">
              <div class="mech">机构名称</div>
              <el-input
                v-model="editOrganName"
                placeholder="请输入机构名称"
                clearable
              ></el-input>
            </div>
            <div class="common_hang">
              <div class="mech">机构级别</div>
              <el-select
                v-model="editOrganGrade"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in organGradeList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">上级机构编码</div>
              <el-input
                v-model="editupOrganCode"
                placeholder="请输入上级机构编码"
                clearable
              ></el-input>
            </div>
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
          <div class="dig_box" style="margin-bottom: 0;">
            <div class="common_hang">
              <div class="mech">所在省</div>
              <el-select
                v-model="editprovinceName"
                clearable
                placeholder="请选择"
                @change="getCity"
              >
                <el-option
                  v-for="item in provinceNameList"
                  :key="item.placecode"
                  :label="item.placename"
                  :value="item.placecode"
                >
                </el-option>
              </el-select>
            </div>
            <div class="common_hang">
              <div class="mech">所在市</div>
              <el-select
                v-model="editcityName"
                clearable
                placeholder="请选择"
                @change="getcounty"
              >
                <el-option
                  v-for="item in cityNameList"
                  :key="item.placecode"
                  :label="item.placename"
                  :value="item.placecode"
                >
                </el-option>
              </el-select>
            </div>
            <div class="common_hang">
              <div class="mech">所在区</div>
              <el-select
                v-model="editcountyName"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="item in countyNameList"
                  :key="item.placecode"
                  :label="item.placename"
                  :value="item.placecode"
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
import {
  provinceCombox,
  cityCombox,
  countyCombox,
  disComBox,
  organquery,
  organinsert,
  organUpdate,
} from "../../api/api";
export default {
  data() {
    return {
      organName: "",
      organGrade: "",
      organGradeList: [],
      isstop: "01",
      isstopList: [],
      organList: [],
      provinceNameList: [],
      cityNameList: [],
      countyNameList: [],
      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,
      editOrganCode: "",
      editOrganName: "",
      editOrganGrade: "",
      editupOrganCode: "",
      editisstop: "",
      editprovinceName: "",
      editcityName: "",
      editcountyName: "",

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
      var params = {
        comboxType: "organgrade",
      };
      disComBox(params).then((res) => {
        this.organGradeList = res;
      });
      var params1 = {
        comboxType: "isstop",
      };
      disComBox(params1).then((res) => {
        this.isstopList = res;
      });
      provinceCombox().then((res) => {
        this.provinceNameList = res;
      });
    },
    getCity() {
      this.editcityName = "";
      this.editcountyName = "";
      if (this.editprovinceName == "") {
        return;
      }
      cityCombox({ province: this.editprovinceName }).then((res) => {
        this.cityNameList = res;
      });
    },
    getcounty() {
      this.editcountyName = "";
      if (this.editcityName == "") {
        return;
      }
      countyCombox({ city: this.editcityName }).then((res) => {
        this.countyNameList = res;
      });
    },

    // 获取表单
    getorganList(page) {
      console.log(this.isstop);
      this.pageNum = page;
      var that = this;
      var reporParams = {
        organName: this.organName,
        organGrade: this.organGrade,
        isstop: this.isstop,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };
      organquery(reporParams).then((res) => {
        console.log(res);
        if (res.code == "1") {
          that.$message({
            type: "error",
            duration: 3000,
            message: res.msg,
          });
        } else {
          this.organList = res.rows;
          this.pageTotal = res.total;
        }
      });
    },
    // 确认新增或修改
    sureAdd() {
      var that = this;
      var params = {
        organCode: this.editOrganCode,
        organName: this.editOrganName,
        organShortName: this.editOrganName,
        organGrade: this.editOrganGrade,
        upOrganCode: this.editupOrganCode,
        Province: this.editprovinceName,
        City: this.editcityName,
        County: this.editcountyName,
        isstop: this.editisstop,
      };

      console.log(params);

      // if (this.isinsert) {
      //   organinsert(params).then((res) => {
      //     console.log(res);
      //     if (res.code == "0") {
      //       that.$message({
      //         type: "success",
      //         duration: 3000,
      //         message: "添加成功",
      //       });
      //     } else {
      //       that.$message({
      //         type: "error",
      //         duration: 3000,
      //         message: "添加失败",
      //       });
      //     }
      //   });
      // } else {
      //   organUpdate(params).then((res) => {
      //     console.log(res);
      //     if (res.code == "0") {
      //       that.$message({
      //         type: "success",
      //         duration: 3000,
      //         message: "修改成功",
      //       });
      //     } else {
      //       that.$message({
      //         type: "error",
      //         duration: 3000,
      //         message: "修改失败",
      //       });
      //     }
      //   });
      // }
    },

    handleEdit(item) {
      console.log(item);
      this.editOrganCode = item.organCode;
      this.editOrganName = item.organName;
      this.editOrganGrade = item.organGrade;
      this.editupOrganCode = item.upOrganCode;
      this.editisstop = item.isstop;

      this.editprovinceName = item.province;
      this.getCity(); //把数字改成汉字
      this.editcityName = item.city;
      this.getcounty(); //把数字改成汉字
      this.editcountyName = item.county;

      this.dialogFormVisible = true;
      this.isinsert = false; //以此判断是添加还是编辑
      this.dig_title = "编辑";
    },

    handleDel(item) {
      var that = this;
      this.$confirm("确认删除吗?", "提示", {
        type: "warning",
      })
        .then(() => {
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
        })
        .catch(() => {
          // 取消操作  
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getorganList(page);
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
      // this.getUserList(1);
    },
    // 取消新增
    cancel() {
      this.dialogFormVisible = false;
      this.clearINput();
      // this.getUserList(1);
    },
    clearINput() {
      this.editOrganCode = "";
      this.editOrganName = "";
      this.editOrganGrade = "";
      this.editupOrganCode = "";
      this.editisstop = "";
      this.editprovinceName = "";
      this.editcityName = "";
      this.editcountyName = "";
    },
  },
};
</script>

<style scoped>
.OrganManage {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  padding-bottom: 20px;
}
/* 这是筛选项的内容 */
.common_hang {
  display: flex;
  width: 270px;
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
