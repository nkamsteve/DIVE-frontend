import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { replace } from 'react-router-redux';
import styles from '../Analysis.sass';

import RegressionSidebar from './RegressionSidebar';
import RegressionView from './RegressionView';

export class RegressionBasePage extends Component {
  componentWillMount() {
    if (this.props.fieldProperties.items.length > 0 && !this.props.params.dependentVariable) {
      const newDependentVariableId =  (this.props.fieldProperties.items.find((property) => property.generalType == 'q') || this.props.fieldProperties.items.find((property) => property.generalType == 'c')).id
      const regressionType = 'linear';
      this.props.replace(`/projects/${ this.props.params.projectId }/datasets/${ this.props.params.datasetId }/analyze/regression/${ newDependentVariableId }?reg=${ regressionType }`);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fieldProperties, params, replace } = nextProps;
    if (fieldProperties.datasetId == params.datasetId && fieldProperties.items.length > 0 && !params.dependentVariable) {
      const newDependentVariableId = (fieldProperties.items.find((property) => property.name == 'salary' || property.name == 'Intensity') || fieldProperties.items.find((property) => property.generalType == 'q')).id
      replace(`/projects/${ params.projectId }/datasets/${ params.datasetId }/analyze/regression/${ newDependentVariableId }?reg=${ regressionType }`);
    }
  }

  render() {
    return (
      <div className={ `${ styles.fillContainer } ${ styles.regressionContainer }` }>
        <RegressionView />
        <RegressionSidebar />
        { this.props.children }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { fieldProperties } = state;
  return { fieldProperties };
}

export default connect(mapStateToProps, { replace })(RegressionBasePage);
