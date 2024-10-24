import React, { useEffect } from 'react';
import useCustomAlert from './useCustomAlert';

const ExampleComponent = () => {
   
  const { success, warning, error, CustomAlerts } = useCustomAlert();

  return (
    <div>
      <button onClick={() => success('this is a Sucess msg')}>Show Success</button>
      <button onClick={() => warning('This is a warning message!')}>Show Warning</button>
      <button onClick={() => error('This is an error message!',5000)}>Show Error</button>

      {/* Render the CustomAlerts */}
      <CustomAlerts />
    </div>
  );
};

export default ExampleComponent;
