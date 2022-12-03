<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'supernovice',
    jobName: 'スーパーノービス',
  })

  const jobTree: JobTree = {
    name: 'スーパーノービス',
    jobCodes: [['JT_SUPERNOVICE'], ['JT_SUPERNOVICE2']],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
