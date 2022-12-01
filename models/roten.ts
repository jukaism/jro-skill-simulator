export interface SearchItem {
  itemId: number
  itemName: string
  cardSlot: number
  refiningFlag: boolean
  createFlag: boolean
  enchantFlag: boolean
  makeFlag: boolean
}

export interface ItemDescription {
  itemId: number
  itemName: string
  description: string
}
