import React from 'react';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { cleanup, render } from '@testing-library/react-native';

import configureStore from 'redux-mock-store';

import HomeScreen from '../HomeScreen';

jest.useFakeTimers();

const mockedDispatch = jest.fn();
const mockedNavigate = jest.fn();

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
    useDispatch: () => mockedDispatch
}))

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual('@react-navigation/native');
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: mockedNavigate
        }),
    }
})

describe('<HomeScreen />', () => {

    afterEach(cleanup);

    const mockStore = configureStore([]);

    test('renders correctly', () => {
        const store = mockStore({});

        const { getByTestId, getByText, queryByTestId, toJSON } = render(<HomeScreen />);

        const rendered = toJSON();

        expect(rendered).toMatchSnapshot();
    });
});