import React, { Children } from 'react';
import {Navigate} from 'react-router-dom';
import {UserAuth} from '../context/AuthContext';


const Protected = ({Children}) => {
    const {user} = UserAuth();
    if(!user){
        return <Navigate to='/form' />;
    }
    return Children;

};

export default Protected;