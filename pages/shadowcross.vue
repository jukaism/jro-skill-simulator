<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'shadowcross',
    name: 'シャドウクロス',
    jobCodes: [
      ['JT_THIEF'],
      ['JT_ASSASSIN_H', 'JT_ASSASSIN'],
      ['JT_GUILLOTINE_CROSS'],
      ['JT_SHADOW_CROSS'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
