import React from 'react'
import { ProvideAuth } from '../services/account.service';
import ProviderDishService from '../services/thucan.service';

function AppProvider({ children }) {
  return (
    <ProviderDishService>
      <ProvideAuth>
        {children}
      </ProvideAuth>
    </ProviderDishService>
  );
}

export default AppProvider