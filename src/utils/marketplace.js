import { v4 as uuid4 } from "uuid";
import { parseNearAmount } from "near-api-js/lib/utils/format";

const GAS = 100000000000000; 

export function createCampaign(campaign) {
  campaign.id = uuid4();
  campaign.goal = parseNearAmount(campaign.goal + "");
  return window.contract.setCampaign({ campaign }); // set_product for the Rust contract
}

export function getCampaigns() {
  return window.contract.getCampaigns(); // get_products for the Rust contract
}

export async function donateFunds({ id, price }) {
  await window.contract.contribute({ campaignId: id }, GAS, price); // buy_product for the Rust contract
}
