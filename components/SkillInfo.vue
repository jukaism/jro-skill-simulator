<template>
  <v-btn class="mt-1" color="info" small>
    使い方
    <v-tooltip activator="parent" location="bottom">
      <div>
        <div class="d-flex justfiy-center align-center flex-column">
          <div> 特定スキルを要求する装備を検索 </div>
          <div>
            <img :src="'/help/skill-eq-1.png'" />
          </div>
          <div class="mt-1">
            追加した装備のスキルを自動習得（100%の正確性は保証できません）
          </div>
          <div>
            <img :src="'/help/skill-eq-2.png'" />
          </div>
          <div class="mt-1"> スキルカードには要件バッジが付く </div>
          <div>
            <img :src="'/help/skill-eq-3.png'" />
          </div>
        </div>
      </div>
    </v-tooltip>
  </v-btn>
</template>

<style>
  .copy {
    font-size: 13px;
  }
</style>
