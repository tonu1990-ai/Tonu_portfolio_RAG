# MSc Academic Project: Dublin Pedestrian Footfall Time-Series Forecasting

## Project identity
- Researcher: Tonu James.
- Report title: **A Comparative Study of Pedestrian Footfall Trends using Time Series forecasting**.
- Academic context: Master of Science in Human-Centred Artificial Intelligence, Technological University Dublin (TU Dublin).
- Work type: Academic data science and time-series forecasting study.
- Research areas: Data wrangling, exploratory data analysis, time series, missing-data handling, forecasting, evaluation and visualisation.

## Objective and research question
The project examined whether past pedestrian counts could be used to forecast pedestrian footfall in Dublin city and compared three established forecasting approaches. The use case was related to urban activity analysis and planning, not a deployed live pedestrian-count forecasting service.

## Source data
- Source: **Dublin City Council (DCC) pedestrian footfall sensor data**, accessible through the Smart Dublin open-data portal.
- Coverage analysed: January 2021 to 1 November 2023.
- Original data: Hourly counts from pedestrian sensors at multiple Dublin street locations.
- The combined dataset had **24,840 hourly timestamps** and, after identifying three related count columns per street, **34 street-level count series**.
- After filtering for sufficient observed data, **13 street-level series** were used in the analysis.
- Hourly observations were aggregated to **1,035 daily observations** and a combined daily footfall count for the selected streets.

## Data preprocessing and exploration
1. Examined and merged the annual 2021, 2022 and 2023 CSV datasets.
2. Removed redundant `IN` and `OUT` columns where the total street count was already present.
3. Standardised differing street names across the annual files.
4. Inspected missing values; excluded streets with extensive gaps to avoid excessive imputation.
5. Imputed remaining missing values using neighbouring observations and the corresponding hour from adjacent weeks, informed by LOCF/NOCB concepts and weekly seasonality.
6. Resampled hourly counts into daily data and examined **trend, seasonality and residual components** using time-series decomposition.

## Models and evaluation
Three methods were applied to the prepared daily time series:
- **Holt-Winters exponential smoothing**, with weekly (7-day) and yearly (365-day) seasonality explored.
- **SARIMA**, including AIC-based grid search to select candidate parameter combinations; the reported selected form was SARIMA(1,0,1) × (0,1,1,7).
- **Prophet**, for forecasting with trends and seasonality.

The report describes a chronological **847-day training / 188-day testing** split for the Holt-Winters and SARIMA experiments. It does not clearly establish an identical validation procedure for every Prophet comparison, so the reported results should not be interpreted as a fully controlled benchmark without that qualification.

## Reported root-mean-square error (RMSE)
- SARIMA, weekly seasonality: **24,163** (lowest reported RMSE).
- Prophet: **38,137**.
- Holt-Winters, weekly seasonality: **45,095**.
- Holt-Winters, yearly seasonality: **79,155**.

RMSE is in units of the aggregated pedestrian count series; lower RMSE indicates a smaller prediction error for the evaluation performed. The paper concluded that **SARIMA performed best among the tested configurations for this dataset**. This is dataset-specific, not a claim that SARIMA universally outperforms Prophet or Holt-Winters.

## Limitations and future work
The analysis selected 13 streets based on data availability rather than all locations in Dublin, so the combined series is not a complete count of every pedestrian in the city. Sensor irregularities and imputation may influence results. Weather, holidays, external regressors and street-by-street forecasting were discussed as **future extensions**, not completed integrations.

## Practical relevance
The project demonstrates data extraction, Python-oriented data manipulation, missing-value analysis, time-series feature understanding, statistical forecasting, model selection and visualisation for an applied city-data problem.
