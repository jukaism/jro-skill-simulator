<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'elementalmaster',
    jobName: 'エレメンタルマスター',
  })

  const jobTree: JobTree = {
    name: 'エレメンタルマスター',
    jobCodes: [
      ['JT_MAGICIAN'],
      ['JT_SAGE_H', 'JT_SAGE'],
      ['JT_SORCERER'],
      ['JT_ELEMENTAL_MASTER'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
