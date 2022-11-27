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
  code: string // for pathName
  name: string
  jobCodes: JobCode[][]
}

export interface JobTree4 {
  jobCode: JobCode
  skillCodes: string[]
  treeSize: number
}
