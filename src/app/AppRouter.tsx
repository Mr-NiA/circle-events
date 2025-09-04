import { Route, Routes } from "react-router-dom";
import { DateSwiperAnimeted } from "../features";
import { mock } from "./mockData";

export const AppRouter = () => (
  <Routes>
    <Route path="/" element={<DateSwiperAnimeted data={mock} />} />
    {mock.map((el, i) => {
      const d = mock.slice(0, i);
      return (
        <Route
          key={el.name}
          path={`/${i}`}
          element={<DateSwiperAnimeted data={d} />}
        />
      );
    })}
  </Routes>
);
