import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '50%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '50%'
    },
    allDescription: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
        flexBasis: '100%'
    },
});

class ControlledExpansionPanels extends React.Component {
    state = {
        expanded: null,
    };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.heading}>
                            <div>
                                <input className = "titleStyle" placeholder = "Topic Name" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
                            </div>
                        </div>
                        <div className={classes.secondaryHeading}>
                            <div>
                            <input className = "titleStyle" placeholder = "Basic Description" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
                        </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.allDescription}>
                            <div>
                                <textarea className = "DescriptionStyle" placeholder="Enter Description ..." type="text" onChange={(e) => this.setState({ note_body: e.target.value })} /> <br />

                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.heading}> <div>
                            <input className = "titleStyle" placeholder = "Topic Name" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
                        </div>
                        </div>
                        <div className={classes.secondaryHeading}>
                            <div>
                                <input className = "titleStyle" placeholder = "Basic Description" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.allDescription}>
                            <div>
                                <textarea className = "DescriptionStyle" placeholder="Enter Description ..." type="text" onChange={(e) => this.setState({ note_body: e.target.value })} /> <br />

                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>


                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div className={classes.heading}> <div>
                            <input className = "titleStyle" placeholder = "Topic Name" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
                        </div>
                        </div>
                        <div className={classes.secondaryHeading}>
                            <div>
                                <input className = "titleStyle" placeholder = "Basic Description" type="text" onChange={(e) => this.setState({ title: e.target.value })} /> <br />
                            </div>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className={classes.allDescription}>
                            <div>
                                <textarea className = "DescriptionStyle" placeholder="Enter Description ..." type="text" onChange={(e) => this.setState({ note_body: e.target.value })} /> <br />

                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

            </div>
        );
    }
}

ControlledExpansionPanels.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);
