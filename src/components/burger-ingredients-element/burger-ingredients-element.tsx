import {
    Counter,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useMemo } from "react";
import { DragPreviewImage, useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { INGREDIENT_ADD } from "../../services/burger-constructor/actions";
import { getСonstructorList } from "../../services/burger-constructor/selectors";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { TConstructor, TIngredient } from "../../utils/types";
import { _INGREDIENTS_PATH } from "../../utils/vars";
import styles from "./burger-ingredients-element.module.scss";

interface IProps {
    item: TIngredient;
    type: string;
}

const BurgerIngredientsElement: FC<IProps> = ({ item, type }) => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // получаем список конструктора из стора
    const constructorList: TConstructor = useAppSelector(getСonstructorList);
    const location = useLocation();
    const dispatch = useAppDispatch();

    // добавляем игридиент в конструктор
    // модалка откроется из компонента <App/>
    const addIngredient = (item: TIngredient) => {
        dispatch(INGREDIENT_ADD(item));
    };

    // Drag&Drop
    const [{ opacity }, dragRef, dragPreview] = useDrag(
        () => ({
            type: type,
            item: item,
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
        }),
        [item, type]
    );

    // счетчик кол-ва игредиентов к конструкторе
    const count = useMemo(() => {
        let count = 0;
        if (item.type === "bun" && constructorList.bun) {
            constructorList.bun._id === item._id ? (count = 2) : (count = 0);
        } else if (item.type !== "bun" && constructorList.ingr.length > 0) {
            constructorList.ingr.map((elem: TIngredient) =>
                elem._id === item._id ? (count += 1) : count
            );
        } else if (item.type !== "bun" && constructorList.ingr.length === 0) {
            count = 0;
        }
        return count;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [constructorList]);

    return (
        <>
            <DragPreviewImage connect={dragPreview} src={item.image} />
            <Link
                to={_INGREDIENTS_PATH + "/" + item._id}
                state={{ backgroundLocation: location }}
                className={`${styles.item} mb-8 remove-select`}
                key={item._id}
                onClick={isMobile ? () => addIngredient(item) : undefined}
                style={{ opacity }}
                ref={dragRef}
                data-test="ingredient"
                data-test-type={item.type}
            >
                {count > 0 && (
                    <Counter
                        count={count}
                        size={isMobile ? "small" : "default"}
                        extraClass={isMobile ? "" : "m-1"}
                    />
                )}
                <img
                    src={item.image}
                    alt={item.name}
                    className={`${styles.img} pl-4 pr-4 mb-1`}
                />
                <p
                    className={`${styles.price} mb-1 text text_type_digits-default`}
                >
                    {item.price}
                    <CurrencyIcon type="primary" />
                </p>
                <p className={`text text_type_main-default ${styles.text}`}>
                    {item.name}
                </p>
            </Link>
        </>
    );
};

export default memo(BurgerIngredientsElement);
