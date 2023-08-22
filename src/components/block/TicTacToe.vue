<template>
  <div class="centered tictactoe">
    <div id="tictactoe-confetti" />
    <n-grid class="grid gradient" :cols="3">
      <n-gi v-for="(g, i) in gameState" :key="i" class="centered">
        <n-button
          @click="() => play(i)"
          text
          style="font-size: 24px"
          :disabled="g !== undefined"
          aria-label="Tic tac toe case"
        >
          <n-icon>
            <EllipseOutline v-if="g === 'o'" />
            <Close v-if="g === 'x'" />
          </n-icon>
        </n-button>
      </n-gi>
    </n-grid>
    <n-button
      v-if="isOver"
      class="refresh animate__animated animate__pulse animate__infinite"
      @click="() => refresh()"
      text
      style="font-size: 24px"
    >
      <n-icon>
        <Refresh />
      </n-icon>
    </n-button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import confetti from "canvas-confetti";
import { EllipseOutline, Close, Refresh } from "@vicons/ionicons5";

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const isOver = ref(false);
const gameState = ref([]);

const isWinning = () => {
  winningConditions.map((con) => {
    const a = gameState.value[con[0]];
    const b = gameState.value[con[1]];
    const c = gameState.value[con[2]];
    if (a === b && b === c && a === c && a !== undefined) {
      isOver.value = true;
      if (a === "o") {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.9 } });
        confetti({ particleCount: 50, spread: 80, origin: { y: 0.9 } });
        confetti({ particleCount: 20, spread: 110, origin: { y: 1 } });
      }
    }
  });
  if (!gameState.value.filter((g) => !g).length) isOver.value = true;
};

const computerPlay = () => {
  const validIndex = gameState.value.reduce((p, g, i) => {
    !g && p.push(i);
    return p;
  }, new Array());
  const indexChoice = validIndex[Math.floor(Math.random() * validIndex.length)];
  gameState.value[indexChoice] = "x";
};

const play = (i) => {
  if (isOver.value) return;
  gameState.value[i] = "o";
  isWinning();
  if (!isOver.value) {
    computerPlay();
    isWinning();
  }
};

const refresh = () => {
  isOver.value = false;
  gameState.value = [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ];
  computerPlay();
};

refresh();
</script>

<style lang="sass">
.tictactoe
  position: relative
  flex-direction: column
  .grid
    gap: 2px !important
    width: 76px !important
    > div
      transition: color .3s var(--n-bezier), background-color .3s var(--n-bezier), box-shadow .3s var(--n-bezier), border-color .3s var(--n-bezier)
      background-color: var(--n-color)
    .n-button
      &:disabled
        cursor: default
        opacity: 1 !important
  .refresh
    position: absolute
    top: -1.5em
</style>
