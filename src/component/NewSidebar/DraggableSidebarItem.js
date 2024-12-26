// DraggableSidebarItem.js
import React from 'react';
import { useDrag } from 'react-dnd';

function DraggableSidebarItem({ name }) {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'MODULE_ITEM',
        item: { name },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1, cursor: 'move' }}>
            {name}
        </div>
    );
}

export default DraggableSidebarItem;
