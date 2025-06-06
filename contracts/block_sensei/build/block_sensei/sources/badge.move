module block_sensei::badge;

use block_sensei::block::AdminCapability;
use std::string::{Self, String};
use sui::event;
use sui::url::{Self, Url};

// Badge Definition
public struct Badge has key {
    id: UID,
    name: String,
    description: String,
    image_url: Url,
    issued_at: u64,
}

// Event Definition
public struct BadgeCreated has copy, drop {
    badge_id: ID,
    recipient: address,
    name: String,
}

public fun mint(
    _admin: &AdminCapability,
    name: vector<u8>,
    description: vector<u8>,
    image_url: vector<u8>,
    recipient: address,
    ctx: &mut TxContext,
) {
    let badge = Badge {
        id: object::new(ctx),
        name: string::utf8(name),
        image_url: url::new_unsafe_from_bytes(image_url),
        description: string::utf8(description),
        issued_at: tx_context::epoch(ctx),
    };

    event::emit(BadgeCreated {
        badge_id: object::id(&badge),
        recipient,
        name: badge.name,
    });

    transfer::transfer(badge, recipient)
}
