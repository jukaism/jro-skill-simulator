<script setup lang="ts">
  import { JobTree } from '~~/models/skill'

  const jobTree: JobTree = {
    code: 'archmage',
    name: 'アークメイジ',
    jobCodes: [
      ['JT_MAGICIAN'],
      ['JT_WIZARD_H', 'JT_WIZARD'],
      ['JT_WARLOCK'],
      ['JT_ARCH_MAGE'],
    ],
  }
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
