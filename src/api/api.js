import axios from 'axios';
import Qs from "qs";
let base = 'https://insure.meihualife.com'; //添加域名


//登录
export const login = params => {
  return axios.post(`/logon.do`, Qs.stringify(params)).then(res => res.data);
};

// 获取菜单
export const AuthMenuList = params => {
  params.iamsOpr="D012"
  params.iamsOprName="魏钦录"
  params.logonOrgan=100000000
  params.iamsOprOrgan=100000000
  params.iamsOrganGrade="01"
  return axios.post(`/AuthMenuList.do?userCode=${params.iamsOpr}`, Qs.stringify(params)).then(res => res.data);
};

// 获取省级
export const provinceCombox = params => {
  return axios.post(`/organ/provinceCombox.do`, Qs.stringify(params)).then(res => res.data);
};
// 获取市级
export const cityCombox = params => {
  return axios.post(`/organ/cityCombox.do`, Qs.stringify(params)).then(res => res.data);
};
// 获取区级
export const countyCombox = params => {
  return axios.post(`/organ/countyCombox.do`, Qs.stringify(params)).then(res => res.data);
};
//机构级别
export const disComBox = params => {
  return axios.post(`/combox/disComBox.do`, Qs.stringify(params)).then(res => res.data);
};
//机构信息
export const organquery = params => {
  params.iamsOpr="D012"
  params.iamsOprName="魏钦录"
  params.logonOrgan=100000000
  params.iamsOprOrgan=100000000
  params.iamsOrganGrade="01"
  return axios.post(`/organ/organquery.do`, Qs.stringify(params)).then(res => res.data);
};
//新增机构
export const organinsert = params => {
  params.iamsOpr="D012"
  params.iamsOprName="魏钦录"
  params.logonOrgan=100000000
  params.iamsOprOrgan=100000000
  params.iamsOrganGrade="01"
  return axios.post(`/organ/organinsert.do`, Qs.stringify(params)).then(res => res.data);
};

//修改机构

export const organUpdate = params => {
  params.iamsOpr="D012"
  params.iamsOprName="魏钦录"
  params.logonOrgan=100000000
  params.iamsOprOrgan=100000000
  params.iamsOrganGrade="01"
  return axios.post(`/organ/organUpdate.do`, Qs.stringify(params)).then(res => res.data);
};





