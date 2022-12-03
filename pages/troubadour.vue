<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'troubadour',
    jobName: 'トラバドゥール',
  })

  const jobTree: JobTree = {
    name: 'トラバドゥール',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_BARD_H', 'JT_BARD'],
      ['JT_MINSTREL'],
      ['JT_TROUBADOUR'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
