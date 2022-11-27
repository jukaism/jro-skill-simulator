<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'dragonknight',
    name: 'ドラゴンナイト',
    jobCodes: [
      ['JT_SWORDMAN'],
      ['JT_KNIGHT_H', 'JT_KNIGHT'],
      ['JT_RUNE_KNIGHT'],
      ['JT_DRAGON_KNIGHT'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
