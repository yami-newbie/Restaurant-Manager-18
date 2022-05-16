import React from 'react'
import { ProvideAuth } from '../services/account.service';
import ProviderCTOrderService from '../services/ct_hoadon.service';
import ProviderOrderService from '../services/hoadon.service';
import ProviderDishService from '../services/thucan.service';

function AppProvider({ children }) {
  return (
    <ProviderDishService>
      <ProviderOrderService>
        <ProviderCTOrderService>
          <ProvideAuth>{children}</ProvideAuth>
        </ProviderCTOrderService>
      </ProviderOrderService>
    </ProviderDishService>
  );
}

export default AppProvider