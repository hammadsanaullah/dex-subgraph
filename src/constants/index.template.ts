import {
  Address,
  BigDecimal,
  BigInt,
  ByteArray,
  Bytes,
  crypto,
  ethereum,
  log
} from "@graphprotocol/graph-ts";
export * from "./time";

const WETH_ADDRESS = "0x9fddecbc9708982295c37d91f0d697f651e661f5";
const WBTC_ADDRESS = "0xfdbf0b67d0fe3fdd831fd24ab16600dc4904e7cd";
const USDT_ADDRESS = "0x12fd66057b4896cde256d7da1c2ba8f347d4280e";
const BUSD_ADDRESS = "0xa8bb34de7d922e1ba586595257a05b0eeb48b21c";
const DAI_ADDRESS = "0x177c8db7c2575b87e272c1f645ecec474c4b43c3";
const ICE_ADDRESS = "0xf16e81dce15b08f326220742020379b855b87df9";

export function getCreate2Address(
  from: Bytes,
  salt: Bytes,
  initCodeHash: Bytes
): Bytes {
  return Bytes.fromHexString(
    Bytes.fromByteArray(
      crypto.keccak256(
        Bytes.fromHexString(
          "0xff" +
            from.toHexString().slice(2) +
            salt.toHexString().slice(2) +
            initCodeHash.toHexString().slice(2)
        )
      )
    )
      .toHexString()
      .slice(26)
  ) as Bytes;
}

export const LEGACY = "LEGACY";

export const NULL_CALL_RESULT_VALUE =
  "0x0000000000000000000000000000000000000000000000000000000000000001";

export const BIG_INT_ZERO = BigInt.fromI32(0);

export const BIG_DECIMAL_ZERO = BigDecimal.fromString("0");

export const BIG_DECIMAL_ONE = BigDecimal.fromString("1");

export const BIG_INT_ONE = BigInt.fromI32(1);

export const SWAP_FEE = BigInt.fromI32(30);

export const TWAP_ENABLED = true;

export const ADDRESS_ZERO = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const FACTORY_ADDRESS = Address.fromString(
  "0x34e4064ef391ce16b4eb394d506baf14b743491d"
);

export const NATIVE_ADDRESS = "0xb4f7213fe1af451366764fdc6c241fed0c5dd533";

export const WHITELISTED_TOKEN_ADDRESSES: string[] = // IMPORTANT! The native address must be included for pricing to start
["0xb4f7213fe1af451366764fdc6c241fed0c5dd533", "0x9fddecbc9708982295c37d91f0d697f651e661f5", "0xfdbf0b67d0fe3fdd831fd24ab16600dc4904e7cd", "0x12fd66057b4896cde256d7da1c2ba8f347d4280e", "0xa8bb34de7d922e1ba586595257a05b0eeb48b21c", "0x177c8db7c2575b87e272c1f645ecec474c4b43c3"]

export const STABLE_TOKEN_ADDRESSES: string[] = ["0x12fd66057b4896cde256d7da1c2ba8f347d4280e", "0xa8bb34de7d922e1ba586595257a05b0eeb48b21c", "0x177c8db7c2575b87e272c1f645ecec474c4b43c3"];

export const STABLE_POOL_ADDRESSES: string[] = STABLE_TOKEN_ADDRESSES.map<
  string
>((address: string) => {
  log.debug('My value of stableAddress is: {}', [address.toString()])
  const tokens: string[] = [address, NATIVE_ADDRESS].sort();
 let a = getCreate2Address(
  Bytes.fromByteArray(
    Bytes.fromHexString("0x34e4064ef391ce16b4eb394d506baf14b743491d")
  ),
  Bytes.fromByteArray(
    crypto.keccak256(
      ByteArray.fromHexString("0x" + tokens[0].slice(2) + tokens[1].slice(2))
    )
  ),
  Bytes.fromByteArray(
    Bytes.fromHexString("0xa5934690703a592a07e841ca29d5e5c79b5e22ed4749057bb216dc31100be1c0")
  )
).toHex();
log.debug('My value of getCreate2Address is: {}', [a.toString()])
  return a;
});

// Minimum liqudiity threshold in native currency
export const MINIMUM_NATIVE_LIQUIDITY = BigDecimal.fromString(
  "5"
);

// export const STABLE_POOL_ADDRESSES: string[] = '{{ stablePoolAddresses }}'.split(',')

// minimum liquidity required to count towards tracked volume for pairs with small # of Lps
// export const MINIMUM_USD_THRESHOLD_NEW_PAIRS = BigDecimal.fromString(
//   "{{ legacy.minimum_usd_threshold_new_pairs }}{{^legacy.minimum_usd_threshold_new_pairs}}3000{{/legacy.minimum_usd_threshold_new_pairs}}"
// );

export namespace PairType {
  export const CONSTANT_PRODUCT_POOL = "CONSTANT_PRODUCT_POOL";
}
