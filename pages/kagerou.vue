<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'kagerou',
    jobName: '影狼',
  })

  const jobTree: JobTree = {
    name: '影狼',
    jobCodes: [['JT_NINJA'], ['JT_KAGEROU']],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
