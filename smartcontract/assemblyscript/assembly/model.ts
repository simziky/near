import { PersistentUnorderedMap, context, PersistentMap, u128 } from "near-sdk-as";

/**
 * This class represents a product that can be listed on a marketplace.
 * It contains basic properties that are needed to define a product.
 * The price of the product is of type u128 that allows storing it in yocto-NEAR, where `1 yocto = 1^-24`.
 * {@link nearBindgen} - it's a decorator that makes this class serializable so it can be persisted on the blockchain level. 
 */
@nearBindgen
export class Campaign {
    id: string;
    title: string;
    goal: u128;
    raised: u128;
    backers: PersistentMap<string, u128>;
    description: string;
    image: string;
    location: string;
    owner: string;
    donators: u32;
    public static fromPayload(payload: Campaign): Campaign {
        const campaign = new Campaign();
        campaign.id = payload.id;
        campaign.title = payload.title;
        campaign.description = payload.description;
        campaign.raised = payload.raised;
        campaign.goal = payload.goal;
        campaign.backers = payload.backers;
        campaign.image = payload.image;
        campaign.location = payload.location;
        campaign.owner = context.sender;
        return campaign;
    }
    public incrementDonatedAmount(): void {
        this.donators = this.donators + 1;
    }
    public incrementTotalDonatedAmount(amount: u128): void {
        this.raised = u128.add(this.raised, amount);
    }

    // Method to get the contribution of a specific backer
    public getContribution(accountId: string): u128 {
        const contribution = this.backers.get(accountId);
        return contribution !== null ? contribution : u128.Zero;
    }

    public isGoalReached(): bool {
        return u128.ge(this.raised, this.goal);
    }

    



}

/**
 * `productsStorage` - it's a key-value datastructure that is used to store products by sellers.
 * The backbone of this datastructure is {@link PersistentUnorderedMap} - a facade in front of the NEAR's {@link Storage}.
 * For the sake of this contract we've chosen {@link PersistentUnorderedMap} as a storage for the next reasons:
 * - `set`, `get` and `delete` operations have a constant time complexity - O(1)
 * - keys are stored in the blockchain (which is opposite to {@link PersistentMap})
 * - provides an interface to return a range of values
 * 
 * Brakedown of the `PersistentUnorderedMap<string, Product>` datastructure:
 * - the key of `PersistentUnorderedMap` is a `productId`
 * - the value in this `PersistentUnorderedMap` is a product itself `Product` that is related to a given key (`productId`)
 */
export const crowdFundStorage = new PersistentUnorderedMap<string, Campaign>("LISTED_CAMPAIGNS");
