import React from 'react';
import { _ } from 'meteor/underscore';

export function renderErrorsFor(errors, ref) {
  if (!errors) return false;

  return _.map(errors, (error, i) => {
    if (error[ref]) {
      return (
        <div key={i} className="error">
          {error[ref]}
        </div>
      );
    }
  });
}
