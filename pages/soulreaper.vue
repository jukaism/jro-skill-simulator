<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'soulreaper',
    name: 'ソウルリーパー',
    jobCodes: [['JT_TAEKWON'], ['JT_LINKER'], ['JT_SOUL_REAPER']],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
