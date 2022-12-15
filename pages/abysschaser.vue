<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    jobName: 'アビスチェイサー',
    code: 'abysschaser',
  })

  const jobTree: JobTree = {
    name: 'アビスチェイサー',
    jobCodes: [
      ['JT_THIEF'],
      ['JT_ROGUE_H', 'JT_ROGUE'],
      ['JT_SHADOW_CHASER'],
      ['JT_ABYSS_CHASER'],
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
