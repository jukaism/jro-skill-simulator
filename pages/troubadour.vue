<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'troubadour',
    jobName: 'トルバドゥール',
  })

  const jobTree: JobTree = {
    name: 'トルバドゥール',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_BARD_H', 'JT_BARD'],
      ['JT_MINSTREL'],
      ['JT_TROUBADOUR'],
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
