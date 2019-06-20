import { apiEndpoints } from "../utils/apiEndpoints";
export const START_FORM_SUBMISSION = "START_FORM_SUBMISSION";
export const END_FORM_SUBMISSION = "END_FORM_SUBMISSION";

export const startFormSubmission = () => ({
  type: START_FORM_SUBMISSION
});

export const endFormSubmission = hasSucceeded => ({
  type: END_FORM_SUBMISSION,
  hasSucceeded
});

export const getCities = () => {
  return fetch(`http://cyf-api.codeyourfuture.io/cities`)
    .then(response => response.json())
    .then(response => (response.cities ? response.cities : []))
    .catch(err => console.log(err));
};
export const postForm = (name, values) => dispatch => {
  console.log(JSON.stringify(values));
  dispatch(startFormSubmission());
  return fetch(apiEndpoints[name], {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      Authorization: `Timestamp ${Date.now()}`,
      ...values
    })
  })
    .then(() => dispatch(endFormSubmission(true)))
    .catch(() => dispatch(endFormSubmission(false)));
};
