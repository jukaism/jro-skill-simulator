<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'meister',
    name: 'マイスター',
    jobCodes: [
      ['JT_MERCHANT'],
      ['JT_BLACKSMITH_H', 'JT_BLACKSMITH'],
      ['JT_MECHANIC'],
      ['JT_MEISTER'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
