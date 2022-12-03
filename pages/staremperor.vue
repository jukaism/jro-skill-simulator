<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    code: 'staremperor',
    jobName: '星帝',
  })

  const jobTree: JobTree = {
    name: '星帝',
    jobCodes: [['JT_TAEKWON'], ['JT_STAR'], ['JT_STAR_EMPEROR']],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
