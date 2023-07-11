import { RuanRequest } from '../../utils'

// 获取达人列表
export const getTalentListApi = (data) => RuanRequest('/dtsTalent/list', data, 'get')

// 获取营销策划师列表
export const getMarketingPlannerListApi = (data) => RuanRequest('/talent/marketerList', data, 'get')

// 获取任务列表
export const getTaskListApi = (data) => RuanRequest('/talentTask/list', data, 'get')

// 获取任务详细列表
export const getTaskDetailApi = (data) => RuanRequest('/talentTask/info', data, 'get')
