import withProps from 'recompose/withProps';
import compose from 'recompose/compose';
import setDisplayName from 'recompose/setDisplayName';

import IconButton from 'components/buttons/IconButton';
import * as modal from 'actions/modal';
import { dispatch } from 'store';

const propsMapper = () => ({
    onClick: () => dispatch(modal.actions.showModal()),
    icon: 'icon-add',
});

export default compose(
    setDisplayName('ShowCitiesModalButton'),
    withProps(propsMapper)
)(IconButton);