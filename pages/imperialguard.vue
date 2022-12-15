<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'imperiialguard',
    jobName: 'インペリアルガード',
  })

  const jobTree: JobTree = {
    name: 'インペリアルガード',
    jobCodes: [
      ['JT_SWORDMAN'],
      ['JT_CRUSADER_H', 'JT_CRUSADER'],
      ['JT_ROYAL_GUARD'],
      ['JT_IMPERIAL_GUARD'],
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
