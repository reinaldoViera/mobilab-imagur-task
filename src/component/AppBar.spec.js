import {
    mount
} from 'enzyme';
import React from 'react';
import { MyAppBar } from "./AppBar";
import renderer from 'react-test-renderer';

function setup() {
    return {
        history: {
            goBack: jest.fn()
        },
        location: {
            pathname: '/album/fAkEId'
        },
        classes: {

        }
    }
}

describe('AppBar component', () => {
    it('should show arrow back with album route', () => {
        const props = setup();
        const result = renderer.create( 
            <MyAppBar { ...props}/>
        ).toJSON();
        expect(result).toMatchSnapshot();
    });
    it('should go history back on arrow click', () => {
        const props = setup();
        const el = mount( <MyAppBar { ...props}/>);
        el.find('IconButton').simulate('click');
        expect(props.history.goBack.mock.calls.length).toEqual(1);        
    });
})