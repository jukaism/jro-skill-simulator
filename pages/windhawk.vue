<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'windhawk',
    jobName: 'ウィンドホーク',
  })

  const jobTree: JobTree = {
    name: 'ウィンドホーク',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_HUNTER_H', 'JT_HUNTER'],
      ['JT_RANGER'],
      ['JT_WINDHAWK'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
