<script setup lang="ts">
  const tooltip = false
  const clickable = true
</script>

<template>
  <v-tooltip v-model="tooltip" bottom>
    <template #activator="{ on }">
      <v-btn
        v-if="clickable"
        class="mt-1"
        color="info"
        small
        @click="tooltip = !tooltip"
      >
        使い方
      </v-btn>
      <v-btn v-else class="mt-1" color="info" small v-on="on"> 使い方 </v-btn>
    </template>
    <div style="width: 680px; position: relative">
      <div
        class="d-flex justfiy-center align-center"
        style="flex-direction: column"
      >
        <div> 特定スキルを要求する装備を検索 </div>
        <div>
          <v-img :src="'/help/skill-eq-1.png'"></v-img>
        </div>
        <div class="mt-1">
          追加した装備のスキルを自動習得（100%の正確性は保証できません）
        </div>
        <div>
          <v-img :src="'/help/skill-eq-2.png'"></v-img>
        </div>
        <div class="mt-1"> スキルカードには要件バッジが付く </div>
        <div>
          <v-img :src="'/help/skill-eq-3.png'"></v-img>
        </div>
      </div>
    </div>
  </v-tooltip>
</template>

<style>
  .copy {
    font-size: 13px;
  }
</style>
