import { Route, Routes } from "react-router-dom";
import { DateSwiperAnimeted } from "../features";
import { mock } from "./mockData";

export const AppRouter = () => (
  <Routes>
    <Route
      path={`/`}
      element={<DateSwiperAnimeted data={mock.slice(0, 5)} />}
    />
  </Routes>
);
