import { Campaign, crowdFundStorage } from './model';
import { context, ContractPromiseBatch, u128 } from "near-sdk-as";



/**
 * 
 * @param product - a product to be added to the blockchain
 */
export function setCampaign(campaign: Campaign): void {
    let storedCampaign = crowdFundStorage.get(campaign.id);
    if (storedCampaign !== null) {
        throw new Error(`a product with id=${campaign.id} already exists`);
    }
    crowdFundStorage.set(campaign.id, Campaign.fromPayload(campaign));
}

/**
 * 
 * A function that returns a single product for given owner and product id
 * 
 * @param id - an identifier of a product to be returned
 * @returns a product for a given @param id
 */
export function getCampaign(id: string): Campaign | null {
    return crowdFundStorage.get(id);
}

/**
 * 
 * A function that returns an array of products for all accounts
 * 
 * @returns an array of objects that represent a product
 */
export function getCampaigns(): Array<Campaign> {
    return crowdFundStorage.values();
}

export function contribute(campaignId: string): void {
    const campaign = getCampaign(campaignId);
    if (campaign == null) {
        throw new Error("campaign not found");
    }
    const amount = context.attachedDeposit;
    assert(amount > u128.Zero, "Contribution must be greater than 0");
    
    ContractPromiseBatch.create(campaign.owner).transfer(context.attachedDeposit);
    // Update the total amount raised
    campaign.incrementDonatedAmount();
    campaign.incrementTotalDonatedAmount(amount);
    crowdFundStorage.set(campaign.id, campaign);
}
/*
export function withdraw(campaignId: string): void {
    const campaign = getCampaign(campaignId);
    if (campaign == null) {
        throw new Error("campaign not found");
    }
    assert(campaign.isGoalReached(), "Goal not reached yet");
    assert(context.sender == campaign.owner, "Only the owner can withdraw funds");

    const amount = campaign.raised;
    crowdFundStorage.delete("backers");
    campaign.raised = u128.Zero;

    ContractPromiseBatch.create(campaign.owner, amount);
}
**/
