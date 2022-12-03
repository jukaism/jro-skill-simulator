<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'rebel',
    jobName: 'リベリオン',
  })

  const jobTree: JobTree = {
    name: 'リベリオン',
    jobCodes: [['JT_GUNSLINGER'], ['JT_REBELLION']],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
