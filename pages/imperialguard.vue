<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'imperiialguard',
    name: 'インペリアルガード',
    jobCodes: [
      ['JT_SWORDMAN'],
      ['JT_CRUSADER_H', 'JT_CRUSADER'],
      ['JT_ROYAL_GUARD'],
      ['JT_IMPERIAL_GUARD'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
