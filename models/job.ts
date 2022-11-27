import { SearchItem, ItemDescription } from '../models/roten'

export interface Job {
  name: string,
  maxLv: number,
  skills: Skill[],
}

export interface JobTree {
  jobCode: string,
  skillCodes: string[],
  treeSize: number,
}

export interface Skill {
  id: number,
  code: string,
  name: string,
  maxLv: number,
  lv: number,
  description: string,
  imageUrl: string,
}

export interface SkillGroup {
  name: string,
  skillIds: number[]
}

export interface SkillRelation {
  from: string,
  to: string,
  lv: number,
}

export interface SkillRequire {
  skillName: string,
  lv: number,
  description: string,
}

export interface ItemWithRequires {
  itemName: string,
  targets: number,
  searchItem: SearchItem,
  itemDescription: ItemDescription | null,
  requires: SkillRequire[],
}

export interface ItemIdAndName {
  id: number,
  name: string,
}
