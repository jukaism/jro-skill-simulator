import { JobCode } from './skill'

export interface SkillResponse {
  job_id: number
  job_code: string
  skill_id: number
  tree: number
  code: string
  name: string
  max_lv: number
  skill_type: 'Quest' | 'Soul' | null
  sp_amount: string
  b_separate_lv: 0 | 1
  attack_range: string
  description: string
}

export interface RelationResponse {
  id: number
  to: string
  from: string
  lv: number
  job_code: JobCode
}

export interface JobSkillResponse {
  skills: SkillResponse[]
  relations: RelationResponse[]
}

export interface DescriptionResponse {
  id: number
  name: string
  desc: string
}

export interface OptionResponse {
  name: string
  option_id: number
  slot: number
  max_value: number
}

export interface DivaResponse {
  id: number
  name: string
  world: string
  deal_at: string
  price: number
  refining: number
  detail: string
}

export interface ItemIdNameTypeResponse {
  id: number
  name: string
  eq_type: number
}

export interface ItemDealResponse {
  id: number
  item_id: number
  price: number
  item_count: number
  log_date: string
}

export interface ItemAmountResponse {
  item_id: number
  item_name: string
  payment_type: number
  amount: number
  is_fixed: boolean
  distribute: boolean
  assessment_amount: number
  assessor: string
  sold_amount: number
}
