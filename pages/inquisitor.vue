<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'inquisitor',
    jobName: 'インクイジター',
  })

  const jobTree: JobTree = {
    name: 'インクイジター',
    jobCodes: [
      ['JT_ACOLYTE'],
      ['JT_MONK_H', 'JT_MONK'],
      ['JT_SURA'],
      ['JT_INQUISITOR'],
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
