<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'elementalmaster',
    name: 'エレメンタルマスター',
    jobCodes: [
      ['JT_MAGICIAN'],
      ['JT_SAGE_H', 'JT_SAGE'],
      ['JT_SORCERER'],
      ['JT_ELEMENTAL_MASTER'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
