import axios from 'axios';

export interface BridgeDetailsRawData {
  bridge_reference_number: number;
  location_structure_name: string;
  feature_carried: string;
  feature_intersected: string;
  owner_code: number;
  length: number;
  deck_area: number;
  spans: number;
  structuretype: string;
  year_built: string;
  post_status: string;
  cond_rate_bridge_deck: string;
  cond_rate_bridge_superstructure: string;
  cond_rate_bridge_substructure: string;
  cond_rate_bridge_culvert: string;
  sufficiency_rating: number;
  annual_daily_traffic: string;
}

export interface BridgeListResponse {
  bridges: BridgeDetailsRawData[];
  total: number;
}

export async function getBridgeList(): Promise<BridgeListResponse> {
  const apiKey = process.env.REACT_APP_APP_TOKEN;
  const select =
    'bridge_reference_number,location_structure_name,feature_carried,feature_intersected,owner_code,length,deck_area,spans,structuretype,year_built,post_status,cond_rate_bridge_deck,cond_rate_bridge_superstructure,cond_rate_bridge_substructure,cond_rate_bridge_culvert,sufficiency_rating,MAX(annual_daily_traffic) AS annual_daily_traffic';
  const group =
    'bridge_reference_number,location_structure_name,feature_carried,feature_intersected,owner_code,length,deck_area,spans,structuretype,year_built,post_status,cond_rate_bridge_deck,cond_rate_bridge_superstructure,cond_rate_bridge_substructure,cond_rate_bridge_culvert,sufficiency_rating';
  const where = "municipal_code='02/301 - PITTSBURGH'";
  const url = `https://data.pa.gov/resource/7fjz-jhc5.json?$select=${select}&$where=${where}&$group=${group}&$order=bridge_reference_number&$$app_token=${apiKey}`;
  const bridgeResponse = await axios.get<BridgeDetailsRawData[]>(url);
  return {
    bridges: bridgeResponse.data,
    total: bridgeResponse.data.length,
  };
}
