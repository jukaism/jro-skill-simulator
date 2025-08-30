<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'skyemperor',
    jobName: '天帝',
  })

  const jobTree: JobTree = {
    name: '天帝',
    jobCodes: [
      ['JT_TAEKWON'],
      ['JT_STAR'],
      ['JT_STAR_EMPEROR'],
      ['JT_SKY_EMPEROR'],
    ],
    baseCode: 'STAR',
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
