
import { mount } from '@vue/test-utils';
import MyCounter from '@/components/MyCounter.vue';

describe('<MyCounter />', () => {
    const value = 5;
    const wrapper = mount(MyCounter, {
        props: {
            value: value,
        }
    });

    test('should match snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot();
    });

    test('renders the counter value correctly', () => {
        expect(wrapper.find('h3').text()).toContain(`Counter ${wrapper.props().value}`);
        expect(wrapper.find('[data-testid="square-label"]').text()).toContain(`Square: ${value * value}`);

        const [counterLabel, squareLabel] = wrapper.findAll('h3');
        expect(counterLabel.text()).toContain(`Counter ${value}`);
        expect(squareLabel.text()).toContain(`Square: ${value * value}`);
    });

    test('emits an event when the increment button is clicked', async () => {
        const btnIncrement = wrapper.find('button');
        await btnIncrement.trigger('click');

        const [counterLabel, squareLabel] = wrapper.findAll('h3');
        const newValue = value + 1;

        expect(counterLabel.text()).toContain(`Counter ${newValue}`);
        expect(squareLabel.text()).toContain(`Square: ${newValue * newValue}`);

    });

    test('emits an event when the decrement button is clicked', async () => {
        const [, btnDecrement] = wrapper.findAll('button');
        await btnDecrement.trigger('click');

        const [counterLabel, squareLabel] = wrapper.findAll('h3');
        const newValue = value;

        expect(counterLabel.text()).toContain(`Counter ${newValue}`);
        expect(squareLabel.text()).toContain(`Square: ${newValue * newValue}`);
    });
});