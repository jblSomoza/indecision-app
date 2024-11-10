<template>
  <h1>Hola mundo</h1>
  <section>
    <h3>Counter {{ count }}</h3>
    <h3>Square: {{ squareCounter }}</h3>

    <div>
      <button @click="count++">+1</button>
      <button @click="count--">-1</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useCounter } from '../composables/useCounter';
export default defineComponent({
  props: {
    value: {
      type: Number,
      default: 10,
    },
  },
  setup(props) {
    const { count, squareCounter } = useCounter(props.value);

    return {
      count: count,
      squareCounter,
    };
  },
});
</script>
