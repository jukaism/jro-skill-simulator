<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
  })

  const jobTree: JobTree = {
    code: 'inquisitor',
    name: 'インキジター',
    jobCodes: [
      ['JT_ACOLYTE'],
      ['JT_MONK_H', 'JT_MONK'],
      ['JT_SURA'],
      ['JT_INQUISITOR'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
