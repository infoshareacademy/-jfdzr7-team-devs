import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export const InputAutocomplete = ({ id, name, options, label, onChange, value }) => {
    console.log(name)
    return (
        <Autocomplete
            disablePortal
            aria-required="true"
            value={value}
            id={id}
            name={name}
            options={options}
            onChange={onChange}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label={label} />}
        />
    );
}

const portionOptions = [
    { label: "1 porcja", },
    { label: "3 porcje", },
    { label: "5 porcji", },
]
