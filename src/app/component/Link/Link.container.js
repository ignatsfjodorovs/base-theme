/* eslint-disable react/prop-types */

/**
 * ScandiPWA - Progressive Web App for Magento
 *
 * Copyright © Scandiweb, Inc. All rights reserved.
 * See LICENSE for license details.
 *
 * @license OSL-3.0 (Open Software License ("OSL") v. 3.0)
 * @package scandipwa/base-theme
 * @link https://github.com/scandipwa/base-theme
 */

import PropTypes from 'prop-types';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import { appendWithStoreCode } from 'Util/Url';

import Link from './Link.component';

const mapStateToProps = (state) => ({
    baseLinkUrl: state.ConfigReducer.base_link_url
});

export class LinkContainer extends PureComponent {
    static propTypes = {
        baseLinkUrl: PropTypes.string.isRequired,
        to: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object
        ]).isRequired
    };

    containerProps = () => {
        const {
            block,
            elem,
            mods,
            mix,
            baseLinkUrl, // remove this prop
            dispatch, // remove this prop
            ...restProps
        } = this.props;

        return {
            ...restProps,
            to: this.getTo(),
            bemProps: {
                block,
                elem,
                mods,
                mix
            }
        };
    };

    getTo() {
        const { to } = this.props;

        if (typeof to === 'string') {
            // in case this URL is absolute, do not append store
            if (/^https?:\/\//.test(to)) {
                return to;
            }

            return appendWithStoreCode(to);
        }

        const { pathname } = to;

        return {
            pathname: appendWithStoreCode(pathname),
            ...to
        };
    }

    render() {
        return (
            <Link
              { ...this.containerProps() }
            />
        );
    }
}

export default connect(mapStateToProps)(LinkContainer);
