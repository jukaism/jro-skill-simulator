<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'trouvere',
    jobName: 'トルヴェール',
  })

  const jobTree: JobTree = {
    name: 'トルヴェール',
    jobCodes: [
      ['JT_ARCHER'],
      ['JT_DANCER_H', 'JT_DANCER'],
      ['JT_WANDERER'],
      ['JT_TROUVERE'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
