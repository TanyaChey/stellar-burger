import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { getIngredientById } from "../../services/ingredients-list/selectors";
import { useAppSelector } from "../../services/store/hooks";
import { TIngredient } from "../../utils/types";
import Loading from "../loading/loading";
import styles from "./ingredient-details.module.scss";

const IngredientDetails: FC = () => {
    const { id } = useParams();

    const ingredientDetails: TIngredient | undefined = useAppSelector(
        getIngredientById(id as string)
    );

    return (
        <>
            {ingredientDetails ? (
                <div className={styles.modal}>
                    <img
                        src={ingredientDetails.image_large}
                        alt={ingredientDetails.name}
                        className={`mt-4 mb-4 ${styles.img}`}
                    />
                    <p
                        className="text text_type_main-medium mb-8"
                        data-test="title"
                    >
                        {ingredientDetails.name}
                    </p>
                    <ul className={styles.desc}>
                        <li className={`${styles.desc__column} mr-10`}>
                            <p className="text text_type_main-default text_color_inactive mb-3">
                                Калории,ккал
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {ingredientDetails.calories}
                            </p>
                        </li>
                        <li className={`${styles.desc__column} mr-10`}>
                            <p className="text text_type_main-default text_color_inactive mb-3">
                                Белки, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {ingredientDetails.proteins}
                            </p>
                        </li>
                        <li className={`${styles.desc__column} mr-10`}>
                            <p className="text text_type_main-default text_color_inactive mb-3">
                                Жиры, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {ingredientDetails.fat}
                            </p>
                        </li>
                        <li className={styles.desc__column}>
                            <p className="text text_type_main-default text_color_inactive mb-3">
                                Углеводы, г
                            </p>
                            <p className="text text_type_digits-default text_color_inactive">
                                {ingredientDetails.carbohydrates}
                            </p>
                        </li>
                    </ul>
                </div>
            ) : (
                <Loading />
            )}
        </>
    );
};

export default memo(IngredientDetails);
