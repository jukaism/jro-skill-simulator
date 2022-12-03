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
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
