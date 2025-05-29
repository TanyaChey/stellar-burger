import { FC, memo } from "react";
import { useParams } from "react-router-dom";
import { ErrorNotFoundPage } from ".";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import Loading from "../components/loading/loading";
import {
    getIngredientById,
    getIngredientsRequestSuccess,
} from "../services/ingredients-list/selectors";
import { getIsMobile } from "../services/mobile/selectors";
import { useAppSelector } from "../services/store/hooks";
import { TIngredient } from "../utils/types";

const IngredientDetailsPages: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const requestSuccess: boolean = useAppSelector(
        getIngredientsRequestSuccess
    );

    const { id } = useParams();

    const ingredientDetails: TIngredient | undefined = useAppSelector(
        getIngredientById(id as string)
    );

    return (
        <>
            {/* если данные по API еще не получены, то рендерим прелоадер */}
            {!requestSuccess && <Loading />}
            {/* если данные по API получены, то находим нужный ингредиент*/}
            {requestSuccess && ingredientDetails && (
                <>
                    <h3
                        className={`text text_type_main-large align-center ${
                            !isMobile ? "mt-20" : "mt-10"
                        }`}
                    >
                        Детали ингредиента
                    </h3>
                    <IngredientDetails />
                </>
            )}
            {/* если нужный ингредиент не нашелся - рендерим 404 */}
            {requestSuccess && !ingredientDetails && <ErrorNotFoundPage />}
        </>
    );
};

export default memo(IngredientDetailsPages);
