module block_sensei::block;

use sui::coin::{Self, TreasuryCap};
use sui::url::new_unsafe_from_bytes;

// Define Token
public struct BLOCK has drop {}

// Define Admin Capability struct
public struct AdminCapability has key {
    id: UID,
}

fun init(witness: BLOCK, ctx: &mut TxContext) {
    let (treasury, metadata) = coin::create_currency(
        witness,
        9,
        b"BLOCK",
        b"Block",
        b"Token for gamified learning platform",
        option::some(new_unsafe_from_bytes(b"https://block-sensei-www.onrender.com/logo.png")),
        ctx,
    );
    transfer::public_freeze_object(metadata);
    transfer::public_transfer(treasury, ctx.sender());

    let admin_capability = AdminCapability {
        id: object::new(ctx),
    };
    transfer::transfer(admin_capability, ctx.sender())
}

// Mint token (Admin only)
public fun mint(
    _admin: &AdminCapability,
    treasury_cap: &mut TreasuryCap<BLOCK>,
    amount: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    let coin = coin::mint(treasury_cap, amount, ctx);
    transfer::public_transfer(coin, recipient)
}