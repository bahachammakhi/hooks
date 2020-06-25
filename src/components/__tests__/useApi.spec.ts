import { renderHook } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import { useApi } from "../../index";

test("Renders", async () => {
  const fetchExemple = jest.fn();
  const { result } = renderHook(() => useApi({ fetchExemple }));
  expect(result.current).toBe(result.current);
});
