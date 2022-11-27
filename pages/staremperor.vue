<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'staremperor',
    name: '星帝',
    jobCodes: [['JT_TAEKWON'], ['JT_STAR'], ['JT_STAR_EMPEROR']],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
