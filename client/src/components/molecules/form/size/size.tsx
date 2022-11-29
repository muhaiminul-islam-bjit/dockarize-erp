import Joi from "joi";
import React, { useState } from "react"
import { handleChangeCommon, validate } from "../../../../lib/form";
import { store } from "../../../../services/dataServices";
import Button from "../../../atom/button/button";
import Container from "../../../atom/container/container";
import Input from "../../../atom/input/input";

interface SizeFormProps {
    isSuuccess: () => void;
}

const SizeForm: React.FC<SizeFormProps> = ({ isSuuccess }) => {
    const [data, setData] = useState<any>({
        size: ''
    });
    const [errors, setErrors] = useState<any>({});
    const createUrl = "store-customer";
    const formObj = {
        size: "",
    };
    const rules: any = {
        size: Joi.string()
            .min(3)
            .max(30)
            .required()
            .label("Customer Name"),
        customer_address: Joi.string().min(3).max(100).required().label("Address"),
        customer_phone: Joi.number().min(3).required().label("Phone"),
        id: Joi.optional(),
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const errors = validate(data, rules);
        setErrors(errors ? errors : {});
        if (errors) {
            return;
        }

        let response = await store(data, createUrl);
        if (response) {
            setData(formObj);
            isSuuccess();
        }
    };

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const hadleChangeData = handleChangeCommon(e, data, errors, rules);
        setErrors(hadleChangeData.error);
        setData(hadleChangeData.account);
    };
    return (
        <div className="o-form">
            <form onSubmit={handleSubmit}>
                <Container margin="12">
                    <Input
                        label="Size"
                        value={data.size}
                        onChange={handleChange}
                        name="size"
                        type="text"
                        error={errors.size}
                        placeHolder="Size"
                    />
                </Container>
                <Container margin="12">
                    <Button label="Add" disabled={false} />
                </Container>
            </form>
        </div>
    );
}

export default SizeForm;