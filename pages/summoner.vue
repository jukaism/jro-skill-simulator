<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'summoner',
    jobName: 'サモナー',
  })

  const jobTree: JobTree = {
    name: 'サモナー',
    jobCodes: [['JT_DO_SUMMONER']],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
