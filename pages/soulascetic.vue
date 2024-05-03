<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'soulascetic',
    jobName: 'ソウルアセティック',
  })

  const jobTree: JobTree = {
    name: 'ソウルアセティック',
    jobCodes: [
      ['JT_TAEKWON'],
      ['JT_LINKER'],
      ['JT_SOUL_REAPER'],
      ['JT_SOUL_ASCETIC'],
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
