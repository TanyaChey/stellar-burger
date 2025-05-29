import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useState } from "react";
import { useDrop } from "react-dnd";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser } from "../../services/auth/selectors";
import { INGREDIENT_MOVE } from "../../services/burger-constructor/actions";
import { getСonstructorList } from "../../services/burger-constructor/selectors";
import {
    CONSTRUCTOR_ORDER_DETAILS_REQUEST,
    CONSTRUCTOR_ORDER_DETAILS_RESET,
} from "../../services/constructor-order-details/actions";
import {
    getConstructorOrderDetailsHasError,
    getConstructorOrderDetailsIsLoading,
    getConstructorOrderDetailsRequestSuccess,
} from "../../services/constructor-order-details/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { TConstructor, TIngredient } from "../../utils/types";
import BurgerConstructorElement from "../burger-constructor-element/burger-constructor-element";
import BurgerConstructorElementEmpty from "../burger-constructor-element/burger-constructor-element-empty";
import ConstructorOrderDetails from "../constructor-order-details/constructor-order-details";
import Loading from "../loading/loading";
import Modal from "../modals/modal/modal";
import BurgerConstructorTotalPrice from "../burger-constructor-total-price/burger-constructor-total-price";
import styles from "./burger-constructor-view.module.scss";
import { _LOGIN_PATH } from "../../utils/vars";

const BurgerConstructorView: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // список всех ингредиентов, полученных по API
    const isLoading: boolean = useAppSelector(
        getConstructorOrderDetailsIsLoading
    );
    const hasError: boolean = useAppSelector(
        getConstructorOrderDetailsHasError
    );
    const requestSuccess: boolean = useAppSelector(
        getConstructorOrderDetailsRequestSuccess
    );

    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();

    // получаем список конструктора из стора
    const constructorList: TConstructor = useAppSelector(getСonstructorList);
    const BUN = constructorList.bun;
    const INGR = constructorList.ingr;

    // это для кнопки "оформить заказ"
    const user = useAppSelector(getUser);
    const navigate = useNavigate();
    const location = useLocation();

    // управление модалкой
    const openModal = () => {
        !user &&
            BUN &&
            INGR.length > 0 &&
            navigate(_LOGIN_PATH, { state: { from: location } });
        user && BUN && INGR.length > 0 && getConstructorOrderDetails();
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        dispatch(CONSTRUCTOR_ORDER_DETAILS_RESET());
    };

    //сортировка списка в конструкторе
    const findItem = (id: string) => {
        const item = INGR.filter((c) => `${c.uuid}` === id)[0] as TIngredient;
        return {
            item,
            index: INGR.indexOf(item),
        };
    };

    const moveItem = (id: string, atIndex: number) => {
        const { index } = findItem(id);
        dispatch(INGREDIENT_MOVE(index, atIndex));
    };

    const [, drop] = useDrop(() => ({ accept: "ingr" }));

    // получаем данные заказа по API
    const getConstructorOrderDetails = () => {
        let ids: string[] = INGR.map((x: TIngredient) => x._id);
        ids.unshift(BUN._id);
        ids.push(BUN._id);

        let sendData = {
            ingredients: ids,
        };
        dispatch(CONSTRUCTOR_ORDER_DETAILS_REQUEST(sendData));
    };

    return (
        <>
            <section
                className={`${styles.section} ${
                    !isMobile
                        ? `${styles.desktop} pt-15 pb-10`
                        : styles.section__mobile
                }`}
            >
                <div className={styles.list}>
                    {/* фиксированная верхняя булка */}
                    {BUN ? (
                        <BurgerConstructorElement
                            ingredient={BUN}
                            isLocked={true}
                            position="top"
                            type="bun"
                            moveItem={moveItem}
                            findItem={findItem}
                        />
                    ) : (
                        <BurgerConstructorElementEmpty
                            isLocked={true}
                            position="top"
                            type="bun"
                        />
                    )}
                    <div
                        className={`${styles.stuff} ${
                            !isMobile ? "mt-4 mb-4 pr-4 pl-10" : ""
                        } custom-scroll`}
                    >
                        {/* список конструктора */}
                        <div className={styles.stuff__inner}>
                            {INGR.length > 0 ? (
                                <>
                                    <span
                                        className={styles.stuff__inner__span}
                                        ref={drop}
                                    >
                                        {/* пробегаемся по массиву ингредиентов и рендерим список */}
                                        {INGR.map((e: TIngredient) => (
                                            <BurgerConstructorElement
                                                key={e.uuid}
                                                ingredient={e}
                                                isLocked={false}
                                                extraClass=""
                                                type="ingredients"
                                                moveItem={moveItem}
                                                findItem={findItem}
                                            />
                                        ))}
                                    </span>
                                </>
                            ) : (
                                <BurgerConstructorElementEmpty
                                    isLocked={false}
                                    extraClass=""
                                    type="ingredients"
                                />
                            )}
                        </div>
                    </div>

                    {/* фиксированная нижняя булка */}
                    {BUN ? (
                        <BurgerConstructorElement
                            ingredient={BUN}
                            isLocked={true}
                            position="bottom"
                            type="bun"
                            moveItem={moveItem}
                            findItem={findItem}
                        />
                    ) : (
                        <BurgerConstructorElementEmpty
                            isLocked={true}
                            position="bottom"
                            type="bun"
                        />
                    )}
                </div>

                {/* итог по сумме и "оформить" */}
                <div className={`${styles.sum} mt-10 mr-4`}>
                    <BurgerConstructorTotalPrice
                        extraClass={
                            !isMobile
                                ? "text text_type_digits-medium"
                                : "text text_type_digits-default"
                        }
                    />
                    <CurrencyIcon type="primary" />
                    <Button
                        htmlType="button"
                        type="primary"
                        size={!isMobile ? "large" : "small"}
                        onClick={openModal}
                        extraClass={
                            !isMobile
                                ? "remove-select ml-10"
                                : "remove-select ml-4"
                        }
                        data-test="order-btn"
                    >
                        Оформить заказ
                    </Button>
                </div>
            </section>
            {isModalOpen && (
                <Modal closeModal={closeModal}>
                    {/* стандартная вилка рендера */}
                    {!isLoading && !hasError && !requestSuccess && (
                        <Loading>Добавь ингредиентов</Loading>
                    )}
                    {isLoading && <Loading>Создание заказа</Loading>}
                    {hasError && <Loading>Ошибка загрузки Х_Х</Loading>}
                    {!isLoading && !hasError && requestSuccess && (
                        <ConstructorOrderDetails />
                    )}
                </Modal>
            )}
        </>
    );
};

export default memo(BurgerConstructorView);
