<template>
  <div class="AuthManage">
    <div class="search">
      <div class="common_hang">
        <div class="mech">菜单组名称</div>
        <el-input
          v-model="menuGroupName"
          placeholder="请输入"
          clearable
        ></el-input>
      </div>
      <el-button type="primary" @click="getMenuGrpList(1)">查询</el-button>
      <el-button type="primary" @click="addUser">新增</el-button>
    </div>

    <div class="table_list">
      <el-table
        :data="menuGrpList"
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
          prop="menuGroupName"
          label="菜单组名称"
          width="160"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="data_auth"
          label="数据权限"
          width="110"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="orderbyid"
          label="顺序"
          width="60"
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
          width="180"
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
            <el-button size="small" type="primary" @click="menuEdit(scope.row)"
              >关联菜单</el-button
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
              <div class="mech">菜单组名称</div>
              <el-input
                v-model="editMenuGroupName"
                placeholder="请输入机构编码"
                clearable
              ></el-input>
            </div>
            <div class="common_hang">
              <div class="mech">顺序</div>
              <el-input
                v-model="editOrderbyid"
                placeholder="请输入机构名称"
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

      <el-dialog
        title="关联菜单"
        :visible.sync="diaMenuVisible"
        :before-close="diaMenuClose"
        :close-on-click-modal="false"
        width="56%"
        style="text-align: left;"
      >
        <div class="dig">
          <div class="dig_box">
            <div class="common_hang">
              <div class="mech">菜单类型</div>
              <el-select
                v-model="menutype"
                clearable
                @change="changeMenutype"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in menutypeList"
                  :key="item.dd_key"
                  :label="item.dd_value"
                  :value="item.dd_key"
                >
                </el-option>
              </el-select>
            </div>

            <div class="common_hang" style="margin-left: 90px;">
              <el-tree
                :data="treeData"
                show-checkbox
                :default-expand-all="false"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="diaMenuClose">取 消</el-button>
          <el-button type="primary" @click="menuSure">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { disComBox, getMenuGrpList, getMenuList } from "../../api/api";
export default {
  data() {
    return {
      menuGrpList: [],
      menuGroupName: "",
      //添加、修改
      dig_title: "新增",
      dialogFormVisible: false,
      editMenuGroupName: "",
      editOrderbyid: "",
      //关联菜单
      diaMenuVisible: false,
      menutypeList: [],
      menutype: "core",
      menuGroupCode: "",
      treeData: [],
      defaultProps: {
        children: "children",
        label: "text",
      },
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
    init() {
      // 获取所有系统
      disComBox({ comboxType: "menutype" }).then((res) => {
        this.menutypeList = res;
      });
    },

    getMenuGrpList(page) {
      this.pageNum = page;
      var reporParams = {
        menuGroupCode: this.menuGroupName,
        menuGroupName: this.menuGroupName,
        pageNumber: page,
        pageSize: this.pageSize,
        page: 1,
        rows: 10,
      };

      getMenuGrpList(reporParams).then((res) => {
        console.log(res);
        this.menuGrpList = res.rows;
        this.pageTotal = res.total;
      });
    },
    // 确认新增或修改
    sureAdd() {
      console.log(this.editMenuGroupName);
      console.log(this.editOrderbyid);
    },
    pageClick(page) {
      //点击分页
      this.pageNum = page;
      this.getMenuGrpList(page);
    },

    diaMenuClose() {
      this.treeData = [];
      this.diaMenuVisible = false;
    },
    menuEdit(item) {
      this.menuGroupCode = item.menuGroupCode;
      this.changeMenutype();
      this.diaMenuVisible = true;
    },
    //获取权限列表
    changeMenutype() {
      var reporParams = {
        menuGroupCode: this.menuGroupCode,
        menutype: "'" + this.menutype + "'",
      };
      getMenuList(reporParams).then((res) => {
        this.treeData = res;
        var array = [];
        for (var i = 0; i < res.length; i++) {
          let children = res[i].children;
          if (children.length > 0) {
            for (var j = 0; j < children.length; j++) {
              if (children[j].checked == "true") {
                array.push(children[j].id);
              }
            }
          }
        }
        this.$refs.tree.setCheckedKeys(array);
        // this.pageTotal = res.total;
      });
    },
    menuSure() {
      console.log(this.$refs.tree.getCheckedKeys());
    },

    handleEdit(item) {
      console.log(item);
      this.editMenuGroupName = item.menuGroupName;
      this.editOrderbyid = item.orderbyid;
      this.dialogFormVisible = true;
      this.dig_title = "编辑";
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
      this.editMenuGroupName = "";
      this.editOrderbyid = "";
    },
  },
};
</script>

<style scoped>
.AuthManage {
  padding: 30px 30px 10px;
  margin-bottom: -15px;
}
.search {
  display: flex;
  flex-flow: wrap;
  /* padding-bottom: 20px; */
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
