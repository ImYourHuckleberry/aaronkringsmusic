import * as React from "react";
import { Button, Flex, Grid, SelectField,TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Event } from "../models";
import { fetchByPath, validateField } from "../ui-components/utils";
import { Storage, DataStore } from "aws-amplify";
const EventCreateFormCopy = (props) => {
    const {
        clearOnSuccess = true,
        onSuccess,
        onError,
        onSubmit,
        onValidate,
        onChange,
        overrides,
        getFreshForm,
        setOpen,
        setEventAction,
        ...rest
    } = props;
    const initialValues = {
        date: "",
        time: "",
        title: "",
        subTitle: "",
        extraInfo: "",
        location: "",
        veneueUrl: "",
        bandUrl: "",
        image: "",
        imageFile: "",
        ticketPrice: "",
        ticketAvailability: "",
    };
    const [date, setDate] = React.useState(initialValues.date);
    const [time, setTime] = React.useState(initialValues.time);
    const [title, setTitle] = React.useState(initialValues.title);
    const [subTitle, setSubTitle] = React.useState(initialValues.subTitle);
    const [extraInfo, setExtraInfo] = React.useState(initialValues.extraInfo);
    const [location, setLocation] = React.useState(initialValues.location);
    const [veneueUrl, setVeneueUrl] = React.useState(initialValues.veneueUrl);
    const [bandUrl, setBandUrl] = React.useState(initialValues.bandUrl);
    const [image, setImage] = React.useState(initialValues.image);
    const [errors, setErrors] = React.useState({});
    const [imageFile, setImageFile] = React.useState(initialValues.imageFile);
    const [ticketPrice, setTicketPrice] = React.useState(
        initialValues.ticketPrice
      );
      const [ticketAvailability, setTicketAvailability] = React.useState(
        initialValues.ticketAvailability
      );

    const resetStateValues = () => {
        console.log("resetting")
        setImageFile(initialValues.imageFile);
        setDate(initialValues.date);
        setTime(initialValues.time);
        setTitle(initialValues.title);
        setSubTitle(initialValues.subTitle);
        setExtraInfo(initialValues.extraInfo);
        setLocation(initialValues.location);
        setVeneueUrl(initialValues.veneueUrl);
        setBandUrl(initialValues.bandUrl);
        setImage(initialValues.image);
        setTicketPrice(initialValues.ticketPrice);
        setTicketAvailability(initialValues.ticketAvailability);
        setErrors({});
        // Clear the image file state by setting it to null
    };
    const validations = {
        date: [],
        time: [],
        title: [],
        subTitle: [],
        extraInfo: [],
        location: [],
        veneueUrl: [{ type: "URL" }],
        bandUrl: [{ type: "URL" }],
        image: [],
        imageFile: [],
        ticketPrice: [],
        ticketAvailability: [],
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
                    date,
                    time,
                    title,
                    subTitle,
                    extraInfo,
                    location,
                    veneueUrl,
                    bandUrl,
                    image,
                    ticketPrice,
          ticketAvailability,
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
                if (imageFile) {
                    try {
                        const imageKey = `images/${imageFile.name}`;
                        await Storage.put(imageKey, imageFile, {
                            contentDisposition: "view"
                        });
                        setImage(imageKey)
                        modelFields.image = imageKey;

                    } catch (err) {
                        console.log(err)
                    }
                }
                try {
                    Object.entries(modelFields).forEach(([key, value]) => {
                        if (typeof value === "string" && value.trim() === "") {
                            modelFields[key] = undefined;
                        }
                    });
                    await DataStore.save(new Event(modelFields));
                    if (onSuccess) {
                        onSuccess(modelFields);
                    }
                    if (clearOnSuccess) {
                        resetStateValues();
                        getFreshForm();
                        setEventAction("Created")
                        setOpen(true)
                    }
                } catch (err) {
                    if (onError) {
                        onError(modelFields, err.message);
                    }
                }
            }}
            {...getOverrideProps(overrides, "EventCreateForm")}
            {...rest}
        >
            <TextField
                label="Date"
                isRequired={false}
                isReadOnly={false}
                type="date"
                value={date}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date: value,
                            time,
                            title,
                            subTitle,
                            extraInfo,
                            location,
                            veneueUrl,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.date ?? value;
                    }
                    if (errors.date?.hasError) {
                        runValidationTasks("date", value);
                    }
                    setDate(value);
                }}
                onBlur={() => runValidationTasks("date", date)}
                errorMessage={errors.date?.errorMessage}
                hasError={errors.date?.hasError}
                {...getOverrideProps(overrides, "date")}
            ></TextField>
            <TextField
                label="Time"
                isRequired={false}
                isReadOnly={false}
                type="time"
                value={time}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time: value,
                            title,
                            subTitle,
                            extraInfo,
                            location,
                            veneueUrl,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.time ?? value;
                    }
                    if (errors.time?.hasError) {
                        runValidationTasks("time", value);
                    }
                    setTime(value);
                }}
                onBlur={() => runValidationTasks("time", time)}
                errorMessage={errors.time?.errorMessage}
                hasError={errors.time?.hasError}
                {...getOverrideProps(overrides, "time")}
            ></TextField>
            <TextField
                label="Title"
                isRequired={false}
                isReadOnly={false}
                value={title}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time,
                            title: value,
                            subTitle,
                            extraInfo,
                            location,
                            veneueUrl,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.title ?? value;
                    }
                    if (errors.title?.hasError) {
                        runValidationTasks("title", value);
                    }
                    setTitle(value);
                }}
                onBlur={() => runValidationTasks("title", title)}
                errorMessage={errors.title?.errorMessage}
                hasError={errors.title?.hasError}
                {...getOverrideProps(overrides, "title")}
            ></TextField>
            <TextField
                label="Sub title"
                isRequired={false}
                isReadOnly={false}
                value={subTitle}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time,
                            title,
                            subTitle: value,
                            extraInfo,
                            location,
                            veneueUrl,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.subTitle ?? value;
                    }
                    if (errors.subTitle?.hasError) {
                        runValidationTasks("subTitle", value);
                    }
                    setSubTitle(value);
                }}
                onBlur={() => runValidationTasks("subTitle", subTitle)}
                errorMessage={errors.subTitle?.errorMessage}
                hasError={errors.subTitle?.hasError}
                {...getOverrideProps(overrides, "subTitle")}
            ></TextField>
            <TextField
                label="Extra info"
                isRequired={false}
                isReadOnly={false}
                value={extraInfo}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time,
                            title,
                            subTitle,
                            extraInfo: value,
                            location,
                            veneueUrl,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.extraInfo ?? value;
                    }
                    if (errors.extraInfo?.hasError) {
                        runValidationTasks("extraInfo", value);
                    }
                    setExtraInfo(value);
                }}
                onBlur={() => runValidationTasks("extraInfo", extraInfo)}
                errorMessage={errors.extraInfo?.errorMessage}
                hasError={errors.extraInfo?.hasError}
                {...getOverrideProps(overrides, "extraInfo")}
            ></TextField>
            <TextField
                label="Location"
                isRequired={false}
                isReadOnly={false}
                value={location}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time,
                            title,
                            subTitle,
                            extraInfo,
                            location: value,
                            veneueUrl,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.location ?? value;
                    }
                    if (errors.location?.hasError) {
                        runValidationTasks("location", value);
                    }
                    setLocation(value);
                }}
                onBlur={() => runValidationTasks("location", location)}
                errorMessage={errors.location?.errorMessage}
                hasError={errors.location?.hasError}
                {...getOverrideProps(overrides, "location")}
            ></TextField>
            <TextField
                label="Veneue url"
                isRequired={false}
                isReadOnly={false}
                value={veneueUrl}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time,
                            title,
                            subTitle,
                            extraInfo,
                            location,
                            veneueUrl: value,
                            bandUrl,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.veneueUrl ?? value;
                    }
                    if (errors.veneueUrl?.hasError) {
                        runValidationTasks("veneueUrl", value);
                    }
                    setVeneueUrl(value);
                }}
                onBlur={() => runValidationTasks("veneueUrl", veneueUrl)}
                errorMessage={errors.veneueUrl?.errorMessage}
                hasError={errors.veneueUrl?.hasError}
                {...getOverrideProps(overrides, "veneueUrl")}
            ></TextField>
            <TextField
                label="Band url"
                isRequired={false}
                isReadOnly={false}
                value={bandUrl}
                onChange={(e) => {
                    let { value } = e.target;
                    if (onChange) {
                        const modelFields = {
                            date,
                            time,
                            title,
                            subTitle,
                            extraInfo,
                            location,
                            veneueUrl,
                            bandUrl: value,
                            image,
                            ticketPrice,
              ticketAvailability,
                        };
                        const result = onChange(modelFields);
                        value = result?.bandUrl ?? value;
                    }
                    if (errors.bandUrl?.hasError) {
                        runValidationTasks("bandUrl", value);
                    }
                    setBandUrl(value);
                }}
                onBlur={() => runValidationTasks("bandUrl", bandUrl)}
                errorMessage={errors.bandUrl?.errorMessage}
                hasError={errors.bandUrl?.hasError}
                {...getOverrideProps(overrides, "bandUrl")}
            ></TextField>
            <TextField
                label="Image"
                isRequired={false}
                isReadOnly={false}
                type="file"
                accept="image/*"
                onChange={(e) => {
                    if (e.target.files.length > 0) {
                        console.log(e.target.files)
                        setImageFile(e.target.files[0]);
                        setImage(""); // Clear the image text value
                    } else {
                        setImageFile(null);
                        setImage(""); // Clear the image text value
                    }
                }}
                {...getOverrideProps(overrides, "image")}
            />
<TextField
        label="Ticket price"
        isRequired={false}
        isReadOnly={false}
        value={ticketPrice}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subTitle,
              extraInfo,
              date,
              time,
              location,
              veneueUrl,
              bandUrl,
              image,
              ticketPrice: value,
              ticketAvailability,
            };
            const result = onChange(modelFields);
            value = result?.ticketPrice ?? value;
          }
          if (errors.ticketPrice?.hasError) {
            runValidationTasks("ticketPrice", value);
          }
          setTicketPrice(value);
        }}
        onBlur={() => runValidationTasks("ticketPrice", ticketPrice)}
        errorMessage={errors.ticketPrice?.errorMessage}
        hasError={errors.ticketPrice?.hasError}
        {...getOverrideProps(overrides, "ticketPrice")}
      ></TextField>
      <SelectField
        label="Ticket availability"
        placeholder="Please select an option"
        isDisabled={false}
        value={ticketAvailability}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              title,
              subTitle,
              extraInfo,
              date,
              time,
              location,
              veneueUrl,
              bandUrl,
              image,
              ticketPrice,
              ticketAvailability: value,
            };
            const result = onChange(modelFields);
            value = result?.ticketAvailability ?? value;
          }
          if (errors.ticketAvailability?.hasError) {
            runValidationTasks("ticketAvailability", value);
          }
          setTicketAvailability(value);
        }}
        onBlur={() =>
          runValidationTasks("ticketAvailability", ticketAvailability)
        }
        errorMessage={errors.ticketAvailability?.errorMessage}
        hasError={errors.ticketAvailability?.hasError}
        {...getOverrideProps(overrides, "ticketAvailability")}
      >
        <option
          children="On sale"
          value="ON_SALE"
          {...getOverrideProps(overrides, "ticketAvailabilityoption0")}
        ></option>
        <option
          children="Sold out"
          value="SOLD_OUT"
          {...getOverrideProps(overrides, "ticketAvailabilityoption1")}
        ></option>
        <option
          children="Coming soon"
          value="COMING_SOON"
          {...getOverrideProps(overrides, "ticketAvailabilityoption2")}
        ></option>
        <option
          children="Free"
          value="FREE"
          {...getOverrideProps(overrides, "ticketAvailabilityoption3")}
        ></option>
      </SelectField>
            <Flex
                justifyContent="space-between"
                {...getOverrideProps(overrides, "CTAFlex")}
            >
                <Button
                    children="Clear"
                    type="reset"
                    onClick={(event) => {
                        event.preventDefault();
                        resetStateValues();
                        getFreshForm();
                    }}
                    {...getOverrideProps(overrides, "ClearButton")}
                ></Button>
                <Flex
                    gap="15px"
                    {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
                >
                    <Button
                        children="Submit"
                        type="submit"
                        variation="primary"
                        isDisabled={Object.values(errors).some((e) => e?.hasError)}
                        {...getOverrideProps(overrides, "SubmitButton")}
                    ></Button>
                </Flex>
            </Flex>
        </Grid>
    );
}
export default EventCreateFormCopy;