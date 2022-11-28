<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
  })

  const jobTree: JobTree = {
    code: 'dragonknight',
    name: 'ドラゴンナイト',
    jobCodes: [
      ['JT_SWORDMAN'],
      ['JT_KNIGHT_H', 'JT_KNIGHT'],
      ['JT_RUNE_KNIGHT'],
      ['JT_DRAGON_KNIGHT'],
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
      <Meta name="description" :content="`${jobTree.name}スキルシミュレータ`" />
    </Head>
  </Html>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
