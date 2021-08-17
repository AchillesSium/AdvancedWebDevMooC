import React from 'react';
import { Entry } from '../types';
import EntryDetails from './EntryDetails';

const Entries = ( { entries } : { entries: Entry[]}) => {

    if (entries.length === 0) {
        return <h3>Patient has no entries.</h3>;
    }

    return (
        <div>
            <h3>entries</h3>
            {entries.map(e => {
                return (
                    <EntryDetails key={e.id} entry={e}/>
                );
        })}
        </div>
    );
    
};

export default Entries;
