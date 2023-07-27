<template>
  <div>
    <FilterItem
      :getsonDatas="getsonDatas"
      :selectItem="selectItem"
    ></FilterItem>
    <div @click="getson">搜索</div>
    <div @click="chongzhi">重置</div>
  
  </div>
</template>

<script>
import FilterItem from "../../components/filterItem.vue";
export default {
  components: {
    FilterItem,
  },
  data() {
    return {
      getsonDatas: {},
      selectItem: [true, true, true, false, false, false],
    };
  },
  methods: {
    getson() {
      this.getsonDatas = this.$children[0].selectValue;
      console.log(this.getsonDatas);
    },
    chongzhi() {
      this.getsonDatas = {
        get02OrgValue: "",
        get03OrgValue: "",
        get04OrgValue: "",
        getTeamValue: "",
        getTeamId: "",
      };
    },
  },
};
</script>

<style scoped></style>
