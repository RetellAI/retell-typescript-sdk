"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sdk_1 = require("./sdk");
// import { CallType } from "./models/components";
// import { CallType, SortOrder } from "./models/operations";
const retell = new sdk_1.RetellClient({
    // Find the key in dashboard
    apiKey: "ef4f369e-6593-4a82-9f19-f34e014c5c32",
    serverURL: "http://localhost:3002"
});
async function main() {
    // const res = await retell.createAgent({
    //     agentName: "testfunction",
    //     llmSetting: {
    //         provider: "retell",
    //         prompt: "test prompt",
    //     },
    //     voiceId: "11labs-Ryan",
    //     interactionSetting: {
    //         enableBeginMessage: true,
    //         beginMessage: "Hello there, how can I help you?",
    //         enableEndCall: true,
    //         enableEndMessage: false,
    //         endMessage: "Hope you have a good day, goodbye.",
    //     },
    //     functions: [{
    //       url: "http://localhost:3002/get-weather",
    //       description: "Get the current weather in a given location.",
    //       name: "get_current_weather",
    //       parameters: {
    //         type: "object",
    //         properties: {
    //           location: {
    //             type: "string",
    //             description: "The city and state, e.g. San Francisco, CA"
    //           },
    //           unit: {
    //             type: "string",
    //             enum: ["celsius", "fahrenheit"]
    //           }
    //         },
    //         required: ["location"]
    //       }
    //     }]
    // });
    // console.log(res.agent);
    const res = await retell.getAgent("e2c8d51a88b935f3ca09170d9c248e8e");
    console.log(res.agent);
    // const res = await retell.listAgents();
    // console.log(res.agents);
    // const agent = await retell.updateAgent({
    //     agentName: "new name",
    //     interactionSetting: {
    //         enableEndCall: true,
    //         endMessage: "bye"
    //       },
    // }, '5790c196cd6b7728de819c3de444d3b5');
    // console.log(agent.agent);
    // const res = await retell.deleteAgent('5790c196cd6b7728de819c3de444d3b5');
    // console.log(res.statusCode)
    // const res = await retell.createPhoneNumber({
    //     agentId: "oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD",
    //     areaCode: 415,
    // });
    // res.phoneNumber
    // const res = await retell.deletePhoneNumber("+14159095857");
    // console.log(res.statusCode)
    // const res = await retell.getCall("e208e53fe334b42a21bdf065f5b121e1");
    // console.log(res.callDetail);
    // const newPhoneNumber = await retell.createPhoneNumber({
    //     agentId: "5790c196cd6b7728de819c3de444d3b5", // Required
    //     // areaCode: 415, // Optional, default is 213
    //   });
    //   console.log("phone number: ", newPhoneNumber);
    // const ongoingCall = await retell.createPhoneCall({
    //     phoneNumber: {
    //       from: "+12138954697", // Phone number you created
    //       to: "+12137134981",
    //     },
    //   });
    //   console.log("phone call: ", ongoingCall);
    // const filterCriteria = {
    //     // afterEndTimestamp: 1703302428800,
    //     // afterStartTimestamp: 1703302407300,
    //     // agentId: ["oBeDLoLOeuAbiuaMFXRtDOLriTJ5tSxD"],
    //     // beforeEndTimestamp: 1703302428899,
    //     // beforeStartTimestamp: 1703302407399,
    //     callType: [CallType.InboundPhoneCall, CallType.OutboundPhoneCall],
    // };
    // const limit = 1;
    // const sortOrder = SortOrder.Descending;
    // const res = await retell.listCalls(filterCriteria, limit, sortOrder);
    // console.log(res)
}
main();
//# sourceMappingURL=example.js.map