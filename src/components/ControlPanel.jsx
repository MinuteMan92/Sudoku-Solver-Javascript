import Radio, { RadioGroup } from 'material-ui/Radio'
import Button from 'material-ui/Button'
import Divider from 'material-ui/Divider'
import { FormControlLabel } from 'material-ui/Form'
import Grid from 'material-ui/Grid'
import Paper from 'material-ui/Paper'
import PropTypes from 'prop-types'
import React from 'react'
import TextField from 'material-ui/TextField'
import Typography from 'material-ui/Typography'
import { actions as appActions } from '../redux/actions/appActions'
import { checkForConflicts } from '../solverFunctions'
import { connect } from 'react-redux'

const ControlPanel = ({
  enabled,
  setEnabled,
  setDisabled,
  focusCell,
  setFocusCell,
  setFocusType,
  focusType,
  sData,
}) => {
  const paperPadding = '10px'
  const paddingStyle = {
    paddingTop: paperPadding,
    paddingBottom: paperPadding,
    paddingLeft: paperPadding,
    paddingRight: paperPadding,
  }

  const createSection = (title, content, hasDivider) => (
    <div style={paddingStyle}>
      <Typography type='title'>{title}</Typography>
      <br />
      {content}
      {hasDivider ? <div><br /><Divider /></div> : null}
    </div>
  )

  return (
    <Paper style={paddingStyle}>

      {
        createSection(
          'Solver',
          (
            <div>
              <Button
                onClick={enabled ? () => setDisabled() : () => setEnabled()}
              >
                {enabled ? 'Start' : 'Stop'}
              </Button>
              <Button
                disabled={!enabled}
              >
                Step
              </Button>
            </div>
          ),
          true
        )
      }


      {
        createSection(
          'Focus Cell',
          (
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  disabled={!enabled}
                  label='Cell ID'
                  onChange={event => setFocusCell(event.target.value)}
                  style={{ width: '50px' }}
                  value={focusCell}
                />
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  onChange={event => setFocusType(event.target.value)}
                  value={focusType}
                >
                  <FormControlLabel control={<Radio />} disabled={!enabled} label='None' value='' />
                  <FormControlLabel control={<Radio />} disabled={!enabled} label='Row' value='row' />
                  <FormControlLabel control={<Radio />} disabled={!enabled} label='Column' value='col' />
                  <FormControlLabel control={<Radio />} disabled={!enabled} label='Box' value='box' />
                </RadioGroup>
              </Grid>
            </Grid>
          ),
          true
        )
      }


      {
        createSection(
          'Solver Functions',
          (
            <div>
              <Button
                disabled={!enabled}
                onClick={() => checkForConflicts(sData)}
              >
                Check For Conflicts
              </Button>
            </div>
          ),
          false
        )
      }


    </Paper>
  )
}


ControlPanel.propTypes = {
  enabled: PropTypes.bool.isRequired,
  focusCell: PropTypes.string.isRequired,
  focusType: PropTypes.string.isRequired,
  sData: PropTypes.object.isRequired,
  setDisabled: PropTypes.func.isRequired,
  setEnabled: PropTypes.func.isRequired,
  setFocusCell: PropTypes.func.isRequired,
  setFocusType: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  enabled: state.app.enabled,
  focusCell: state.app.focusCell,
  focusType: state.app.focusType,
  sData: state.sData.data,
})

const actions = {
  ...appActions,
}

export default connect(mapStateToProps, actions)(ControlPanel)
