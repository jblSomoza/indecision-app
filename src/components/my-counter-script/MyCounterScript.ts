import { useCounter } from '@/composables/useCounter';
import { defineComponent } from 'vue';

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
            counter: count,
            squareCounter,
        };
    },
});