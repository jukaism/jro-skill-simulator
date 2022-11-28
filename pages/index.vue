<script setup lang="ts">
  definePageMeta({
    layout: 'skill',
  })

  const jobs: {
    name: string
    displayName: string
    dummy: boolean
    compact?: boolean
  }[][] = [
    [
      { name: 'dragonknight', displayName: 'Dragon Knight', dummy: false },
      { name: 'imperialguard', displayName: 'Imperial Guard', dummy: false },
      { name: 'archmage', displayName: 'Arch Mage', dummy: false },
      {
        name: 'elementalmaster',
        displayName: 'Elemental Master',
        dummy: false,
      },
    ],
    [
      { name: 'windhawk', displayName: 'Wind Hawk', dummy: false },
      { name: 'troubadour', displayName: 'Troubadour', dummy: false },
      { name: 'trouvere', displayName: 'Trouvere', dummy: false },
      { name: 'cardinal', displayName: 'Cardinal', dummy: false },
      { name: 'inquisitor', displayName: 'Inquisitor', dummy: false },
    ],
    [],
    [
      { name: 'meister', displayName: 'Meister', dummy: false },
      { name: 'biolo', displayName: 'Biolo', dummy: false },
      { name: 'shadowcross', displayName: 'Shadow Cross', dummy: false },
      { name: 'abysschaser', displayName: 'Abyss Chaser', dummy: false },
    ],
    [
      {
        name: 'supernovice',
        displayName: 'Super Novice',
        dummy: false,
        compact: true,
      },
      {
        name: 'staremperor',
        displayName: 'Star Emperor',
        dummy: false,
        compact: true,
      },
      {
        name: 'soulreaper',
        displayName: 'Soul Reaper',
        dummy: false,
        compact: true,
      },
      { name: 'rebel', displayName: 'Rebellion', dummy: false, compact: true },
      { name: 'kagerou', displayName: 'Kagerou', dummy: false, compact: true },
      { name: 'oboro', displayName: 'Oboro', dummy: false, compact: true },
      {
        name: 'summoner',
        displayName: 'Summoner',
        dummy: false,
        compact: true,
      },
    ],
  ]
</script>

<template>
  <div class="d-flex flex-column align-center">
    <img
      src="skill/top.png"
      width="1000"
      height="1000"
      style="position: relative"
      usemap="#skills"
    />
    <g-g-copy class="pa-5" />
    <div
      class="d-flex flex-wrap flex-column"
      style="position: absolute; top: 196px; width: 755px"
    >
      <div
        v-for="(jobLine, index) in jobs"
        :key="index"
        class="d-flex flex-row flex-norwap justify-space-between job-line"
      >
        <div
          v-for="(job, jobInd) in jobLine"
          :key="'job' + jobInd"
          class="box"
          :class="{ compact: job.compact }"
        >
          <div class="line_anime">
            <a :href="job.name">
              <div class="hover_circle">
                <div class="hover-name"
                  ><span class="hover-text">{{ job.displayName }}</span></div
                >
                <img
                  class="ma-3"
                  style="user-select: none"
                  :src="`job/${job.name}.png`"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .job-line {
    margin-left: 10px;
    min-height: 128px;
  }
  .box {
    box-sizing: border-box;
    display: block;
    width: 130px;
    height: 128px;
    position: relative;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    &.compact {
      width: 105px;
      height: 139px;
    }
  }
  .line_anime {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }
  .line_anime:before,
  .line_anime:after,
  .line_anime a:before,
  .line_anime a:after {
    content: '';
    position: absolute;
    opacity: 0;
    z-index: 10;
    transition: all 0.3s ease;
  }
  .line_anime:before {
    background: linear-gradient(
      to left,
      #78c79f 0%,
      #f4b2df 20%,
      #f4b2df 40%,
      #78c79f 60%,
      #78c79f 80%,
      #f4b2df 100%
    );
    bottom: 0;
    left: -400%;
    width: 500%;
    height: 0;
  }
  .line_anime a:before {
    background: linear-gradient(
      to right,
      #f4b2df 0%,
      #78c79f 20%,
      #78c79f 40%,
      #f4b2df 60%,
      #f4b2df 80%,
      #78c79f 100%
    );
    top: 0;
    right: -400%;
    width: 500%;
    height: 0;
  }
  .line_anime:after {
    background: linear-gradient(
      to bottom,
      #78c79f 0%,
      #78c79f 20%,
      #f4b2df 40%,
      #f4b2df 60%,
      #78c79f 80%,
      #78c79f 100%
    );
    bottom: -400%;
    right: 0;
    width: 0;
    height: 500%;
  }
  .line_anime a:after {
    background: linear-gradient(
      to top,
      #f4b2df 0%,
      #f4b2df 20%,
      #78c79f 40%,
      #78c79f 60%,
      #f4b2df 80%,
      #f4b2df 100%
    );
    top: -400%;
    left: 0;
    width: 0;
    height: 500%;
  }
  .line_anime:hover:before,
  .line_anime:hover a:before {
    height: 5px;
  }
  .line_anime:hover:after,
  .line_anime:hover a:after {
    width: 5px;
  }
  .line_anime:hover:before,
  .line_anime:hover:after,
  .line_anime:hover a:before,
  .line_anime:hover a:after {
    opacity: 1;
  }
  .line_anime:hover:before {
    animation: leftAnim 2s linear 0s infinite;
  }
  .line_anime:hover:after {
    animation: bottomAnim 2s linear 0s infinite;
  }
  .line_anime:hover a:before {
    animation: rightAnim 2s linear 0s infinite;
  }
  .line_anime:hover a:after {
    animation: topAnim 2s linear 0s infinite;
  }
  @keyframes topAnim {
    0% {
      top: -400%;
    }
    100% {
      top: 0;
    }
  }
  @keyframes bottomAnim {
    0% {
      bottom: -400%;
    }
    100% {
      bottom: 0;
    }
  }
  @keyframes rightAnim {
    0% {
      right: -400%;
    }
    100% {
      right: 0;
    }
  }
  @keyframes leftAnim {
    0% {
      left: -400%;
    }
    100% {
      left: 0;
    }
  }
  .hover_circle {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
  }
  .hover_circle:before {
    content: '';
    width: 100%;
    padding: 50% 0;
    position: absolute;
    z-index: 0;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 50%;
    transform: scale(0);
  }
  .hover_circle,
  .hover_circle:before {
    transition: all 0.5s ease;
  }
  .hover_circle:hover:before,
  .hover_circle:focus:before,
  .hover_circle:active:before {
    transform: scale(2);
  }
  .hover-name {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease;
    color: white;
    opacity: 0;
    &:hover {
      opacity: 1;
    }
  }
  .hover-text {
    font-size: 13px;
  }
</style>
