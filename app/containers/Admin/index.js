/**
 *
 * Admin
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FormattedMessage } from "react-intl";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { Link } from 'react-router-dom'
import { useInjectSaga } from "utils/injectSaga";
import { useInjectReducer } from "utils/injectReducer";
import makeSelectAdmin from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import messages from "./messages";

export function Admin() {
  useInjectReducer({ key: "admin", reducer });
  useInjectSaga({ key: "admin", saga });

  return (
    <div>
      <Helmet>
        <title>Admin</title>
        <meta name="description" content="Description of Admin" />
      </Helmet>
      <FormattedMessage {...messages.header} />
      <Link to="/">Home</Link>

    </div>
  );
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  admin: makeSelectAdmin()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(Admin);
