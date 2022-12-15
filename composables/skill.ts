import { SearchItem, ItemDescription } from '../models/roten'
import {
  SkillResponse,
  JobSkillResponse,
  RelationResponse,
  DescriptionResponse,
} from '../models/apiResponse'
import {
  JobCode,
  SkillTree,
  Skill,
  SkillGroup,
  SkillRelation,
  SkillRequire,
  ItemWithRequires,
  ItemIdAndName,
} from '~/models/skill'
interface WordCandidate {
  word: string
  candidates: SearchItem[]
}

export const useDetailDrawer = () =>
  useState<boolean>('rightDrawer', () => false)
export const useDisplayJobName = () =>
  useState<string>('displayJobName', () => '')
export const useTrees = () => useState<SkillTree[]>('trees', () => [])
export const useSkillGroups = () =>
  useState<SkillGroup[]>('skillGroups', () => [])
export const useSkillRelations = () =>
  useState<SkillRelation[]>('skillRelations', () => [])
export const useSkills = () => useState<Skill[]>('skills', () => [])
export const useSearchWord = () => useState<string>('searchWord', () => '')
export const useSearchCandidates = () =>
  useState<SearchItem[]>('searchCandidates', () => [])
export const useStoredCandidates = () =>
  useState<WordCandidate[]>('storedCandidates', () => [])
export const useSearchItem = () =>
  useState<SearchItem>('searchItem', () => {
    return {
      itemId: 0,
      itemName: '',
      cardSlot: 0,
      refiningFlag: false,
      createFlag: false,
      enchantFlag: false,
      makeFlag: false,
    }
  })
export const useItemsWithRequires = () =>
  useState<ItemWithRequires[]>('itemsWithRequires', () => [])
export const useItemDetail = () =>
  useState<ItemDescription | null>('itemDetail', () => null)
export const useBaby = () => useState<boolean>('baby', () => false)

const treesRef = useTrees()
const skillRelationsRef = useSkillRelations()
const skillsRef = useSkills()
const searchWordRef = useSearchWord()
const searchCandidatesRef = useSearchCandidates()
const storedCandidatesRef = useStoredCandidates()
const itemsWithRequiresRef = useItemsWithRequires()
const relationsRef = useSkillRelations()
const babyRef = useBaby()

export const fetchJob = async ({
  jobCodes,
  params,
  callback,
}: {
  jobCodes: JobCode[]
  params: string
  callback: () => void
}) => {
  const { data: res } = await useFetch<JobSkillResponse>(
    'https://yapparo.net/api/v1/jobs/skills',
    { query: { 'code[]': jobCodes } },
  )
  const jobIds: number[] = []
  const skills: Skill[] = []
  const trees: SkillTree[] = []

  const relations: SkillRelation[] = []
  const allSkillCodes: string[] = []
  jobCodes.forEach(function (jobCode: JobCode) {
    const skillCodes: string[] = []
    let treeSize = 0
    res.value?.skills
      .filter((skiRes: SkillResponse) =>
        [jobCode, jobCode.replace(/_H$/, '')].includes(skiRes.job_code),
      )
      .forEach((skiRes: SkillResponse) => {
        if (!jobIds.includes(skiRes.job_id)) {
          jobIds.push(skiRes.job_id)
        }
        if (skiRes.skill_type !== 'Quest' && skiRes.skill_type !== 'Soul') {
          const id = skiRes.tree
          let desc = skiRes?.description || ''
          const reqOfJob = desc?.match(
            /[0-9]+<span style=\"color: #[0-9a-fA-F]+;\">習得条件 : [^<]+<\/span><br>/g,
          )
          reqOfJob?.forEach((str: string) => {
            if (jobIds.includes(Number(str.match(/^[0-9]+/)))) {
              desc = desc.replace(
                str,
                str.slice(str.match(/^[0-9]+/)?.[0].length),
              )
            } else {
              desc = desc.replace(str, '')
            }
          })
          const spAmounts = Number(skiRes.sp_amount)
          if (
            0 < spAmounts ||
            0 < skiRes.sp_amount?.split(',').filter((sp) => sp !== '0').length
          ) {
            desc += `<hr><div style="text-align: center; color: blue; margin: 5px;">消費SP: ${skiRes.sp_amount}</div>`
          }
          let ap: 'AP+' | 'AP-' | undefined = undefined
          const apAmounts = Number(skiRes.ap_amount)
          if (desc.includes('>AP回復量')) {
            ap = 'AP+'
          }
          if (0 < apAmounts || 0 < skiRes.ap_amount?.split(',').length) {
            desc += `<div style="text-align: center; color: tomato; margin: 5px;">消費AP: ${skiRes.ap_amount}</div>`
            ap = 'AP-'
          }
          skills.push({
            id: id,
            code: skiRes.code,
            name: skiRes.name,
            maxLv: skiRes.max_lv,
            lv: 0,
            description: desc || '未実装',
            imageUrl: 'skill/' + skiRes.code.toLowerCase() + '.png',
            ap,
          })
          allSkillCodes.push(skiRes.code)
          skillCodes.push(skiRes.code)
          treeSize = Math.max(treeSize, skiRes.tree)
        }
      })
    trees.push({
      jobCode,
      skillCodes,
      treeSize,
    })
  })
  const validRelations =
    res.value?.relations.filter(
      (reRes: RelationResponse) =>
        allSkillCodes.includes(reRes.from) && allSkillCodes.includes(reRes.to),
    ) || []
  validRelations
    .filter((reRes: RelationResponse) => !reRes.job_code)
    .forEach((reRes: RelationResponse) => {
      relations.push({
        from: reRes.from,
        to: reRes.to,
        lv: reRes.lv,
      })
    })
  const withJobCode = validRelations.filter(
    (reRes: RelationResponse) =>
      reRes.job_code && jobCodes.includes(reRes.job_code),
  )
  withJobCode.forEach((reRes: RelationResponse) => {
    const exists = relations.filter((rel: SkillRelation) => rel.to === reRes.to)
    exists.forEach((rel: SkillRelation) => {
      const index = relations.indexOf(rel)
      if (index >= 0) {
        relations.splice(index, 1)
      }
    })
  })
  withJobCode.forEach((reRes: RelationResponse) => {
    relations.push({
      from: reRes.from,
      to: reRes.to,
      lv: reRes.lv,
    })
  })
  skillsRef.value = skills
  treesRef.value = trees
  relationsRef.value = relations
  setParams(params)
  callback()
}

// Skill sets <=> URLParameters
export const getParams = (): string => {
  let skills = ''
  skillsRef.value
    .filter((sk: Skill) => sk.id >= 0)
    .forEach((sk: Skill) => {
      skills += String.fromCharCode(sk.lv * 2 + 97)
    })
  if (babyRef.value) {
    skills += '&t=none'
  }
  return skills
}
export const setParams = (params: string) => {
  params.split('').forEach((a: string, index: number) => {
    setSkillLvByIndex({ index, level: (a.charCodeAt(0) - 97) / 2 })
  })
}

export const skillReset = () => {
  skillsRef.value.forEach((skill: Skill) => {
    decrementSkillLv({ target: skill, level: 0 })
  })
}

export const groupReset = (group: SkillGroup) => {
  group.skillIds.forEach((id: number) => {
    const target = skillsRef.value.find((skill: Skill) => skill.id === id)
    if (target) {
      decrementSkillLv({ target, level: 0 })
    }
  })
}

export const jobLv = (): number => {
  return skillsRef.value.reduce(function (sum: number, skill: Skill) {
    return sum + skill.lv
  }, 0)
}

export const changeSkillLv = ({
  skill,
  level,
}: {
  skill: Skill
  level: number
}) => {
  const skillIndex = skillsRef.value.indexOf(skill)
  skillsRef.value[skillIndex].lv = level
}

export const setSkillLv = ({
  name,
  level,
}: {
  name: string
  level: number
}) => {
  const target: Skill | undefined = skillsRef.value.find(
    (skill: Skill) => skill.name === name,
  )
  if (target) {
    incrementSkillLv({ target, level: Math.min(level, target.maxLv) })
    decrementSkillLv({ target, level: Math.max(level, 0) })
  }
}

export const setSkillLvByIndex = ({
  index,
  level,
}: {
  index: number
  level: number
}) => {
  const target: Skill | undefined = skillsRef.value.filter(
    (sk: Skill) => sk.id >= 0,
  )[index]
  if (target) {
    incrementSkillLv({ target, level: Math.min(level, target.maxLv) })
    decrementSkillLv({ target, level: Math.max(level, 0) })
  }
}

export const incrementSkillLv = ({
  target,
  level,
}: {
  target: Skill
  level: number
}) => {
  if (level > target.lv) {
    changeSkillLv({ skill: target, level })
    skillRelationsRef.value
      .filter((relation: SkillRelation) => relation.to === target.code)
      .forEach((relation: SkillRelation) => {
        const from: Skill | undefined = skillsRef.value.find(
          (skill: Skill) => skill.code === relation.from,
        )
        if (from) {
          if (relation.lv > from.lv) {
            incrementSkillLv({ target: from, level: relation.lv })
          }
        }
      })
  }
}

export const decrementSkillLv = ({
  target,
  level,
}: {
  target: Skill
  level: number
}) => {
  if (level < target.lv) {
    changeSkillLv({ skill: target, level })
    skillRelationsRef.value
      .filter((relation: SkillRelation) => relation.from === target.code)
      .forEach((relation: SkillRelation) => {
        const to: Skill | undefined = skillsRef.value.find(
          (skill: Skill) => skill.code === relation.to,
        )
        if (to) {
          if (relation.lv > level) {
            decrementSkillLv({ target: to, level: 0 })
          }
        }
      })
  }
}

export const addSearchCandidates = ({
  word,
  candidates,
}: {
  word: string
  candidates: SearchItem[]
}) => {
  searchCandidatesRef.value = searchCandidatesRef.value.concat(candidates)
  storedCandidatesRef.value = storedCandidatesRef.value.concat({
    word: word,
    candidates: candidates,
  })
}

export const addItemDetail = (itemWithRequires: ItemWithRequires) => {
  const target = itemsWithRequiresRef.value.find(
    (item: ItemWithRequires) =>
      item.searchItem.itemId === itemWithRequires.searchItem.itemId,
  )
  if (!target) {
    itemsWithRequiresRef.value.splice(0, 0, itemWithRequires)
  }
}

export const removeItemDetail = (itemWithRequires: ItemWithRequires) => {
  const target = itemsWithRequiresRef.value.find(
    (item: ItemWithRequires) =>
      item.searchItem.itemId === itemWithRequires.searchItem.itemId,
  )
  if (target) {
    const index = itemsWithRequiresRef.value.indexOf(target)
    if (index >= 0) {
      itemsWithRequiresRef.value.splice(index, 1)
    }
  }
}

export const updateItemDetail = (itemWithRequires: ItemWithRequires) => {
  const target = itemsWithRequiresRef.value.find(
    (item: ItemWithRequires) =>
      item.searchItem.itemId === itemWithRequires.searchItem.itemId,
  )
  if (target) {
    const index = itemsWithRequiresRef.value.indexOf(target)
    itemsWithRequiresRef.value.splice(index, 1, itemWithRequires)
  }
}

export const fetchCandidates = ({
  itemName,
  page,
}: {
  itemName: string
  page: number
}) => {
  if (typeof itemName === 'string' && itemName.length > 1) {
    searchWordRef.value = itemName
    searchCandidatesRef.value = []
    const stored = storedCandidatesRef.value.find(
      (cached: { word: string; candidates: SearchItem[] }) =>
        cached.word === itemName,
    )
    if (stored) {
      searchCandidatesRef.value = stored.candidates
    } else {
      fetchCandidatesRecursion({ itemName: itemName, page: page })
    }
  }
}

export const fetchCandidatesRecursion = async ({
  itemName,
}: {
  itemName: string
  page: number
}) => {
  if (searchWordRef.value !== itemName) {
    return
  }
  const { data: res } = await useFetch<ItemIdAndName[]>(
    'https://yapparo.net/api/v1/candidates/equip',
    { query: { item_name: itemName }, method: 'POST' },
  )

  if (res.value && res.value.length > 0) {
    const searchCandidates: SearchItem[] = res.value.map(
      (item: ItemIdAndName) => {
        return {
          itemId: item.id,
          itemName: item.name.replace('&lt;', '<').replace('&gt;', '>'),
          makeFlag: false,
          cardSlot: 0,
          refiningFlag: false,
          createFlag: false,
          enchantFlag: false,
        }
      },
    )
    if (searchWordRef.value !== itemName) {
      return
    }
    addSearchCandidates({
      word: itemName,
      candidates: searchCandidates,
    })
  } else {
    addSearchCandidates({ word: itemName, candidates: [] })
  }
}

export const fetchItemDetail = async ({
  searchItem,
  callback,
}: {
  searchItem: SearchItem
  callback: () => void
}) => {
  addItemDetail({
    itemName: searchItem.itemName,
    targets: 0,
    searchItem: searchItem,
    itemDescription: null,
    requires: [],
  })
  const { data: res } = await useFetch<DescriptionResponse>(
    'https://yapparo.net/api/v1/item_descriptions/' + searchItem.itemId,
  )
  const descString = res.value?.desc
  if (typeof descString === 'string') {
    const itemDescription: ItemDescription = {
      itemId: searchItem.itemId,
      itemName: searchItem.itemName,
      description: descString,
    }
    const matches: string[] = []
    const desc = descString
      .replace(/<br>/g, '')
      .replace(/─────────────/g, '――――――――――――― ')
    if (desc) {
      const constRequirements = desc.match(
        /[^―]*?(?:\[[^\]]+\]、)*(?:\[[^\]]+\])*\[[^\]]+\](?:(?:Lv|レベル)[0-9]+(?:以上習得|習得)|を?未習得|習得時|の習得(?:Lv|レベル)(?:の合計)?が[0-9]+(?:上がる|以上))[^―]+/g,
      )
      if (constRequirements) {
        matches.push(...constRequirements)
      }
    }
    const requires: SkillRequire[] = []
    const targets: string[] = []
    matches.forEach((extracted: string) => {
      const skills: string[] = []
      const constRequirements = extracted.match(
        /(?:\[[^\]]+\]、)*(?:\[[^\]]+\])*\[[^\]]+\](?:(?:Lv|レベル)[0-9]+(?:以上習得|習得)|を?未習得|習得時|の習得(?:Lv|レベル)(?:の合計)?が[0-9]+(?:上がる|以上))/g,
      )
      if (constRequirements) {
        skills.push(...constRequirements)
      }
      const friendlyDescs: string[] = [] // 説明文ダブリ防止
      skills.forEach((skill: string, index: number) => {
        let subDesc = ''
        const startIndex = extracted.indexOf(skills[index])
        if (index < skills.length - 1) {
          const nextIndex = extracted.indexOf(skills[index + 1])
          subDesc = extracted.substring(startIndex, nextIndex)
        } else {
          subDesc = extracted.substring(startIndex)
        }
        let lv = 0
        if (
          subDesc.match(
            /(?:\]の習得(:?Lv|レベル)(?:の合計)?が[0-9]+上がる)|\]習得時/,
          )
        ) {
          lv = 10
        } else if (subDesc.includes('を未習得')) {
          lv = 0
        } else if (
          subDesc.match(
            /\]の習得(?:Lv|レベル)((?:(?!\]の習得(Lv|レベル)が)[^\s　])+)以上/,
          )
        ) {
          lv = Number(
            subDesc.match(
              /\]の習得(?:Lv|レベル)((?:(?!\]の習得(Lv|レベル)が)[^\s　])+)以上/,
            )?.[1],
          )
        } else if (
          subDesc.match(
            /\](?:Lv|レベル)((?:(?!\](Lv|レベル))[^\s　])+)(?:以上習得|習得)/,
          )
        ) {
          const n =
            subDesc.match(
              /\](?:Lv|レベル)((?:(?!\](Lv|レベル))[^\s　])+)(?:以上習得|習得)/,
            )?.[1] || ''
          lv = Number((n.match(/[0-9]+/) || [1])[0])
        }
        const skillNames: string[] = []
        const skillNameDesc: string =
          subDesc.match(
            /(?:\[[^\]]+\]、)*(?:\[[^\]]+\])*\[[^\]]+\](?:(?:Lv|レベル)[0-9]+(?:以上習得|習得)|を?未習得|習得時|の習得(?:Lv|レベル)(?:の合計)?が[0-9]+(?:上がる|以上))/,
          )?.[0] || ''
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        skillNames.push(...skillNameDesc.match(/\[[^\]]+\]/g)!)
        skillNames.forEach((skillName: string) => {
          let strippedSkillName = skillName.slice(1, -1)
          const skillNameRegExp = new RegExp(strippedSkillName, 'g')
          const friendlyDesc = extracted.replace(
            skillNameRegExp,
            `<span style="color: red;">${strippedSkillName}</span>`,
          )
          switch (strippedSkillName) {
            case '点穴 -黙-':
              strippedSkillName = '点穴 -默-'
              break
            case 'ハウリングマンドラゴラ':
              strippedSkillName = 'ハウリングオブマンドラゴラ'
              break
            case 'へスペルスリット':
              strippedSkillName = 'ヘスペルスリット'
              break
          }
          if (!friendlyDescs.includes(friendlyDesc)) {
            friendlyDescs.push(friendlyDesc)
            const skillRequire: SkillRequire = {
              skillName: strippedSkillName,
              lv: lv,
              description: friendlyDesc,
            }
            requires.push(skillRequire)
          }
          if (targets.indexOf(strippedSkillName) === -1) {
            targets.push(strippedSkillName)
          }
        })
      })
    })
    const itemWithRequires = {
      itemName: searchItem.itemName,
      targets: targets.length,
      searchItem: searchItem,
      itemDescription: itemDescription,
      requires: requires,
    }
    updateItemDetail(itemWithRequires)
    callback()
  }
}
