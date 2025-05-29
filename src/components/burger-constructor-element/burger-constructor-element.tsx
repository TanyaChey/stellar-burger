import {
    CurrencyIcon,
    DeleteIcon,
    DragIcon,
    LockIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo } from "react";
import { useDrag, useDrop } from "react-dnd";
import {
    INGREDIENT_ADD,
    INGREDIENT_REMOVE,
} from "../../services/burger-constructor/actions";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppDispatch, useAppSelector } from "../../services/store/hooks";
import { TIngredient } from "../../utils/types";
import styles from "./burger-constructor-element.module.scss";

interface IProps {
    ingredient: TIngredient;
    isLocked?: boolean;
    position?: "top" | "bottom";
    extraClass?: string;
    type: string;
    moveItem: (id: string, to: number) => void;
    findItem: (id: string) => { index: number };
}

const BurgerConstructorElement: FC<IProps> = (props) => {
    const isMobile: boolean = useAppSelector(getIsMobile);

    // ловим drag&drop из списка ингредиентов в конструктор
    const dispatch = useAppDispatch();
    const [{ isOver, canDrop }, dropTarget] = useDrop({
        accept: props.type,
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop(item) {
            dispatch(INGREDIENT_ADD(item as TIngredient));
        },
    });

    const removeIngredient = () => {
        dispatch(INGREDIENT_REMOVE(props.ingredient));
    };

    //сортируем список ингредиентов в конструкторе
    const uuid = props.ingredient.uuid;
    const originalIndex = props.findItem(uuid).index;
    const [{ opacity }, drag] = useDrag(
        () => ({
            type: "ingr",
            item: { uuid, originalIndex },
            collect: (monitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
            end: (item, monitor) => {
                const { uuid: droppedId, originalIndex } = item;
                const didDrop = monitor.didDrop();
                if (!didDrop) {
                    props.moveItem(droppedId, originalIndex);
                }
            },
        }),
        [props.ingredient.uuid, originalIndex, props.moveItem]
    );

    const [, drop] = useDrop(
        () => ({
            accept: "ingr",
            hover({ uuid: draggedId }: any) {
                if (draggedId !== uuid) {
                    const { index: overIndex } = props.findItem(uuid);
                    props.moveItem(draggedId, overIndex);
                }
            },
        }),
        [props.findItem, props.moveItem]
    );

    return (
        <>
            {/* обёртка, к которой цепляем цель дропа DnD из списка ингредиентов */}
            <span ref={(node) => drag(drop(node))} style={{ opacity }}>
                <article
                    className={`
          ${isMobile ? styles.item : ""} 
          ${props.isLocked ? "mr-4 ml-10" : ""} 
        `}
                    ref={dropTarget}
                    data-test={`constructor-${props.type}`}
                >
                    {/* если это не булка - рендерим иконку перетаскивания слева от элемента */}
                    {!props.isLocked && props.ingredient && (
                        <span
                            className={`${styles.drag__icon} ${
                                isMobile && styles.drag__icon__mobile
                            }`}
                        >
                            <DragIcon type="secondary" />
                        </span>
                    )}
                    {/* в мобильной версии рендерим эконку замка у булки */}
                    {props.isLocked && isMobile && props.ingredient && (
                        <span
                            className={`${styles.drag__icon} ${styles.drag__icon__mobile}`}
                        >
                            <LockIcon type="secondary" />
                        </span>
                    )}
                    {/* в мобильной версии рендерим скрытую иконку-кнопку удаления элемента из конструктора (открывается свайпом влево) */}
                    {!props.isLocked && isMobile && props.ingredient && (
                        <span className={styles.delete__icon__mobile}>
                            <DeleteIcon
                                type="primary"
                                onClick={removeIngredient}
                            />
                        </span>
                    )}
                    <div
                        className={`constructor-element constructor-element_pos_${
                            props.position
                        }
          ${styles.drop__target}
          ${isMobile ? styles.item__element : ""} 
          ${isOver ? styles.drop__hover : ""}
          ${canDrop ? styles.drop__can : ""}
            `}
                    >
                        <span className="constructor-element__row">
                            {props.ingredient ? (
                                <>
                                    <img
                                        className="constructor-element__image"
                                        src={props.ingredient.image}
                                        alt={props.ingredient.name}
                                    />
                                    <span className="constructor-element__text">
                                        {props.ingredient.name}
                                    </span>
                                    <span className="constructor-element__price">
                                        {props.ingredient.price}
                                        <CurrencyIcon type="primary" />
                                        {/* в десктопной версии рендерим иконку замка/перетаскивания у ингредиента */}
                                        {!isMobile && (
                                            <>
                                                {props.isLocked ? (
                                                    <LockIcon type="secondary" />
                                                ) : (
                                                    <span
                                                        className={
                                                            styles.delete__icon
                                                        }
                                                    >
                                                        <DeleteIcon
                                                            type="secondary"
                                                            onClick={
                                                                removeIngredient
                                                            }
                                                        />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </span>
                                </>
                            ) : (
                                // загрулушка для пустых элементов
                                <span className={styles.empty__text}>
                                    {props.type === "bun"
                                        ? "Выбери булку"
                                        : "Выбери начинку"}
                                </span>
                            )}
                        </span>
                    </div>
                </article>
            </span>
        </>
    );
};

export default memo(BurgerConstructorElement);
