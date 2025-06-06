module block_sensei::certificate;

use block_sensei::block::AdminCapability;
use std::string::{Self, String};
use sui::event;
use sui::url::{Self, Url};

public struct Certificate has key {
    id: UID,
    title: String,
    description: String,
    mission_id: String,
    image_url: Url,
    issued_at: u64,
    completed_at: u64,
}

public struct CertificateCreated has copy, drop {
    certificate_id: ID,
    recipient: address,
    title: String,
    mission_id: String,
}

public fun mint(
    _admin: &AdminCapability,
    title: vector<u8>,
    description: vector<u8>,
    mission_id: vector<u8>,
    image_url: vector<u8>,
    completed_at: u64,
    recipient: address,
    ctx: &mut TxContext,
) {
    let certificate = Certificate {
        id: object::new(ctx),
        title: string::utf8(title),
        description: string::utf8(description),
        mission_id: string::utf8(mission_id),
        image_url: url::new_unsafe_from_bytes(image_url),
        issued_at: tx_context::epoch(ctx),
        completed_at,
    };

    event::emit(CertificateCreated {
        certificate_id: object::id(&certificate),
        recipient,
        title: certificate.title,
        mission_id: certificate.mission_id,
    });

    transfer::transfer(certificate, recipient)
}
