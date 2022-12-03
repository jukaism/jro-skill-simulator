<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'dragonknight',
    jobName: 'ドラゴンナイト',
  })

  const jobTree: JobTree = {
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
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
