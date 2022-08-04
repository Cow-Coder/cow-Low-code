import { cloneDeep } from "lodash-es";
import type { PiniaPluginContext } from "pinia";

/**
 * @link https://stackoverflow.com/a/73116803
 */
export default function storeReset(context: PiniaPluginContext) {
  const { store } = context;
  const initialState = cloneDeep(store.$state);
  store.$reset = () => store.$patch(cloneDeep(initialState));
}
