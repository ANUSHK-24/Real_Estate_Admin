



import React, { useContext } from "react";
import { Box, Button, Group, NumberInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { createResidency } from "../utils/api";
import UserDetailContext from "../context/UserDetailContext";
import useProperties from "../hooks/useProperties";

const Facilities = ({
  prevStep,
  propertyDetails,
  setPropertyDetails,
  setActiveStep,
}) => {
  const form = useForm({
    initialValues: {
      area: propertyDetails.facilities?.area || 0,
    },
    validate: {
      
      area: (value) =>
        value < 1 ? "Must be greater than 0" : null,
    },
  });

  const {  area } = form.values;

  const { refetch: refetchProperties } = useProperties();

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createResidency({
        ...propertyDetails,
        facilities: { area },
      }),
    onSuccess: () => {
      toast.success("Property added successfully!", {
        position: "bottom-right",
      });

      // Reset form and state
      setPropertyDetails({
        title: "",
        description: "",
        price: 0,
        country: "",
        city: "",
        address: "",
        img: null,
        facilities: { area: 0 },
      });

    //   if (typeof setOpened === "function") setOpened(false);
      if (typeof setActiveStep === "function") setActiveStep(0);
      refetchProperties();
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Something went wrong",
        { position: "bottom-right" }
      );
    },
  });

  const handleSubmit = () => {
    const { hasError } = form.validate();
    if (!hasError) {
      setPropertyDetails((prev) => ({
        ...prev,
        facilities: {  area },
      }));
      mutate();
    }
  };

  return (
    <Box maw={"30%"} mx="auto" my="sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
     
        <NumberInput
          required
          label="Area(sq.ft)"
          min={0}
          {...form.getInputProps("area")}
        />

        <Group justify="center" mt="xl">
          <Button variant="default" onClick={prevStep} disabled={isLoading}>
            Back
          </Button>
          <Button type="submit" color="green" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Add Property"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default Facilities;