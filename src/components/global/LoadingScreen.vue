<template>
  <div class="loading-screen">
    <div class="loading-content">
      <h1>Hey Welcome <span>To Ella Mart</span>!</h1>
    </div>
  </div>
</template>
<script></script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  z-index: 9999;
}
@keyframes typing {
  0% {
    width: 0;
  }
  20% {
    width: 20%;
  }
  40% {
    width: 20%;
  }
  100% {
    width: 100%;
  }
}
@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #52e1e2;
  }
}
h1 {
  width: 0%;
  overflow: hidden;
  border-right: 0.15em solid #52e1e2;
  white-space: nowrap;
  color: black;
  animation: typing 1.5s steps(60, end) forwards,
    blink-caret 0.85s step-end infinite;
}
span {
  color: #2725b4;
}
</style>
