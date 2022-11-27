export interface SearchItem {
  itemId: number,
  itemName: string,
  cardSlot: number,
  refiningFlag: boolean,
  createFlag: boolean,
  enchantFlag: boolean,
  makeFlag: boolean,
}

export interface ItemDescription {
  itemId: number,
  itemName: string,
  description: string,
}

export interface SearchOption {
  refining: Array<number>,
  pageOfWorld: Array<number>,
}

export interface ListItem {
  randOption: string | null,
  attributeStone: number,
  cardFlag: boolean,
  enchantFlag: boolean,
  itemCount: number,
  itemId: number,
  logDate: Date,
  logDateString: string,
  makeFlag: boolean,
  mapData: string,
  price: number,
  pricePer: string,
  refiningLevel: number,
  rowId: number,
  starPiece: number,
  worldId: string,
  requireDetail: boolean,
  detail: string,
}

export interface LogDetail {
  rowId: number,
  detail: string,
}

export interface DivaOption {
  optionId: number,
  name: string,
  slot: number,
  maxValue: number,
}

export interface DivaLog {
  id: number,
  name: string,
  world: string,
  dealAt: string,
  price: number,
  refining: number,
  detail: string
}

export interface ItemIdNameType {
  id: number,
  name: string,
  type: number
}

export interface ItemDeal {
  rowId: number,
  price: number,
  itemCount: number,
  logDate: number
}

export interface ItemAmount {
  itemId: number | null,
  itemName: string,
  amount: number,
  isFixed: boolean,
  distribute: boolean,
  recentAverage: number,
  lowestPrice: number,
  assessmentAmount: number,
  assessor: string,
  soldAmount: number,
  itemDeals: ItemDeal[]
}
