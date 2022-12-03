import fs from 'fs'

const jobName: any = {
  abysschaser: 'アビスチェイサー',
  archmage: 'アークメイジ',
  biolo: 'バイオロ',
  cardinal: 'カーディナル',
  dragonknight: 'ドラゴンナイト',
  elementalmaster: 'エレメンタルマスター',
  imperialguard: 'インペリアルガード',
  inquisitor: 'インクイジター',
  kagerou: '影狼',
  meister: 'マイスター',
  oboro: '朧',
  rebel: 'リベリオン',
  shadowcross: 'シャドウクロス',
  soulreaper: 'ソウルリーパー',
  staremperor: '星帝',
  summoner: 'サモナー',
  supernovice: 'スーパーノービス',
  troubadour: 'トラバドゥール',
  trouvere: 'トルヴェール',
  windhawk: 'ウィンドホーク',
  RO: '',
}
const fixHtml = (path: string, code: string) => {
  fs.readFile(path, 'utf-8', (err, data) => {
    if (err) throw err

    const replaced = data
      .replace(/\/skill\/ogp\/skill.png/g, '/skill/ogp/' + code + '.png')
      .replace(
        '>スキルシミュレータ | やっぱりROが好き！',
        '>' +
          (jobName[code] as string) +
          'スキルシミュレータ | やっぱりROが好き！',
      )
      .replace(
        '>スキルシミュレータ | やっぱりROが好き！',
        '"' +
          (jobName[code] as string) +
          'スキルシミュレータ | やっぱりROが好き！',
      )
      .replace(
        /ROの今風リッチスキルシミュレータ/g,
        (jobName[code] as string) + 'の今風リッチスキルシミュレータ',
      )
    fs.writeFile(path, replaced, 'utf-8', (err) => {
      if (err) throw err
      console.log('置換完了')
    })
  })
}
fs.readdirSync('dist').forEach((code) => {
  if (fs.statSync('dist/' + code).isDirectory()) {
    const path = 'dist/' + code + '/index.html'
    if (fs.existsSync(path)) {
      fixHtml(path, code)
    }
  }
})
