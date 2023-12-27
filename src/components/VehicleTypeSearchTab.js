import React, { useSignal, useEffect, useState } from 'react';

const VehicleTypeSearchType = () => {
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [series, setSeries] = useState([]);
  const [engines, setEngines] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedSeries, setSelectedSeries] = useState('');
  const [selectedEngine, setSelectedEngine] = useState('');
  const [loadingMakes, setLoadingMakes] = useState(true);
  const [loadingModels, setLoadingModels] = useState(false);
  const [loadingYears, setLoadingYears] = useState(false);
  const [loadingSeries, setLoadingSeries] = useState(false);
  const [loadingEngines, setLoadingEngines] = useState(false);
  useEffect(() => {
    // Fetch makes from an external API
    const fetchMakes = async () => {
      try {
        const response = await fetch('https://localhost:44370/AutoInfoSearch/GetPartsGuide?ReturnField=Make&PA=true'); // Replace with your API endpoint
        const data = await response.json();

        // Assuming the API response has a 'makes' property containing an array of makes
        setMakes(data.options);
        setLoadingMakes(false); // Set loading to false once makes are loaded
        console.log("options", makes);
      } catch (error) {
        console.error('Error fetching makes:', error);
      }
    };

    // Call the fetchMakes function to load makes when the component mounts
    fetchMakes();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  useEffect(() => {
    // Fetch models based on the selected make
    const fetchModels = async () => {
      try {
        const response = await fetch(`https://localhost:44370/AutoInfoSearch/GetPartsGuide?ReturnField=Model&make=${selectedMake}&PA=true`);
        const data = await response.json();
        setModels(data.options);

        // If there is only one model, select it automatically and fetch years
        if (data.options.length === 1) {
          setSelectedModel(data.options[0]);
          fetchYears();
        }
      } catch (error) {
        console.error('Error fetching models:', error);
      }
      finally {
        setLoadingModels(false); // Set loading to false once models are loaded
      }
    };

    // Call the fetchModels function when the selected make changes
    fetchModels();
  }, [selectedMake]);

  useEffect(() => {
    // Implement similar logic for fetching years, series, engines, and other dropdowns
    // ...
    if (selectedMake !== "" && selectedModel !== "")
      fetchYears();
  }, [selectedModel]);

  // Add similar useEffect blocks for fetching years, series, engines, etc.

  const fetchYears = async () => {
    // Implement fetching years based on selectedMake and selectedModel
    // Update the state with the fetched years
    try {
      setLoadingYears(true);
      // Fetch years API endpoint based on selectedMake and selectedModel
      const response = await fetch(`https://localhost:44370/AutoInfoSearch/GetPartsGuide?ReturnField=year&make=${selectedMake.trim()}&model=${selectedModel.trim()}`);
      const data = await response.json();
      setYears(data.options);

      // If there is only one year, select it automatically and fetch series
      if (data.options.length === 1) {
        setSelectedYear(data.options[0].trim());
        fetchSeries();
      }
    } catch (error) {
      console.error('Error fetching years:', error);
    } finally {
      setLoadingYears(false);
    }
  };

  const fetchSeries = async () => {
    // Implement fetching series based on selectedMake, selectedModel, and selectedYear
    // Update the state with the fetched series
    try {
      setLoadingSeries(true);
      // Fetch series API endpoint based on selectedMake, selectedModel, and selectedYear
      const response = await fetch(`https://localhost:44370/AutoInfoSearch/GetSeries?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}`);
      const data = await response.json();
      setSeries(data.options);

      // If there is only one series, select it automatically and fetch engines
      if (data.options.length === 1) {
        setSelectedSeries(data.options[0]);
        fetchEngines();
      }
    } catch (error) {
      console.error('Error fetching series:', error);
    } finally {
      setLoadingSeries(false);
    }
  };

  const fetchEngines = async () => {
    // Implement fetching engines based on selectedMake, selectedModel, selectedYear, and selectedSeries
    // Update the state with the fetched engines
    try {
      setLoadingEngines(true);
      // Fetch engines API endpoint based on selectedMake, selectedModel, selectedYear, and selectedSeries
      const response = await fetch(`https://localhost:44370/AutoInfoSearch/GetEngines?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}&series=${selectedSeries}`);
      const data = await response.json();
      setEngines(data.options);

      // If there is only one engine, select it automatically
      if (data.options.length === 1) {
        setSelectedEngine(data.options[0]);
      }
    } catch (error) {
      console.error('Error fetching engines:', error);
    } finally {
      setLoadingEngines(false);
    }
  };
  return (
    <div class="row g-2">
      <div class="col-sm-4">
        <div class="form-group">
          <label for="make">MAKE</label>
          <select
            className="form-select"
            id="make"
            aria-label="Popular Make"
            value={selectedMake}
            onChange={(e) => {
              setSelectedMake(e.target.value);
              // Reset the selected model when the make changes
              setSelectedModel('');
            }}
            disabled={loadingMakes}
          >
            <option value="" disabled>
              - Select Make -
            </option>
            {makes
              .filter((make) => make !== 0) // Filter out the value 0
              .map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div class="col-sm-4">
        <div class="form-group">
          <label for="model">MODEL</label>
          <select
            className="form-select"
            id="model"
            aria-label="Popular Model"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
            disabled={loadingModels || !selectedMake}
          >
            <option value="" disabled>
              - Select Model -
            </option>
            {models
              .filter((model) => model !== 0) // Filter out the value 0
              .map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div class="col-sm-4">
        <div class="form-group">
          <label for="year">YEAR</label>
          <select
            className="form-select"
            id="year"
            aria-label="Floating label select example"
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              // Reset the selected values when year changes
              setSelectedSeries('');
              setSelectedEngine('');
              // Fetch series when year changes
              fetchSeries();
            }}
            disabled={loadingYears || !selectedMake || !selectedModel}
          >
            <option value="" disabled>
              {loadingYears ? 'Loading Years...' : '- Select Year -'}
            </option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="series">SERIES</label>
          <select class="form-select" id="series" aria-label="Floating label select example"></select>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="series">CHASSIS</label>
          <select class="form-select" id="series" aria-label="Floating label select example"></select>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="engine">ENGINE</label>
          <select class="form-select" id="engine" aria-label="Floating label select example"></select>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="form-group">
          <label for="vehicle">VEHICLE</label>
          <select class="form-select" id="vehicle" aria-label="Floating label select example"></select>
        </div>
      </div>
      <div class="col-sm-12 col-lg-2 align-items-end d-flex">
        <a href="search-result.html" type="button" class="btn btn-primary w-100">Search</a>
      </div>
    </div>
  )
}
export default VehicleTypeSearchType;