<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'biolo',
    name: 'バイオロ',
    jobCodes: [
      ['JT_MERCHANT'],
      ['JT_ALCHEMIST_H', 'JT_ALCHEMIST'],
      ['JT_GENETIC'],
      ['JT_BIOLO'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
