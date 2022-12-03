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
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
