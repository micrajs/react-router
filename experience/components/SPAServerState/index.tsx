import React from 'react';

export function SPAServerState() {
  if (typeof window === 'undefined') {
    return (
      <script
        id="micra-server-state"
        type="application/json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(use('spa-route-context').getState()),
        }}
      />
    );
  }
  return null;
}
