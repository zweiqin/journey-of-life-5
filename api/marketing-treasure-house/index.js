import { RuanRequest } from "../../utils";

// 获取行业详情列表
export const getIndustryInformationListApi = (data) => {
  return RuanRequest("/richText/list", data, "get");
};

// 获取行业详情列表详情
export const getIndustryInformationDetalApi = (acticleId) => {
  return RuanRequest("/richText/detail", { id: acticleId }, "get");
};

// 提交达人申请
export const submitApplyApi = data => {
  return RuanRequest('/dtsTalent/submitBox', data)
}