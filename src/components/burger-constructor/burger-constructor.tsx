import {
    Button,
    CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { FC, memo, useState } from "react";
import { getIsMobile } from "../../services/mobile/selectors";
import { useAppSelector } from "../../services/store/hooks";
import BurgerConstructorView from "../burger-constructor-view/burger-constructor-view";
import Modal from "../modals/modal/modal";
import BurgerConstructorTotalPrice from "../burger-constructor-total-price/burger-constructor-total-price";
import styles from "./burger-constructor.module.scss";

const BurgerConstructor: FC = () => {
    const isMobile: boolean = useAppSelector(getIsMobile);
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {!isMobile ? (
                // для десктопа
                <BurgerConstructorView />
            ) : (
                // для мобилки
                <>
                    <section className={styles.section}>
                        <div className={`${styles.sum} mt-10`}>
                            <BurgerConstructorTotalPrice extraClass="text text_type_digits-default" />
                            <CurrencyIcon type="primary" />
                            <Button
                                htmlType="button"
                                type="primary"
                                size="small"
                                onClick={() => setIsModalOpen(true)}
                                extraClass="remove-select ml-4"
                            >
                                Смотреть заказ
                            </Button>
                        </div>
                    </section>

                    {isModalOpen && isMobile && (
                        <Modal
                            closeModal={() => setIsModalOpen(false)}
                            title="Заказ"
                        >
                            <BurgerConstructorView />
                        </Modal>
                    )}
                </>
            )}
        </>
    );
};

export default memo(BurgerConstructor);
