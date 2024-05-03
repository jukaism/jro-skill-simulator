<script setup lang="ts">
  definePageMeta({
    layout: 'skill',
    jobName: 'RO',
    code: 'skill',
  })

  interface JobCard {
    name: string
    displayName: string
    solo?: boolean
    compact?: boolean
  }

  const jobs: JobCard[][] = [
    [
      { name: 'dragonknight', displayName: 'Dragon Knight' },
      { name: 'archmage', displayName: 'Arch Mage' },
      { name: 'windhawk', displayName: 'Wind Hawk' },
      { name: 'cardinal', displayName: 'Cardinal' },
    ],
    [
      { name: 'meister', displayName: 'Meister' },
      { name: 'shadowcross', displayName: 'Shadow Cross' },
      { name: 'imperialguard', displayName: 'Imperial Guard' },
      {
        name: 'elementalmaster',
        displayName: 'Elemental Master',
      },
    ],
    [],
    [
      { name: 'troubadour', displayName: 'Troubadour', solo: true },
      { name: 'trouvere', displayName: 'Trouvere', solo: true },
      { name: 'inquisitor', displayName: 'Inquisitor' },
      { name: 'biolo', displayName: 'Biolo' },
      { name: 'abysschaser', displayName: 'Abyss Chaser' },
    ],
    [
      {
        name: 'hypernovice',
        displayName: 'Hyper Novice',
        compact: true,
      },
      {
        name: 'skyemperor',
        displayName: 'Sky Emperor',
        compact: true,
      },
      {
        name: 'soulascetic',
        displayName: 'Soul Ascetic',
        compact: true,
      },
      { name: 'nightwatch', displayName: 'Night Watch', compact: true },
      { name: 'shinkiro', displayName: 'Shinkiro', solo: true, compact: true },
      { name: 'shiranui', displayName: 'Shiranui', solo: true, compact: true },
      {
        name: 'spirithandler',
        displayName: 'Spirit Handler',
        compact: true,
      },
    ],
  ]
  const forOne: JobCard[] = jobs.flat().slice(0, 6)
  const forTwo: JobCard[] = jobs.flat().slice(6, 13)
  const other: JobCard[] = jobs.flat().slice(13)
</script>

<template>
  <div class="mt-5 text-h5 text-medium-emphasis text-center sim-title for-sm"
    >Ragnarok online Skill Simulator</div
  >
  <div class="d-flex flex-column align-center for-lg">
    <div class="d-flex flex-wrap flex-column py-3 px-5 ma-5 jobs-wrapper">
      <div
        v-for="(jobLine, index) in jobs"
        :key="index"
        class="d-flex flex-row flex-norwap justify-space-between"
      >
        <div
          v-if="jobLine.length === 0"
          class="d-flex align-center justify-center text-h4 text-medium-emphasis text-center sim-title"
          >Ragnarok online Skill Simulator</div
        >
        <div
          v-for="(job, jobInd) in jobLine"
          :key="'job' + jobInd"
          class="box"
          :class="{ compact: job.compact }"
        >
          <div class="line_anime">
            <a :href="job.name">
              <div
                class="hover_circle d-flex flex-nowrap align-center justify-center"
              >
                <div class="hover-name"
                  ><span class="hover-text">{{ job.displayName }}</span></div
                >
                <img
                  v-if="!job.solo"
                  class="male"
                  :src="`job/${job.name}-m.png`"
                />
                <!-- <img
                  v-if="!job.solo"
                  class="female"
                  :src="`job/${job.name}-f.png`"
                /> -->
                <img v-else class="solo" :src="`job/${job.name}.png`" />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="d-flex flex-wrap flex-column pa-3 ma-3 jobs-wrapper for-sm">
    <v-card-title>4-1</v-card-title>
    <div class="d-flex flex-row flex-wrap justify-center">
      <a
        v-for="(job, ind) in forOne"
        :key="'job' + ind"
        class="d-flex flex-column align-center justify-center job-name"
        :href="job.name"
      >
        <img
          class="ma-3"
          style="user-select: none"
          :src="`job/${job.name}${job.solo ? '' : '-f'}.png`"
        />
        {{ job.displayName }}
      </a>
    </div>
    <v-card-title>4-2</v-card-title>
    <div class="d-flex flex-row flex-wrap justify-center">
      <a
        v-for="(job, ind) in forTwo"
        :key="'job' + ind"
        class="d-flex flex-column align-center justify-center job-name"
        :href="job.name"
      >
        <img
          class="ma-3"
          style="user-select: none"
          :src="`job/${job.name}${job.solo ? '' : '-f'}.png`"
        />
        {{ job.displayName }}
      </a>
    </div>
    <v-card-title>Others</v-card-title>
    <div class="d-flex flex-row flex-wrap justify-center">
      <a
        v-for="(job, ind) in other"
        :key="'job' + ind"
        class="d-flex flex-column align-center justify-center job-name"
        :href="job.name"
      >
        <img
          class="ma-3"
          style="user-select: none"
          :src="`job/${job.name}${job.solo ? '' : '-f'}.png`"
        />
        {{ job.displayName }}
      </a>
    </div>
  </div>
  <g-g-copy class="pa-5" />
</template>

<style lang="scss" scoped>
  .for-lg {
    display: none !important;
  }
  .jobs-wrapper {
    border: 10px solid #78c79f;
    border-image: linear-gradient(to right bottom, #78c79f 0%, #f4b2df 100%);
    border-image-slice: 1;
  }
  @media screen and (min-width: 850px) {
    .for-sm {
      display: none !important;
    }
    .for-lg {
      display: initial !important;
    }
    .jobs-wrapper {
      border: 20px solid #78c79f;
      border-image: linear-gradient(to right bottom, #78c79f 0%, #f4b2df 100%);
      border-image-slice: 1;
    }
  }
  @media screen and (min-width: 850px) {
    .for-sm {
      display: none !important;
    }
  }
  .sim-title {
    width: 100%;
    font-family: YuGothic, 'Yu Gothic', sans-serif;
  }
  .job-name {
    text-decoration: none;
    color: #333;
    position: relative;
    margin: 0 4px;
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 1;
      display: block;
      width: 100%;
      height: 100%;
      content: '';
      background-color: rgba(0, 0, 0, 0.3);
      opacity: 0;
      transition: all 0.5s ease;
    }
    &:hover::before {
      opacity: 1;
    }
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
  .solo {
    user-select: none;
  }
  .male {
    user-select: none;
  }
  .female {
    user-select: none;
  }
</style>
