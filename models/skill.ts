import { SearchItem, ItemDescription } from '../models/roten'

export type JobCode = string
export type JobTypeName =
  | '1st'
  | '2nd'
  | '2nd_native'
  | '3rd'
  | '4th'
  | '1st_sp'
  | '2nd_taekwon'
  | '1st_sp_novice'
  | 'summoner'

export interface JobTree {
  name: string
  jobCodes: JobCode[][]
}

export interface SkillTree {
  jobCode: JobCode
  skillCodes: string[]
  treeSize: number
}

export interface Skill {
  id: number
  code: string
  name: string
  maxLv: number
  lv: number
  description: string
  imageUrl: string
  ap?: 'AP+' | 'AP-'
}

export interface SkillGroup {
  name: string
  skillIds: number[]
}

export interface SkillRelation {
  from: string
  to: string
  lv: number
}

export interface SkillRequire {
  skillName: string
  lv: number
  description: string
}

export interface ItemWithRequires {
  itemName: string
  targets: number
  searchItem: SearchItem
  itemDescription: ItemDescription | null
  requires: SkillRequire[]
}

export interface ItemIdAndName {
  id: number
  name: string
}
