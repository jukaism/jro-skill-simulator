<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'troubadour',
    name: 'トラバドゥール',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_BARD_H', 'JT_BARD'],
      ['JT_MINSTREL'],
      ['JT_TROUBADOUR'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
