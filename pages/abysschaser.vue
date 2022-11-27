<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'abysschaser',
    name: 'アビスチェイサー',
    jobCodes: [
      ['JT_THIEF'],
      ['JT_ROGUE_H', 'JT_ROGUE'],
      ['JT_SHADOW_CHASER'],
      ['JT_ABYSS_CHASER'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
