module block_sensei::badge;

use block_sensei::block::AdminCapability;
use std::string::{Self, String};
use sui::event;
use sui::url::{Self, Url};
use sui::package;
use sui::display;

// Badge Definition
public struct Badge has key {
    id: UID,
    name: String,
    description: String,
    url: Url,
    issued_at: u64,
}

// Witness
public struct BADGE has drop {}

// Event Definition
public struct BadgeCreated has copy, drop {
    badge_id: ID,
    recipient: address,
    name: String,
}


fun init(witness: BADGE, ctx: &mut TxContext) {
    let keys = vector[
        b"name".to_string(),
        b"link".to_string(),
        b"image_url".to_string(),
        b"description".to_string(),
        b"project_url".to_string(),
        b"creator".to_string(),
    ];

    let values = vector[
        b"{name}".to_string(),
        b"{url}".to_string(),
        b"{url}".to_string(),
        b"{description}".to_string(),
        b"https://block-sensei-www.onrender.com".to_string(),
        b"Block Sensei".to_string(),
    ];

    let publisher = package::claim(witness, ctx);

    let mut display = display::new_with_fields<Badge>(&publisher, keys, values, ctx);

    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

public fun mint(
    _admin: &AdminCapability,
    name: vector<u8>,
    description: vector<u8>,
    url: vector<u8>,
    recipient: address,
    ctx: &mut TxContext,
) {
    let badge = Badge {
        id: object::new(ctx),
        name: string::utf8(name),
        url: url::new_unsafe_from_bytes(url),
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