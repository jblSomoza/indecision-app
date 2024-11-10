import { useCounter } from "@/composables/useCounter";

describe('useCounter', () => {

    test('initializes counter with default value', () => {
        const { count, squareCounter } = useCounter();

        expect(count.value).toBe(5);
        expect(squareCounter.value).toBe(25);
    });

    test('initializes counter with provided value', () => {
        const initialValue = 10;
        const { count, squareCounter } = useCounter(initialValue);

        expect(count.value).toBe(initialValue);
        expect(squareCounter.value).toBe(initialValue * initialValue);
    });

    test('increments counter by 1', () => {
        const { count, squareCounter, } = useCounter();
        count.value++;

        expect(count.value).toBe(6);
        expect(squareCounter.value).toBe(36);
    });

});