export type TIngredient = {
    _id: string;
    name: string;
    type: string;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid: string;
};

export type TIngredientsList = TIngredient[];

export type TConstructor = {
    bun: TIngredient;
    ingr: TIngredientsList;
};

// ===============
// ===== API =====
// ===============
type TApiSuccess = {
    success: boolean;
};

type TApiMessage = {
    message: string;
};

type TApiToken = {
    accessToken: string;
    refreshToken: string;
};

type TApiUser = {
    user: {
        email: string;
        name: string;
    };
};

export type TApiRefreshToken = TApiSuccess & TApiToken;

export type TApiGetUser = TApiSuccess & TApiUser;

export type TApiAuthUser = TApiSuccess & TApiToken & TApiUser;

// логаут и сброс пароля получают одинаковый ответ от сервера
// но мало ли что-то в дальнейшем может поменяться
// решил разнести по разным типам
type TApiUserOkResponse = TApiSuccess & TApiMessage;
export type TApiForgotUser = TApiUserOkResponse;
export type TApiResetUser = TApiUserOkResponse;
export type TApiLogoutUser = TApiUserOkResponse;

export type TIngredientsListRequest = TApiSuccess & {
    data: TIngredientsList;
};

export type TConstructorOrderDetails = {
    status: boolean;
    name: string;
    order: {
        number: number;
    };
};

// =====================
// ===== WebSocket =====
// =====================

export type TFeedOrder = {
    ingredients: string[];
    _id: string;
    status: string;
    name: string;
    number: number;
    createdAt: string;
    updatedAt: string;
};

export type TFeedOrdersAll = TApiSuccess & {
    orders: TFeedOrder[];
    total: number;
    totalToday: number;
};

export enum WebSocketStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    CONNECTING = "connecting",
    ERROR = "error",
}

export enum OrderStatus {
    DONE = "done",
    PENDING = "pending",
    CREATED = "created",
    CANCELED = "canceled",
}
