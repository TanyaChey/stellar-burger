import * as actions from "./actions";
import { mobileReducer } from "./reducer";

const initialState = false;

describe("Reducer MOBILE", () => {
    // ========================================================
    it("InitialState", () => {
        expect(mobileReducer(undefined, { type: "" })).toEqual(initialState);
    });

    // ========================================================
    it("MOBILE_TURN_ON", () => {
        const result = mobileReducer(initialState, actions.MOBILE_TURN_ON);

        expect(result).toEqual(true);
    });

    // ========================================================
    it("MOBILE_TURN_OFF", () => {
        const result = mobileReducer(initialState, actions.MOBILE_TURN_OFF);

        expect(result).toEqual(false);
    });
});
