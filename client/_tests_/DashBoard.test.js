import React from 'react';
import DashBoard from '../src/containers/DashBoard';

import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer.create(<DashBoard />).toJSON();
    expect(tree).toMatchSnapshot();
});