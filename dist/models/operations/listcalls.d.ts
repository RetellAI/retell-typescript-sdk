import { SpeakeasyBase } from "../../internal/utils";
import * as components from "../components";
import { AxiosResponse } from "axios";
export declare enum CallType {
    InboundPhoneCall = "inbound_phone_call",
    OutboundPhoneCall = "outbound_phone_call",
    WebCall = "web_call"
}
export declare class FilterCriteria extends SpeakeasyBase {
    /**
     * Inclusive. Filter calls that end on or after this timestamp.
     */
    afterEndTimestamp?: number;
    /**
     * Inclusive. Filter calls that start on or after this timestamp.
     */
    afterStartTimestamp?: number;
    /**
     * Only retrieve calls that are made with specific agent(s).
     */
    agentId?: string[];
    /**
     * Exclusive. Filter calls that end before this timestamp.
     */
    beforeEndTimestamp?: number;
    /**
     * Exclusive. Filter calls that start before this timestamp.
     */
    beforeStartTimestamp?: number;
    /**
     * Only retrieve calls of specific type(s).
     */
    callType?: CallType[];
}
/**
 * The calls will be sorted by `start_timestamp`, whether to return the calls in ascending or descending order.
 */
export declare enum SortOrder {
    Ascending = "ascending",
    Descending = "descending"
}
export declare class ListCallsRequest extends SpeakeasyBase {
    filterCriteria?: FilterCriteria;
    /**
     * Limit the number of calls returned.
     */
    limit?: number;
    /**
     * The calls will be sorted by `start_timestamp`, whether to return the calls in ascending or descending order.
     */
    sortOrder?: SortOrder;
}
export declare class ListCallsResponse extends SpeakeasyBase {
    /**
     * HTTP response content type for this operation
     */
    contentType: string;
    /**
     * HTTP response status code for this operation
     */
    statusCode: number;
    /**
     * Raw HTTP response; suitable for custom response parsing
     */
    rawResponse: AxiosResponse;
    /**
     * Successfully retrieved all agents.
     */
    classes?: components.CallDetail[];
}
