import React, { Component } from 'react';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';

const selectChildren = (structures, id) => {
    return Object.keys(structures)
        .filter((s, i) => structures[s].parent == id)
        .map((s, i) => ({ "id": s, "name": structures[s].name }));
}
const Structure = ({ structures, onSelectedItemsChange, selectedItems, ref }) => {
    let parents = Object.keys(structures)
        .filter((s, i) => (structures[s].parent == 0))
        .map((s, i) => ({ "id": s, "name": structures[s].name, children: selectChildren(structures, s) }));
    return (
        <SectionedMultiSelect
            ref={SectionedMultiSelect => {
                if (ref)
                    ref(SectionedMultiSelect);
            }}
            items={parents}
            uniqueKey="id"
            subKey="children"
            selectText="selected department..."
            showDropDowns={false}
            readOnlyHeadings={false}
            single={true}
            onSelectedItemsChange={onSelectedItemsChange}
            selectedItems={selectedItems}
            colors={{ primary: '#2a8aed' }}
        />);
};
export { Structure };
