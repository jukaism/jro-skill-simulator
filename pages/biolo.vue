<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'biolo',
    jobName: 'バイオロ',
  })

  const jobTree: JobTree = {
    name: 'バイオロ',
    jobCodes: [
      ['JT_MERCHANT'],
      ['JT_ALCHEMIST_H', 'JT_ALCHEMIST'],
      ['JT_GENETIC'],
      ['JT_BIOLO'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
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
