import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
// import Avatar from '@material-ui/core/Avatar';

const styles = {
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 20,
    },
    bigAvatar: {
        width: 80,
        height: 80,
    },
};

function ImageAvatars(props) {
    const { classes } = props;
    return (
        <div className={classes.row}>
            {/* <Avatar
                alt="Your Picture"
                src="https://www.alternativesyouth.org/wp-content/uploads/2016/11/person-icon.png"
                className={classNames(classes.avatar, classes.bigAvatar)}
            /> */}
        </div>
    );
}

ImageAvatars.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImageAvatars);
