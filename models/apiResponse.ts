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
  ap_amount: string
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
