# CallPhoneNumber

Phone number associated with the call. Only populated when call_type is `inbound_phone_call` or `outbound_phone_call`.


## Fields

| Field                                | Type                                 | Required                             | Description                          | Example                              |
| ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ | ------------------------------------ |
| `from`                               | *string*                             | :heavy_check_mark:                   | Caller phone number in E.164 format. | +14159095857                         |
| `to`                                 | *string*                             | :heavy_check_mark:                   | Callee phone number in E.164 format. | +14159095858                         |