import { eventBus } from "../utils/eventBus";

export const showSuccessMessage = (payload) => {
  let successMessage = payload;

  if (payload.data) {
    successMessage = payload.data.message;
  }

  eventBus.emit("toast", {
    type: "Success",
    message: successMessage
  });
};

export const showErrorMessage = (error) => {
  let errorMessage = error || "Something went Wrong!";

  if (error.response) {
    errorMessage = error.response.data.message;
  } else if (error.message) {
    errorMessage = error.message;
  }

  eventBus.emit("toast", {
    type: "Error",
    message: errorMessage
  });
};
