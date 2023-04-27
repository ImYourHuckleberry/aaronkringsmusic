/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Contact } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ContactUpdateForm(props) {
  const {
    id: idProp,
    contact: contactModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    Name: "",
    Email: "",
    Phone: "",
    LessonType: "",
    Message: "",
  };
  const [Name, setName] = React.useState(initialValues.Name);
  const [Email, setEmail] = React.useState(initialValues.Email);
  const [Phone, setPhone] = React.useState(initialValues.Phone);
  const [LessonType, setLessonType] = React.useState(initialValues.LessonType);
  const [Message, setMessage] = React.useState(initialValues.Message);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = contactRecord
      ? { ...initialValues, ...contactRecord }
      : initialValues;
    setName(cleanValues.Name);
    setEmail(cleanValues.Email);
    setPhone(cleanValues.Phone);
    setLessonType(cleanValues.LessonType);
    setMessage(cleanValues.Message);
    setErrors({});
  };
  const [contactRecord, setContactRecord] = React.useState(contactModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Contact, idProp)
        : contactModelProp;
      setContactRecord(record);
    };
    queryData();
  }, [idProp, contactModelProp]);
  React.useEffect(resetStateValues, [contactRecord]);
  const validations = {
    Name: [{ type: "Required" }],
    Email: [{ type: "Required" }, { type: "Email" }],
    Phone: [{ type: "Phone" }],
    LessonType: [{ type: "Required" }],
    Message: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          Name,
          Email,
          Phone,
          LessonType,
          Message,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Contact.copyOf(contactRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ContactUpdateForm")}
      {...rest}
    >
      <TextField
        label="Name"
        isRequired={true}
        isReadOnly={false}
        value={Name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name: value,
              Email,
              Phone,
              LessonType,
              Message,
            };
            const result = onChange(modelFields);
            value = result?.Name ?? value;
          }
          if (errors.Name?.hasError) {
            runValidationTasks("Name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("Name", Name)}
        errorMessage={errors.Name?.errorMessage}
        hasError={errors.Name?.hasError}
        {...getOverrideProps(overrides, "Name")}
      ></TextField>
      <TextField
        label="Email"
        isRequired={true}
        isReadOnly={false}
        value={Email}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email: value,
              Phone,
              LessonType,
              Message,
            };
            const result = onChange(modelFields);
            value = result?.Email ?? value;
          }
          if (errors.Email?.hasError) {
            runValidationTasks("Email", value);
          }
          setEmail(value);
        }}
        onBlur={() => runValidationTasks("Email", Email)}
        errorMessage={errors.Email?.errorMessage}
        hasError={errors.Email?.hasError}
        {...getOverrideProps(overrides, "Email")}
      ></TextField>
      <TextField
        label="Phone"
        isRequired={false}
        isReadOnly={false}
        type="tel"
        value={Phone}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              Phone: value,
              LessonType,
              Message,
            };
            const result = onChange(modelFields);
            value = result?.Phone ?? value;
          }
          if (errors.Phone?.hasError) {
            runValidationTasks("Phone", value);
          }
          setPhone(value);
        }}
        onBlur={() => runValidationTasks("Phone", Phone)}
        errorMessage={errors.Phone?.errorMessage}
        hasError={errors.Phone?.hasError}
        {...getOverrideProps(overrides, "Phone")}
      ></TextField>
      <SelectField
        label="Lesson type"
        placeholder="Please select an option"
        isDisabled={false}
        value={LessonType}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              Phone,
              LessonType: value,
              Message,
            };
            const result = onChange(modelFields);
            value = result?.LessonType ?? value;
          }
          if (errors.LessonType?.hasError) {
            runValidationTasks("LessonType", value);
          }
          setLessonType(value);
        }}
        onBlur={() => runValidationTasks("LessonType", LessonType)}
        errorMessage={errors.LessonType?.errorMessage}
        hasError={errors.LessonType?.hasError}
        {...getOverrideProps(overrides, "LessonType")}
      >
        <option
          children="In person"
          value="IN_PERSON"
          {...getOverrideProps(overrides, "LessonTypeoption0")}
        ></option>
        <option
          children="Online"
          value="ONLINE"
          {...getOverrideProps(overrides, "LessonTypeoption1")}
        ></option>
      </SelectField>
      <TextField
        label="Message"
        isRequired={true}
        isReadOnly={false}
        value={Message}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              Name,
              Email,
              Phone,
              LessonType,
              Message: value,
            };
            const result = onChange(modelFields);
            value = result?.Message ?? value;
          }
          if (errors.Message?.hasError) {
            runValidationTasks("Message", value);
          }
          setMessage(value);
        }}
        onBlur={() => runValidationTasks("Message", Message)}
        errorMessage={errors.Message?.errorMessage}
        hasError={errors.Message?.hasError}
        {...getOverrideProps(overrides, "Message")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || contactModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || contactModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
