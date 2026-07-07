<template>
  <div class="loading">
    <div class="loading__loader"></div>
  </div>
</template>

<style lang="scss" scoped>

.loading {
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
  position: absolute;
  display: flex;
  inset: 0;

  &__loader {
    border: 4px solid var(--color-black);
    border-color: var(--color-text-base) #0000;
    animation: l16 1s infinite linear;
    border-radius: 50%;
    aspect-ratio: 1;
    display: grid;
    width: 50px;

    &::before, &::after {    
      border-radius: 50%;
      grid-area: 1/1;
      border: inherit;
      content: "";
      margin: 2px;
    }

    &::before {
      border-color: var(--color-warning) #0000;
      animation-direction: reverse;
      animation-duration: .5s;
      animation: inherit;
    }

    &::after {
      margin: 8px;
    }
  }
}

@keyframes l16 { 
  100%{transform: rotate(1turn)}
}
</style>