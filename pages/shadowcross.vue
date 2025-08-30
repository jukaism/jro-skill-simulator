<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'shadowcross',
    jobName: 'シャドウクロス',
  })

  const jobTree: JobTree = {
    name: 'シャドウクロス',
    jobCodes: [
      ['JT_THIEF'],
      ['JT_ASSASSIN_H', 'JT_ASSASSIN'],
      ['JT_GUILLOTINE_CROSS'],
      ['JT_SHADOW_CROSS'],
    ],
    baseCode: 'ASSASSIN',
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
  const officialJobBaseName = useOfficialJobBaseName()
  officialJobBaseName.value = jobTree.baseCode
</script>

<template>
  <Html lang="ja">
    <Head>
      <Title>{{
        jobTree.name + 'スキルシミュレータ | やっぱりROが好き！'
      }}</Title>
      <Meta
        name="description"
        :content="`${jobTree.name}の今風リッチスキルシミュレータ`"
      />
    </Head>
  </Html>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
