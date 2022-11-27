<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'trouvere',
    name: 'トルヴェール',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_DANCER_H', 'JT_DANCER'],
      ['JT_WANDERER'],
      ['JT_TROUVERE'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
