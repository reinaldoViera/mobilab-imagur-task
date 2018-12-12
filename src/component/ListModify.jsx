import React from 'react'
import { FormControl, InputLabel, Select, Input, MenuItem, withStyles, FormControlLabel, Switch, FormGroup } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
});

function ListModify({ classes, section, changeModifyer, viral, sort, window, loading }) {
    return (
        <FormGroup row>
            <FormControl className={classes.formControl} disabled={loading}>
                <InputLabel shrink htmlFor="age-label-placeholder">
                    Section
          </InputLabel>
                <Select
                    value={section}
                    onChange={(event)=>changeModifyer('section', event.target.value)}
                    input={<Input name="section" id="section-label-placeholder" />}
                    displayEmpty
                    name="section"
                    className={classes.selectEmpty}>
                    <MenuItem value={'hot'}>Hot</MenuItem>
                    <MenuItem value={'top'}>Top</MenuItem>
                    <MenuItem value={'user'}>User</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}  disabled={loading}>
                <InputLabel shrink htmlFor="sort-label-placeholder">
                    Sort
          </InputLabel>
                <Select
                    value={sort}
                    onChange={(event)=>changeModifyer('sort', event.target.value)}
                    input={<Input name="sort" id="sort-label-placeholder" />}
                    displayEmpty
                    name="sort"
                    className={classes.selectEmpty}>
                    <MenuItem value={'viral'}>Viral</MenuItem>
                    <MenuItem value={'top'}>Top</MenuItem>
                    <MenuItem value={'time'}>Time</MenuItem>
                    {
                        section === 'user' && <MenuItem value={'rising'}>Rising</MenuItem>
                    }
                </Select>
            </FormControl>
            {
                section === 'top' &&
                <FormControl className={classes.formControl} disabled={loading}>
                    <InputLabel shrink htmlFor="window-label-placeholder">
                        Window
          </InputLabel>
                    <Select
                        value={window}
                        onChange={(event)=>changeModifyer('window', event.target.value)}
                        input={<Input name="window" id="window-label-placeholder" />}
                        displayEmpty
                        name="window"
                        className={classes.selectEmpty}>
                        <MenuItem value={'day'}>Day</MenuItem>
                        <MenuItem value={'week'}>Week</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                        <MenuItem value={'year'}>Year</MenuItem>
                        <MenuItem value={'all'}>All</MenuItem>
                    </Select>
                </FormControl>
            }
            <FormControlLabel  disabled={loading}
                control={
                    <Switch
                        checked={viral}
                        onChange={()=>changeModifyer('viral', !viral)}
                        value="checkedA" />
                }
                label="Show Viral"
            />
        </FormGroup>
    )
}

export default withStyles(styles)(ListModify);