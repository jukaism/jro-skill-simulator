<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'cardinal',
    jobName: 'カーディナル',
  })

  const jobTree: JobTree = {
    name: 'カーディナル',
    jobCodes: [
      ['JT_ACOLYTE'],
      ['JT_PRIEST_H', 'JT_PRIEST'],
      ['JT_ARCHBISHOP'],
      ['JT_CARDINAL'],
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
