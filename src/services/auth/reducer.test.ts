import * as actions from "./actions";
import { initialState, userReducer } from "./reducer";
import { TApiAuthUser, TApiGetUser } from "../../utils/types";

describe("Reducer AUTH", () => {
    // ========================================================
    it("InitialState", () => {
        expect(userReducer(undefined, { type: "" })).toEqual(initialState);
    });

    // ========================================================
    it("USER_CHECKED", () => {
        const result = userReducer(initialState, actions.USER_CHECKED);

        expect(result).toEqual({
            ...initialState,
            isAuthChecked: true,
        });
    });

    // ========================================================
    it("USER_GET_INFO.pending", () => {
        const result = userReducer(initialState, actions.USER_GET_INFO.pending);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                get_info: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_GET_INFO.fulfilled", () => {
        const userMock: TApiGetUser = {
            success: true,
            user: { name: "test", email: "test" },
        };

        const result = userReducer(
            initialState,
            actions.USER_GET_INFO.fulfilled(userMock, "test")
        );

        expect(result).toEqual({
            user: userMock.user,
            isAuthChecked: true,
            status: {
                ...initialState.status,
                get_info: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_GET_INFO.rejected", () => {
        const result = userReducer(
            initialState,
            actions.USER_GET_INFO.rejected
        );

        expect(result).toEqual({
            ...initialState,
            user: initialState.user,
            status: {
                ...initialState.status,
                get_info: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_LOGIN.pending", () => {
        const result = userReducer(initialState, actions.USER_LOGIN.pending);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                login: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_LOGIN.fulfilled", () => {
        const userMock: TApiAuthUser = {
            success: true,
            accessToken: "test",
            refreshToken: "test",
            user: { name: "test", email: "test" },
        };

        const result = userReducer(
            initialState,
            actions.USER_LOGIN.fulfilled(userMock, "test", userMock.user)
        );

        expect(result).toEqual({
            user: userMock.user,
            isAuthChecked: true,
            status: {
                ...initialState.status,
                login: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_LOGIN.rejected", () => {
        const result = userReducer(initialState, actions.USER_LOGIN.rejected);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                login: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_REGISTER.pending", () => {
        const result = userReducer(initialState, actions.USER_REGISTER.pending);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                register: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_REGISTER.fulfilled", () => {
        const userMock: TApiAuthUser = {
            success: true,
            accessToken: "test",
            refreshToken: "test",
            user: { name: "test", email: "test" },
        };

        const result = userReducer(
            initialState,
            actions.USER_REGISTER.fulfilled(userMock, "test", userMock.user)
        );

        expect(result).toEqual({
            user: userMock.user,
            isAuthChecked: true,
            status: {
                ...initialState.status,
                register: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_REGISTER.rejected", () => {
        const result = userReducer(
            initialState,
            actions.USER_REGISTER.rejected
        );

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                register: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_RESET.pending", () => {
        const result = userReducer(initialState, actions.USER_RESET.pending);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                reset: {
                    loading: true,
                    error: false,
                    success: false,
                },
                reset_confirm: {
                    loading: false,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_RESET.fulfilled", () => {
        const result = userReducer(initialState, actions.USER_RESET.fulfilled);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                reset: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_RESET.rejected", () => {
        const result = userReducer(initialState, actions.USER_RESET.rejected);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                reset: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_RESET_CONFIRM.pending", () => {
        const result = userReducer(
            initialState,
            actions.USER_RESET_CONFIRM.pending
        );

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                reset_confirm: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_RESET_CONFIRM.fulfilled", () => {
        const result = userReducer(
            initialState,
            actions.USER_RESET_CONFIRM.fulfilled
        );

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                reset: {
                    loading: false,
                    error: false,
                    success: false,
                },
                reset_confirm: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_RESET_CONFIRM.rejected", () => {
        const result = userReducer(
            initialState,
            actions.USER_RESET_CONFIRM.rejected
        );

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                reset_confirm: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_LOGOUT.pending", () => {
        const result = userReducer(initialState, actions.USER_LOGOUT.pending);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                logout: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_LOGOUT.fulfilled", () => {
        const result = userReducer(initialState, actions.USER_LOGOUT.fulfilled);

        expect(result).toEqual({
            ...initialState,
            user: initialState.user,
            status: {
                ...initialState.status,
                logout: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_LOGOUT.rejected", () => {
        const result = userReducer(initialState, actions.USER_LOGOUT.rejected);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                logout: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_UPDATE.pending", () => {
        const result = userReducer(initialState, actions.USER_UPDATE.pending);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                update: {
                    loading: true,
                    error: false,
                    success: false,
                },
            },
        });
    });

    // ========================================================
    it("USER_UPDATE.fulfilled", () => {
        const userMock: TApiGetUser = {
            success: true,
            user: { name: "test", email: "test" },
        };

        const result = userReducer(
            initialState,
            actions.USER_UPDATE.fulfilled(userMock, "test", userMock.user)
        );

        expect(result).toEqual({
            ...initialState,
            user: userMock.user,
            status: {
                ...initialState.status,
                update: {
                    loading: false,
                    error: false,
                    success: true,
                },
            },
        });
    });

    // ========================================================
    it("USER_UPDATE.rejected", () => {
        const result = userReducer(initialState, actions.USER_UPDATE.rejected);

        expect(result).toEqual({
            ...initialState,
            status: {
                ...initialState.status,
                update: {
                    loading: false,
                    error: true,
                    success: false,
                },
            },
        });
    });
});
