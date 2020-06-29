import * as React from 'react';
import 'react-tabulator/css/bootstrap/tabulator_bootstrap4.min.css';
import 'react-tabulator/lib/styles.css';
import { ReactTabulator } from 'react-tabulator';

import { BridgeDetailsRawData } from '../../api/socrataApi';

interface BridgeProps {
  bridges: BridgeDetailsRawData[];
}
const thousands_separator = (val: string) => {
  return val.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const OwnerLookup = (code: number) => {
  const map: { [key: number]: string } = {
    1: 'PennDOT',
    2: 'County Highway Agency',
    3: 'Town or Township Highway Agency ',
    4: 'City, Municipal Highway Agency, Borough',
    11: 'State Park, Forest or Reservation Agency',
    12: 'Local Park, Forest or Reservation Agency',
    21: 'Other State Agencies',
    25: 'Other Local Agencies',
    26: 'Private (other than railroad)',
    27: 'Railroad',
    31: 'State Toll Authority ',
    32: 'Local Toll Authority',
    60: 'Other Federal Agencies',
    62: 'Bureau of Indian Affairs ',
    64: 'U.S. Forest Service 66 National Park Service',
    68: 'Bureau of Land Management',
    69: 'Bureau of Reclamation',
    70: 'Military Reservation Corps of Engineers',
    80: 'Unknown',
  };
  return map[code];
};

const BridgeRatingLookup = (code: string) => {
  const ratings: { [key: string]: string } = {
    N: 'Not applicable',
    '--': 'Not applicable',
    9: 'Excellent',
    8: 'Very good',
    7: 'Good, some minor problems noted',
    6: 'Satisfactory, structural elements showing minor deterioration',
    5: 'Fair, primary structural elements are sound but showing minor cracks and signs of deterioration',
    4: 'Poor, deterioration of primary structural elements has advanced 3 = Serious, deterioration has seriously affected the primary structural components',
    3: 'Serious, deterioration has seriously affected the primary structural components',
    2: 'Critical, deterioration of primary structural components has advanced and bridge will be closely monitored, or closed, until corrective action can be taken',
    1: 'Imminent failure, major deterioration in critical structural components. Bridge is closed but corrective action may put the bridge back into light service',
    0: 'Failed, bridge is out of service and beyond corrective action. Superstructure is the underlying or supporting part of a bridge, for example steel members under the deck.',
    DEMO: 'Structure has been demolished',
  };
  return ratings[code];
};

const viewDetails = (
  cell: Tabulator.CellComponent,
  formatterParams: Tabulator.FormatterParams
) => {
  const row = cell.getRow();
  const rowData = row.getData();

  return `<ul class="list-group">
      <li class="list-group-item"><strong>Feature Carried:</strong> ${
        rowData.feature_carried
      }</li>
      <li class="list-group-item"><strong>Feature Intersected:</strong> ${
        rowData.feature_intersected
      }</li>
      <li class="list-group-item"><strong>Structure Type:</strong> ${
        rowData.structuretype
      }</li>
      <li class="list-group-item"><strong>Dimensions:</strong>: Length: ${thousands_separator(
        rowData.length
      )} ft; Spans: ${rowData.spans}; Deck Area: ${thousands_separator(
    rowData.deck_area
  )} sq. ft.</li>
      <li class="list-group-item"><strong>Condition of structure:</strong>
      <ul>
      <li>Deck: ${BridgeRatingLookup(rowData.cond_rate_bridge_deck)}</li>
    <li>Superstructure: ${BridgeRatingLookup(rowData.cond_rate_bridge_superstructure)}</li>
    <li>Substructure: ${BridgeRatingLookup(rowData.cond_rate_bridge_substructure)}</li>
    <li>Culvert: ${BridgeRatingLookup(rowData.cond_rate_bridge_culvert)}</li>
    <li>Sufficiency Rating: ${rowData.sufficiency_rating}</li> </ul> </li>
      <li class="list-group-item"><strong>Owner:</strong> ${OwnerLookup(rowData.owner_code)}</li>
    </ul>
</div>`;
};

export const BridgesTable: React.FunctionComponent<BridgeProps> = (
  props: BridgeProps
) => {
  const bridges = JSON.parse(JSON.stringify(props.bridges));

  const columns = [
    {
      title: 'Structure Name',
      field: 'location_structure_name',
      width: 300,
    },
    {
      title: 'Year Built',
      field: 'year_built',
      sorter: 'number',
      hozAlign: 'center',
    },
    {
      title: 'Avg Daily Traffic',
      field: 'annual_daily_traffic',
      formatter: 'money',
      formatterParams: { precision: 0 },
      hozAlign: 'center',
    },
    {
      title: 'Details',
      field: 'feature_carried',
      formatter: viewDetails,
      headerSort: false,
    },
  ];
  const tabulatorOptions = {
    tooltips: true,
    tooltipsHeader: true,
    layout: 'fitDataFill',
    height: 800,
    pagination: 'local',
  };

  return (
    <div className="bridges-table">
      <ReactTabulator
        columns={columns}
        data={bridges}
        options={tabulatorOptions}
      />
    </div>
  );
};
