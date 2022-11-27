<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'cardinal',
    name: 'カーディナル',
    jobCodes: [
      ['JT_ACOLYTE'],
      ['JT_PRIEST_H', 'JT_PRIEST'],
      ['JT_ARCHBISHOP'],
      ['JT_CARDINAL'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
