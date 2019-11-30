/* Formalize action creator:
 * By using these helpers we make sure that every action creator will create same output form.
 */
import * as R from 'ramda';

/* Create general action creator.
 */
const basisAction = R.curry((getPayload, getMeta, type) =>
  R.compose(
    R.reject(R.isNil),
    R.applySpec({
      type: R.always(type),
      payload: getPayload,
      meta: getMeta,
    })
  )
);

/* Create action creator without `payload`.
 */
const simpleAction = basisAction(R.always(null), R.always(null));

/* Creaet action creator with `payload`.
 */
const payloadAction = basisAction(R.identity, R.always(null));

export { basisAction, simpleAction, payloadAction };
