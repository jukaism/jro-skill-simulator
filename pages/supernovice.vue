<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'supernovice',
    name: 'スーパーノービス',
    jobCodes: [['JT_SUPERNOVICE'], ['JT_SUPERNOVICE2']],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
