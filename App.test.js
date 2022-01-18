import React from 'react';

import { cleanup, render } from '@testing-library/react-native';
import renderer from 'react-test-renderer';


import App from './App';

jest.useFakeTimers();

afterEach(cleanup);

describe('<App />', () => {
    it('renders correctly', () => {
        const tree = renderer.create(<App />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});