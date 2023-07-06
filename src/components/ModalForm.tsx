import Modal from "react-modal";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Box } from "@mui/system";
import { Config, INITIAL_CONFIG } from "../phone";

Modal.setAppElement("#root");

type Props = {
  isOpen: boolean;
  setFormData: (formData: Config) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  config: Config;
};

const validationSchema = Yup.object({
  time_delay: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  min_levenstein_distance: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  min_text_length_to_check_levenstein_distance: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  is_streaming: Yup.boolean().required("Required"),
  streaming_time_delay: Yup.number()
    .required("Required")
    .min(0, "Must be greater than or equal to 0"),
  question: Yup.string()
    .required("Required")
    .min(1, "Must be at least 1 character"),
  model_name: Yup.string()
    .required("Required")
    .min(1, "Must be at least 1 character"),
});

const ModalForm = (props: Props) => {
  const { isOpen, setFormData, setIsOpen, config } = props;

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = (values: Config) => {
    setFormData(values);
    handleCloseModal();
  };

  const handleResetConfig = () => {
    setFormData(INITIAL_CONFIG);
    handleCloseModal();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={() => handleCloseModal}>
      <h2>Config</h2>
      <Formik
        initialValues={config}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched, values }) => (
          <Form
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Box display="flex" gap="10px">
              <label htmlFor="question">Question to Respondent:</label>
              <Field
                as="textarea"
                rows="1"
                cols="50"
                id="question"
                name="question"
              />
              {errors.question && touched.question && (
                <Box>{errors.question}</Box>
              )}
            </Box>
            <Box display="flex" gap="10px">
              <label htmlFor="model_name">Model Name:</label>
              <Field
                as="textarea"
                rows="1"
                cols="50"
                id="model_name"
                name="model_name"
              />
              {errors.model_name && touched.model_name && (
                <Box>{errors.model_name}</Box>
              )}
            </Box>
            <Box display="flex" gap="10px">
              <label htmlFor="time_delay">Time Delay (in ms):</label>
              <Field id="time_delay" name="time_delay" type="number" />
              {errors.time_delay && touched.time_delay && (
                <Box>{errors.time_delay}</Box>
              )}
            </Box>
            <Box display="flex" gap="10px">
              <label htmlFor="min_levenstein_distance">
                Min Levenshtein Distance (set to zero to disable)
              </label>
              <Field
                id="min_levenstein_distance"
                name="min_levenstein_distance"
                type="number"
              />
              {errors.min_levenstein_distance &&
                touched.min_levenstein_distance && (
                  <Box>{errors.min_levenstein_distance}</Box>
                )}{" "}
            </Box>
            <Box display="flex" gap="10px">
              {values.min_levenstein_distance > 0 && (
                <>
                  <label htmlFor="min_text_length_to_check_levenstein_distance">
                    Min Text Length to Check Levenshtein Distance:
                  </label>
                  <Field
                    id="min_text_length_to_check_levenstein_distance"
                    name="min_text_length_to_check_levenstein_distance"
                    type="number"
                  />
                  {errors.min_text_length_to_check_levenstein_distance &&
                    touched.min_text_length_to_check_levenstein_distance && (
                      <Box>
                        {errors.min_text_length_to_check_levenstein_distance}
                      </Box>
                    )}
                </>
              )}
            </Box>
            <Box display="flex" gap="10px">
              <label htmlFor="is_streaming">Is Streaming:</label>
              <Field id="is_streaming" name="is_streaming" type="checkbox" />
            </Box>
            <Box display="flex" gap="10px">
              {values.is_streaming && (
                <>
                  <label htmlFor="streaming_time_delay">
                    Streaming Time Delay (in ms):
                  </label>
                  <Field
                    id="streaming_time_delay"
                    name="streaming_time_delay"
                    type="number"
                  />
                  {errors.streaming_time_delay &&
                    touched.streaming_time_delay && (
                      <Box>{errors.streaming_time_delay}</Box>
                    )}
                </>
              )}
            </Box>
            <Box display="flex" gap="10px">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="button" onClick={handleResetConfig}>
                Reset to Default Settings
              </button>
            </Box>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalForm;
