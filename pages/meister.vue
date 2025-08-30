<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'meister',
    jobName: 'マイスター',
  })

  const jobTree: JobTree = {
    name: 'マイスター',
    jobCodes: [
      ['JT_MERCHANT'],
      ['JT_BLACKSMITH_H', 'JT_BLACKSMITH'],
      ['JT_MECHANIC'],
      ['JT_MEISTER'],
    ],
    baseCode: 'BLACKSMITH',
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
