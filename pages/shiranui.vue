<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'shiranui',
    jobName: '不知火',
  })

  const jobTree: JobTree = {
    name: '不知火',
    jobCodes: [['JT_NINJA'], ['JT_OBORO'], ['JT_SHIRANUI']],
    baseCode: 'OBORO',
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
