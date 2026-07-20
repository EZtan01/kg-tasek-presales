# KG Member API — Investigation Notes

**Endpoint:** `https://memberapi.kg.innovten.com/v1/query`
**Protocol:** GraphQL over HTTPS (POST, `Content-Type: application/json`)
**Auth (browser):** No API key for introspection / public queries. Authenticated queries use a token returned by `register` / `login`. Presumed `Authorization: Bearer <token>` (response headers explicitly allow `Authorization`).
**CORS:** Wide open — `Access-Control-Allow-Origin: *`, `Allow-Methods: POST, GET, OPTIONS, ...`, `Allow-Headers` includes `Authorization`, `x-api-key`, `Content-Type`. Browser-based calls work from anywhere.
**Introspection:** Allowed without auth — full schema in `/api/schema.graphql`, raw introspection JSON in `/api/introspection-raw.json`.

---

## 1. Sign-up flow (what the schema implies)

The schema does **not** match the "phone OTP → register" pattern the brief assumed. There is no `sendOTP`, no `verifyOTP`, and no `requestVerification`. The actual flow appears to be **email + password registration**, with a single post-register validation step that takes an `otp` string (probably sent to email or SMS by the server after register).

### Inferred happy path

| # | Step | Operation | Notes |
|---|---|---|---|
| 1 | Capture profile + home gym | (UI only) | Collect everything required by `RegisterInput` upfront. |
| 2 | Submit registration | `mutation register(input: RegisterInput!) → AuthPayload { token, user }` | API returns auth `token`. Use `Authorization: Bearer <token>` for all subsequent calls. |
| 3 | User receives OTP (email or SMS) | (server-side) | Schema gives no hint; needs IT confirmation. |
| 4 | User submits OTP | `mutation validateAccount(input: { otp: String! }) → CurrentUser` | Returns `CurrentUser.verified: true` on success. |
| 5 | (Optional) Change home gym | `mutation updateHomeGym(input: { id: ID! }) → CurrentUser` | Not needed if `gymID` was correct at registration. |
| 6 | Subscribe to Pre-Sales plan | `mutation createMembership(input: { gymID, productCode, paymentChannel, promoCode? }) → CheckoutRequest { id, checkoutUrl }` | Hosted Stripe Checkout — `checkoutUrl` is the redirect target. |
| 7 | Redirect user to `checkoutUrl` | (browser navigation) | Stripe handles card capture + 3DS. |
| 8 | Stripe redirects back | (success URL configured server-side by KG) | We don't control success URL; depends on what KG configured. |
| 9 | Activate membership | `mutation activateMembership(input: { id: String! }) → Membership` | Likely auto-fired by KG's Stripe webhook; we may or may not need to call this. **Needs confirmation.** |

### Critical input shapes

```graphql
input RegisterInput {
  gymID: String!                    # home gym ID — must be Bukit Indah's
  email: Email!
  password: String!
  firstName: String!
  lastName: String!
  contactNo: String!                # phone, format unknown — likely +60... or 01...
  contactNoValidatedToken: String   # optional — implies a separate phone validation flow exists
  emergencyContact: String!         # REQUIRED
  dob: String!                      # REQUIRED, format unknown ("YYYY-MM-DD"?)
  gender: String!                   # REQUIRED, valid values unknown
  referralCode: String              # optional
  profileImage: String!             # REQUIRED — likely a URL or empty placeholder?
  deviceType: String!               # "web"
  deviceModel: String!              # browser name?
  deviceToken: String               # optional — for push
  appVersion: String!               # "1.0.0"?
}

input ValidateAccountInput { otp: String! }

input CreateMembershipInput {
  gymID: String                     # nullable — defaults to user's home gym?
  productCode: String!              # MembershipPackage.code
  promoCode: String
  paymentChannel: String!           # value unknown — "stripe"? "fpx"? "card"?
}

type AuthPayload { token: String!, user: CurrentUser! }
type CheckoutRequest { id: String!, checkoutUrl: String! }
type CurrentUser { id, gymID, gym, name, contactNo, email, verified, membership, ... }
```

---

## 2. Branches — Bukit Indah is **NOT** in the API yet

`{ options { gym { id name address operationHour contactNo } } }` returned the following (no auth required):

| id | name | address | hours |
|---|---|---|---|
| `1` | Austin | Jalan Tiong Emas 4, Tiong Nam, JB | 24h |
| `2` | Seelong | Kg Baru Seelong, Senai | 9am–6pm |
| `3` | Toppen | Toppen Shopping Centre | 24h |
| `4` | Bandar Dato' Onn | AEON Mall Bandar Dato' Onn | 24h |

There is no Bukit Indah branch. The sign-up flow requires `RegisterInput.gymID` to be a known gym ID, and `CreateMembershipInput.gymID` and `MembershipPackage.applicableGymIDs` are tied to this. **Until KG adds a Bukit Indah gym, the sign-up flow cannot complete.**

---

## 3. Plans — couldn't enumerate (auth required)

`membershipPackageList(input: MembershipPackageListInput!)` returns `INVALID_AUTH_TOKEN` / "Please login first" without a Bearer token. We need either:

- KG to give us a sandbox test account so we can log in and list packages, or
- KG to tell us directly: `productCode` for "RM99 lock-in, Bukit Indah, monthly recurring".

`MembershipPackage` has the right shape for the offer:

```graphql
type MembershipPackage {
  id, code, name, desc, imageUrl
  price: Float!          # regular price (RM129?)
  salePrice: Float!      # promo price (RM99?)
  cost: Float!
  paymentRecur: String!  # "monthly"?
  paymentRecurDesc: String!
  validityDay: Int!
  applicableGymIDs: [String!]
  applicableGyms: [Gym!]
  tiers: [String!]
  benefits: [String!]
  tncUrl: String!
}
```

`MembershipPackageListInput`:
```graphql
input MembershipPackageListInput {
  packageCode: String
  category: String
}
```

So we either filter by `packageCode` (if known) or by `category` (valid values unknown).

---

## 4. Stripe handoff

`createMembership` returns `CheckoutRequest { id, checkoutUrl }`. Pattern: **hosted Stripe Checkout** — we redirect the user, Stripe collects card / processes 3DS, then redirects back to a success URL **configured server-side by KG (not by us)**.

We do **not** need:
- Stripe.js / Stripe Elements on our side
- A Payment Intent client_secret
- A Stripe public key

We **do** need:
- To know what `paymentChannel` value triggers Stripe (vs FPX / Boost / wallet)
- To know whether `activateMembership` is auto-called by KG's webhook or whether we must call it after Stripe success redirect

`Fee(input: FeeInput)` lets us preview a price before checkout — useful for a "you'll be charged RM99" confirmation screen.

```graphql
input FeeInput {
  productType: String!     # "membership"? unclear
  productCode: String!
  promoCode: String
  paymentChannel: String
}
type Fee { subtotal, discount, discountDesc, taxAmount, amount }
```

---

## 5. Auth model

- **Pre-auth (no token):** introspection, `options()`, `register`, `login`, `forgotPassword`, `verifyReferralCode(code)`.
- **Post-auth (Bearer token):** everything else — `init`, `me`, `membershipPackageList`, `createMembership`, `validateAccount`, etc.
- **Header (presumed):** `Authorization: Bearer <token>` — `Authorization` is in the CORS `Allow-Headers` list and `AuthPayload.token: String!` is the only token field; confirm with IT.
- **No refresh-token mutation visible** — schema has no `refreshToken`/`refreshAuth`. Token lifetime unknown.

---

## 6. Error handling

All errors observed return GraphQL standard format:

```json
{
  "errors": [{
    "message": "Please login first",
    "path": ["membershipPackageList"],
    "extensions": { "code": "INVALID_AUTH_TOKEN" }
  }],
  "data": null
}
```

Codes seen so far: `INVALID_AUTH_TOKEN`, `GRAPHQL_VALIDATION_FAILED`. Other codes (rate limits, validation errors per field) are unknown — needs probing once we have a sandbox account.

---

## 7. CORS

Confirmed safe for browser:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Credentials: true
Access-Control-Allow-Methods: POST, GET, OPTIONS, PUT, DELETE, UPDATE
Access-Control-Allow-Headers: x-api-key, X-Requested-With, Content-Type, Origin, Authorization, Accept, Client-Security-Token, Accept-Encoding
```
Note: `Allow-Origin: *` + `Allow-Credentials: true` is technically inconsistent (browsers reject credentialed requests with wildcard origin). Workaround: don't send credentials — use `Authorization` header only, no cookies. Fine for our use case.

---

## 8. Operations reference (compact)

### Queries (read-only)
- `init(input: InitInput!): CurrentUser` — device init (auth-gated)
- `me(): CurrentUser` — current user
- `options(): Options` — gym list + bank list (public)
- `utils(): Utils` — unknown shape
- `verifyReferralCode(code: String!): Boolean!`
- `membershipPackage(): MembershipPackage` — current user's active package
- `membershipPackageList(input, pag): MembershipPackageList` — **what we need for plan lookup**
- `fee(input: FeeInput!): Fee!` — price preview
- `validatePromoCode(input): Validation!`
- + class/PT/trainer/wallet/notification list queries (not needed for sign-up)

### Mutations (write)
- `login(input: LoginInput!): AuthPayload`
- `register(input: RegisterInput!): AuthPayload`
- `logout(): Boolean!`
- `forgotPassword(input: ForgotPasswordInput!): Boolean!`
- `changePassword(input)`, `updateSecurePin(input)`, `updateDeviceToken(input)`
- `validateAccount(input: ValidateAccountInput!): CurrentUser` — OTP verify
- `updateHomeGym(input: UpdateHomeGymInput!): CurrentUser`
- `updateProfile`, `updateProfileImage`, `updateBankInfo`, `setReferrer`
- `createMembership(input: CreateMembershipInput!): CheckoutRequest!` — **subscribe**
- `cancelMembership(input)`, `activateMembership(input)`, `freezeMembership(input)`
- `redeemCode(input: RedeemCodeInput!): Redemption!`
- + class/PT/wallet mutations (not needed for sign-up)
