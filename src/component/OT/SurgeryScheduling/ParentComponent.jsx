import React from 'react';
import Addnewbook from './addnewbook';

const ParentComponent = () => {
    const handleAddSurgery = (surgeryDetails) => {
        console.log('Surgery Details:', surgeryDetails);
       
    };

    return (
        <div>
            <Addnewbook onAddSurgery={handleAddSurgery} />
        </div>
    );
};

export default ParentComponent;
