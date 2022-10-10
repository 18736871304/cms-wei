import axios from 'axios';
import Qs from "qs";
let base = 'http://101.132.129.58:8081'; //添加域名
//登录
export const login = params => {
  return axios.post(`${base}/api/user/logon`, Qs.stringify(params)).then(res => res.data);
};

//退出登录
export const logout = params => {
  return axios.post(`${base}/api/user/logout`, Qs.stringify(params)).then(res => res.data);
};
//获取菜单
export const getAuthMenuList = params => {
  return axios.post(`${base}/api/menu/getAuthMenuList`, Qs.stringify(params)).then(res => res.data);
};

//获取案件数据
export const getReportList = params => {
  return axios.post(`${base}/api/law/getReportList`, Qs.stringify(params)).then(res => res.data);
};

//新增报告
export const addReport = params => {
  return axios.post(`${base}/api/law/addReport`, Qs.stringify(params)).then(res => res.data);
};

//确认修改报告
export const editReport = params => {
  return axios.post(`${base}/api/law/editReport`, Qs.stringify(params)).then(res => res.data);
};
//删除报告
export const deleteReport = params => {
  return axios.post(`${base}/api/law/deleteReport`, Qs.stringify(params)).then(res => res.data);
};

//获取修改的报告
export const getReportOhterInfo = params => {
  return axios.post(`${base}/api/law/getReportOhterInfo`, Qs.stringify(params)).then(res => res.data);
};

//图文识别
export const tencentOcr = params => {
  return axios.post(`${base}/api/ocr/tencentOcr`, Qs.stringify(params)).then(res => res.data);
};
//文件上传
export const uploadUwFile= params => {
  return axios.post(`${base}/api/law/uploadUwFile`, Qs.stringify(params)).then(res => res.data);
};

//文件变成图片
export const getfileList= params => {
  return axios.post(`${base}/api/law/getLawReportFileListByBuzId`, Qs.stringify(params)).then(res => res.data);
};
// PDF获取对应图片/api/law/getLawReportFileListBySecondId
export const getfileListSec= params => {
  return axios.post(`${base}/api/law/getLawReportFileListBySecondId`, Qs.stringify(params)).then(res => res.data);
};
// 生成PDF
export const createLawPdf= params => {
  return axios.post(`${base}/api/law/createLawPdf`, Qs.stringify(params)).then(res => res.data);
};


// userManage 菜单
//  获取用户列表
export const getUserList= params => {
  return axios.post(`${base}/api/user/getUserList`, Qs.stringify(params)).then(res => res.data);
};
// 新增用户
export const addUser= params => {
  return axios.post(`${base}/api/user/addUser`, Qs.stringify(params)).then(res => res.data);
};
// 修改用户
export const editUser= params => {
  return axios.post(`${base}/api/user/editUser`, Qs.stringify(params)).then(res => res.data);
};
// 删除用户
export const deleteUser= params => {
  return axios.post(`${base}/api/user/deleteUser`, Qs.stringify(params)).then(res => res.data);
};
// AuthManage菜单 /api/menu/getMenuGroupList
// 获取菜单列表
export const getMenuGroupList= params => {
  return axios.post(`${base}/api/menu/getMenuGroupList`, Qs.stringify(params)).then(res => res.data);
};
// 新增菜单
export const addMenuGroup= params => {
  return axios.post(`${base}/api/menu/addMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
// 修改菜单
export const editMenuGroup= params => {
  return axios.post(`${base}/api/menu/editMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
//  删除菜单
export const deleteMenuGroup= params => {
  return axios.post(`${base}/api/menu/deleteMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
// 权限菜单列表
export const getMenuListByMenuGroup= params => {
  return axios.post(`${base}/api/menu/getMenuListByMenuGroup`, Qs.stringify(params)).then(res => res.data);
};
// 关联菜单/api/menu/createMenuRelation
export const createMenuRelation= params => {
  return axios.post(`${base}/api/menu/createMenuRelation`, Qs.stringify(params)).then(res => res.data);
};

// 用户权限菜单
// 获取用户
export const getUserAuthList= params => {
  return axios.post(`${base}/api/user/getUserAuthList`, Qs.stringify(params)).then(res => res.data);
};
// 新增菜单组
export const addUserAuth= params => {
  return axios.post(`${base}/api/user/addUserAuth`, Qs.stringify(params)).then(res => res.data);
};
// 删除菜单
export const deleteUserAuth= params => {
  return axios.post(`${base}/api/user/deleteUserAuth`, Qs.stringify(params)).then(res => res.data);
};
