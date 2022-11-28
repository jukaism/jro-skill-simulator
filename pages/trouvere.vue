<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
  })

  const jobTree: JobTree = {
    code: 'trouvere',
    name: 'トルヴェール',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_DANCER_H', 'JT_DANCER'],
      ['JT_WANDERER'],
      ['JT_TROUVERE'],
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
