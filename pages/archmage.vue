<script setup lang="ts">
  import { JobTree } from '~~/models/skill'
  definePageMeta({
    layout: 'skill',
    jobName: 'アークメイジ',
    code: 'archmage',
  })

  const jobTree: JobTree = {
    name: 'アークメイジ',
    jobCodes: [
      ['JT_MAGICIAN'],
      ['JT_WIZARD_H', 'JT_WIZARD'],
      ['JT_WARLOCK'],
      ['JT_ARCH_MAGE'],
    ],
  }

  const jobName = useDisplayJobName()
  jobName.value = jobTree.name
</script>

<template>
  <Html lang="ja">
    <Head>
      <Title>{{
        jobTree.name + 'スキルシミュレータ | やっぱりROが好き！'
      }}</Title>
      <Meta
        name="description"
        :content="`${jobTree.name}の今風リッチスキルシミュレータ`"
      />
    </Head>
  </Html>
  <div> <skill-tree :all-job-codes="jobTree.jobCodes"></skill-tree></div>
</template>
