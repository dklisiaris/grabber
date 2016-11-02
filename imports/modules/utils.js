import React from 'react';
import { _ } from 'meteor/underscore';

export function renderErrorsFor(errors, ref) {
  if (!errors) return false;

  return _.map(errors, (error, key) => {
    if (key == ref && error) {
      return (
        <div key={key} className="error">
          {error}
        </div>
      );
    }
  });
}
