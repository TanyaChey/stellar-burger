import { forwardRef, memo } from "react";
import { TIngredient, TIngredientsList } from "../../utils/types";
import BurgerIngredientsItem from "../burger-ingredients-element/burger-ingredients-element";
import styles from "./burger-ingredients-category.module.scss";

interface IProps {
    title: string;
    items: TIngredientsList;
    type: string;
}

type TRef = HTMLHeadingElement;

const BurgerIngredientsCategory = forwardRef<TRef, IProps>(
    (props, ref): JSX.Element => {
        return (
            <>
                <h2 className="text text_type_main-medium mb-6 pt-10" ref={ref}>
                    {props.title}
                </h2>
                <div className={`${styles.list} ml-4 mr-4 mb-2`}>
                    {/* пробегаемся по полученному из пропсов массиву, рендерим список ингредиентов */}
                    {props.items.map((item: TIngredient) => (
                        <BurgerIngredientsItem
                            item={item}
                            type={props.type}
                            key={item._id}
                        />
                    ))}
                </div>
            </>
        );
    }
);

export default memo(BurgerIngredientsCategory);
