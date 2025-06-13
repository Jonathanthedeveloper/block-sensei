module block_sensei::certificate;

use block_sensei::block::AdminCapability;
use std::string::{Self, String};
use sui::display;
use sui::event;
use sui::package;
use sui::url::{Self, Url};

public struct Certificate has key {
    id: UID,
    name: String,
    description: String,
    mission_id: String,
    url: Url,
    issued_at: u64,
    completed_at: u64,
}

// Witness
public struct CERTIFICATE has drop {}

public struct CertificateCreated has copy, drop {
    certificate_id: ID,
    recipient: address,
    name: String,
    mission_id: String,
}

fun init(witness: CERTIFICATE, ctx: &mut TxContext) {
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

    let mut display = display::new_with_fields<Certificate>(&publisher, keys, values, ctx);

    display.update_version();

    transfer::public_transfer(publisher, ctx.sender());
    transfer::public_transfer(display, ctx.sender());
}

public fun mint(
    _admin: &AdminCapability,
    name: vector<u8>,
    description: vector<u8>,
    mission_id: vector<u8>,
    url: vector<u8>,
    completed_at: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    let certificate = Certificate {
        id: object::new(ctx),
        name: string::utf8(name),
        description: string::utf8(description),
        mission_id: string::utf8(mission_id),
        url: url::new_unsafe_from_bytes(url),
        issued_at: tx_context::epoch(ctx),
        completed_at,
    };

    event::emit(CertificateCreated {
        certificate_id: object::id(&certificate),
        recipient,
        name: certificate.name,
        mission_id: certificate.mission_id,
    });

    transfer::transfer(certificate, recipient)
}
