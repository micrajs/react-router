import React, {useEffect, useState} from 'react';
import {RouteProvider} from '../RouteProvider';

export function Routes() {
  const [route, setRoute] = useState(() =>
    use('spa-route-context').getActiveRoute(),
  );

  useEffect(
    () => use('spa-route-context').on('change:route', setRoute),
    [setRoute],
  );

  return <RouteProvider route={route} />;
}
