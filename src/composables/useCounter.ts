import { computed, ref } from "vue";

// const count = ref(10);
export const useCounter = (initialValue: number = 5) => {

    const count = ref(initialValue);
    const squareCounter = computed(() => count.value * count.value);

    return {
        count,
        squareCounter
    }
}