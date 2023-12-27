import React, { useState } from 'react';
import VehicleTypeSearchType from './VehicleTypeSearchTab';

const SearchComponent = () => {
  const [selectedTab, setSelectedTab] = useState('vehicleType');

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container-fluid bg-white py-5">
      <div className="row">
        <div className="section-sm-bottom">
          <div className="mb-3 mb-lg-5 container-fluid p-md-0">
            <div className="row g-0">
              <div className="col-12">
                <ul className="nav nav-tabs custom-tabs justify-content-md-center text-nowrap flex-nowrap" id="nav-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedTab === 'vehicleType' ? 'active' : ''}`}
                      id="vehicleType-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#vehicleType"
                      type="button"
                      role="tab"
                      aria-controls="vehicleType"
                      aria-selected="true"
                      onClick={() => handleTabChange('vehicleType')}
                    >
                      Vehicle
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedTab === 'regoVin' ? '' : ''}`}
                      id="regoVin-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#regoVin"
                      type="button"
                      role="tab"
                      aria-controls="regoVin"
                      aria-selected="true"
                      onClick={() => handleTabChange('regoVin')}
                    >
                      Rego
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className={`nav-link ${selectedTab === 'partNo' ? '' : ''}`}
                      id="partNo-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#partNo"
                      type="button"
                      role="tab"
                      aria-controls="partNo"
                      aria-selected="true"
                      onClick={() => handleTabChange('partNo')}
                    >
                      Part No
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tab-content" id="nav-tabContent">
            {/* Vehicle Type Tab */}
            <div
              className={`tab-pane fade container pb-md-5 pb-3 ${selectedTab === 'vehicleType' ? 'active show' : ''}`}
              id="vehicleType"
              role="tabpanel"
              aria-labelledby="vehicleType-tab"
            >
              {/* ... (Form elements for Vehicle Type tab) */}
             <VehicleTypeSearchType/>
            </div>

            {/* Rego Vin Tab */}
            <div
              className={`tab-pane fade container pb-md-5 pb-3 ${selectedTab === 'regoVin' ? 'active show' : ''}`}
              id="regoVin"
              role="tabpanel"
              aria-labelledby="regoVin-tab"
            >
              {/* ... (Form elements for Rego Vin tab) */}
            </div>

            {/* Part No Tab */}
            <div
              className={`tab-pane fade container pb-md-5 pb-3 ${selectedTab === 'partNo' ? 'active show' : ''}`}
              id="partNo"
              role="tabpanel"
              aria-labelledby="partNo-tab"
            >
              {/* ... (Form elements for Part No tab) */}
            </div>
          </div>

          {/* ... (Other HTML elements after the tab section) */}
        </div>
      </div>
    </div>
  );
};

export default SearchComponent;
