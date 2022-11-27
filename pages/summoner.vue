<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'summoner',
    name: 'サモナー',
    jobCodes: [['JT_DO_SUMMONER']],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
