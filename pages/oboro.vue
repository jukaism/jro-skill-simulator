<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'oboro',
    jobName: '朧',
  })

  const jobTree: JobTree = {
    name: '朧',
    jobCodes: [['JT_NINJA'], ['JT_OBORO']],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
