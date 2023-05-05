import { RuanRequest, HXRequest } from '../../utils'

// 获取达人列表
export const getTalentListApi = data => {
  return RuanRequest('/dtsTalent/list', data, 'get')
}

// 获取营销策划师列表
export const getMarketingPlannerListApi = data => {
  return RuanRequest('/talent/marketerList', data, 'get')
}

// 获取任务列表
export const getTaskListApi = data => {
  return RuanRequest('/talentTask/list', data, 'get')
}

// 获取任务详细列表
export const getTaskDetailApi = data => {
  return RuanRequest('/talentTask/info', data, 'get')
}