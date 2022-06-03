import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

test("renders learn react link", () => {
  const history = createMemoryHistory();
  history.replace("/login");

  const { getByText } = render(
    <Router location={history.location} navigator={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  );

  expect(getByText(/Welcome/i)).toBeInTheDocument();
});
