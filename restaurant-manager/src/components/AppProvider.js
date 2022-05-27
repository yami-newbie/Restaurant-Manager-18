import React from "react";
import { ProvideAuth } from "../services/account.service";
import ProviderTableService from "../services/ban.serivce";
import ProviderCTTableService from "../services/ct_bandat.service";
import ProviderCTDatMonService from "../services/ct_datmon.service";
import ProviderCTOrderService from "../services/ct_hoadon.service";
import ProviderDatBanService from "../services/datban.service";
import ProviderOrderService from "../services/hoadon.service";
import ProviderDishService from "../services/thucan.service";

function AppProvider({ children }) {
  return (
    <ProviderDishService>
      <ProviderOrderService>
        <ProviderCTOrderService>
          <ProviderTableService>
            <ProviderCTDatMonService>
              <ProviderDatBanService>
                <ProviderCTTableService>
                  <ProvideAuth>{children}</ProvideAuth>
                </ProviderCTTableService>
              </ProviderDatBanService>
            </ProviderCTDatMonService>
          </ProviderTableService>
        </ProviderCTOrderService>
      </ProviderOrderService>
    </ProviderDishService>
  );
}

export default AppProvider;
